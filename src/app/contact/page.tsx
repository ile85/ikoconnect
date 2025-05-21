// src/app/contact/page.tsx
import { buildBasicMetadata } from "@/lib/metadata";
import ContactForm from "./ContactForm";

export const metadata = buildBasicMetadata({
  title: "Contact Us – IkoConnect",
  description: "Get in touch with the IkoConnect team.",
  path: "/contact",
  ogImage: "/images/og-contact.png",
});

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <ContactForm />
    </main>
  );
}
