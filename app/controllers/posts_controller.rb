class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    @post.save
    @tasks = Task.where("is_done != false").order('updated_at DESC')
    @tasks.each do |task|
      @endtask = Endtask.create(post_id: @post.id,name: task.name)
      task.delete
    end
    respond_to do |format|
      format.html{redirect_to root_path, notice: '更新しました'}
      format.json
    end
  end

  private

  def post_params
    if user_signed_in?
      current_id = current_user.id
    else
      current_id = 1
    end
    params.permit(:body, :time).merge(
      user_id: current_id
    )
  end


end