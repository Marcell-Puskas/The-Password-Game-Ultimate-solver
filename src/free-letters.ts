const alphabetLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export function getFreeLetters(input: string) {
    var freeletters: {letter: string, free: boolean}[] = []

    alphabetLetters.forEach((letter) => {
        freeletters.push({letter, free: !input.toLowerCase().includes(letter)})
    })
    
    return freeletters
}