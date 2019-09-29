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
                        <input type="submit" name="test" value=${task.name} class="aiueo" data-disable-with=${task.name} data-task-id=${task.id} />
                      </label>
                      <label class='delete' for='task_1'>
                        <input type="submit" name="test" value="delete" class="test" data-disable-with="delete" data-task-id=${task.id} />
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
      $('.form-control').val('')
    })
    .fail(function(){
      alert('タスク名を入力してください');
    })
  });

  $(document).on("click", ".aiueo", function (e) {
    e.preventDefault();
    var taskId=$(this).data("taskId");
    var test=$(this).val();
    $.ajax({
      url: `/tasks/${taskId}`,
      type: 'patch',
      dataType: 'json',
      data: {test: test}
    })
    .done(function(task){
      var html = buildTask(task);
      var deleteChild = document.querySelector(`#edit_task_${taskId}`)
      deleteContent = $(deleteChild).parent()
      deleteContent.remove()
      if (task.isDone){
        $("#finished-tasks").append(html);
      }
      else {
        $("#unfinished-tasks").append(html);
      }
    })
  })

  $(document).on("click", ".test", function (e) {
    e.preventDefault();
    var taskId=$(this).data("taskId");
    var test=$(this).val();
    $.ajax({
      url: `/tasks/${taskId}`,
      type: 'patch',
      dataType: 'json',
      data: {test: test}
    })
    .done(function(){
      var deleteChild = document.querySelector(`#edit_task_${taskId}`)
      deleteContent = $(deleteChild).parent()
      deleteContent.remove()
    })
  })



});


