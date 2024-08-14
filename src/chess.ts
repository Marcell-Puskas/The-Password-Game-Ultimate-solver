import { getClipboardHTML } from "./clipboard"
import { chessMoveList } from "./data/chess-move-list"


export async function getChessMove() {
    const html = await getClipboardHTML()
    if (typeof html === "undefined") return {
            info: "Image wasn't found in clipboard",
            move: null
        };

    const imgElement = new DOMParser().parseFromString(html, "text/html").querySelector(".chess-img");
    if (!imgElement) return {
            info: "Image wasn't found in clipboard",
            move: null
        };

    const puzzleRegex = /puzzle(\d+)\.svg/

    const url = imgElement.getAttribute("src")
    if (!url)  return {
            info: "URL of the image wasn't found in clipboard",
            move: null
        };

    const regexResult = puzzleRegex.exec(url)
    if (!regexResult)  return {
            info: "Puzzle number wasn't found",
            move: null
        }
    
    const puzzleNumber = parseInt(regexResult[1])
    
    const move = chessMoveList[puzzleNumber]

    return {
        info: "Best chess move: ",
        move
    }
}