import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

import Loading from './loading'
import TrendLineChart from './trendLineChart'
import { useGetCoinsQuery } from '../store/api/cryptoApi'
import { SECOND_45 } from '../static/constant'

const DataTable = () => {
    const { currencies, currPage, orderType } = useSelector((state) => state.cryptoSlice)
    const config = { currencies, currPage, orderType }
    const { isSuccess, data } = useGetCoinsQuery(config, {
        pollingInterval: SECOND_45,
    })
    const rows = []

    const formatNumberWithCurrency = (number) => {
        if (!number) {
            return '-'
        }

        const formattedNumber = number.toLocaleString(undefined, {
            style: 'currency',
            currency: currencies,
            minimumFractionDigits: 0,
        });
        return formattedNumber;

    }

    if (data) {
        data.map((each, index) => {
            let { id, market_cap_rank, name, image, symbol, current_price, price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, total_volume, market_cap, sparkline_in_7d } = each
            name = { name, image, symbol }
            const sparkline = sparkline_in_7d.price
            rows.push({ id, market_cap_rank, name, current_price: formatNumberWithCurrency(current_price), price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, total_volume: formatNumberWithCurrency(total_volume), market_cap: formatNumberWithCurrency(market_cap), sparkline })
        })
    }

    const setColorForVolume = (values, priceName) => {
        let value
        if (priceName = 'price_change_percentage_1h_in_currency') {
            value = values.value
        }
        else if (priceName = 'price_change_percentage_24h_in_currency') {
            value = values.value
        }
        else {
            value = values.value
        }

        if (!value) {
            return '-'
        }

        value = Number(value).toFixed(1)
        if (value == 0) {
            value = 0
        }
        if (+value >= 0) {
            return <p style={{ color: 'green' }}>{value += '%'}</p>
        }
        else {
            return <p style={{ color: 'red' }}>{value += '%'}</p>
        }

    }

    const columns = [
        {
            field: 'market_cap_rank',
            headerName: '#',
            width: 70,
            headerClassName: 'super-app-theme--header',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'name',
            headerName: 'coin',
            width: 200,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            sortable: false,
            renderCell: (values) => (
                <div className='dataTable__name'>
                    <img className='dataTable__name__img' src={values.value.image} alt={values.value.name} />
                    <h4 >{values.value.name}</h4>
                    <h6 className='dataTable__name__symbol'>{values.value.symbol}</h6>
                </div>
            )
        },
        {
            field: 'current_price',
            headerName: 'price',
            type: 'number',
            width: 150,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'price_change_percentage_1h_in_currency',
            headerName: '1h',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            renderCell: (values) => setColorForVolume(values, 'price_change_percentage_1h_in_currency')
        },
        {
            field: 'price_change_percentage_24h_in_currency',
            headerName: '24h',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            renderCell: (values) => setColorForVolume(values, 'price_change_percentage_24h_in_currency')
        },
        {
            field: 'price_change_percentage_7d_in_currency',
            headerName: '7d',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            renderCell: (values) => setColorForVolume(values, 'price_change_percentage_7d_in_currency')
        },
        {
            field: 'total_volume',
            headerName: 'volume',
            type: 'number',
            width: 160,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'market_cap',
            headerName: 'Mkt Cap',
            type: 'number',
            width: 160,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'sparkline',
            headerName: 'Last 7 Days',
            width: 250,
            headerClassName: 'super-app-theme--header',
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            renderCell: (values) => {
                return values.value ? <TrendLineChart data={values.value} /> : <></>
            }
        },
    ];

    return (
        isSuccess ?
            <div className='dataTable'>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={rows}
                    columns={columns}
                    hideFooter
                    sx={{
                        fontSize: 13,
                        '& .super-app-theme--header': {
                            textTransform: 'capitalize',
                            fontSize: 14,
                        }
                    }}
                />
            </div >
            :
            <Loading />
    )
}

export default DataTable;
