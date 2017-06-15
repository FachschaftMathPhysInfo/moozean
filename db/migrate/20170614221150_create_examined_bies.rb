class CreateExaminedBies < ActiveRecord::Migration[5.1]
  def change
    create_table :examined_bies do |t|
      t.references :report, foreign_key: true
      t.references :examinator, foreign_key: true

      t.timestamps
    end
  end
end
