class Api::ListingsController < ApplicationController
    def index
        @listings = Listing.all
        # render :index
    end

    def show
        @listing = Listing.find(params[:id])
    end

    def create
        @listing = Listing.new(listing_params)
        @listing.lister_id = current_user.id
        @listing.photo_urls = ["https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/FSP-Bluefin-DefaultListingShowImage.jpeg"]
        if @listing.save
            render :show
        else
            render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @listing = Listing.find(params[:id])
        if @listing.update(listing_params)
            render :show
        else
            render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @listing = Listing.find(params[:id])
        if @listing.destroy
            render 'show'
        else
            render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def listing_params
        params.require(:listing).permit(:id, :address, :lister_id, :price, :bed, :baths, :sqft, :photo_urls)
    end
end
