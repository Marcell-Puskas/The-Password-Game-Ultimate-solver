import { ytUrlList } from "./data/yt-url-list";

export function getYtUrls(minutes: number, seconds: number) {
    const searchedTime = minutes.toString() + ":" + seconds.toString().padStart(2, "0")

    const ytUrlInfo = ytUrlList.find((e) => e.time === searchedTime)

    return ytUrlInfo
}