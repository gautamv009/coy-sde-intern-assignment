import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">

        {/* Header */}
        <header className="border-b px-5 py-4">
          <h1 className="text-2xl font-bold">Coy</h1>
        </header>

        {/* Main Content */}
        <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h2 className="text-3xl font-bold">
            Discover people
          </h2>

          <p className="mt-3 text-gray-500">
            Find people, explore profiles and discover mutual connections.
          </p>

          <Link
            href="/discover"
            className="mt-6 rounded-full bg-black px-6 py-3 font-medium text-white"
          >
            Start Discovering
          </Link>
        </section>

        {/* Bottom Navigation */}
        <nav className="grid grid-cols-3 border-t bg-white">
          
          <Link
            href="/"
            className="py-4 text-center text-sm font-medium"
          >
            🏠 Home
          </Link>

          <Link
            href="/discover"
            className="py-4 text-center text-sm font-medium"
          >
            ❤️ Discover
          </Link>

          <Link
            href="/matches"
            className="py-4 text-center text-sm font-medium"
          >
            💙 Matches
          </Link>

        </nav>

      </div>
    </main>
  );
}