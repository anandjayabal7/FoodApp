import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const[cartItems,setCartItems] =useState({});
    const url = "http://localhost:4000" 
    const [token,setToken] =useState(""); 

    const [food_list,setFoodList] = useState([])




    const addToCart = async(itemId) =>{
      if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
      }else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }
      if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
    }

    const removeFromCart = async(itemId) =>{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
      if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      }
    }

    const getCartTotalAmount=()=>{
      let totalAmount = 0;
      for(const item in cartItems){
        if(cartItems[item] > 0){
          let item_info = food_list.find((product)=>product._id === item)
          totalAmount += item_info.price * cartItems[item];
        }
      }
      return totalAmount;
    }

    const fetchFoodList = async () => {
      try {

        const response = await axios.get(url + "/api/food/list");
    
        setFoodList(response.data.data); 
      } catch (error) {
       
        console.error("Error fetching food list:", error);
       
      }
    };

    const loadCartData = async (token) => {
      try {
          const response = await axios.post(url + "/api/cart/get", {}, {
              headers: { token }
          });
          setCartItems(response.data.cartData); 
      } catch (error) {
          console.error("Error loading cart data:", error);
      }
    };

    useEffect(()=>{
      async function loadData(){
        await fetchFoodList();

        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"))
        }
  
      }
      loadData();
    },[])

    useEffect(()=>{
       console.log(cartItems);
    },[cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;