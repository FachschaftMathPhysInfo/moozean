class Report < ApplicationRecord
  belongs_to :subject
  belongs_to :type
end
