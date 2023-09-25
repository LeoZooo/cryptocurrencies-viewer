import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { URL, TYPE } from '../../constant'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: URL
    }),
    tagTypes: [TYPE.CRYPTO],

    endpoints: (builder) => ({
        getResponse: builder.query({
            query() {
                return 'ping'
            },
            transformErrorResponse: (error) => {
                console.error(`getResponse error ${error.status},\n info: ${error.data.error}`);
            }
        }),
        // Get page number of data
        getCoinsSize: builder.query({
            query() {
                return 'coins/list'
            },
            transformErrorResponse: (error) => {
                console.error(`getCoinsSize error ${error.status},\n info: ${error.data.error}`);
            }
        }),
        // Get total data
        getCoins: builder.query({
            query(config) {
                const { currencies, currPage, orderType } = config
                return `coins/markets?vs_currency=${currencies}&page=${currPage}&order=${orderType}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
            },
            providesTags: [TYPE.CRYPTO],
            // Remove cache
            keepUnusedDataFor: 0,
            transformErrorResponse: (error) => {
                console.error(`getCoins error ${error.status},\n info: ${error.data.error}`);
            }
        }),
        // Get single data
        getSingleCoins: builder.query({
            query(id) {
                return `coins/${id}`
            },
            providesTags: [TYPE.CRYPTO],
            keepUnusedDataFor: 60,
            transformErrorResponse: (error) => {
                console.error(`getSingleCoins error ${error.status},\n info: ${error.data.error}`);
            }
        }),
    })
})

export const {
    useGetResponseQuery,
    useGetCoinsSizeQuery,
    useGetCoinsQuery,
    useGetSingleCoinsQuery,
} = cryptoApi





