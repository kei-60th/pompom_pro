document.addEventListener("turbolinks:load", function() {

  (function(){
    'use strict';

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset= document.getElementById('reset');
    var start = document.getElementById('start');
    var timerId;
    var isRunning = false;



    var startTime;
    var timeLeft;
    var timeCount;
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
          console.log(timeCount);
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
    document.getElementById("start").onclick = function(){
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

    };

    document.getElementById("min").onclick = function(){
      if (isRunning === true){
        return;
      }
      timeToCountDown += 60 * 1000;
      if (timeToCountDown >= 60 * 60 * 1000){
        timeToCountDown = 0;
      }
      updateTimer(timeToCountDown);
    }

    document.getElementById("sec").onclick = function(){
      if (isRunning === true){
        return;
      }
      timeToCountDown += 1000;
      if (timeToCountDown >= 60 * 60 * 1000){
        timeToCountDown = 0;
      }
      updateTimer(timeToCountDown);
    }

    document.getElementById("set").onclick = function(){
      if (isRunning === true){
        return;
      }
      min = parseInt(document.getElementById('min').value);
      timeToCountDown = min * 60 * 1000;
      if (timeToCountDown >= 60 * 60 * 1000){
        timeToCountDown = 0;
      }
      updateTimer(timeToCountDown);
    }

    document.getElementById("reset").onclick = function(){
      timeToCountDown = 0;
      updateTimer(timeToCountDown);
    }
    Push.Permission.request();

  })();


  $(document).ready(function(){
    $('select').formSelect();
  });


});