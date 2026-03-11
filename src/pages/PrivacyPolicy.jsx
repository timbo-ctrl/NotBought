import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900">Privacy Policy</h1>
          <p className="text-stone-600 mt-2">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="prose prose-lg max-w-none text-stone-700">
          <p>
            Welcome to NotBought ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
          </p>

          <h2>1. INFORMATION WE COLLECT</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect via the Application includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register with the Application. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Application.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Application.
            </li>
            <li>
              <strong>Data from Social Networks:</strong> User information from social networking sites, such as Google, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.
            </li>
             <li>
              <strong>Saved Businesses:</strong> We collect information on the businesses you save to your "Favorites" list to provide the core functionality of our service.
            </li>
          </ul>

          <h2>2. USE OF YOUR INFORMATION</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Email you regarding your account.</li>
            <li>Enable user-to-user communications.</li>
            <li>Fulfill and manage searches, and other transactions related to the Application.</li>
            <li>Improve the efficiency and operation of the Application.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
            <li>Notify you of updates to the Application.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Process payments and refunds.</li>
            <li>Request feedback and contact you about your use of the Application.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
          </ul>

          <h2>3. DISCLOSURE OF YOUR INFORMATION</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </li>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </li>
          </ul>

          <h2>4. SECURITY OF YOUR INFORMATION</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. POLICY FOR CHILDREN</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
          </p>

          <h2>6. CONTACT US</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: info@200lab.co
          </p>
        </div>
      </div>
    </div>
  );
}