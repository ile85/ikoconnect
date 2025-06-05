// /var/www/ikoconnect/src/app/newsletter/page.tsx
import { buildBasicMetadata } from "../../lib/metadata";
import NewsletterForm from "./NewsletterForm";
import JSONLD from "../../components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Newsletter – IkoConnect",
  description: "Join our newsletter for weekly freelance tips & tools.",
  path: "/newsletter",
  ogImage: "/images/og-newsletter.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Newsletter – IkoConnect",
  url: "https://ikoconnect.com/newsletter",
  description: metadata.description,
};

export default function NewsletterPage() {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 py-24">
      <JSONLD data={jsonldData} />

      {/* Decorative Background Circles */}
      <span className="absolute -top-16 -left-16 w-64 h-64 bg-[#00957F] opacity-20 rounded-full animate-pulse"></span>
      <span className="absolute bottom-0 right-0 w-48 h-48 bg-[#00957F] opacity-20 rounded-full"></span>

      <div className="relative container mx-auto px-6 text-center z-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Join Our Newsletter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Get weekly remote work tips, in-depth tool reviews, and exclusive deals
          delivered straight to your inbox. No spam—just high-value content.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
