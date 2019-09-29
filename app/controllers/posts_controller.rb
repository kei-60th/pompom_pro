class PostsController < ApplicationController

  def index
    @posts = Post.all.order("id DESC")
  end

  def create
    @post = Post.new(post_params)
    @post.save
    @tasks = Task.where("is_done != false").order('updated_at DESC')
    @tasks.each do |task|
      @endtask = Endtask.create(post_id: @post.id,name: task.name)
      task.delete
    end
    redirect_to root_path
  end




  private

  def post_params
    params.permit(:body, :time)
  end


end