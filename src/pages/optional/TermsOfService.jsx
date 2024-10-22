import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>

        <p className="text-gray-700 mb-4">
          Please read these Terms of Service carefully before using our website. By accessing or using our service, you agree to be bound by these terms.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-2">
            By accessing and using our website, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, you are not authorized to use the website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Modifications to the Terms</h2>
          <p className="text-gray-700 mb-2">
            We reserve the right to modify or replace these terms at any time. Changes to the terms will be effective immediately upon posting on this page. It is your responsibility to review these terms periodically for updates.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. User Responsibilities</h2>
          <p className="text-gray-700 mb-2">
            As a user of our website, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Use the website only for lawful purposes and in compliance with all applicable laws.</li>
            <li>Not engage in any activity that could harm the website, its content, or its users.</li>
            <li>Not attempt to access or use another user's account without permission.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Termination of Access</h2>
          <p className="text-gray-700 mb-2">
            We reserve the right to terminate or suspend your access to the website at any time, without notice, for conduct that we believe violates these terms or is harmful to other users.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-700 mb-2">
            We are not responsible for any damages or losses resulting from your use of the website or any content therein. Use of the website is at your own risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Governing Law</h2>
          <p className="text-gray-700 mb-2">
            These terms will be governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Contact Information</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-gray-700 font-semibold">Email: support@sunnahplus.com</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
