import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-[#1B3A6B]/20 mb-4">404</h1>
      <p className="text-lg text-[#2C2C2C]/60 mb-8">Page not found</p>
      <Link
        to="/"
        className="inline-flex px-4 py-2 bg-[#C0392B] text-white rounded-md hover:bg-[#C0392B]/90"
      >
        Go Home
      </Link>
    </div>
  );
}
