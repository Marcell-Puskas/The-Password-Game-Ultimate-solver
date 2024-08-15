import { periodicElementsList } from "./data/periodic-element-list";

const oneLetterElements = periodicElementsList.filter((e) => {
    return e.symbol.length === 1
});
const twoLetterelements = periodicElementsList.filter((e) => {
    return e.symbol.length === 2
});


export function getElementsFromInput(input: string) {
    var atomicNumbersSum = 0;
    var foundElements: typeof periodicElementsList = [];
    [twoLetterelements, oneLetterElements].forEach((elements) => {
        elements.forEach((element) => {
            input = input.replaceAll(element.symbol, () => {
                foundElements.push(element);
                return atomicNumbersSum += element.num, ''
            })
        })
    })

    return {
        elements: foundElements, 
        sum: atomicNumbersSum
    }
}

export function getRequiredElementSymbols(sum: number) {
    var required = 200 - sum;
    var requiredElementSymbols: string[] = []
    
    const disallowedCharactersRegex = new RegExp(`(I|V|X|L|C|D|M)`)

    const allowedElements = periodicElementsList.filter((element) => 
        !element.symbol.match(disallowedCharactersRegex)
    )

    while(required > 0) {
        var foundElement = allowedElements[0]

        allowedElements.forEach((element) => {
            if (element.num > foundElement.num && element.num <= required) {
                foundElement = element
            }
        })

        requiredElementSymbols.push(foundElement.symbol);

        required -= foundElement.num
    }
    return requiredElementSymbols
}