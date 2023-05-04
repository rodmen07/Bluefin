class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :address, null:false
      t.references :lister, null: false, foreign_key: { to_table: :users }
      t.integer :price, null:false
      t.integer :bed, null:false
      t.integer :baths, null:false
      t.integer :sqft, null:false

      t.timestamps
    end
    add_index :listings, :address, unique: true
  end
end
