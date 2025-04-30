export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} FastTyper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
