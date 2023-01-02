import { q } from "./data.js";

const startGame = document.querySelector("[data-start-game]");
const game = document.querySelector("[data-game]");
const time = game.querySelector("p");
const stopTime = game.querySelector("[data-stop-time]");
const timerStopTime = game.querySelector("[data-stop-time-p]");
const question = game.querySelector("[data-question]");
const cereLitera = game.querySelector("[data-cere-litera]");

let totalTime;
let stopGameTime;
let counterStopTime;
let dataset;
let index = 0;

startGame.addEventListener("click", startGameFn);
stopTime.addEventListener("click", stopTimeFn);
cereLitera.addEventListener("click", cereLiteraFn);




function cereLiteraFn(){
    const corectAnwer = q[index].answer;
    const anwerArr = corectAnwer.split("")
    const randomNumber = Math.floor(Math.random()* corectAnwer.length);
    dataset = randomNumber;
}

function startGameFn(){
    totalTime = 180;
    stopGameTime = false;
    startGame.classList.add("hide");
    game.classList.remove("hide");
    getData()
    questionFn()
}

setInterval(getData, 1000);


function counterTimeStop(){
    if(counterStopTime === 0) return;
    counterStopTime--;

    const p = document.querySelector("[data-item]")
    const dataTime = new Date(1000*counterStopTime);
    const seconds = dataTime.getSeconds();
    p.innerHTML = `${seconds}`;
}



function getData(){
    if(stopGameTime) return
    if(totalTime === 0) return;
    totalTime--;

    const dataTime = new Date(1000*totalTime);
    const minutes = dataTime.getMinutes();
    const seconds = dataTime.getSeconds();
    time.innerHTML = `${minutes} - ${seconds}`;
}



function stopTimeFn(){
    stopTime.classList.add("hide");
    cereLitera.classList.add("hide");
    stopGameTime = true;
    counterStopTime = 30;
    const p = document.createElement("p");
    p.dataset.item = true;
    timerStopTime.appendChild(p);
    counterTimeStop()
    setInterval(counterTimeStop, 1000);
}

function questionFn(){
    const ques = question.querySelector("h1");
    const answer = q[index].answer;
    ques.innerText = q[index].question;
    const inputConatainer = document.createElement("div");

    for(let i = 0; i < answer.length; i++){
        const input = document.createElement("input");
        input.classList.add("input_key")
        inputConatainer.append(input);
        input.dataset.id = i;
        input.maxLength = "1";
        input.addEventListener("keyup", enterKey)
    }
    question.appendChild(inputConatainer)
}


let word = [];

function enterKey(e){
    const value = e.key;
    const target = e.target;
    const next = target.nextElementSibling;
    const prev = target.previousElementSibling;


    if(value.length > 0){
         if(next){
             word.push(value)
             next.focus()
        }else{
            submit()
        }

    if(value === "Backspace"){
        if(prev) prev.focus();
        word.pop()
    }
}
}



function submit(){
    const dataWord = word.join("");

    if(dataWord === q[index].answer){
        stopGameTime = true;
        console.log("corest")

    }else{
    }
}















// function showCountdown(countSeconds){  
//    var countStatus = new Date(1000 * countSeconds).toISOString().substr(11, 8);
//    document.getElementById('output').innerHTML = "Count: " + countStatus;

//    const data = new Date(1000*179);
//    //console.log(data)
//    console.log(data.getSeconds(), data.getMinutes())

// }
// var count = 180;

// function countdown() {
//   if (count === 0) return;

//   count--;
//   setTimeout(countdown, 1000);
//   showCountdown(count);
  
// };

// countdown();
