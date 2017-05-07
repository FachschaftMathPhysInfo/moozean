class CreateStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students do |t|
      t.string :name
      t.string :uniid
      t.string :matriculationnumber
      t.boolean :refund
      t.boolean :report
      t.string :comment

      t.timestamps
    end
  end
end
