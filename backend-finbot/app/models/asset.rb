class Asset < ApplicationRecord
    belongs_to :asset_type
    belongs_to :user

    has_one :action
end
