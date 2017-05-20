class Email < ApplicationRecord
  belongs_to :referencable, :polymorphic => true
end
