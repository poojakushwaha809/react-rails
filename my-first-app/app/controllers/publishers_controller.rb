class PublishersController < ApplicationController
  before_action :set_publisher, only: %i[ show update destroy ]

  # GET /publishers
  # GET /publishers.json
  def index
    @publishers = Publisher.all
  end

  # GET /publishers/1
  # GET /publishers/1.json
  def show
  end

  # POST /publishers
  # POST /publishers.json
  def create
    @publisher = Publisher.new(publisher_params)

    if @publisher.save
      render :show, status: :created, location: @publisher
    else
      render json: @publisher.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /publishers/1
  # PATCH/PUT /publishers/1.json
  def update
    if @publisher.update(publisher_params)
      render :show, status: :ok, location: @publisher
    else
      render json: @publisher.errors, status: :unprocessable_entity
    end
  end

  # DELETE /publishers/1
  # DELETE /publishers/1.json
  def destroy
    @publisher.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_publisher
      @publisher = Publisher.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def publisher_params
      params.require(:publisher).permit(:name)
    end
end
