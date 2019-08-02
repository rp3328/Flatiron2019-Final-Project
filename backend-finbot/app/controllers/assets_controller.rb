class AssetsController < ApplicationController
    require 'date'
    require 'HTTParty'

    def create
        asset_type_id = AssetType.find_by(name: params[:asset_type]).id
        asset = Asset.new(ticker_symbol: params[:ticker_symbol], name: params[:name], quantity: params[:quantity], cost_basis: params[:cost_basis], user_id: params[:user_id], asset_type_id: asset_type_id)
        asset.update_close_price
        if asset.valid?
            asset.save
            render json: asset, include: [:asset_type]
        else
            render json: { error: "There was an error in creating your asset. Assets must be either a listed equity findable on IEX (Investors Exchange) or imported via linking an account." }, status: 401
        end
    end

    def show
        asset = Asset.find(params[:id])
        render json: asset, include: [:asset_types]
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
