class Foldersnameremoval < ActiveRecord::Migration[5.1]
  def change
    remove_column :folders, :name
  end
end
