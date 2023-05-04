class Favorite < ApplicationRecord
  belongs_to :user, foreign_key: "users_id", class_name: :User
  belongs_to :listing, foreign_key: "listings_id", class_name: :Listing
end
