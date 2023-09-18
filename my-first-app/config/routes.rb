Rails.application.routes.draw do
  resources :bloggers
  resources :blogs
  resources :publishers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  match '(:anything)' => 'application#nothing', via: [:options]

  root "articles#index"
  get "/articles", to: "articles#index"
  get "/articles/new", to: "articles#new"
  post "/articles", to: "articles#create"
  get "/articles/:id/asheesh", to: "articles#asheesh_show", as: 'asheesh_article'
  get "/articles/:id/edit", to: "articles#edit", as: 'edit_article'
  put "/articles/:id", to: "articles#update"
  delete "/articles/:id/destroy", to: "articles#destroy", as: 'destroy_article'

  post "articles/:article_id/comments", to: "comments#create"
  get "articles/:article_id/comments", to: "comments#index"
  put "articles/:article_id/comments/:id", to: "comments#update"
  delete "articles/:article_id/comments/:id", to: "comments#destroy"

  get "/statuses", to: "statuses#index"

end
