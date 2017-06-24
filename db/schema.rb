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

ActiveRecord::Schema.define(version: 20170623201752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "emails", force: :cascade do |t|
    t.string "address"
    t.string "subject"
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "referencable_type"
    t.integer "referencable_id"
    t.index ["referencable_type", "referencable_id"], name: "index_emails_on_referencable_type_and_referencable_id"
  end

  create_table "examinators", force: :cascade do |t|
    t.string "givenname"
    t.string "surname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
  end

  create_table "examined_bies", force: :cascade do |t|
    t.bigint "report_id"
    t.bigint "examinator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["examinator_id"], name: "index_examined_bies_on_examinator_id"
    t.index ["report_id"], name: "index_examined_bies_on_report_id"
  end

  create_table "folders", id: :serial, force: :cascade do |t|
    t.string "barcode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "folderseries_id"
    t.string "suffix"
    t.index ["folderseries_id"], name: "index_folders_on_folderseries_id"
  end

  create_table "folderseries", force: :cascade do |t|
    t.string "name"
    t.boolean "obligationtoreport"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "is_abouts", force: :cascade do |t|
    t.bigint "report_id"
    t.bigint "modul_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["modul_id"], name: "index_is_abouts_on_modul_id"
    t.index ["report_id"], name: "index_is_abouts_on_report_id"
  end

  create_table "is_ins", force: :cascade do |t|
    t.bigint "report_id"
    t.bigint "folderseries_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["folderseries_id"], name: "index_is_ins_on_folderseries_id"
    t.index ["report_id"], name: "index_is_ins_on_report_id"
  end

  create_table "lents", force: :cascade do |t|
    t.integer "student_id"
    t.integer "folder_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["folder_id"], name: "index_lents_on_folder_id"
    t.index ["student_id"], name: "index_lents_on_student_id"
  end

  create_table "moduls", force: :cascade do |t|
    t.string "name"
    t.string "abbreviation"
    t.string "link_modulhandbuch"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "printouts", force: :cascade do |t|
    t.bigint "report_id"
    t.bigint "times"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "folderseries_id"
    t.index ["folderseries_id"], name: "index_printouts_on_folderseries_id"
    t.index ["report_id"], name: "index_printouts_on_report_id"
  end

  create_table "queue_classic_jobs", force: :cascade do |t|
    t.text "q_name", null: false
    t.text "method", null: false
    t.json "args", null: false
    t.datetime "locked_at"
    t.integer "locked_by"
    t.datetime "created_at", default: -> { "now()" }
    t.datetime "scheduled_at", default: -> { "now()" }
    t.index ["q_name", "id"], name: "idx_qc_on_name_only_unlocked", where: "(locked_at IS NULL)"
    t.index ["scheduled_at", "id"], name: "idx_qc_on_scheduled_at_only_unlocked", where: "(locked_at IS NULL)"
  end

  create_table "reports", force: :cascade do |t|
    t.datetime "examination_at"
    t.bigint "subject_id"
    t.bigint "typ_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.binary "picture"
    t.index ["subject_id"], name: "index_reports_on_subject_id"
    t.index ["typ_id"], name: "index_reports_on_typ_id"
  end

  create_table "returneds", id: :serial, force: :cascade do |t|
    t.integer "student_id"
    t.integer "folder_id"
    t.date "lentat"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["folder_id"], name: "index_returneds_on_folder_id"
    t.index ["student_id"], name: "index_returneds_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "name"
    t.string "uniid"
    t.string "matriculationnumber"
    t.boolean "refund"
    t.boolean "report"
    t.string "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subjects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "typs", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "examined_bies", "examinators"
  add_foreign_key "examined_bies", "reports"
  add_foreign_key "is_abouts", "moduls"
  add_foreign_key "is_abouts", "reports"
  add_foreign_key "is_ins", "folderseries"
  add_foreign_key "is_ins", "reports"
  add_foreign_key "lents", "folders"
  add_foreign_key "lents", "students"
  add_foreign_key "printouts", "folderseries"
  add_foreign_key "printouts", "reports"
  add_foreign_key "reports", "subjects"
  add_foreign_key "reports", "typs"
  add_foreign_key "returneds", "folders"
  add_foreign_key "returneds", "students"
end
