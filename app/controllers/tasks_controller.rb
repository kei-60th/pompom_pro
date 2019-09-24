class TasksController < ApplicationController

  def index
    @task = Task.new
    @tasks = Task.order('updated_at DESC')
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to root_path
    else
      render :index
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
