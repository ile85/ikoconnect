// src/app/newsletter/page.tsx
import { buildBasicMetadata } from "@/lib/metadata";
import NewsletterForm from "./NewsletterForm";

export const metadata = buildBasicMetadata({
  title: "Newsletter – IkoConnect",
  description: "Join our newsletter for weekly freelance tips & tools.",
  path: "/newsletter",
  ogImage: "/images/og-newsletter.png",
});

export default function NewsletterPage() {
  return (
    <section className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Join Our Newsletter</h1>
      <p className="text-lg text-gray-700 mb-8">
        Get weekly remote work tips, tool reviews, and exclusive deals delivered
        straight to your inbox.
      </p>
      <NewsletterForm />
    </section>
  );
}
