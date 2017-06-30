class Printout < ApplicationRecord
  belongs_to :report
  belongs_to :folderseries
  belongs_to :examinator
end
