import { NUMBER_ONLY } from '../constant'

// Compare currencies type's data
// eg. v1 = A$34352.1 -> 34352.1 then compare
const currencyComapre = (v1, v2) => {
    if (v1 === '-') {
        v1 = '0'
    }
    if (v2 === '-') {
        v2 = '0'
    }
    return parseFloat(v1.replace(NUMBER_ONLY, '')) - parseFloat(v2.replace(NUMBER_ONLY, ''))
}

export default currencyComapre