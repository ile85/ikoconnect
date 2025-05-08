import React from "react";

export default function PrivacyPage() {
  return (
    <section className="container mx-auto px-6 py-16 space-y-8">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>

      <p className="text-gray-700">
        At IkoConnect, we respect your privacy and are committed to protecting
        your personal data. This privacy policy will inform you about how we
        collect, use, and safeguard your data when you visit our website.
      </p>
      <p className="text-gray-700">
        <strong>1. Data We Collect:</strong> We collect information you provide
        directly, such as name, email address, and message when you fill out
        our contact form or subscribe to our newsletter. We also collect
        usage data (e.g. pages viewed, time spent) via cookies and analytics
        tools.
      </p>
      <p className="text-gray-700">
        <strong>2. How We Use Your Data:</strong> We use your contact details
        to reply to inquiries, send newsletters, and deliver exclusive
        offers. Usage data helps us improve site performance and tailor
        content to your interests.
      </p>
      <p className="text-gray-700">
        <strong>3. Data Sharing:</strong> We do not sell your personal data. We
        may share data with trusted third-party services (e.g. email
        providers, analytics) under strict confidentiality.
      </p>
      <p className="text-gray-700">
        <strong>4. Your Rights:</strong> You can request access, correction,
        or deletion of your personal data at any time by contacting us at
        privacy@ikoconnect.com.
      </p>
      <p className="text-gray-700">
        <strong>5. Changes to This Policy:</strong> We may update this policy
        periodically. The date at the top indicates the last revision.
      </p>
    </section>
  );
}
