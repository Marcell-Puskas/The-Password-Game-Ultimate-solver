import { getWordleAnswser } from "./wordle"
import { getMoonEmoji } from "./moon-phase"
import { getCountryName } from "./countries"
import { getChessMove } from "./chess"
import { getDigitsText } from "./digits"
import { getElementsFromInput, getRequiredElementSymbols } from "./periodic-table"
import { getYtUrls } from "./yt-url"
import { getFreeLetters } from "./free-letters"



const multiInput = document.getElementById("multi-input") as HTMLInputElement

async function setInitialPaste() {
    let wordleAnswer = await getWordleAnswser()
    let moonEmoji = getMoonEmoji()

    const wordleElements = document.querySelectorAll(".wordle");
    const moonEmojiElements = document.querySelectorAll(".moon-emoji");
    
    wordleElements.forEach((element) => element.textContent = wordleAnswer)
    moonEmojiElements.forEach((element) => element.textContent = moonEmoji)
}
setInitialPaste()



function setCountryName() {
    getCountryName().then((result) => {
        const countryResult = document.getElementById("country-result");
        const countryInfo = document.getElementById("country-result-info");
        if (!countryResult || !countryInfo) throw new ReferenceError("country selector(s) failed")
        countryResult.textContent = result.country;
        countryInfo.textContent = result.info;
    })
}
const countryPaste = document.getElementById("countrypaste")
if (countryPaste) countryPaste.addEventListener("click", setCountryName)



function setChessMove() {
    getChessMove().then((result) => {
        const chessResult = document.getElementById("chess-result")
        const chessInfo = document.getElementById("chess-result-info")
        if (!chessResult || !chessInfo) throw new ReferenceError("chess selector(s) failed")
        chessResult.textContent = result.move;
        chessInfo.textContent = result.info;
    })
}
const chesspaste = document.getElementById("chesspaste")
if (chesspaste) chesspaste.addEventListener("click", setChessMove)



function setDigitsText() {
    if (multiInput instanceof HTMLInputElement == false) return;
    const result = getDigitsText(multiInput.value)
    const digitsResult = document.getElementById("digits-results")
    if (digitsResult) digitsResult.textContent = result
}
setDigitsText()
if (multiInput) multiInput.addEventListener("input", setDigitsText)



function countElements() {
    if (multiInput instanceof HTMLInputElement == false) return;
    const text = multiInput.value

    let { elements, sum } = getElementsFromInput(text)

    let tbody = ""
    elements.forEach(element => {
        tbody += `<tr><td>${element.symbol}</td><td>${element.num}</td></tr>`
    });

    const elementsResults = document.getElementById("elements-results");
    const elementsTotal = document.getElementById("elements-total");
    const requiredElementInfo = document.getElementById("required-elements-info");
    const requiredElementResults = document.getElementById("required-elements-results");
    if (!elementsResults || !elementsTotal || !requiredElementInfo || !requiredElementResults)
        throw new ReferenceError("elements-add selector failed");

    elementsResults.innerHTML = tbody;
    elementsTotal.textContent = sum.toString()

    const requiredElements = getRequiredElementSymbols(sum)

    if (requiredElements.length > 0) {
        requiredElementInfo.textContent = "Required elements: "
        requiredElementResults.textContent = requiredElements.join("");
    }

    else {
        requiredElementInfo.textContent = 200-sum ? "Present elements sum exceeds 200" : "No additional elements required";
        requiredElementResults.textContent = "";
    }
}
countElements()
if (multiInput) multiInput.addEventListener("input", countElements);



const ytMinutes = document.getElementById("yt-minutes") as HTMLInputElement
const ytSeconds = document.getElementById("yt-seconds") as HTMLInputElement
const ytElements = document.getElementById("yt-elements") as HTMLInputElement
const ytResults = document.getElementById("yt-result")

function setYtResults() {
    if(!ytMinutes || !ytSeconds || !ytResults || !ytElements) throw new ReferenceError("YT selector(s) failed");

    const minutes = parseInt(ytMinutes.value)
    const seconds = parseInt(ytSeconds.value)

    if(Number.isNaN(minutes) || Number.isNaN(seconds)) {
        ytResults.innerText = "";
        return;
    }

    const ytUrl = getYtUrls(minutes, seconds)
    if(!ytUrl) {
        ytResults.innerText = "No url found.";
        return;
    }

    const showElements = ytElements.checked;

    ytResults.innerText = "youtu.be/"  + ytUrl.url + (showElements ? ytUrl.element : "");
}
setYtResults()
if(ytMinutes && ytSeconds && ytElements) {
    ytMinutes.addEventListener("input", setYtResults)
    ytSeconds.addEventListener("input", setYtResults)
    ytElements.addEventListener("input", setYtResults)
}



function setFreeLetters() {
    const lettersResults = document.getElementById("letters-results")
    if (!lettersResults) throw new ReferenceError("letters-results selector failed");

    const input = multiInput.value
    const freeLetters = getFreeLetters(input)

    lettersResults.innerHTML = "";
    freeLetters.forEach((letter) => {
        lettersResults.innerHTML += `<div class="letter ${letter.free ? "" : "letter-taken"}">${letter.letter.toUpperCase()}<div>`
    })
}
setFreeLetters()
if(multiInput) multiInput.addEventListener("input", setFreeLetters);


const copyButtons = document.querySelectorAll(".copy-button")
copyButtons.forEach((button) => 
    button.addEventListener("click", () => {
        button.classList.toggle("pressed");
        setTimeout(() => button.classList.remove("pressed"), 1000);

        const text = button.parentElement?.innerText;
        if(text) navigator.clipboard.writeText(text);
    })
)