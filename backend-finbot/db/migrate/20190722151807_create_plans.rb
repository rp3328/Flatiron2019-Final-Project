class CreatePlans < ActiveRecord::Migration[5.2]
  def change
    create_table :plans do |t|
      t.float :equity_smcap
      t.float :equity_micap
      t.float :equity_lgcap
      t.float :bond_hy
      t.float :bond_ly
      t.float :bond_muni
      t.float :bond_t
      t.float :cash
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
