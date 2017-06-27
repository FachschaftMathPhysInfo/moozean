class Inmail < ApplicationRecord
   has_many :attachments, dependent: :destroy
end
