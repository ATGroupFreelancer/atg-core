import { isNaN } from 'lodash'
import pluralize from 'pluralize'

export const pluralizeText = (inputNumber: number, text = '', inclusive: boolean = true) => {
    if (isNaN(inputNumber) || !text) {
        return text
    }

    if (inputNumber === -1) {
        if (inclusive) return `${inputNumber} ${text}`
        return text
    }

    return pluralize(text, inputNumber, inclusive)
}
