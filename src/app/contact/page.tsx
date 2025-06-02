// src/app/contact/page.tsx
import { buildBasicMetadata } from "@/lib/metadata";
import ContactForm from "./ContactForm";
import JSONLD from "@/components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Contact Us – IkoConnect",
  description:
    "Get in touch with the IkoConnect team for media, support, or collaboration inquiries.",
  path: "/contact",
  ogImage: "/images/og-contact.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Us – IkoConnect",
  url: "https://ikoconnect.com/contact",
  description:
    "Get in touch with the IkoConnect team for media, support, or collaboration inquiries.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-20">
      <JSONLD data={jsonldData} />

      <h1 className="text-4xl font-bold mb-8 text-center">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Whether you’ve got a question about features, pricing, or just
        want to say hi, we’re here to help. Fill out the form below and
        we’ll get back to you ASAP!
      </p>

      <ContactForm />
    </main>
  );
}
