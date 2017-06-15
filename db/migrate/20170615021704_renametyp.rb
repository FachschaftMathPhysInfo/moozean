class Renametyp < ActiveRecord::Migration[5.1]
  def change
    rename_table :types, :typs
  end
end
