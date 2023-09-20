// Transfer nmumber to currencies 
// eg. 3.1 -> 'A$3.1', undefined -> '-'
const formatNumberWithCurrency = (number, currencies) => {
    if (!number) {
        return '-'
    }

    const formattedNumber = number.toLocaleString(undefined, {
        style: 'currency',
        currency: currencies,
        // remove decimals
        minimumFractionDigits: 0,
    });
    return formattedNumber;
}

export default formatNumberWithCurrency