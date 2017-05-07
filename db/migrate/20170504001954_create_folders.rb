class CreateFolders < ActiveRecord::Migration[5.0]
  def change
    create_table :folders do |t|
      t.string :name
      t.string :content
      t.boolean :obligation_to_report
      t.string :barcode

      t.timestamps
    end
  end
end
