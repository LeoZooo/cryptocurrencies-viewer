import currencyComapre from '../../../utils/currencyComapre'

describe('CurrencyComapre Test', () => {
    test('should get the correct result', () => {
        const v1 = 'A$34352.1'
        const v2 = 'A$3352.1'
        const expectResult = 34352.1 - 3352.1
        const result = currencyComapre(v1, v2);

        expect(result).toEqual(expectResult);
    });

    test(`should get the correct result when data is '-'`, () => {
        const v1 = 'A$34352.1'
        const v2 = '-'
        const expectResult = 34352.1 - 0
        const result = currencyComapre(v1, v2);

        expect(result).toEqual(expectResult);
    });

    test(`should get the correct result when data both are '-'`, () => {
        const v1 = '-'
        const v2 = '-'
        const result = currencyComapre(v1, v2);

        expect(result).toEqual(0);
    });
});