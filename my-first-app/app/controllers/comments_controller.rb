class CommentsController < ApplicationController


    def create
        # @article =  Article.find(params[:article_id])
        # debugger
        @comment =  Comment.new(comment: params[:comment],commenter: params[:commenter], article_id: params[:article_id],status_id: params[:status_id])
        if @comment.save
            render json: {comment: @comment, message:"Commnet Created Successfully!!!!"}, status: 201
        else
            render :status => "400", :json => {:status => "Failed to create Comment", :comment_errors => @comment.errors.objects.map { |n| n.full_message }}.to_json
        end
        
    end

    def index
        @comments = Article.find(params[:article_id]).comments
        render json: @comments
    end
    
    def update
        @article =  Article.find(params[:article_id])
        @comment = @article.comments.find(params[:id])
        if @comment.update(comment: params[:comment],commenter: params[:commenter],status_id: params[:status_id])
        render json: {comment: @comment, message:"Commnet Updated Successfully!!!!"}, status: 201
        else
            render json:  {message: "Failed to update Comment", comment_errors: @comment.errors.objects.map { |n| n.full_message }}, status: "400"
        end

    end

    def destroy
        @article =  Article.find(params[:article_id])
        @comment = @article.comments.find(params[:id])
        @comment.destroy
        render json: {comment: @comment, message:"Commnet destroy Successfully!!!!"}, status: 201

    end

end
