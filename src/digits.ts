export function getDigitsText(input: string) {
    const digits = input.match(/\d/g)
    if (!digits) 
        return 'There are no digits'

    const sum = digits.reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0);

    return `The sum of the digits are: ${sum}\n
    ${sum === 25 ? "no need to change any numbers" : sum < 25 ? `you need to add ${25-sum}` : `you need to subtract ${sum-25}`}`
}