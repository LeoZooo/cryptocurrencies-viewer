import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { URL, TYPE } from '../../static/constant'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: URL
    }),
    tagTypes: [TYPE.CRYPTO],

    endpoints: (builder) => ({
        getCoinsSize: builder.query({
            query() {
                return 'coins/list'
            },
        }),
        getCoins: builder.query({
            query(config) {
                const { currencies, currPage, orderType } = config
                return `coins/markets?vs_currency=${currencies}&page=${currPage}&order=${orderType}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
            },
            providesTags: [TYPE.CRYPTO],
            keepUnusedDataFor: 0
        }),
    })
})

export const {
    useGetCoinsSizeQuery,
    useGetCoinsQuery,
} = cryptoApi;
