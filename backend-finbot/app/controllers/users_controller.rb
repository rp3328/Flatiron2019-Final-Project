class UsersController < ApplicationController
    require 'date'
    require 'net/http'
    require 'open-uri'
    require 'json'

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
            # plan = Plan.create(user: user)
            render json: user
        else
            flash[:error] = user.errors.full_messages
            render :new
        end
    end

    def show
        user = User.find(params[:id])
        render json: user, include: [:assets, :plan, :actions]
    end

    #gets a hash of prices for the user's assets at points in the past
    def getValue
        user_id = params[:id].to_i
        iex_api_key = Figaro.env.iex_api_key
        iex_url = 'https://cloud.iexapis.com/stable/stock'
        asset_value_hash = Hash.new
        asset_value_hash[:datasets] = []
        
        # get all the user's assets
        user_assets = Asset.all.select do |asset|
            asset.user_id == user_id
        end
        
        user_assets.each do |asset|
            active_asset_index = asset_value_hash[:datasets].length
            uri = URI.parse(iex_url.dup.concat("/#{asset.ticker}/chart/5y?chartCloseOnly=true&chartInterval=60&token=#{iex_api_key}"))
            response = Net::HTTP.get_response(uri)
            if response.header.kind_of?(Net::HTTPOK) && JSON.parse(response.body).length != 0
                data = JSON.parse(response.body)    
                asset_value_hash[:datasets].push(Hash.new)
                asset_value_hash[:datasets][active_asset_index][:label] = asset.ticker
                asset_value_hash[:datasets][active_asset_index][:data] = data.map do |day| 
                    if day["date"].to_datetime > asset.purchase_date
                        day["close"] * asset.shares
                    else
                        0
                    end
                end
                asset_value_hash[:labels] = data.map {|day| day["date"].gsub('-','')}
            end
        end
            render json: asset_value_hash
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

    private 
    def user_params
        params.permit(:first_name, :last_name, :username, :age, :password, :password_confirmation)
    end

end
