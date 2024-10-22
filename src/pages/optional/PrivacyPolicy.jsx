import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          Welcome to our Privacy Policy page. Your privacy is critically important to us.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 mb-2">
            We collect various types of information, including:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Log data including browser type, IP address, and visited pages.</li>
            <li>Cookies to enhance user experience.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-2">
            We may use your information in the following ways:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>To improve our services and personalize your experience.</li>
            <li>To communicate with you regarding updates, promotions, and customer support.</li>
            <li>To monitor and analyze usage patterns to improve site performance.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Data Security</h2>
          <p className="text-gray-700 mb-2">
            We are committed to protecting your personal information and use appropriate security measures to do so.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Sharing Your Information</h2>
          <p className="text-gray-700 mb-2">
            We do not sell, trade, or rent your personal information to others. We may share information with trusted partners for business purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Changes to This Policy</h2>
          <p className="text-gray-700 mb-2">
            We may update our Privacy Policy from time to time. You are encouraged to review this page periodically for any changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Contact Us</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700 font-semibold">Email: support@sunnahplus.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
