import React, { useEffect, useState } from 'react';
import Search from './Search';
import CardItem from './CardItem';
import GraphSales from './GraphSales';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/OrdersSlice';

const MainContent = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { error, orders, status } = useSelector((state) => state.orders);

  const handleQuery = (query) => {
    setSearch(query);
  };


  const filteredData = orders.filter(item =>
    (item.productName?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (item.customerName?.toLowerCase() || '').includes(search.toLowerCase())
  );
  

  return (
    <div className="flex-grow p-6 bg-gray-100">
      <Search onQuery={handleQuery} />

      {/* Show search results if there's a query, otherwise show CardItem and GraphSales */}
      {search ? (
        <div className="mb-4">
          {filteredData.length > 0 ? (
            <div className="bg-gray-200 p-4 rounded">
              {filteredData.map((item) => (
                <div key={item.id} className="border-b border-gray-300 py-2">
                  <h3 className='font-bold text-xl'>{item.productName}</h3>
                  <p className='text-lg'>{item.customerName || 'No description available'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found</p>
          )}
        </div>
      ) : (
        <>
          <CardItem />
          <GraphSales />
        </>
      )}

      {/* Optional: Show error message or loading status */}
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MainContent;
