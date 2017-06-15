class Typeid < ActiveRecord::Migration[5.1]
  def change
    rename_column :reports, :type_id, :typ_id
  end
end
