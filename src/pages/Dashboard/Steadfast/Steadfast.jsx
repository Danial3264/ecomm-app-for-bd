import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/OrdersSlice';
import axios from 'axios';

const Steadfast = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  // State to store the status of each order
  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter out duplicate orders based on the orderNumber
  const uniqueOrders = orders.reduce((acc, current) => {
    const x = acc.find(item => item.orderNumber === current.orderNumber);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Fetch statuses for all unique orders
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const statuses = {};

        // Fetch status for each order
        for (const order of uniqueOrders) {
          const response = await axios.get(`https://portal.packzy.com/api/v1/status_by_invoice/${order.orderNumber}`, {
            headers: {
              'Api-Key': 'wrebk6f8wckmo5rq1a0nlg22m6exr4er',
              'Secret-Key': 't0alowipxdltjlspraa4ngdu',
              'Content-Type': 'application/json',
            },
          });

          statuses[order.orderNumber] = response.data.delivery_status;
        }

        setOrderStatuses(statuses);
      } catch (error) {
        console.error('Failed to fetch order statuses', error);
      }
    };

    if (uniqueOrders.length > 0) {
      fetchStatuses();
    }
  }, [uniqueOrders]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Invoice</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {uniqueOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{order.orderNumber}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.phone_number}</td>
              <td className="border px-4 py-2">
                {/* Display fetched status or loading indicator */}
                {orderStatuses[order.orderNumber] || 'Loading status...'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Steadfast;
