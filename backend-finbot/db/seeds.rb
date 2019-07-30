# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Credential.destroy_all
Asset.destroy_all
Plan.destroy_all
User.destroy_all
AssetType.destroy_all

AssetType.create(name: "cash")
AssetType.create(name: "derivative")
AssetType.create(name: "equity")
AssetType.create(name: "etf")
AssetType.create(name: "fixed income")
AssetType.create(name: "loan")
AssetType.create(name: "mutual fund")
AssetType.create(name: "other")