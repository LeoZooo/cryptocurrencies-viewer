import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useGetCoinsSizeQuery } from './store/api/cryptoApi'
import { setMaxPage } from './store/reducer/cryptoSlice'
import NavBar from './components/navBar'
import DataTable from './components/dataTable'
import PaginationRounded from './components/pagination'
import SinglePage from './components/singlePage'
import { PAGINATION } from './constant'
import './App.scss'

const App = () => {
  const dispatch = useDispatch()
  const { data } = useGetCoinsSizeQuery()

  // Get page number of data
  useEffect(() => {
    if (data) {
      const maxPage = parseInt((data.length / PAGINATION)) + 1
      dispatch(setMaxPage(maxPage))
    }
  }, [data, dispatch])

  return (
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path='/' element={<><DataTable /> <PaginationRounded /></>} />
        <Route path='/:slug' element={<SinglePage />} />
      </Routes>
    </div>
  )
}

export default App;
