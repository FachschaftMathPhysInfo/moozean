class Removepdf < ActiveRecord::Migration[5.1]
  def change
    remove_column :reports, :pdf
  end
end
