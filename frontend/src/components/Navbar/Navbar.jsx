import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] =useState("home");
  const{getCartTotalAmount,token,setToken} =useContext(StoreContext)

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");


  }





  return (
    <div className='navbar'>
         < Link to='/' ><img src={assets.logo} alt="logo" className='logo'></img></Link>
        <ul className='navbar-menu'>
            < Link to='/' onClick={(e)=> setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href="#explore-menu" onClick={(e)=> setMenu("menu")}className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href="#app-download" onClick={(e)=> setMenu("mobile-app")}className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
            <a href="#footer" onClick={(e)=> setMenu("contact-us")}className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
        </ul>
        <div className='navbar-right'>
            <img className="search" src={assets.search_icon} alt="search"></img>
            <div className='navbar-search-icon'>
               <Link to="/cart"> <img  className="basket" src={assets.basket_icon} alt="basket_icon"/></Link>
                <div className={getCartTotalAmount() === 0 ?"":"dot"}></div>
            </div>
            {!token  ?<button onClick={()=>setShowLogin(true)}>Sign-in</button>
             : <div className='navbar-profile'>
               <img src={assets.profile_icon}  alt=""/>
                <ul className='nav-profile-dropdown'>
                  <Link to="/myorders"> <li><img src={assets.bag_icon}  alt=""/><p>Orders</p></li></Link>
                  <hr/>
                  <li onClick={logout}><img src={assets.logout_icon}  alt=""/><p>Logout</p></li>
                </ul>

             </div>}
        </div>
      
    </div>
  )
}

export default Navbar
