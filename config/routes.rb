Rails.application.routes.draw do
  devise_for :users
  root to: 'tasks#index'
  resources :tasks, only: [:index,:create,:update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :timers, only: [:index]
  resources :posts, only: [:index,:create]
end
