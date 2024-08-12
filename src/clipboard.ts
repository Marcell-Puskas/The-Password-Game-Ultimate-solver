export async function getClipboardHTML() {
    const items = await navigator.clipboard.read();
    const htmlItem = items.find(({types}) => types.includes("text/html"));
    if (htmlItem) {
        const htmlBlob = await htmlItem.getType("text/html");
        const html = await htmlBlob.text();
        return html;
    }
}