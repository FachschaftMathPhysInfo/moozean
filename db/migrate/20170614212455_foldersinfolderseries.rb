class Foldersinfolderseries < ActiveRecord::Migration[5.1]
  def change
      add_reference :folders, :folderseries
      remove_column :folders, :content
      remove_column :folders, :obligation_to_report
      add_column :folders, :suffix, :string
  end
end
