class TasksController < ApplicationController

  def index
    @task = Task.new
    @tasks = Task.where("is_done != 1").order('updated_at DESC')
    @endtasks = Task.where("is_done = 1").order('updated_at DESC')
    @post = Post.new
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to root_path
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
      if @task.update(task_params)
        redirect_to root_path
      end
      else
        @task.delete
        redirect_to root_path
      end
  end


  private
  # Never trust parameters from the scary internet, only allow the white list through.
  def task_params
    params.fetch(:task, {}).permit(
        :name, :is_done
    )
  end
end
