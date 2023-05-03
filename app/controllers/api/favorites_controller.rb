class Api::FavoritesController < ApplicationController
    def index
        @favorites = Favorite.all
    end

    def show
        @favorite = Favorite.find(params[:id])
    end

    def create
        @favorite = Favorite.new(favorites_params)
        @favorite.user_id = current_user.id
        if @favorite.save
            render :show
        else
            render json: {errors: @favorite.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @favorite = Favorite.find(params[:id])
        if @favorite.update(favorites_params)
            render :show
        else
            render json: {errors: @favorite.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @favorite = Favorite.find(params[:id])
        if @favorite.destroy
            render 'show'
        else
            render json: {errors: @favorite.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def favorites_params
        params.require(:favorite).permit(:id, :users_id, :listings_id)
    end
end
