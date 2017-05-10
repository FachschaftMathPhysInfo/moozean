Rails.application.routes.draw do
  #resources :folders
  jsonapi_resources :folders
  jsonapi_resources :students
  jsonapi_resources :lents
  jsonapi_resources :returneds
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount_ember_app :frontend, to: "/"
end
