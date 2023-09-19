import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';

import { setPage } from '../store/reducer/cryptoSlice'

const PaginationRounded = () => {
    const dispatch = useDispatch();
    const { currPage, maxPage } = useSelector((state) => state.cryptoSlice)

    const handleChange = (e, newPage) => {
        dispatch(setPage(newPage))
    };

    return (
        <div className='pagination'>
            <Pagination count={maxPage} page={currPage} onChange={handleChange} variant="outlined" shape="rounded" color="primary" />
        </div >
    );
}

export default PaginationRounded