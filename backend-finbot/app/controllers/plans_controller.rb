class PlansController < ApplicationController
    
    # def new
    #     plan = Plan.new(plan_params)
    # end


    def create
        plan = Plan.create(plan_params)
        render json: plan
    end

    def show
        plan = Plan.find(params[:id])
        render json: plan
    end

    def update
        plan = Plan.find(params[:id])
        if plan.update(plan_params)
            render json: plan
        else
            render json: plan
        end
    end

    def chart
        plan = Plan.find(params[:id])

        data_hash = Hash.new
        options_hash = Hash.new
        data_hash[:labels] = []
        data_hash[:datasets] = [{}]
        data_hash[:datasets][0][:label] = "Planned Asset Allocation (%)"
        data_hash[:datasets][0][:backgroundColor] = []
        data_hash[:datasets][0][:data] = []

        # insert data into data_hash by looping through Plan's attributes
        plan.attributes.each do |asset_type, value|
            if asset_type == "id" || asset_type == "user_id" || asset_type == "created_at" || asset_type == "updated_at" 

            else
            data_hash[:labels].push(asset_type)
            data_hash[:datasets][0][:data].push(value)
            end
        end

        # create the options hash
        options_hash = {
            title: {
                display: true,
                text: "#{plan.user.first_name} #{plan.user.last_name}'s planned asset allocation"
            }
        }

        render json: {data: data_hash, options: options_hash}
    end



    private 
    def plan_params
        params.require(:plan).permit(:cash, :derivative, :equity, :etf, :fixed_income, :loan, :mutual_fund, :other, :user_id)
    end


end
