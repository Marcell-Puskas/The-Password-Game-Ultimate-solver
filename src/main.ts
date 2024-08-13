import { getWordleAnswser } from "./wordle"
import { getMoonEmoji } from "./moon-phase"
import { getCountryName } from "./countries"
import { getChessMove } from "./chess"
import { getDigitsText } from "./digits"
import { getElementsFromInput, getRequiredElementSymbols } from "./periodic-table"
import { getYtUrls } from "./yt-url"



async function setInitialPaste() {
    let moonPhase = getMoonEmoji()
    let wordleAnswer = await getWordleAnswser()

    let initialText = `🥚🐛🐛🐛🐛🐛🐛${moonPhase}🏋️‍♂️🏋️‍♂️🏋️‍♂️.......101:00XXXV${wordleAnswer}shellomayiamlovedyoutu.be/EsPt995....`
    const initialPaste = document.getElementById("initial-paste");
    if (initialPaste) initialPaste.innerText = initialText;
}
setInitialPaste()



function setCountryName() {
    getCountryName().then((result) => {
        const countryElement = document.getElementById("country-name");
        if (countryElement) countryElement.textContent = result;
    })
}
const countryPaste = document.getElementById("countrypaste")
if (countryPaste) countryPaste.addEventListener("click", setCountryName)



function setChessMove() {
    getChessMove().then((result) => {
        const moveElement = document.getElementById("chess-move")
        if (moveElement) moveElement.textContent = result;
    })
}
const chesspaste = document.getElementById("chesspaste")
if (chesspaste) chesspaste.addEventListener("click", setChessMove)



const digitsInput = document.getElementById("digits-input")
function setDigitsText() {
    if (digitsInput instanceof HTMLInputElement == false) return;
    const result = getDigitsText(digitsInput.value)
    const digitsResult = document.getElementById("digits-results")
    if (digitsResult) digitsResult.textContent = result
}
if (digitsInput) digitsInput.addEventListener("input", setDigitsText)



function countElements() {
    const elementsInput = document.getElementById("elements-input")
    if (elementsInput instanceof HTMLInputElement == false) return;
    const text = elementsInput.value

    let { elements, sum } = getElementsFromInput(text)

    let tbody = ""
    elements.forEach(element => {
        tbody += `<tr><td>${element.symbol}</td><td>${element.num}</td></tr>`
    });

    const elementsResults = document.getElementById("elements-results");
    if (elementsResults) elementsResults.innerHTML = tbody;
    const elementsTotal = document.getElementById("elements-total");
    if (elementsTotal) elementsTotal.textContent = sum.toString()

    const elementsAdd = document.getElementById("elements-add");
    if (elementsAdd) elementsAdd.textContent = getRequiredElementSymbols(sum).join("");
}
const elementsSearch = document.getElementById("elements-search");
if (elementsSearch) elementsSearch.addEventListener("click", countElements);



const ytMinutes = document.getElementById("yt-minutes") as HTMLInputElement
const ytSeconds = document.getElementById("yt-seconds") as HTMLInputElement
const ytElements = document.getElementById("yt-elements") as HTMLInputElement
const ytResults = document.getElementById("yt-results")

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

if(ytMinutes && ytSeconds && ytElements) {
    ytMinutes.addEventListener("input", setYtResults)
    ytSeconds.addEventListener("input", setYtResults)
    ytElements.addEventListener("input", setYtResults)
}