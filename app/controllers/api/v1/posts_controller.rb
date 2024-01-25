class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy update]

  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
     render json: @post
  end

  def destroy
    @post&.destroy
    render json: { message: 'Post deleted!' }
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors
    end
  end

  def search
    post = Post.where("category = ?", params[:search])
    render json: post
  end
  
  private

  def post_params
    params.permit(:postername, :title, :category, :body, :name, :bool)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
