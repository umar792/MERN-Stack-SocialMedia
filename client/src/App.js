import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './Component/Header/Header';
import Logon from './Component/Login/Logon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContextApi } from './contextApi/Context/Usercontext';
import { useEffect } from 'react';
import Home from './Component/Home/Home';
import Account from './Component/Account/Account';

function App() {
  const {myprofile,allusersdata,followingpost,isAuthanticated,user} = useUserContextApi();

  useEffect(()=>{
     myprofile()
     allusersdata()
     followingpost();

  },[isAuthanticated]);
  
  return (
    <>
    <BrowserRouter>
    <ToastContainer position='top-right' theme='dark' />
    {
      isAuthanticated && <Header/>
    }
    
    <Routes>
      <Route exact path='/' element={isAuthanticated ? <Home/>: <Logon/>}/>
      {
        isAuthanticated && 
      <Route exact path='/account' element={<Account/>}/>
      }
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
