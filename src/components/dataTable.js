import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

import Loading from './loading'
import TrendLineChart from './trendLineChart'
import { useGetCoinsQuery } from '../store/api/cryptoApi'
import formatNumberWithCurrency from '../utils/formatNumberWithCurrency'
import setColorForVolume from '../utils/setColorForVolume'
import currencyComapre from '../utils/currencyComapre'
import { SECOND_45 } from '../static/constant'

const DataTable = () => {
    const navigate = useNavigate();
    const { currencies, currPage, orderType } = useSelector((state) => state.cryptoSlice)
    const config = { currencies, currPage, orderType }
    // Data will be refreshed every 45 seconds
    const { isSuccess, data } = useGetCoinsQuery(config, {
        pollingInterval: SECOND_45,
    })
    const rows = []

    // Put data into rows
    if (data) {
        data.map((each, index) => {
            let {
                id, market_cap_rank, name, image, symbol, current_price,
                price_change_percentage_1h_in_currency,
                price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_currency,
                total_volume,
                market_cap,
                sparkline_in_7d
            } = each
            name = { name, image, symbol }
            const sparkline = sparkline_in_7d.price
            rows.push({
                id, market_cap_rank, name,
                current_price: formatNumberWithCurrency(current_price, currencies),
                price_change_percentage_1h_in_currency,
                price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_currency,
                total_volume: formatNumberWithCurrency(total_volume, currencies),
                market_cap: formatNumberWithCurrency(market_cap, currencies),
                sparkline
            })

            return index
        })
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
            // Set the logo, title and symbol into the name
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
            headerAlign: 'right',
            sortComparator: (v1, v2) => currencyComapre(v1, v2)
        },
        {
            field: 'price_change_percentage_1h_in_currency',
            headerName: '1h',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            renderCell: (values) => setColorForVolume(values)
        },
        {
            field: 'price_change_percentage_24h_in_currency',
            headerName: '24h',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            renderCell: (values) => setColorForVolume(values)
        },
        {
            field: 'price_change_percentage_7d_in_currency',
            headerName: '7d',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            renderCell: (values) => setColorForVolume(values)
        },
        {
            field: 'total_volume',
            headerName: 'volume',
            type: 'number',
            width: 160,
            description: 'The total volume of a cryptocurrency represents the cumulative amount of that cryptocurrency traded within a specific timeframe.',
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right',
            sortComparator: (v1, v2) => currencyComapre(v1, v2)
        },
        {
            field: 'market_cap',
            headerName: 'Mkt Cap',
            type: 'number',
            width: 160,
            description: `Market cap refers to a cryptocurrency's total market value.`,
            headerClassName: 'super-app-theme--header',
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'sparkline',
            headerName: 'Last 7 Days',
            width: 250,
            description: 'A sparkline is a small, simple chart used to visualize data trends within a condensed space.',
            headerClassName: 'super-app-theme--header',
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            // Show the line chart
            renderCell: (values) => {
                return values.value ? <TrendLineChart data={values.value} /> : <></>
            }
        },
    ];

    const handleCellClick = (params) => {
        if (params.field !== 'name') {
            return
        }
        navigate(`/${params.id}`);
    }

    return (
        isSuccess ?
            <div className='dataTable'>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                    hideFooter
                    sx={{
                        fontSize: 13,
                        '& .super-app-theme--header': {
                            textTransform: 'capitalize',
                            fontSize: 14,
                        },
                    }}
                />
            </div >
            :
            <Loading />
    )
}

export default DataTable;
