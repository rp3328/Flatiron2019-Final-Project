class User < ApplicationRecord
    has_one :plan
    has_many :assets
    has_secure_password
end
