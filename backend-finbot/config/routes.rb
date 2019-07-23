Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :assets
  resources :plans
  resources :asset_types

  post '/login', to: 'users#login'
end
