class ExaminedBy < ApplicationRecord
  belongs_to :report
  belongs_to :examinator
end
