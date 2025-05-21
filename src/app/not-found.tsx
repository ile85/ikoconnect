// src/app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops — we couldn’t find that page.</p>
      <a
        href="/"
        className="px-6 py-3 bg-[#00957F] text-white rounded-md hover:bg-[#007A60] transition"
      >
        Go back home
      </a>
    </main>
  );
}
