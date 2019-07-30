class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :ticker_symbol
      t.string :name
      t.float :quantity
      t.float :close_price
      t.float :cost_basis
      

      t.references :asset_type, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
