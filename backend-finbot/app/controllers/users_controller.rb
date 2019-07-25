class UsersController < ApplicationController
    require 'date'
    require 'net/http'
    require 'open-uri'
    require 'json'

    def login
        user = User.find_by(username: params[:username])

        if user && user.authenticate(params[:password])
            render json: user
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
        render json: user
    end

    #gets a hash of prices for the user's assets at points in the past
    def getValue
        user_id = params[:id].to_i
        iex_api_key = Figaro.env.iex_api_key
        
        # get all the user's assets
        user_assets = Asset.all.select do |asset|
            asset.user_id == user_id
        end

        # currently, have a default 5-year timeframe
        yesterday = Date.today - 1
        date_array = Array.new
        for i in 0..24 do
        date_array[i] = yesterday-(30*i)
        date_array[i] = date_array[i].strftime("%Y%m%d")
        end
        
        return_hash = Hash.new
        return_hash[:labels] = date_array
        return_hash[:datasets] = []

        user_assets.each do |asset|
            new_asset = Hash.new
            return_hash[:datasets].push(new_asset)
            active_asset_index = return_hash[:datasets].length - 1
            
            date_array.each do |date|
                request_status = false
                while request_status == false do
                    uri = ""
                    iex_url = "https://cloud.iexapis.com/stable/stock"
                    
                    uri = URI.parse(iex_url.concat("/#{asset.ticker}/chart/date/#{date}?chartByDay=true&token=#{iex_api_key}"))
                    response = Net::HTTP.get_response(uri)
                    if response.header.kind_of?(Net::HTTPOK) && JSON.parse(response.body).length != 0
                        return_hash[:datasets][active_asset_index][:label] = asset.ticker
                        if !(return_hash[:datasets][active_asset_index][:data])
                            return_hash[:datasets][active_asset_index][:data] = [] # creates a new data array if one does not exist
                        end
                        share_price = JSON.parse(response.body)[0]["close"]
                        return_hash[:datasets][active_asset_index][:data].push(share_price * asset.shares)
                        request_status = true
                    else
                        date = (date.to_datetime - 1).strftime("%Y%m%d")
                    end
                end
            end
        end
        # reverse order before feeding into chart.js to have the most recent values to the right
        return_hash[:labels] = return_hash[:labels].reverse
        return_hash[:datasets].each do |asset|
            asset[:data] = asset[:data].reverse
        end
        render json: return_hash
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render :show
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
