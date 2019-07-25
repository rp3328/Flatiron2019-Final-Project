Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :assets
  resources :plans
  resources :asset_types

  post '/login', to: 'users#login'
  get '/users/:id/getValue', to: 'users#get_value', as: 'user_id'

  post '/get_access_token', to: 'users#get_token'
end
