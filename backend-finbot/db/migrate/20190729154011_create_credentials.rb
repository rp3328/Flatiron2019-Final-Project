class CreateCredentials < ActiveRecord::Migration[5.2]
  def change
    create_table :credentials do |t|
      t.string :access_token
      t.string :item_id
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
