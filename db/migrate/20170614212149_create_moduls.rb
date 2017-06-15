class CreateModuls < ActiveRecord::Migration[5.1]
  def change
    create_table :moduls do |t|
      t.string :name
      t.string :abbreviation
      t.string :link_modulhandbuch

      t.timestamps
    end
  end
end
