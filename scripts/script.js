const HangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const gameModel = document.querySelector(".game-model");
const playagainbtn = document.querySelector(".play-again")
let currentWord ,correctletter,wronguesscount;
const maxGuesses=6;

const resetGame = ()=> {
    correctletter=[];
    wronguesscount=0;
    HangmanImage.src = `images/hangman-${wronguesscount}.svg`
    guessesText.innerText = `${wronguesscount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join(""); 
    gameModel.classList.remove("show");
}

const getRandomWord = () => {
    const { word , hint } = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modeltext = isVictory ? `you found the word:` : `The correct word was:`;
        gameModel.querySelector("img").src = `images/${isVictory?'victory':'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory?'Congrats!':'GameOver!'}`;
        gameModel.querySelector("p").innerHTML = `${modeltext} <b>${currentWord}</b>`;
        gameModel.classList.add("show");

    },300);

}

const initGame = (button,clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index) => {
            if(letter === clickedLetter){
                correctletter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
        });
    } else{
        wronguesscount++;
        HangmanImage.src = `images/hangman-${wronguesscount}.svg`
    }
    button.disabled=true;
    guessesText.innerText = `${wronguesscount} / ${maxGuesses}`;

    if(wronguesscount===maxGuesses) return gameOver(false);
    if(correctletter.length===currentWord.length) return gameOver(true);
}


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
playagainbtn.addEventListener("click",getRandomWord);