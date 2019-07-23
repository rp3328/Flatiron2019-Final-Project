class UsersController < ApplicationController
    
    def new
        user = User.new(user_params)
    end

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
        byebug
        if user.valid?
            plan = Plan.create(user: user)
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

    def edit
        
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
