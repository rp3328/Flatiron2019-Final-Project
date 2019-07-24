class AssetsController < ApplicationController

    def create
        asset_type_id = AssetType.find_by(name: params[:asset_type]).id
        asset = Asset.create(ticker: params[:ticker], shares: params[:shares], price: params[:price], purchase_date: params[:purchase_date], user_id: params[:user_id], asset_type_id: asset_type_id)
        render json: asset
    end

    def show
        asset = Asset.find(params[:id])
        render json: asset
    end

    def destroy
        asset = Asset.find(params[:id])
        asset.destroy
        render json: asset
    end

    private 
    def asset_params
        params.permit(:ticker, :shares, :price, :purchase_date, :asset_type, :user_id)
    end

end
