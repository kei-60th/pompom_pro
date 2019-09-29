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












  function buildPost(post){

    var html = `
    <div class='row'>
      <div class='col s12 m6'>
        <div class='card blue-grey darken-1'>
          <div class='card-content white-text'>
            <span class='card-title'>${post.year} 年 ${post.month} 月 ${post.day} 日 の積み上げ</span>
            <p>学習時間:${post.time}分</p>
            <p>完了したタスク:</p>
            <p>${post.body}</p>
          </div>
          <div class='card-action'>
            <a href="#">編集</a>
            <a href="#">削除</a>
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
  });

  $('#new_post').on('submit',function(e){
    e.preventDefault();
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
      classList1.add("hidden")
      classList2.add("hidden")
      classList3.add("hidden")
      classList4.remove("hidden")
      $(".modal-close").prop("disabled", false);
      var html = buildPost(post);
      $("#mypage-function").prepend(html)
    })
  })


});

