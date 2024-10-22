import React, { useState } from 'react';
import PendingOrders from './PendingOrders';
import CompleteOrders from './CompleteOrders';
import FailedOrders from './FailedOrders';
import Steadfast from '../Steadfast/Steadfast';

const Orders = () => {
  const [activeComponent, setActiveComponent] = useState('pending'); // default to PendingOrders

  // Function to render the correct component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'pending':
        return <PendingOrders />;
      case 'complete':
        return <CompleteOrders />;
      case 'failed':
        return <FailedOrders />;
      case 'steadFast':
          return <Steadfast />;
      default:
        return <PendingOrders />;
    }
  };

  return (
    <div className="orders-container">
      <div className="buttons-container mb-4">
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeComponent === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('pending')}
        >
          Pending Orders
        </button>
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeComponent === 'complete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('complete')}
        >
          Complete Orders
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeComponent === 'failed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('failed')}
        >
          Failed Orders
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeComponent === 'steadFast' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveComponent('steadFast')}
        >
          SteadFast Status
        </button>
      </div>

      <div className="card-container">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Orders;
