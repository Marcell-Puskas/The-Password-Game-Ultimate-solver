import { getClipboardHTML } from "./clipboard"
import { countryList } from "./data/countries-list"

export async function getCountryName() {
    const html = await getClipboardHTML()
    if (typeof html === "undefined")
        return "Image wasn't found in clipboard";

    const iframeElement = new DOMParser().parseFromString(html, "text/html").querySelector("iframe.geo");
    if (!iframeElement) 
        return "Image wasn't found in clipboard";

    const url = iframeElement.getAttribute("src")
    if (!url) 
        return "Image wasn't found in clipboard"

    const country = countryList.find((c) => (c.embed === url))
    if (!country)
        return "Country not found!";

    return country.title.toLowerCase()
}