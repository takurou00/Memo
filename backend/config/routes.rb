Rails.application.routes.draw do
  get "tasks" => "tasks#index"
  post "tasks" => "tasks#create"
  delete "tasks/:id" => "tasks#destroy"
  put "tasks/:id" => "tasks#update"
end
