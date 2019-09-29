document.addEventListener("turbolinks:load", function() {
  var tmp = document.getElementById('create-task-function'),classList1 = tmp.classList;
  var tmp = document.getElementById('task-list-function'),classList2 = tmp.classList;
  var tmp = document.getElementById('timer-function'),classList3 = tmp.classList;
  var tmp = document.getElementById('mypage-function'),classList4 = tmp.classList;

  $('.task-page').on('click',function(){
    classList1.remove("hidden")
    classList2.remove("hidden")
    classList3.add("hidden")
    classList4.add("hidden")
  });

  $('.timer-page').on('click',function(){
    classList1.add("hidden")
    classList2.remove("hidden")
    classList3.remove("hidden")
    classList4.add("hidden")
  });

  $('.mypage').on('click',function(){
    classList1.add("hidden")
    classList2.add("hidden")
    classList3.add("hidden")
    classList4.remove("hidden")
  });
















});