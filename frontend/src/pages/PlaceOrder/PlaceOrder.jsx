import React, { useContext, useEffect,useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getCartTotalAmount,token,food_list,cartItems,url} =useContext(StoreContext)
 
  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData({...data,[name]:value})
  } 

  const placeOrder = async(event) =>{
    event.preventDefault();

    let orderItems = [];

    food_list.map((item)=>{
      if(cartItems[item._id] > 0 ){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo);
      }
    })
    let orderData ={
         address:data,
         items:orderItems,
         amount:getCartTotalAmount()+2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const{session_url } = response.data;
      window.location.replace(session_url);
    }

    console.log(orderItems);

  }

  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getCartTotalAmount() === 0){
      navigate('/cart')
    }
  },[token])
 
  return (
    <form  onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" required name="firstname" onChange={onChangeHandler} value={data.firstname} placeholder='First name'/>
          <input type="text" required name="lastname" onChange={onChangeHandler} value={data.lastname} placeholder='Last name'/>
        </div>
        <input type="email" required  name="email" onChange={onChangeHandler} value={data.email} placeholder='Email'/>
        <input type="street" required name="street" onChange={onChangeHandler} value={data.street} placeholder='Street'/>
        <div className="multi-fields">
          <input type="text" required name="city" onChange={onChangeHandler} value={data.city} placeholder='City'/>
          <input type="text"required name="state" onChange={onChangeHandler} value={data.state} placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" required name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code'/>
          <input type="text"  required name="country" onChange={onChangeHandler} value={data.country} placeholder='Country'/>
        </div>
        <div className="multi-fields">
          <input type="text" required name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone'/>
        </div>
      </div>
     
      <div className="place-order-right">
      <div className='cart-total'>
          <h2>Cart Totals</h2> 
            <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
                <p>Delivery Fees</p>
                <p>${2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
                <p>Total</p>
                <p>${getCartTotalAmount()+2}</p>
            </div>
            <button type='submit'>Procced To Checkout</button>
        </div>

      </div>
      
    </form>
  )
}

export default PlaceOrder
