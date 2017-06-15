class CreatePrintouts < ActiveRecord::Migration[5.1]
  def change
    create_table :printouts do |t|
      t.references :report, foreign_key: true
      t.bigint :times

      t.timestamps
    end
  end
end
