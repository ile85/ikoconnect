import React from "react";
import { buildBasicMetadata } from "@/lib/metadata";

export const metadata = buildBasicMetadata({
  title: "Terms of Service – IkoConnect",
  description: "Review the terms & conditions for using IkoConnect.",
  path: "/terms",
  ogImage: "/images/og-terms.png",
});

export default function TermsPage() {
  return (
    <section className="container mx-auto px-6 py-16 space-y-8">
      <h1 className="text-4xl font-bold">Terms of Service</h1>

      <p className="text-gray-700">
        Welcome to IkoConnect! These Terms of Service (“Terms”) govern your
        use of our website and services. By accessing or using IkoConnect, you
        agree to be bound by these Terms.
      </p>
      <p className="text-gray-700">
        <strong>1. Services Provided:</strong> We offer a platform for remote
        work resources, job listings, and productivity tools. All content is
        for informational purposes only.
      </p>
      <p className="text-gray-700">
        <strong>2. User Conduct:</strong> You agree not to post harmful,
        defamatory, or illegal content. You are responsible for all
        information you submit.
      </p>
      <p className="text-gray-700">
        <strong>3. Intellectual Property:</strong> All content, logos, and
        trademarks on this site are owned by IkoConnect. You may not use any
        materials without our written permission.
      </p>
      <p className="text-gray-700">
        <strong>4. Limitation of Liability:</strong> IkoConnect is not liable
        for any direct or indirect damages arising from your use of the
        website.
      </p>
      <p className="text-gray-700">
        <strong>5. Changes to Terms:</strong> We may revise these Terms at any
        time. The “Last Updated” date will reflect changes. Continued use
        indicates acceptance.
      </p>
      <p className="text-gray-700">
        <strong>Contact Us:</strong> If you have questions about these Terms,
        email support@ikoconnect.com.
      </p>
    </section>
  );
}
