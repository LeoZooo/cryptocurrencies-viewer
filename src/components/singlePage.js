import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Language, Twitter, Facebook, GitHub } from '@mui/icons-material';

import Loading from './loading'
import { useGetSingleCoinsQuery } from '../store/api/cryptoApi'
import formatNumberWithCurrency from '../utils/formatNumberWithCurrency'

const SinglePage = () => {
    const id = useParams().slug;
    const { currencies } = useSelector((state) => state.cryptoSlice)
    const { isSuccess, data } = useGetSingleCoinsQuery(id)

    // Get current currency 
    const getCurrency = (price) => {
        return formatNumberWithCurrency(price[currencies], currencies)
    }
    const emptyDataProcessor = (data) => {
        return data ? data : '-'
    }

    // Get and process the data
    let description, image, links, market_cap_rank, market_data, name, symbol
    let lowPrice, highPrice, price, dataForm
    let linkForm, community
    if (data) {
        ({ description, image, links, market_cap_rank, market_data, name, symbol } = data);
        market_cap_rank = market_cap_rank ? market_cap_rank : '-'
        image = image.small

        lowPrice = getCurrency(market_data.low_24h)
        highPrice = getCurrency(market_data.high_24h)
        price = getCurrency(market_data.current_price)

        description = description.en

        dataForm =
            [
                { name: 'Market Cap', value: getCurrency(market_data.market_cap) },
                { name: '24 Hour Trading Vol', value: getCurrency(market_data.total_volume) },
                { name: 'Fully Diluted Valuation', value: getCurrency(market_data.fully_diluted_valuation) },
                { name: 'Circulating Supply', value: emptyDataProcessor(market_data.circulating_supply) },
                { name: 'Total Supply ', value: emptyDataProcessor(market_data.total_supply) },
                { name: 'Max Supply', value: emptyDataProcessor(market_data.max_supply) }
            ]

        linkForm = { name: name, value: emptyDataProcessor(links.official_forum_url[0]) }

        community =
            [
                `https://twitter.com/${name}`,
                `https://facebook.com/${name}`,
                `https://github.com/${name}`
            ]
    }

    return (
        isSuccess ?
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ padding: 5, marginRight: 5, justifyContent: 'space-between' }}>
                <Grid xs={12} sm={8} md={8} >
                    <div className='singlePage__data__tag'> Rank {market_cap_rank}</div>
                    <Stack direction="row" useFlexGap flexWrap="wrap">
                        <img className='singlePage__data__img' src={image} alt={name} />
                        <h2 > {name} </h2>
                        <h6 className='singlePage__data__symbol'>{symbol}</h6>
                    </Stack>
                    <h1 className='singlePage__data__currprice'> {price} </h1>
                    <Stack direction="row" useFlexGap flexWrap="wrap">
                        <Stack direction="row" useFlexGap flexWrap="wrap">
                            <p className='singlePage__data__font'> Low price in 24h: </p>
                            <p className='singlePage__data__price'> {lowPrice} </p>
                        </Stack>
                        <Stack direction="row" useFlexGap flexWrap="wrap">
                            <p className='singlePage__data__font'> High price in 24h: </p>
                            <p className=' singlePage__data__price singlePage__data__price--green'> {highPrice} </p>
                        </Stack>
                    </Stack>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 6, md: 6 }}>
                        {dataForm.map((each, index) => (
                            <Grid xs={12} sm={3} md={3} key={index}>
                                <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ justifyContent: 'space-between' }}>
                                    <div className='singlePage__data__form__font'>{each.name} </div>
                                    <p> {each.value}</p>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid xs={12} sm={3} md={3} >
                    <h1 className='singlePage__info__title'> Info </h1>
                    <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ justifyContent: 'space-between' }}>
                        <p className='singlePage__data__form__font singlePage__info__font'> webiste </p>
                        <a href={linkForm.value} className='singlePage__info__button'><Language fontSize="medium" color="primary" /></a>
                    </Stack>
                    <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ justifyContent: 'space-between' }}>
                        <p className='singlePage__data__form__font singlePage__info__font'> Twitter </p>
                        <a href={community[0]} className='singlePage__info__button'><Twitter fontSize="medium" color="primary" /></a>
                    </Stack>
                    <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ justifyContent: 'space-between' }}>
                        <p className='singlePage__data__form__font singlePage__info__font'> Facebook </p>
                        <a href={community[1]} className='singlePage__info__button'><Facebook fontSize="medium" color="primary" /></a>
                    </Stack>
                    <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ justifyContent: 'space-between' }}>
                        <p className='singlePage__data__form__font singlePage__info__font'> Twitter </p>
                        <a href={community[2]} className='singlePage__info__button'><GitHub fontSize="medium" color="primary" /></a>
                    </Stack>
                </Grid>
                <Grid xs={12} sm={12} md={12} >
                    <code className='singlePage__info__description' ><div dangerouslySetInnerHTML={{ __html: description }}></div></code>
                </Grid>
            </Grid >
            :
            <Loading />
    )
}

export default SinglePage;
