class UsersController < ApplicationController
    require 'date'
    require 'net/http'
    require 'open-uri'
    require 'json'
    require 'httparty'

    def login
        user = User.find_by(username: params[:username])

        if user && user.authenticate(params[:password])
            render json: user, include: [:plan, :actions]
        else
            render json: { error: "We cannot recognize this username/password combination" }, status: 401
        end
    end

    def create
        user = User.create(user_params)
        
        if user.valid?
            render json: user
        else
            flash[:error] = user.errors.full_messages
            render :new
        end
    end

    def show
        user = User.find(params[:id])
        render json: user, include: [:assets, :plan, :actions, :asset_types]
    end

    def get_value
        user_id = params[:id].to_i
        return_hash = Hash.new
        return_hash[:labels] = []
        return_hash[:datasets] = [{}]
        return_hash[:datasets][0][:label] = "Asset Allocation ($)"
        return_hash[:datasets][0][:backgroundColor] = []
        return_hash[:datasets][0][:data] = []
        
        
        # get all the user's assets
        user_assets = Asset.all.select do |asset|
            asset.user_id == user_id
        end

        # update every asset's closing price
        user_assets.each do |asset|
            asset.update_close_price
        end

        # total all the positions by Asset Type
        grouping = user_assets.group_by do |asset|
            asset.asset_type
        end
        
        grouping.each do |asset_type, user_assets_array|
            asset_type_total = user_assets_array.reduce(0) do |sum, asset|
                sum + (asset.quantity * asset.close_price)
            end
            return_hash[:labels].push(asset_type.name)
            return_hash[:datasets][0][:data].push(asset_type_total)
            return_hash[:datasets][0][:backgroundColor].push("#".concat(SecureRandom.hex(3)))
            end            
        render json: return_hash
    end

    def update
        user = User.find(params[:id])
        if user.update(user_params)
            render json: user, include: [:assets, :plan, :actions]
        else
            render json: user, include: [:assets, :plan, :actions]
        end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        redirect_to(login_path)
    end

    def get_token
        client = Plaid::Client.new(env: :sandbox,
                client_id: Figaro.env.plaid_client_id,
                secret: Figaro.env.plaid_secret,
                public_key: Figaro.env.plaid_public_key)

        exchange_token_response = client.item.public_token.exchange(params['public_token'])
        access_token = exchange_token_response['access_token']
        item_id = exchange_token_response['item_id']

        # create a Credential object to store the user's login credentials
        credential = Credential.create(access_token: access_token, item_id: item_id, user: User.find(params['user_id']))

        # add each of the user's holdings as Asset objects
        investments = client.investments.holdings.get(access_token)
        securities = investments['securities']
        holdings = investments['holdings']
        
        holdings.each do |holding|
            security = securities.find do |sec|
                sec.security_id == holding.security_id
            end
            Asset.create(
                ticker_symbol: security["ticker_symbol"],
                name: security["name"],
                quantity: holding["quantity"],
                close_price: security["close_price"],
                cost_basis: holding["cost_basis"],
                asset_type_id: AssetType.find_by(name: security["type"]).id,
                user_id: params["user_id"]
            )
        end
        render json: {}
    end

    private 
    def user_params
        params.permit(:first_name, :last_name, :username, :email, :telephone, :age, :password, :password_confirmation)
    end

end
