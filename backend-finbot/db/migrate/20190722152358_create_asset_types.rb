class CreateAssetTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :asset_types do |t|
      t.string :name
      
      t.timestamps
    end
  end
end
