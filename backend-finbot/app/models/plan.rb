class Plan < ApplicationRecord
    belongs_to :user

    validate :limit_value


    def limit_value
        if 1 == (self.cash + self.derivative + self.equity + self.etf + self.fixed_income + self.loan + self.mutual_fund + self.other)
        else
            errors.add(:base, "Plan attributes need to add up to one.")
        end
    end

end
