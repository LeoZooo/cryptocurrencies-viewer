import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useGetCoinsSizeQuery } from './store/api/cryptoApi'
import { setMaxPage } from './store/reducer/cryptoSlice'
import NavBar from './components/navBar'
import DataTable from './components/dataTable'
import PaginationRounded from './components/pagination'
import { PAGINATION } from './static/constant'
import './App.scss'


const App = () => {
  const dispatch = useDispatch()
  const { data } = useGetCoinsSizeQuery()

  useEffect(() => {
    if (data) {
      const maxPage = parseInt((data.length / PAGINATION)) + 1
      dispatch(setMaxPage(maxPage))
    }
  }, [data, dispatch])

  return (
    <div className='app'>
      <NavBar />
      <DataTable />
      <PaginationRounded />
    </div>
  )
}

export default App;
