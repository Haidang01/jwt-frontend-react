import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react';
import AppRouters from './routes/AppRouters';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './Context/UserContext';
function App() {
  const { user } = useContext(UserContext);


  return (

    <Router>
      {user && user.isLoading ?
        <div className='loading-container'>
          <Rings
            heigth="100"
            width="100"
            color='#1877f2'
            ariaLabel='loading'
          />
          <div>Loading data</div>
        </div>
        :
        <>
          <div className='app-header'>
            <NavHeader />
          </div>
          <div className='app-container'>
            <AppRouters />
          </div>
        </>
      }

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </Router>
  );
}

export default App;
