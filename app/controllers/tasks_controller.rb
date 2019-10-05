class TasksController < ApplicationController

  def index
    @task = Task.new
    if user_signed_in?
      @tasks = Task.where("is_done != 1 AND user_id = #{current_user.id}")
      @endtasks = Task.where("is_done = 1 AND user_id = #{current_user.id}")
    else
      @tasks = Task.where("is_done != 1 AND user_id = 1")
      @endtasks = Task.where("is_done = 1 AND user_id = 1")
    end
    @post = Post.new
    if user_signed_in?
      current_id = current_user.id
    else
      current_id = 1
    end
    @posts = Post.where("user_id = #{current_id}").order("id DESC")
  end

  def create
    @task = Task.new(task_params)
    authenticity_token = params[:authenticity_token]
    if @task.save
      respond_to do |format|
        format.html{redirect_to root_path, notice: 'メッセージが送信されました'}
        format.json
      end
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.is_done? 
      @task.is_done = 0
    else
      @task.is_done = 1
    end
    unless params.require(:test)=="delete"
      @task.update(task_params)
    else
      @task.delete
    end
    respond_to do |format|
      format.html{redirect_to root_path, notice: '更新しました'}
      format.json
    end
  end


  private
  # Never trust parameters from the scary internet, only allow the white list through.
  def task_params
    if user_signed_in?
      current_id = current_user.id
    else
      current_id = 1
    end
    params.fetch(:task, {}).permit(
        :name, :is_done
    ).merge(
      user_id: current_id
    )
  end

end
