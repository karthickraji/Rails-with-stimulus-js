Rails.application.routes.draw do
  namespace :books do
    resource :bulk, controller: :bulk
  end
  resources :books do
    get :list_of_books, on: :collection
  end
  resources :comments
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "books#index"
end
