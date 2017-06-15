class CreateIsIns < ActiveRecord::Migration[5.1]
  def change
    create_table :is_ins do |t|
      t.references :report, foreign_key: true
      t.references :folderseries, foreign_key: true

      t.timestamps
    end
  end
end
