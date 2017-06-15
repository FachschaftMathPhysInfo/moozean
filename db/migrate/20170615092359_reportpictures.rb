class Reportpictures < ActiveRecord::Migration[5.1]
  def change
    add_column :reports, :picture, :binary
  end
end
