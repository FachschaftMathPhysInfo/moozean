class UpdateQueueClassic300 < ActiveRecord::Migration[5.1]
  def self.up
    QC::Setup.update_to_3_0_0
  end

  def self.down
    QC::Setup.downgrade_from_3_0_0
  end
end
