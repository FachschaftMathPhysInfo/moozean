module Api
  class IsInResource < JSONAPI::Resource
    has_one :report
    has_one :folderseries
  end
end
