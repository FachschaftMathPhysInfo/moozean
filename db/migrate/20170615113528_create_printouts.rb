class CreatePrintouts < ActiveRecord::Migration[5.1]
  def change
    create_table :printouts do |t|
      t.references :report, foreign_key: true
      t.int :times

      t.timestamps
    end
  end
end
