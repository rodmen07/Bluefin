json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
end

json.favorites do
    @user.favorites.each do |favorite|
        json.set! favorite.id do
        json.(favorite, :id, :users_id, :listings_id)
        # json.partial! "api/favorites/favorite", favorite: favorite
        end
    end
end
