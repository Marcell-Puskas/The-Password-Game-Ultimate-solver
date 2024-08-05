async function readClipboardHTML() {
    const items = await navigator.clipboard.read();
    const htmlItem = items.find(({types}) => types.includes("text/html"));
    if (htmlItem) {
        const htmlBlob = await htmlItem.getType("text/html");
        const html = await htmlBlob.text();
        return html;
    }
}

async function getWordleAnswser() {
    const today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    const response = await fetch("https://neal.fun/api/password-game/wordle?date=" +  date);
    if(!response.ok) return "";
    const data = await response.json();
    const answer = data['answer'];
    if (!answer) return "";
    return answer;
}

const moonPhases = [
    "🌑", //New
    "🌒", //Waxing Crescent
    "🌓", //First Quarter
    "🌔", //Waxing Gibbous
    "🌕", //Full
    "🌖", //Waning Gibbous
    "🌗", //Last Quarter
    "🌘", //Waning Crescent
];

function getMoonPhase() {
    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let c = e = jd = b = 0;

    if (month < 3) {
    year--;
    month += 12;
    }

    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
    return moonPhases[b];
}

async function setInitialPaste() {
    let moonPhase = getMoonPhase()
    let wordleAnswer = await getWordleAnswser()

    let initialText = `🥚🐛🐛🐛🐛🐛🐛${moonPhase}🏋️‍♂️🏋️‍♂️🏋️‍♂️.......101:00XXXV${wordleAnswer}shellomayiamlovedyoutu.be/EsPt995....`
    document.getElementById("initial-paste").innerText = initialText
}
setInitialPaste()


/* Chess solver */
const moveElement = document.getElementById("chess-move")
const moveList = ['Nf6+', 'Qd5+', 'Qb8+', 'Qd8+', 'Qxg6+', 'Qxd7+', 'Qxf8+', 'Qd7+', 'Qg6+', 'Qxh6+', 'Qg4+', 'Qxh6+', 'Qg6+', 'Rg1+', 'Qxh5+', 'Ne7', 'Qc3+', 'Qf5+', 'Bf6+', 'Qc8+', 'Re8+', 'Rc1+', 'Bf4+', 'Ne6+', 'Qf8+', 'Bf5+', 'Qxc6+', 'Qxb8+', 'Qxd6+', 'Rd8+', 'Nd3+', 'Rxb6+', 'Qxf7+', 'Nf6+', 'Qe7+', 'Rg8+', 'Qxf7+', 'Be3+', 'Nh4+', 'Qxe6+', 'Qf8+', 'Qf6+', 'Nb5+', 'Qxh7+', 'Qxb7+', 'Qg1+', 'Bh6+', 'Rxf6+', 'Qxh6+', 'h5+', 'Nxd7+', 'Rxh2+', 'Bb5+', 'Rg8+', 'Qh8+', 'Bh5+', 'Qh7+', 'Qxh7+', 'Ne5+', 'Qxg7+', 'Rh8+', 'Rxh6+', 'Qxe8+', 'Rxe8+', 'Qxh6+', 'Qxh7+', 'Kh6', 'Be1+', 'Rxg7+', 'Qxg7+', 'Rg7', 'Bd6+', 'Ng6+', 'Qh3+', 'Rg1+', 'Qg1+', 'Rh8+', 'Rf6', 'Re7+', 'Qh6+', 'Qxh7+', 'Rf6+', 'Qf7+', 'Bb6+', 'Rxg6+', 'Qh8+', 'Rxh3+', 'Rxh7+', 'Nf5+', 'Rxf7+', 'Rf7+', 'f5+', 'Rh8+', 'Qxf2+', 'Qxf8+', 'Re8+', 'Rxf6+', 'Qh3+', 'Nf3', 'Qxe6+', 'Rg8+', 'Qe8+', 'Rxf5+', 'Qxh2+', 'Rxf8+', 'Rxg6+', 'Bf2+', 'Qxc3+', 'Nd4+', 'Qxh3+', 'Nf4+', 'Qg2+', 'Qxh7+', 'Qh2+', 'Qh1+', 'Qxh3+', 'Rxg7+', 'Qd8+', 'Rd8+', 'Rd8+', 'Nd5+', 'Rc8+', 'g5+', 'Rh4+', 'Ng6+', 'Qxe6+', 'Bf7+', 'Ne7+', 'Nh8+', 'Rxf1+', 'Bxg6+', 'Nxf7+', 'Re5+', 'Rf8+', 'Rxe6+', 'Rxh7+', 'Nxb7+', 'Qg8+', 'Qxh6+', 'Ra1+', 'Rh8+', 'Bg6+', 'Qd8+', 'Qh5+', 'Qxg6+', 'Qxa3+', 'Bg6+', 'Nf4+', 'Qxc3+', 'Ne6+', 'Nxf7+', 'Rxd8+', 'Ng3+', 'Re8+', 'Bxf3+', 'Rh2+', 'Re8+', 'Bh6', 'Qb5+', 'Qh6+', 'Rxh7+', 'Rxf7+', 'Rxf8+', 'Rh6', 'Bf5+', 'Rxh6+', 'Qe6+', 'Rxa7+', 'Rg2+', 'Qg4+', 'Qh1+', 'g4+', 'Qc6+', 'Rg8+', 'Bf6+', 'Qc6', 'f2+', 'Ne2+', 'Rh6+', 'Rc1+', 'Ne4+', 'Ng4', 'Rf7+', 'Qd8+', 'Rxh6+', 'Qg7+', 'Be5+', 'Rxh6+', 'Re4+', 'Nf7+', 'Rxh6+', 'Rf1+', 'Rg8+']

async function getPuzzleNumber() {
    const html = await readClipboardHTML()
    if(typeof html === "undefined") {
        moveElement.textContent = "Image wasn't found in clipboard"
        return
    }

    const imgElement = new DOMParser().parseFromString(html, "text/html").querySelector(".chess-img");
    if (!imgElement) {
        moveElement.textContent = "Image wasn't found in clipboard"
        return
    }

    const puzzleRegex = /puzzle(\d+)\.svg/
    const puzzleNumber = puzzleRegex.exec(imgElement.src)[1]
    
    const move = moveList[puzzleNumber]

    moveElement.textContent = move
}

document.getElementById("chesspaste").addEventListener("click", getPuzzleNumber)
