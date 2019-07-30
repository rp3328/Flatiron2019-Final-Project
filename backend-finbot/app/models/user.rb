class User < ApplicationRecord
    has_one :plan
    has_many :assets
    has_many :asset_types, through: :assets
    has_many :actions
    has_many :credentials

    has_secure_password validations:false
  
    validates :first_name, :last_name, :username, presence: true
    validates :first_name, :last_name, :username, uniqueness: true
    

    validates_confirmation_of :password
    validates :password, length: {minimum: 4,
                       message: 'Your password must contain at least 4 characters'},
                       allow_blank: true, on: :update
    #presence: {message: 'You must enter a password'},

end
