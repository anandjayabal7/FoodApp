import React, { useContext, useEffect } from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';



const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currentState,setCurrentState] = useState("Login");
    console.log(currentState);

    const [data,SetData] =useState({
        name:"",
        email:"",
        password:"",

    })

    const onChangeHandler =(event)=>{

        const name = event.target.name
        const value = event.target.value
        SetData(data=>({...data,[name]:value}))


    }

    const onLogin = async(event)=>{
        event.preventDefault()
        let newUrl = url;
        if(currentState==="Login"){
            newUrl +="/api/user/login"
        }else{
            newUrl +="/api/user/register"
        }

        const response =await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }



    }




  return (
      <div className='login-popup'>
          <form onSubmit={onLogin} className='login-popup-container'>
              <div className='login-popup-title'>
                  <h2>{currentState}</h2>
                  <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt=""></img>
              </div>
              <div className='login-popup-inputs'>
                  {currentState === "Login" ? <></> : <input type="text"  name ="name" onChange={onChangeHandler} value={data.name} placeholder='Name' required />}

                  <input type="email"  name ="email" onChange={onChangeHandler} value={data.email} placeholder='Email' required />
                  <input type="password" name ="password" onChange={onChangeHandler} value={data.password} placeholder='Password' required />
              </div>
              <button type="submit">{currentState == 'Sign Up' ? "Create Account" : "Login"}</button>
              <div className='login-popup-condition'>
                  <input type='checkbox' required />
                  <p>By continuing, I agree to the terms of use & privacy policy. </p>
              </div>
              {currentState === "Login"
                  ? <p>Create a New Account ? <span onClick={() =>setCurrentState("Sign Up")}>SignUp</span></p>
                  : <p>Already have an Account ? <span onClick={() =>setCurrentState("Login")}>Login</span></p>
              }
          </form>

      </div>

  )
}

export default LoginPopup
