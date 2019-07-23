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


    private 
    def plan_params
        params.permit(:equity_smcap, :equity_micap, :equity_lgcap, :bond_hy, :bond_ly, :bond_muni, :bond_t, :cash, :user_id)
    end

end
