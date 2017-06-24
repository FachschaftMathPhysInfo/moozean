class Folderseriesinprintouts < ActiveRecord::Migration[5.1]
  def change
    add_reference :printouts, :folderseries, foreign_key: true
  end
end
