class TimersController < ApplicationController

  def index
    @tasks = Task.where("is_done != 1").order('updated_at DESC')
    @endtasks = Task.where("is_done = 1").order('updated_at DESC')
    @post = Post.new
  end
  
end
