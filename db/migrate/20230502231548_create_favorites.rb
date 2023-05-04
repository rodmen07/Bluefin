class CreateFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.references :users, null: false, foreign_key: true
      t.references :listings, null: false, foreign_key: true

      t.timestamps
    end
  end
end
