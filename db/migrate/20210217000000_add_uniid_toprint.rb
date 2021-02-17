class AddUniidToprint < ActiveRecord::Migration[5.1]
    def change
      add_column :printoutfolders, :uniid, :string
      add_column :printouts, :uniid, :string
    end
  end