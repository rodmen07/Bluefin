class AddPhotoUrLsToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :photo_urls, :string, array: true, defualt: []
  end
end
