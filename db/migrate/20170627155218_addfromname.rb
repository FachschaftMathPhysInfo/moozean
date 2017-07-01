class Addfromname < ActiveRecord::Migration[5.1]
  def change
    add_column :inmails, :fromname, :string
  end
end
