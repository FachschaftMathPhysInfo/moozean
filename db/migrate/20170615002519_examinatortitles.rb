class Examinatortitles < ActiveRecord::Migration[5.1]
  def change
    add_column :examinators, :title, :string
  end
end
