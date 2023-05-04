class Listing < ApplicationRecord
  validates :address, :price, presence: true
  validates :bed, :baths, :sqft, presence: true, numericality: { only_integer: true, greater_than: 0 }

  belongs_to :lister, foreign_key: 'lister_id', class_name: :User
  has_one :favorite, foreign_key: 'listings_id', class_name: :Favorite, dependent: :destroy
end
