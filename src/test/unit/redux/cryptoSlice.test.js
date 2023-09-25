import { setCurrencies, setPage, setMaxPage } from '../../../store/reducer/cryptoSlice'
import store from '../../../store/index'

describe('CryptoSlice Test', () => {
    test('state: currencies should get a correct value', () => {
        const { currencies } = store.getState().cryptoSlice
        expect(currencies).toBe('aud');
    });
    test('setCurrencies should get a correct value', () => {
        const { payload } = store.dispatch(setCurrencies('usd'))
        expect(payload).toBe('usd');
    });
    test('state: currPage should get a correct value', () => {
        const { currPage } = store.getState().cryptoSlice
        expect(currPage).toBe(1);
    });
    test('setPage should get a correct value', () => {
        const { payload } = store.dispatch(setPage(100))
        expect(payload).toBe(100);
    });
    test('state: maxPage should get a correct value', () => {
        const { maxPage } = store.getState().cryptoSlice
        expect(maxPage).toBe(101);
    });
    test('setMaxPage should get a correct value', () => {
        const { payload } = store.dispatch(setMaxPage(1000))
        expect(payload).toBe(1000);
    });

})