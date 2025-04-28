import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Fast Typer</span>
            <img className="h-11 w-auto" src="/typing_logo.png" alt="Typing Logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <img src="/icons/menu.svg" alt="Menu" className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/" className="text-sm/6 font-semibold text-gray-900">Home</Link>
          <Link href="/leaderboard" className="text-sm/6 font-semibold text-gray-900">Leaderboard</Link>
          <Link href="/how-it-works" className="text-sm/6 font-semibold text-gray-900">How it works</Link>
          <Link href="/practice" className="text-sm/6 font-semibold text-gray-900">Practice Mode</Link>
          <Link href="/profile" className="text-sm/6 font-semibold text-gray-900">Profile</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/login" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu open state. */}
      <div className="lg:hidden" role="dialog" aria-modal="true">
        {/* Background backdrop */}
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Fast Typer</span>
              <img className="h-11 w-auto" src="/typing_logo.png" alt="Typing Logo" />
            </Link>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Home
                </Link>
                <Link href="/leaderboard" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Leaderboard
                </Link>
                <Link href="/how-it-works" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  How it works
                </Link>
                <Link href="/practice" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Practice Mode
                </Link>
              </div>
              <div className="py-6">
                <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
