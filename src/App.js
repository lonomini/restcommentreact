import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home.js";
import Detail from "./Detail.js";
import Register from './Register.js';
import Login from './Login.js';

import Style from './style.module.css';

function App() {

  const [login, setLogin] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)

  useEffect(()=>{
    setLogin(sessionStorage.getItem("login"))
  },[])

  function handleLogout(){
    setLogin(false)
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userid")
    setShowMobileNav(false)
  }

  return (
    <div>
      <BrowserRouter>
          <header>
            <Link to="/" style={{textDecoration:"none"}}><span>~foodie~</span></Link>
            <nav className={Style.desktop}>              
              <ul>
                <li><Link to='/'>Home</Link> </li>
                { login && <li><Link onClick={handleLogout}>Logout</Link></li> }
                { !login && <li><Link to='/Register'>Register</Link></li> }
                { !login && <li><Link to='/Login'>Sign in</Link></li> }
              </ul>
            </nav>
            <nav className={Style.mobile}>
              <span onClick={()=>setShowMobileNav(!showMobileNav)} className={Style.material_icons} style={{fontSize: '80px', textDecoration:'none', marginRight:"20px"}}>menu</span>              
            </nav>
          </header>

          {
            showMobileNav && 

            <div className={Style.mobilenav}>
                <ul>
                  <li><Link onClick={()=>setShowMobileNav(!showMobileNav)} to='/'>Home</Link></li>
                  { login && <li><Link onClick={handleLogout}>Logout</Link></li> }
                  { !login && <li><Link onClick={()=>setShowMobileNav(!showMobileNav)} to='/Register'>Register</Link></li> }
                  { !login && <li><Link onClick={()=>setShowMobileNav(!showMobileNav)} to='/Login'>Sign in</Link></li> }
                </ul>
            </div>

          }
          
          <Routes>
            <Route path="/detail/:id" element={<Detail login={login} setLogin={setLogin} />}/>
            <Route path="/" element={<Home/>}/>
            <Route path='/Register' element={<Register login={login} />} />
            <Route path='/Login' element={<Login login={login} setLogin={setLogin} />} />
          </Routes> 
      </BrowserRouter>
      <footer style={{textAlign:'center', 'margin':'20px'}}>
        Copyright @ 2024
      </footer>
    </div>
  );
}

export default App;
