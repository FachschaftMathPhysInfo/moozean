class CreateLents < ActiveRecord::Migration[5.0]
  def change
    create_table :lents do |t|
      t.references :student, foreign_key: true
      t.references :folder, foreign_key: true

      t.timestamps
    end
  end
end
