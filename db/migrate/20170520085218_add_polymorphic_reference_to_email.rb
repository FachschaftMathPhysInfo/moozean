class AddPolymorphicReferenceToEmail < ActiveRecord::Migration[5.0]
  def change
    add_reference :emails, :referencable, polymorphic: true
  end
end
