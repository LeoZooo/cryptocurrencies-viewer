import setColorForVolume from '../../../utils/setColorForVolume'

describe('Set Color For Volume Test', () => {
    test('should get the correct result if larger than 0', () => {
        const values = { value: 1 }
        const expectResult = <p style={{ color: 'green' }}>1.0%</p>
        const result = setColorForVolume(values);

        expect(result).toEqual(expectResult);
    });
    test('should get the correct result if less than 0', () => {
        const values = { value: -10 }
        const expectResult = <p style={{ color: 'red' }}>-10.0%</p>
        const result = setColorForVolume(values);

        expect(result).toEqual(expectResult);
    });
    test('should get the correct result if equal to 0', () => {
        const values = { value: 0 }
        const expectResult = <p style={{ color: 'green' }}>0</p>
        const result = setColorForVolume(values);

        expect(result).toEqual(expectResult);
    });
    test(`should get the correct result if data don't exist`, () => {
        const values = { value: '' }
        const expectResult = '-'
        const result = setColorForVolume(values);

        expect(result).toEqual(expectResult);
    });

});