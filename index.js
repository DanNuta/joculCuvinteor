import { q } from "./data.js";

const startGame = document.querySelector("[data-start-game]");
const game = document.querySelector("[data-game]");
const time = game.querySelector("p");
const stopTime = game.querySelector("[data-stop-time]");
const timerStopTime = game.querySelector("[data-stop-time-p]");
const question = game.querySelector("[data-question]");
const cereLitera = game.querySelector("[data-cere-litera]");
const price = game.querySelector("[data-price]");
const totalPrice = game.querySelector("[data-total-price]");

let totalTime;
let stopGameTime;
let counterStopTime;
let dataset;
let index = 0;
let word = [];
let priceLetter;
let randomLetter = [];
let total;
let stopT;

startGame.addEventListener("click", startGameFn);
stopTime.addEventListener("click", stopTimeFn);
cereLitera.addEventListener("click", cereLiteraFn);




function cereLiteraFn(){
    const corectAnwer = q[index].answer;
    const anwerArr = corectAnwer.split("")
    const datasetInput = game.querySelectorAll("[data-id]");
    
    let randomNumber = Math.floor(Math.random()* corectAnwer.length);

    if(randomLetter.includes(randomNumber)){
        randomNumber = Math.floor(Math.random()* corectAnwer.length)
    }else{
        randomLetter.push(randomNumber)
    }

    priceLetter = priceLetter - 100;
    price.innerText = priceLetter;

    datasetInput.forEach(item => {
        item.dataset.id == randomNumber ? item.value = anwerArr[randomNumber] : "";
    })

    dataset = randomNumber;
    word[randomNumber] = anwerArr[randomNumber];

    const checkArray = word.every(item => {
        return item !== "";
    })
    if(checkArray){
        submit()
    }
}

function startGameFn(){
    totalTime = 180;
    stopGameTime = false;
    total = 0;
    stopT = false;
    startGame.classList.add("hide");
    game.classList.remove("hide");
    getData()
    questionFn()
}

setInterval(getData, 1000);


function counterTimeStop(){
    if(counterStopTime === 0){
       return nextQuestion();
    };

    counterStopTime--;

    const p = document.querySelector("[data-item]");
    const dataTime = new Date(1000*counterStopTime);
    const seconds = dataTime.getSeconds();
    p.innerHTML = `${seconds}`;
}



function getData(){
    if(stopGameTime) return
    if(totalTime === 0){
        return nextQuestion();
    };

    totalTime--;

    const dataTime = new Date(1000*totalTime);
    const minutes = dataTime.getMinutes();
    const seconds = dataTime.getSeconds();
    time.innerHTML = `${minutes} - ${seconds}`;
}



function stopTimeFn(){
    stopT = true;
    stopTime.classList.add("hide");
    cereLitera.classList.add("hide");
    stopGameTime = true;
    counterStopTime = 30;
    const p = document.createElement("p");
    p.dataset.item = true;
    timerStopTime.appendChild(p);
    counterTimeStop()
    
    setInterval(counterTimeStop, 1000);

    const inputTime = game.querySelectorAll("[data-id]");
    inputTime.forEach(item => {
        item.style.setProperty("--type", "auto");
    })
    inputTime[0].focus();
}

function questionFn(){
    const ques = question.querySelector("h1");
    const answer = q[index].answer;
    const inputConatainer = document.createElement("div");
    inputConatainer.dataset.input = true;
    priceLetter = q[index].price;

    ques.innerText = q[index].question;
    price.innerText = q[index].price;



    for(let i = 0; i < answer.length; i++){
        const input = document.createElement("input");
        input.classList.add("input_key")
        inputConatainer.append(input);
        input.dataset.id = i;
        input.style.setProperty("--type", "none");
        input.classList.add("input");
        input.maxLength = "1";
        input.addEventListener("keyup", enterKey)
        word[i] = "";
    }
    question.appendChild(inputConatainer)
}




function enterKey(e){
    if(!stopT) return
    const value = e.key.toUpperCase();
    const target = e.target;
    const dataset = target.dataset.id;
    const next = target.nextElementSibling;
    const prev = target.previousElementSibling;

    const key = ["BACKSPACE", "ARROWLEFT", "ARROWRIGHT"];

    if(value.length > 0 || e.key === "ArrowRight"){


        !key.includes(value) && (word[dataset] = value);
         if(next){
             next.focus()
        }else{
            submit()
        }
    }

    if(e.key === "Backspace"){
        if(prev) prev.focus();
        word[dataset] = "";
    }

    if(e.key === "ArrowLeft" && prev){
        prev.focus();
    }

const checkArray = word.every(item => {
    return item !== "";
})

if(checkArray){
    submit()
}

}



function submit(){
    const dataWord = word.join("");

    if(dataWord === q[index].answer){
        stopGameTime = true;
        winLetter();

    }else{
        const itemValue = game.querySelectorAll("[data-id]");
        itemValue.forEach((item, i) => {
            item.value = "";
            word[i] = ""
        })

        itemValue[0].focus()
        
    }
}



function nextQuestion(){
    stopT = false;
    const input = game.querySelector("[data-input]");
    const anwer = q[index].price;
    cereLitera.classList.remove("hide");
    stopTime.classList.remove("hide")
    stopGameTime = false
    total = total + anwer;
    counterStopTime = 30;
 
    while(input.firstChild){
     input.removeChild(input.firstChild)
    }
 
    const timeCounter = game.querySelector("[data-item]").remove();
 
 
    totalPrice.innerText = `Total: ${total}`;
 
     index++;
     stopGameTime = false;
     total = 0;
     stopT = false;
     startGame.classList.add("hide");
     game.classList.remove("hide");
     getData()
     questionFn()
    
}



function winLetter(){
   const input = game.querySelector("[data-input]");
   const anwer = q[index].price;
   cereLitera.classList.remove("hide");
   stopTime.classList.remove("hide")
   stopGameTime = false
   total = total + anwer;
   counterStopTime = 30;

   while(input.firstChild){
    input.removeChild(input.firstChild)
   }

   const timeCounter = game.querySelector("[data-item]").remove();


   totalPrice.innerText = `Total: ${total}`;

    index++;
    stopGameTime = false;
    total = 0;
    stopT = false;
    startGame.classList.add("hide");
    game.classList.remove("hide");
    getData()
    questionFn()
}