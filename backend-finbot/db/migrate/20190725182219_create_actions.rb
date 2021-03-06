class CreateActions < ActiveRecord::Migration[5.2]
  def change
    create_table :actions do |t|
      t.string :name
      t.belongs_to :user, foreign_key: true
      t.belongs_to :asset, foreign_key: true

      t.timestamps
    end
  end
end
