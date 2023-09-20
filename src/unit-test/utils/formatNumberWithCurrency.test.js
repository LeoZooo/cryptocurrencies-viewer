import formatNumberWithCurrency from '../../../utils/formatNumberWithCurrency'

describe('FormatNumberWithCurrencyt Test', () => {
    let currencies = 'aud'
    test('should get the correct result', () => {
        const number = 3423.2
        const expectResult = 'A$3,423.2'
        const result = formatNumberWithCurrency(number, currencies);

        expect(result).toEqual(expectResult);
    });
    test('should get the correct result and comma for large size data', () => {
        const number = 3342342342323.2
        const expectResult = 'A$3,342,342,342,323.2'
        const result = formatNumberWithCurrency(number, currencies);

        expect(result).toEqual(expectResult);
    });
    test('should get the correct result for different currencies', () => {
        const number = 333.2
        currencies = 'usd'
        const expectResult = '$333.2'
        const result = formatNumberWithCurrency(number, currencies);

        expect(result).toEqual(expectResult);
    });
    test(`should get the '-' if no data`, () => {
        const number = null
        const expectResult = '-'
        const result = formatNumberWithCurrency(number, currencies);

        expect(result).toEqual(expectResult);
    });
});