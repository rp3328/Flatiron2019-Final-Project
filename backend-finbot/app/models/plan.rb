class Plan < ApplicationRecord
    belongs_to :user

    # validate :limit_value


    def limit_value
        plan = Plan.find(self.id)
        if 1 == (plan.equity_lgcap + plan.equity_micap + plan.equity_smcap + plan.bond_hy + plan.bond_ly + plan.bond_muni + plan.bond_t + plan.cash)
        else
            errors.add(:base, "Needs to add up to one")
        end
    end

end
