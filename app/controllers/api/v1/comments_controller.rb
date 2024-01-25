class Api::V1::CommentsController < ApplicationController
    def create
        @post = Post.find(params[:id])
        @comment = @post.comments.create(comment_params)
        if @comment
            render json: @post
        else
            render json: @comment.errors
        end
    end

    def show
        @post = Post.find(params[:id])
        render json: @post.comments
    end
    
    def destroy
        @post = Post.find(params[:id])
        @comment = @post.comments.find(params[:id2])
        @comment.destroy
        redirect_to json: @post
    end

    def showComment
        @comment = Comment.find(params[:commId])
        render json: @comment
    end

    def updateComment
        @comment = Comment.find(params[:commId])
        if @comment.update(comment_params)
            render json: @comment
          else
            render json: @comment.errors
          end
    end
    
    private
    def comment_params
        params.permit(:commenter, :body, :username, :bool)
    end
end
