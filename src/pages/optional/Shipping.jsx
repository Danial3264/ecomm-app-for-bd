import React from 'react';

const Shipping = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Shipping Policy</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Processing Time</h2>
          <p className="text-gray-700 mb-2">
            Orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Shipping Rates & Delivery Estimates</h2>
          <p className="text-gray-700 mb-2">
            Shipping charges for your order will be calculated and displayed at checkout. Delivery time varies based on location but typically takes 5-7 business days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. International Shipping</h2>
          <p className="text-gray-700 mb-2">
            We currently do not ship outside [Country]. Please check back with us for updates on international shipping.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Contact Us</h2>
          <p className="text-gray-700 mb-2">
            For questions about shipping or tracking your order, please contact us at:
          </p>
          <p className="text-gray-700 font-semibold">
            Email: <a href="mailto:support@sunnahplus.com" className="text-blue-600 hover:underline">support@sunnahplus.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
