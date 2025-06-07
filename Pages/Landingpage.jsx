import React, { useState, useEffect } from 'react';
import Nav from '../src/Components/Nav';
import '../src/App.css';
import Banner from '../src/Components/Banner';
import Login from './Login';
import Register from './Register';
import ImgGen from '../src/Components/ImgGen';
import Collection from '../src/Components/Collection';
import BeforeLogin from '../src/Components/Beforelogin';

function Landingpage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ShowLogout, setShowLogout] =useState(false)


  const Logouthandler=()=>{
     localStorage.removeItem('UserId')
     localStorage.removeItem('token')
     localStorage.removeItem('Username')
     window.location.reload()
     setShowLogout(false)
  } 

  useEffect(()=>{
    const user=localStorage.getItem('UserId')
    if(user){
      setShowLogout(true)
    }
  },[])



  const loginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const registerHandler = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div>
      <Nav Loginhandler={loginHandler} Registerhandler={registerHandler}  Logouthandler={Logouthandler} ShowLogout={ShowLogout}/>

      <div className="undernav">
        {!isLoggedIn && (
          <>
            {!showLogin && !showRegister && <BeforeLogin/>}
            {showRegister && <Register  loginHandler={loginHandler}/>}
            {showLogin && <Login registerHandler={registerHandler}/>}
          </>
        )}

        {isLoggedIn && (
          <div >
            <Banner />
            <ImgGen />
            <Collection/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landingpage;
