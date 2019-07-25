# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_25_182219) do

  create_table "actions", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.integer "asset_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_id"], name: "index_actions_on_asset_id"
    t.index ["user_id"], name: "index_actions_on_user_id"
  end

  create_table "asset_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assets", force: :cascade do |t|
    t.string "ticker"
    t.float "shares"
    t.float "price"
    t.datetime "purchase_date"
    t.integer "asset_type_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_type_id"], name: "index_assets_on_asset_type_id"
    t.index ["user_id"], name: "index_assets_on_user_id"
  end

  create_table "plans", force: :cascade do |t|
    t.float "equity_smcap"
    t.float "equity_micap"
    t.float "equity_lgcap"
    t.float "bond_hy"
    t.float "bond_ly"
    t.float "bond_muni"
    t.float "bond_t"
    t.float "cash"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.integer "age"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
