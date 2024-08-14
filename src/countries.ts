import { getClipboardHTML } from "./clipboard"
import { countryList } from "./data/countries-list"

export async function getCountryName() {
    const html = await getClipboardHTML()
    if (typeof html === "undefined") return {
        info: "Image wasn't found in clipboard",
        country: null
    };

    const iframeElement = new DOMParser().parseFromString(html, "text/html").querySelector("iframe.geo");
    if (!iframeElement) return {
        info: "Image wasn't found in clipboard",
        country: null
    };

    const url = iframeElement.getAttribute("src")
    if (!url) return {
        info: "Image wasn't found in clipboard",
        country: null
    };

    const country = countryList.find((c) => (c.embed === url))
    if (!country) return {
        info: "Country not found!",
        country: null
    };

    return {
        info: "country: ",
        country: country.title.toLowerCase()
    }
}