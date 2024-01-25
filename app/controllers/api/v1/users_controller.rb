class Api::V1::UsersController < ApplicationController
  wrap_parameters :user, include: [:name, :password]

  def create
    @user = User.create!(user_params)

    if @user
      flash[:notice] = "User created successfully"
      render json: @user
    else
      flash[:alert] = "User not created"
      render json: @user.errors
    end
  end

  def login
    @user = User.find_by(name: params[:nameLogin])

    if params[:passwordLogin].length == 0
      params[:passwordLogin] = '!@#$'
    end

    if @user && @user.authenticate(params[:passwordLogin])
      session[:user_id] = @user.id
      render json: @user
    end
    
  end

  private
  def user_params
    params.require(:user).permit(:name, :password)
  end
end
