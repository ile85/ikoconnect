// src/app/community/page.tsx
import JSONLD from "@/components/JSONLD";
import { buildBasicMetadata } from "@/lib/metadata";

export const metadata = buildBasicMetadata({
  title: "Community | IkoConnect",
  description: "Join IkoConnect newsletter and Discord community.",
  path: "/community",
  ogImage: "/images/og-community.png", // adjust to your actual OG image path if needed
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Community | IkoConnect",
  description: "Sign up for our newsletter and join our Discord community.",
  url: "https://ikoconnect.com/community",
};

export default function CommunityPage() {
  return (
    <>
      {/* Inject JSON-LD for SEO */}
      <JSONLD data={jsonldData} />

      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <h1 className="text-4xl font-extrabold mb-6">Join the Community</h1>
        <p className="text-lg text-gray-600 mb-10">
          Sign up to get our newsletter and connect with fellow freelancers.
        </p>

        {/* Newsletter Signup Form */}
        <form className="w-full max-w-sm mb-8">
          <input
            type="email"
            placeholder="Your email address"
            className="input-field mb-4"
          />
          <button type="submit" className="btn w-full">
            Subscribe
          </button>
        </form>

        {/* Join Discord Button */}
        <a
          href="https://discord.gg/your-discord-invite"
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-indigo-600 hover:bg-indigo-700"
        >
          Join Discord
        </a>
      </main>
    </>
  );
}
