export default function Footer() {
  return (
    <footer className="bg-indigo-50 text-indigo-600 text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} FastTyper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
