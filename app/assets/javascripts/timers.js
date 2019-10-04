document.addEventListener("turbolinks:load", function() {

    'use strict';

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');
    var timerId;
    var isRunning = false;
    var result;
    var totalTimeContent;
    var tmp = document.getElementById('create-task-function'),classList1 = tmp.classList;
    var tmp = document.getElementById('task-list-function'),classList2 = tmp.classList;
    var tmp = document.getElementById('timer-function'),classList3 = tmp.classList;
    var tmp = document.getElementById('mypage-function'),classList4 = tmp.classList;



    var startTime;
    var timeLeft;
    var timeCount;
    var timeSum = 0;
    var timeToCountDown = 0;

    function updateTimer(t){
      var d = new Date(t);
      var m = d.getMinutes();
      var s = d.getSeconds();
      var ms = d.getMilliseconds();
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      ms = ('00' + ms).slice(-3);
      timer.textContent = m + ':' + s;

    }



    function countDown(){
      timerId = setTimeout(function(){
        timeLeft = timeToCountDown - (Date.now()- startTime);
        timeCount = Date.now()- startTime;
        //console.log(timeLeft);
        if (timeLeft < 0 && isRunning === true){
          isRunning = false;
          start.textContent= 'Start';
          clearTimeout(timerId);
          Push.create('終了だよ!');
          timeSum += Math.round(timeCount / 60000);
          console.log(timeSum);
          timeCount = 0;
          timeLeft = 0;
          timeToCountDown = 0;
          updateTimer(timeLeft);
          return;
        }
        updateTimer(timeLeft);
        countDown();
      },10);
      //setTimeout:次の処理を10ミリ秒後に実行しなさい
    }
    $("#start").on("click",function(){
      if (timeToCountDown === 0){
        return;
      }
      if(isRunning === false){
        isRunning = true;
        start.textContent = "Stop";
        startTime = Date.now();
        countDown();
      }else{
        isRunning = false;
        start.textContent = 'Start';
        timeToCountDown = timeLeft;
        clearTimeout(timerId);
      }

    });

    $("#sec").on("click",function(){
      if (isRunning === true){
        return;
      }
      timeToCountDown += 1000;
      if (timeToCountDown >= 60 * 60 * 1000){
        timeToCountDown = 0;
      }
      updateTimer(timeToCountDown);
    });

    $("#set").on("click",function(){
      if (isRunning === true){
        return;
      }
      min = parseInt(document.getElementById('min').value);
      timeToCountDown = min * 60 * 1000;
      if (timeToCountDown >= 60 * 60 * 1000){
        timeToCountDown = 0;
      }
      updateTimer(timeToCountDown);
      timeCount = 0;
    });

    $("#reset").on("click",function(){
      if (isRunning === true){
        return;
      }
      timeToCountDown = 0;
      timeCount = 0;
      updateTimer(timeToCountDown);
    });
    Push.Permission.request();

  $(document).ready(function(){
    $('select').formSelect();
  });












  function buildPost(post,array){
    if (post.time >= 60){
      if (post.time % 60 === 0){
        var timeText = `学習時間: ${post.time / 60} 時間`
      }
      else{
        var timeText = `学習時間: ${(Math.floor(post.time / 60))} 時間 ${post.time % 60} 分`
      }
    }
    else{
      var timeText = `学習時間: ${post.time} 分`
    }
    var html = `
    <div class='row'>
      <div class='col s12 m6'>
        <div class='card pink darken-3'>
          <div class='card-content white-text'>
            <span class='card-title'>${post.year} 年 ${post.month} 月 ${post.day} 日 の積み上げ</span>
            <p>${timeText}</p>
            <p>完了したタスク:${array}</p>
            <p>${post.body}</p>
          </div>
        </div>
      </div>
    </div>
    `
    return html;
  }


  $(document).ready(function(){
    $('.modal').modal();
  });

  $(".modal-trigger").on("click",function(){
    console.log("played")
    var taskList = document.querySelectorAll(".edit-finished-task")
    var taskNames = []
    taskList.forEach(function(el){
      taskNames.push($(el).val())
    });
    if(timeSum >= 60){
      if(timeSum % 60 == 0){
        result = `${timeSum / 60}時間`
      }
      else{
        result = `${Math.floor( timeSum / 60 ) }時間${timeSum % 60}分`
      }
    }
    else{
      result = `${timeSum}分`
    }
    document.getElementById("totalTime").innerText = `学習時間:${result}`;
    document.getElementById("endtaskList").innerText = `完了したタスク:${taskNames}`;
  });
  $('#new_post').on('submit',function(e){
    e.preventDefault();
    var taskList = document.querySelectorAll(".edit-finished-task")
    var textContent = document.getElementById ('post_body'); 
    $.ajax({
      url: "/posts",
      type: "POST",
      dataType: 'json',
      data: {
        time:timeSum,
        body:textContent.value
      },
    })
    .done(function(post){
      var taskIds = []
      taskList.forEach(function(el){
        taskIds.push($(el).data("taskId"))
      });
      var array = [];
      post.endTasks.forEach(function(el){
        array.push(el.name)
      });
      classList1.add("hidden")
      classList2.add("hidden")
      classList3.add("hidden")
      classList4.remove("hidden")
      $(".modal-close").prop("disabled", false);
      var html = buildPost(post,array);
      $("#mypage-function").prepend(html)
      taskIds.forEach(function(el){
        var deleteChild =document.querySelector(`#edit_task_${el}`)
        var deleteContent = $(deleteChild).parent()
        deleteContent.remove()
        timeSum = 0;
      });
    })
  })
});
