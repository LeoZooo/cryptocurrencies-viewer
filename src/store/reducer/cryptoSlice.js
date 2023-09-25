import { createSlice } from "@reduxjs/toolkit";

import { CURRENCIES_TYPE } from '../../constant'

export const cryptoSlice = createSlice({
    name: "cryptoSlice",
    initialState: {
        currencies: CURRENCIES_TYPE.AUD,
        currPage: 1,
        maxPage: 101,
    },
    reducers: {
        setCurrencies(state, action) {
            state.currencies = action.payload.value;
        },
        setPage(state, action) {
            state.currPage = action.payload;

        },
        setMaxPage(state, action) {
            state.maxPage = action.payload;
        },
    }
});

export const { setCurrencies, setPage, setMaxPage } = cryptoSlice.actions;