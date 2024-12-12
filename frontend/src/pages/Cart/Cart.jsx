import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart,getCartTotalAmount ,url} = useContext(StoreContext);
  const navigate =useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p> 
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img className={`test_${item._id}`} src={url+"/images/"+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; 
        })}
      </div>
      <div className='cart-bottom'>
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
            <button onClick={()=>navigate('/order')}>Procced To Checkout</button>
        </div>
        
        <div className='cart-promocode'>
        <div>
          <p>If you have promocode apply here</p>
          <div className='cart-promocode-input'>
            <input type='text' placeholder='Promo Code'></input>
            <button>Submit</button>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Cart;
