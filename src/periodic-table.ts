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
                return atomicNumbersSum += parseInt(element.num), ''
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

    while(required > 0) {
        let elementNumber = 0
        if (required > periodicElementsList.length) elementNumber = periodicElementsList.length;
        else elementNumber = required;
        requiredElementSymbols.push(periodicElementsList[elementNumber - 1].symbol);
        required -= elementNumber
    }
    return requiredElementSymbols
}