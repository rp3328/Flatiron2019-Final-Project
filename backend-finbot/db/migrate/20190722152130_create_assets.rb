class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :ticker
      t.float :shares
      t.float :price
      t.datetime :purchase_date
      t.references :asset_type, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
