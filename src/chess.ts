import { getClipboardHTML } from "./clipboard"
import { chessMoveList } from "./data/chess-move-list"


export async function getChessMove() {
    const html = await getClipboardHTML()
    if (typeof html === "undefined")
        return "Image wasn't found in clipboard";

    const imgElement = new DOMParser().parseFromString(html, "text/html").querySelector(".chess-img");
    if (!imgElement)
        return "Image wasn't found in clipboard";

    const puzzleRegex = /puzzle(\d+)\.svg/

    const url = imgElement.getAttribute("src")
    if (!url) 
        return "URL of the image wasn't found in clipboard";

    const regexResult = puzzleRegex.exec(url)
    if (!regexResult) 
        return "Puzzle number wasn't found"
    
    const puzzleNumber = parseInt(regexResult[1])
    
    const move = chessMoveList[puzzleNumber]

    return move
}