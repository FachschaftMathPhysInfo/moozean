class AddInMailRead < ActiveRecord::Migration[5.1]
  def change
    add_column :inmails, :read, :boolean
  end
end
