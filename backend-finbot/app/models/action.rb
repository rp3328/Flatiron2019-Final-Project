class Action < ApplicationRecord
  belongs_to :user
  belongs_to :asset
  has_one :asset_type, through: :asset


end
