class PlansController < ApplicationController
    
    # def new
    #     plan = Plan.new(plan_params)
    # end


    def create
        plan = Plan.create(plan_params)
        if plan.valid?
            render json: plan
        else
            render json: { error: "There was an error in creating your financial plan. #{plan.errors.messages[:base][0]}" }, status: 401
        end
    end

    def show
        plan = Plan.find(params[:id])
        render json: plan
    end

    def update
        plan = Plan.find(params[:id])
        plan.update(plan_params)
        if plan.valid?
            render json: plan
        else
            render json: { error: "There was an error in updating your financial plan. #{plan.errors.messages[:base][0]}" }, status: 401
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
            data_hash[:datasets][0][:data].push(value*100)
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
