module Api
  class IsAboutResource < JSONAPI::Resource
    has_one :report
    has_one :modul
  end
end
