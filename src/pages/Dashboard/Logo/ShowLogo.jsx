import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowLogo = () => {
  const [logos, setLogos] = useState([]);

  // Fetch logos when the component mounts
  useEffect(() => {
    axios.get('/logo')
      .then(response => {
        setLogos(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the logos!", error);
      });
  }, []);

  // Delete logo function
  const deleteLogo = (id) => {
    if (window.confirm("Are you sure you want to delete this logo?")) {
      axios.delete(`/logo/${id}`)
        .then(() => {
          setLogos(logos.filter(logo => logo.id !== id));
        })
        .catch(error => {
          console.error("There was an error deleting the logo!", error);
        });
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Logo List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos.map((logo) => (
          <div key={logo.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src={`../../../assets/images/${logo.logo}`} 
              alt="Logo" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <button 
                onClick={() => deleteLogo(logo.id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowLogo;
