class Renameexaminationdate < ActiveRecord::Migration[5.1]
  def change
    rename_column :reports, :examination_date, :examination_at
  end
end
