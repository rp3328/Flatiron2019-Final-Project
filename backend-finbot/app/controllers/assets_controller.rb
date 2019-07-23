class AssetsController < ApplicationController
    
    def new
        # asset = Asset.new(asset_params)
    end


    def create
        asset = Asset.create(asset_params)
        render json: asset

    end

    def show
        asset = Asset.find(params[:id])
        render json: asset
    end

    #total assets per user
    def getValue
        assets = Asset.
        
    end

    private 
    def asset_params
        params.permit(:ticker, :shares, :price, :purchase_date, :asset_type_id, :user_id)
    end

end
