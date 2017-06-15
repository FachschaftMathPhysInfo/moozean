class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.binary :pdf
      t.text :tex
      t.date :examination_date
      t.references :subject, foreign_key: true
      t.references :type, foreign_key: true

      t.timestamps
    end
  end
end
