class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :tickerl
      t.float :shares
      t.float :price
      t.datetime :purchase_date
      t.references :asset_type, foreign_key: true

      t.timestamps
    end
  end
end
