import React, { useState } from 'react';
import { FaHome, FaCog, FaUser, FaSignOutAlt, FaBars, FaPeopleCarry } from 'react-icons/fa';
import { TbCategoryPlus, TbCategoryFilled  } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { TfiLayoutSlider } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard';
import Orders from './orders/Orders';
import ViewProduct from './products/ViewProduct';
import AddNewProduct from './products/AddNewProduct';
import CreateCategory from './Category/CreateCategory';
import ViewCategory from './Category/ViewCategory';
import CreateSlider from './Slider/CreateSlider';
import ViewSlider from './Slider/ViewSlider';
import UpdateLogo from './Logo/ShowLogo';
import ShowLogo from './Logo/ShowLogo';
import CreateLogo from './Logo/CreateLogo';

const Display = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashboard />;

      case 'createLogo':
        return <CreateLogo onSliderCreated={() => setSelectedMenu('showLogo')} />; 
      case 'showLogo':
        return <ShowLogo />;
      case 'newSlider':
        return <CreateSlider onSliderCreated={() => setSelectedMenu('viewSlider')} />;        
      case 'viewSlider':
        return <ViewSlider />;
      case 'addNewCategory':
          return <CreateCategory onCategoryCreated={() => setSelectedMenu('viewCategory')} />;        
      case 'viewCategory':
        return <ViewCategory />;
      case 'addNewProduct':
        return <AddNewProduct onProductCreated={() => setSelectedMenu('viewProducts')} />;
      case 'viewProducts':
        return <ViewProduct />;
      case 'orders':
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
    // Clear any authentication tokens, like JWT
    localStorage.removeItem('authToken'); // Remove auth token or session storage
    sessionStorage.removeItem('authToken'); // If session storage is used instead

    // Redirect the user to the login page or home page
    navigate('/login'); // Redirect to login page or home page
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex-shrink-0 p-4 
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          ${isSidebarOpen ? 'block' : 'hidden'} 
          md:block transition-all duration-300 fixed md:relative z-50 h-full`}
      >
       {/* Toggle Button */}
       <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none mb-4"
        >
          <FaBars size={24} />
        </button>
        <ul className="space-y-4">
          <li
            onClick={() => setSelectedMenu('dashboard')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'dashboard' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaHome size={20} className={`${selectedMenu === 'dashboard' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Dashboard</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('createLogo')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'createLogo' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaHome size={20} className={`${selectedMenu === 'createLogo' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Create Logo</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('showLogo')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'showLogo' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaHome size={20} className={`${selectedMenu === 'showLogo' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Show Logo</span>}
          </li>

          
          <li
            onClick={() => setSelectedMenu('newSlider')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'newSlider' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <VscGitPullRequestCreate size={20} className={`${selectedMenu === 'newSlider' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>New Slider</span>}
          </li>
          <li
            onClick={() => setSelectedMenu('viewSlider')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'viewSlider' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <TfiLayoutSlider size={20} className={`${selectedMenu === 'viewSlider' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>View Slider</span>}
          </li>
          


          <li
            onClick={() => setSelectedMenu('addNewCategory')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'createOrder' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <TbCategoryPlus  size={20} className={`${selectedMenu === 'addNewCategory' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Add New Category</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('viewCategory')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'viewCategory' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <TbCategoryFilled size={20} className={`${selectedMenu === 'viewCategory' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>View Category</span>}
          </li>


          <li
            onClick={() => setSelectedMenu('addNewProduct')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'addNewProduct' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <IoIosCreate size={20} className={`${selectedMenu === 'addNewProduct' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Create New Product</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('viewProducts')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'viewProducts' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <MdProductionQuantityLimits size={20} className={`${selectedMenu === 'viewProducts' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>View Products</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('orders')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'orders' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaPeopleCarry size={20} className={`${selectedMenu === 'orders' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Orders</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('settings')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'settings' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaCog size={20} className={`${selectedMenu === 'settings' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Settings</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('profile')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'profile' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaUser size={20} className={`${selectedMenu === 'profile' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Profile</span>}
          </li>

          <li onClick={handleLogout} className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaSignOutAlt size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      {/* Content area */}
      <div className="flex-grow p-4 md:ml-20 transition-all duration-300">
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 md:hidden bg-gray-800 p-2 rounded"
        >
          <FaBars size={24} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default Display;
