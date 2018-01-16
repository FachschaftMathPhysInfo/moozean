class RemoveUniquenessMail < ActiveRecord::Migration[5.1]
  def change
    change_column :inmails, :uid, :string, unique: false
    remove_index :inmails, :uid
  end
end
