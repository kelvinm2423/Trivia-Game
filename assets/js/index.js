var myVar;

//start timer and setting the timer

function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}

function myTimer() {
  if (timelimit > 0) {
    min=Math.floor(timelimit/60);
    sec=timelimit%60;
    if (min!=0) { time=min+" minutes and "+sec+" seconds left"; }
              else { time=sec+" seconds left"; }
    $_('timeleft').innerHTML = time;
  } else {
    $_('timeleft').innerHTML = timelimit+' - Out of Time - no credit given for answer';
    clearInterval(myVar);
  }
  timelimit--;
}


//source of questions and answers for quiz

var pos = 0, posn, choice, correct = 0, rscore = 0;
var maxtimelimit = 20, timelimit = maxtimelimit; 

var questions = [
    [ "In the state of Florida, which college is the greatest?", "Florida State University", "University of Florida", "University of Miami", "B" ],
    [ "Who won the last Superbowl?", "Cleveland Brown", "Atlanta Falcons", "New England Patriots", "C" ],
    [ "What team does Lionel Messi play for?", "Barcelona", "Real Madrid", "Arsenal", "A" ],
    [ "Who won the baseball world series in 2016?", "New York Yankees", "Cleveland Indians", "Chicago Cubs", "C" ],
];

var questionOrder = [];

function setQuestionOrder() {
  questionOrder.length = 0;
  for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
  questionOrder.sort(randOrd);   // alert(questionOrder);  // shuffle display order
  pos = 0;  posn = questionOrder[pos];
}

function $_(IDS) { return document.getElementById(IDS); }
function randOrd() { return (Math.round(Math.random())-0.5); }
function renderResults(){
  var test = $_("test");
  test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
  $_("test_status").innerHTML = "Test Completed";
  $_('timeleft').innerHTML = '';
  test.innerHTML += '<button onclick="location.reload()">Re-test</a> ';
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;
}

// a questions will form
function renderQuestion() {
  var test = $_("test");
  $_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  if (rscore != 0) { $_("test_status").innerHTML += '<br>Currently: '+(correct/rscore*100).toFixed(0)+'% correct'; }
  var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  test.innerHTML = "<h3>"+question+"</h3>";
  test.innerHTML += "<label><input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='C'> "+chC+"</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}


//This is where they will check the answer and add a score
function checkAnswer(){
  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) { choice = choices[i].value; }
  }
  rscore++;
  if (choice == questions[posn][4] && timelimit > 0) { correct++; }
  pos++;  posn = questionOrder[pos];
  if (pos < questions.length) { renderQuestion(); } else { renderResults(); }
}

window.onload = function() {
  setQuestionOrder();
  renderQuestion();
}