module Api
  class ExaminedByResource < JSONAPI::Resource
    has_one :report
    has_one :examinator
  end
end
