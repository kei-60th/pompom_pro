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
      data: {
        time:timeSum,
        body:textContent.value
      },
    })
  })


});


