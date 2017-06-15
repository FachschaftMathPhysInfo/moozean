class CreateFolderseries < ActiveRecord::Migration[5.1]
  def change
    create_table :folderseries do |t|
      t.string :name
      t.boolean :obligationtoreport
      t.text :description

      t.timestamps
    end
  end
end
