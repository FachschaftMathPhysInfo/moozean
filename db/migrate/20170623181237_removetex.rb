class Removetex < ActiveRecord::Migration[5.1]
  def change
    remove_column :reports, :tex
  end
end
