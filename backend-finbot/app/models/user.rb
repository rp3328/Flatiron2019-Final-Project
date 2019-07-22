class User < ApplicationRecord
    has_one :plan
    has_many :assets

    def new
    end

    def create
        user = User.new(user_params)
        
        if user.valid?
            render :show
        else
            flash[:error] = user.errors.full_messages
            render :new
        end
    end

    def show
        user = User.find(params[:id])
    end

    def edit
        user = User.find(params[:id])
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
        params.require(:user).permit(:first_name, :last_name, :user_id, :age)
    end
    
end
