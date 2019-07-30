class AssetsController < ApplicationController
    require 'date'
    require 'HTTParty'

    def create
        asset_type_id = AssetType.find_by(name: params[:asset_type]).id
        asset = Asset.create(ticker_symbol: params[:ticker_symbol], name: params[:name], quantity: params[:quantity], cost_basis: params[:cost_basis], user_id: params[:user_id], asset_type_id: asset_type_id)
        asset.update_close_price
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
        params.permit(:ticker_symbol, :name, :quantity, :close_price, :cost_basis, :asset_type, :user_id)
    end

end
