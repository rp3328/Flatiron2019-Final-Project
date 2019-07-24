class UsersController < ApplicationController
    


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
        user_id = params[:id]


    # returns an array. first element of the array is the interval dates (for the chart x-axis)
    # each element of the array is an array representing an assetType. It shows the total holdings of that assetType at the interval date
        # byebug
    end

    def update
        user = User.find(params[:id])
        if user.update(user_params)
            render json: user
        else
            render json: user
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
