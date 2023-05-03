class Listing < ApplicationRecord
  validates :address, :price, presence: true
  validates :bed, :baths, :sqft, presence: true, numericality: { only_integer: true, greater_than: 0 }

  belongs_to :lister, class_name: 'User', foreign_key: 'lister_id'
  has_one :favorite, foreign_key: 'listings_id', dependent: :destroy
end
