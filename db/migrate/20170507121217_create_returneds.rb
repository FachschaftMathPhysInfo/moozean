class CreateReturneds < ActiveRecord::Migration[5.0]
  def change
    create_table :returneds do |t|
      t.references :student, foreign_key: true
      t.references :folder, foreign_key: true
      t.date :lentat

      t.timestamps
    end
  end
end
