import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets.js';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalOrders: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);


  const fetchOrders = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list?page=${page}&pageSize=${pageSize}`);
      if (response.data.success) {
        setOrders(response.data.data);
        setPagination({
          currentPage: page,
          pageSize: pageSize,
          totalOrders: data.pagination.totalOrders,
          totalPages: data.pagination.totalPages,
        });
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('An error occurred while fetching orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(pagination.currentPage, pagination.pageSize);
  }, [pagination.currentPage, pagination.pageSize]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (e) => {
    setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value), currentPage: 1 }));
  };



  const statusHandler = async(event,orderId)=>{
    console.log(event,orderId);
    const newStatus = event.target.value;
    const response = await axios.post(`${url}/api/order/status`,{
                        orderId,
                        status:newStatus
                      })
    if(response.data.success){
      await fetchOrders();
    }

  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, orderIndex) => (
          <div key={orderIndex} className='order-item'>
            <img src={assets.parcel_icon} alt="Order Icon" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {

                    if(index===order.items.length-1){
                      return item.name+""+item.quantity
                    }else{
                      return item.name+""+item.quantity + ","
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstname + " "+ order.address.lastname}</p>
                <div className='order-item-address'>
                  <p>{order.address.street +","}</p>
                  <p>{order.address.city +","+order.address.state +","+order.address.zipcode}</p>
                </div>
                  <p className='order-item-phone'> {order.address.phone}</p>
              </div>
               
                  <p>Items: {order.items.length}</p>
                  <p>price: ${order.amount}</p>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Deliverd">Deliverd</option>
                  </select>
                
             
          </div>
          

          

        ))}
      </div>
    </div>
  );
};

export default Orders;
