class CreatePlans < ActiveRecord::Migration[5.2]
  def change
    create_table :plans do |t|
      t.float :cash
      t.float :derivative
      t.float :equity
      t.float :etf
      t.float :fixed_income
      t.float :loan
      t.float :mutual_fund
      t.float :other
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
