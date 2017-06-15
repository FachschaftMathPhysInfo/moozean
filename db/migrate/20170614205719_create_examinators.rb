class CreateExaminators < ActiveRecord::Migration[5.1]
  def change
    create_table :examinators do |t|
      t.string :givenname
      t.string :surname

      t.timestamps
    end
  end
end
