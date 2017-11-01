class Inmail < ApplicationRecord
   has_many :attachments, dependent: :destroy
   has_many :emails, as: :referencable
end
