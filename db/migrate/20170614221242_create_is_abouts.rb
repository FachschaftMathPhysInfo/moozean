class CreateIsAbouts < ActiveRecord::Migration[5.1]
  def change
    create_table :is_abouts do |t|
      t.references :report, foreign_key: true
      t.references :modul, foreign_key: true

      t.timestamps
    end
  end
end
