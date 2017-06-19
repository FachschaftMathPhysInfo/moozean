class AddQueueClassic < ActiveRecord::Migration[5.1]
  def self.up
    QC::Setup.create
  end

  def self.down
    QC::Setup.drop
  end
end
