import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
        
        <p className="text-gray-700 mb-4">
          For any inquiries, feel free to reach out to us at:
        </p>
        
        <p className="text-gray-700 font-semibold text-xl">
          Email: <a href="mailto:support@sunnahplus.com" className="text-blue-600 hover:underline">support@sunnahplus.com</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
