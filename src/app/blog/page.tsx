import Link from "next/link";
export default function BlogIndex() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul>
        <li><Link href="/blog/hello-world">hello-world</Link></li>
      </ul>
    </main>
  );
}
