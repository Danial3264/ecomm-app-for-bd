import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../redux/OrdersSlice'

const RecentSales = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const ordersSelector = useSelector((state) => state.orders)
  
  const { error, status, orders } = ordersSelector;

  return (
    <div className='flex flex-col'>
      <h3 className='text-3xl my-3'>Recent Orders</h3>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      
      {status === 'succeeded' && (
        <div 
          className='flex flex-col overflow-y-scroll h-[600px]'
        >
          {orders.map((order,index) => (
            <div key={`${order.id}-${index}`} className='flex align-center px-3 p-3 m-2 rounded bg-gray-300'>
              <img src={order.avatar} alt="" className='rounded-full w-24 h-24' />
              <div className="p-3 ms-5">
                <h2 className='font-bold'>{order.customerName}</h2>
                <p>{order.email}</p>
                <p className='font-bold text-red-800 my-2'>{order.productName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentSales;
