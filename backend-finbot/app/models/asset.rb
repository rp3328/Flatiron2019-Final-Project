class Asset < ApplicationRecord
    belongs_to :asset_type
    belongs_to :user

    has_many :actions
end
