export async function getWordleAnswser() {
    const today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    const response = await fetch("https://neal.fun/api/password-game/wordle?date=" +  date);
    if (!response.ok) return "";
    const data = await response.json();
    const answer = data['answer'];
    if (!answer) return "";
    return answer;
}