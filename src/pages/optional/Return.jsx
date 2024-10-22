import React from 'react';

const Returns = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Returns Policy</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Eligibility for Returns</h2>
          <p className="text-gray-700 mb-2">
            We accept returns within 3 days of purchase. To be eligible for a return, your item must be unused and in the same condition that you received it.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Refund Process</h2>
          <p className="text-gray-700 mb-2">
            Once we receive your return, we will inspect the item and notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be automatically applied to your original method of payment within a few days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Shipping for Returns</h2>
          <p className="text-gray-700 mb-2">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Contact Us</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about our returns policy, please contact us at:
          </p>
          <p className="text-gray-700 font-semibold">
            Email: <a href="mailto:support@sunnahplus.com" className="text-blue-600 hover:underline">support@sunnahplus.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Returns;
