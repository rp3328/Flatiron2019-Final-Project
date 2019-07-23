class User < ApplicationRecord
    has_one :plan
    has_many :assets
    has_many :asset_types, through: :assets

    has_secure_password
end
