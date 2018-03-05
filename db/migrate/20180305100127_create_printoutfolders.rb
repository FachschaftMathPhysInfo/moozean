class CreatePrintoutfolders < ActiveRecord::Migration[5.1]
  def change
    create_table :printoutfolders do |t|
      t.references :folderseries, foreign_key: true
      t.bigint :times

      t.timestamps
    end
  end
end
