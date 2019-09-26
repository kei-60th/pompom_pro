Rails.application.routes.draw do
  root to: 'tasks#index'
  resources :tasks, only: [:index,:create,:update,:destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :timers, only: [:index]
  resources :posts, only: [:new,:create]
end
