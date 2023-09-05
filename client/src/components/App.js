import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../slices/authSlice';
import Header from './Header';
import Dashboard from './Dashboard';
import SearchNew from './SearchNew';

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchUser());
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/search' element={<SearchNew />} />
      </Routes>
    </div>
  );
};

export default App;
