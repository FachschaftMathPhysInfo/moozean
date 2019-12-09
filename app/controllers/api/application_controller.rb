module Api
  class ApplicationController < ActionController::API
    include JSONAPI::ActsAsResourceController
  end
end
