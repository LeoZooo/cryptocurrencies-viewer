import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import {
    useGetResponseQuery,
    useGetCoinsSizeQuery,
    useGetCoinsQuery,
    useGetSingleCoinsQuery
} from '../../../store/api/cryptoApi'
import store from '../../../store/index'

describe('CryptoApi Test', () => {
    test('useGetResponseQuery should get a correct value', async () => {
        const wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useGetResponseQuery(), { wrapper });
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).not.toBeNull();
        });
    });
    test('useGetCoinsSizeQuery should get a correct value', async () => {
        const wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useGetCoinsSizeQuery(), { wrapper });
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.data).not.toBeNull();
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).not.toBeNull();
        });
    });
    test('useGetCoinsQuery should get a correct value', async () => {
        const wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useGetCoinsQuery('aud'), { wrapper });
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.data).not.toBeNull();
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).not.toBeNull();
        });
    });
    test('useGetSingleCoinsQuery should get a correct value', async () => {
        const wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useGetSingleCoinsQuery('bitcoin'), { wrapper });
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.data).not.toBeNull();
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).not.toBeNull();
        });
    });
})