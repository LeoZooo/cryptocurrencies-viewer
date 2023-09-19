import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { cryptoApi } from './api/cryptoApi'
import { cryptoSlice } from './reducer/cryptoSlice'

const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        cryptoSlice: cryptoSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cryptoApi.middleware,
        )
});

setupListeners(store.dispatch);

export default store;