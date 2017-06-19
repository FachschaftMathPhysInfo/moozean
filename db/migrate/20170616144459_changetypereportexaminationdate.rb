class Changetypereportexaminationdate < ActiveRecord::Migration[5.1]
  def change
    change_column :reports, :examination_date, :datetime
  end
end
