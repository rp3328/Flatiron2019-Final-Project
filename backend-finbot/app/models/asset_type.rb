class AssetType < ApplicationRecord
    has_many :assets

    has_many :actions
end
