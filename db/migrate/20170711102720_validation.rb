class Validation < ActiveRecord::Migration[5.1]
  def change
      change_column :students, :uniid, :string, :unique => true
    end
end
