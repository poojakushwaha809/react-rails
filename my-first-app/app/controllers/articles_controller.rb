class ArticlesController < ApplicationController
    def index

         @articles=Article.all.map{|art| art.as_json.merge({publishers: art.publishers})}
         render json: @articles.to_json
    end

    def new
        # debugger
        @article = Article.new(title: "", body: "")

    end

    def create
        @article = Article.new(title: params[:article][:title], body: params[:article][:body], article_no: params[:article][:article_no], is_active: params[:article][:is_active], status_id: params[:article][:status_id])
        if @article.save
            params[:article][:selected_publisher].each do |article_publisher|
                article_id = @article.id
                @article_publisher =  ArticlePublisher.new(article_id: article_id,publisher_id: article_publisher[:id])
                @article_publisher.save
            end
            render json: {article: @article, message: 'Article created successfully'} 
        else
            render :status => "400", :json => {:status => "Failed to create Article", :article_errors => @article.errors.objects.map { |n| n.full_message }}.to_json
        end
    end

    def asheesh_show
        # debugger
        @article = Article.find(params[:id])
        @article_publisher= @article.publishers
            render json: {article: @article,article_publisher: @article_publisher}
    end 

    def edit
        @article = Article.find(params[:id])
    end

    def update
        @article = Article.find(params[:id])
        if @article.update(title: params[:article][:title], body: params[:article][:body],article_no: params[:article][:article_no], is_active: params[:article][:is_active], status_id: params[:article][:status_id])
        @article.publishers.destroy_all
            params[:article][:publishers].each do |article_publisher|
                article_id = @article.id
                @article_publisher =  ArticlePublisher.create(article_id: article_id,publisher_id: article_publisher[:id])
            end
            # redirect_to articles_path(@article)
            render json: {article: @article, message:"Article Updated Successfully!!!!!!"}

        else
            render :status => "400", :json => {:status => "Failed to create Article", :article_errors => @article.errors.objects.map { |n| n.full_message }}.to_json
            # render :new, status: :unprocessable_entity
        end

    end

    def destroy
        # debugger
        @article = Article.find(params[:id])
        if @article.destroy 
        render json: {article: @article, message: ' deleted successfully'} 
        else
            render :status => "400", :json => {:status => "Failed to create Article", 
        :article_errors => @article.errors.objects.map { |n| n.full_message }}.to_json
        end 

        # redirect_to root_path, status: :see_other
    end

end
