document.addEventListener("turbolinks:load", function() {

  function buildTask(task){
    if (task.name){
    var html = `<ul class='collection'>
                  <form class= "edit_task" id = "edit_task_${task.id}"accept-charset=UTF-8 action="/tasks/${task.id}" method=post>
                    <input name="utf8" type="hidden" value="&#x2713;" />
                    <input type="hidden" name="_method" value="patch" />
                    <li class='collection-item' id='row_task_1'>
                      <input id='task_1' type='checkbox'>
                      <label for='task_1'>
                        <input type="submit" name="deleteTask" value=${task.name} class="edit-task serch-${task.id}" data-disable-with=${task.name} data-task-id=${task.id} />
                      </label>
                      <label class='delete' for='task_1'>
                        <input type="submit" name="deleteTask" value="delete" class="deleteTask" data-disable-with="delete" data-task-id=${task.id} />
                      </label>
                    </li>
                </form></ul>`
    }
    else{
    var html = ``
    }
    return html;
  }

  $('#new_task').on('submit',function(e){
    e.preventDefault();
    var fd = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: fd,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(task){
      var html = buildTask(task);
      $("#unfinished-tasks").append(html)
      var parent = document.querySelector("#unfinished-tasks").lastChild
      $(parent).css({
        'left': '-200px'
      })
      $(parent).animate({
        'left': '0px'
      },800);
      $('.form-control').val('')
    })
    .fail(function(){
      alert('タスク名を入力してください');
    })
  });

  $(document).on("click", ".edit-task", function (e) {
    e.preventDefault();
    var taskId=$(this).data("taskId");
    var deleteTask=$(this).val();
    $.ajax({
      url: `/tasks/${taskId}`,
      type: 'patch',
      dataType: 'json',
      data: {deleteTask: deleteTask}
    })
    .done(function(task){
      var html = buildTask(task);
      var deleteChild = document.querySelector(`#edit_task_${taskId}`)
      deleteContent = $(deleteChild).parent()
      deleteContent.remove()
      if (task.isDone){
        $("#finished-tasks").append(html);
        var element = document.getElementsByClassName(`serch-${task.id}`)
        $(element).addClass("edit-finished-task")
        var parent = document.querySelector("#finished-tasks").lastChild
        $(parent).css({
          'left': '-200px'
        })
        $(parent).animate({
          'left': '0px'
        },800);
      }
      else {
        $("#unfinished-tasks").append(html);
        var element = document.getElementsByClassName(`serch-${task.id}`)
        $(element).removeClass("edit-finished-task")
        var parent = document.querySelector("#unfinished-tasks").lastChild
        $(parent).css({
          'left': '-200px'
        })
        $(parent).animate({
          'left': '0px'
        },800);
      }
    })
  })

  $(document).on("click", ".deleteTask", function (e) {
    e.preventDefault();
    var taskId=$(this).data("taskId");
    var deleteTask=$(this).val();
    $.ajax({
      url: `/tasks/${taskId}`,
      type: 'patch',
      dataType: 'json',
      data: {deleteTask: deleteTask}
    })
    .done(function(){
      var deleteChild = document.querySelector(`#edit_task_${taskId}`)
      deleteContent = $(deleteChild).parent()
      deleteContent.remove()
    })
  })



});


