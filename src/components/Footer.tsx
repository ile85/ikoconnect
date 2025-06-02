import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t mt-12 text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          &copy; {currentYear}{" "}
          <span className="font-semibold text-primary">IkoConnect</span>. All rights reserved.
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
          <Link href="/terms" className="hover:text-primary hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-primary hover:underline">
            Privacy
          </Link>
          <Link href="/legal" className="hover:text-primary hover:underline">
            Legal
          </Link>
        </div>
      </div>
      <div className="text-center text-xs px-4 pb-6 text-gray-500 dark:text-gray-400">
        Some job links may be affiliate links that help us earn a small commission. Thank you for supporting IkoConnect.
      </div>
    </footer>
  );
}
