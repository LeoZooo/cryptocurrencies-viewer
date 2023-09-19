import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { setCurrencies } from '../store/reducer/cryptoSlice'
import { CURRENCIES_TYPE } from '../static/constant'

const NavBar = () => {
    const dispatch = useDispatch();
    const currencies = useSelector((state) => state.cryptoSlice.currencies)

    const handleChange = (event) => {
        dispatch(setCurrencies(event.target));
    };

    return (
        <header className='nav'>
            <h2 className='nav__title'>
                Cryptocurrencies Viewer
            </h2>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Currencies</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={currencies}
                    label="currencies"
                    onChange={handleChange}
                >
                    <MenuItem value={CURRENCIES_TYPE.AUD}>{CURRENCIES_TYPE.AUD}</MenuItem>
                    <MenuItem value={CURRENCIES_TYPE.USD}>{CURRENCIES_TYPE.USD}</MenuItem>
                    <MenuItem value={CURRENCIES_TYPE.EUR}>{CURRENCIES_TYPE.EUR}</MenuItem>
                    <MenuItem value={CURRENCIES_TYPE.JPY}>{CURRENCIES_TYPE.JPY}</MenuItem>
                </Select>
            </FormControl>

        </header >
    )
}

export default NavBar;
