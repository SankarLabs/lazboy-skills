import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <BookOpen className="w-6 h-6" />
            <span>La-Z-Boy Skills</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/browse" className={linkClass('/browse')}>Browse</Link>
            <Link
              to="/submit"
              className="ml-2 inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Submit Skill
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
