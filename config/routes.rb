Rails.application.routes.draw do
  #resources :folders
  jsonapi_resources :folders
  jsonapi_resources :students
  jsonapi_resources :lents
  jsonapi_resources :returneds
  jsonapi_resources :emails
  jsonapi_resources :examinators
  jsonapi_resources :subjects
  jsonapi_resources :typs
  jsonapi_resources :reports
  jsonapi_resources :examined_bies
  jsonapi_resources :is_abouts
  jsonapi_resources :moduls
  jsonapi_resources :is_ins
  jsonapi_resources :folderseries
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount_ember_app :frontend, to: "/"
end
