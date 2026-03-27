import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const isAdmin = user && user.username === 'admin'; // Assuming 'admin' username is the admin role for now.
  const isAdminPath = location.pathname.startsWith('/admin');
  const logoPath = isAdmin ? '/admin/dashboard' : '/';

  const userLinks = [
    { name: 'Discover', path: '/discover' },
    { name: 'Travel Bookings', path: '/travel-bookings' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Trips', path: '/trips' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin/dashboard' },
  ];

  const currentLinks = isAdmin ? adminLinks : userLinks;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={logoPath} className="flex items-center space-x-2 group">
              <Plane className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold text-secondary tracking-tight">TravelMate</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdmin && (
              <Link to="/" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium text-sm">
                Home
              </Link>
            )}
            {currentLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-100">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-slate-600 font-bold text-sm">Hi, {user.firstName || user.username}</span>
                  {!isAdmin && (
                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors"
                    >
                      <BookOpen className="h-4 w-4" /> My Bookings
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-slate-900 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-red-600 transition-all shadow-lg shadow-slate-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 font-medium text-sm hover:text-primary">Login</Link>
                  <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-200">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAdmin && (
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
            )}
            {currentLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-100 flex flex-col space-y-2 px-3">
              {user ? (
                <>
                  <div className="px-3 py-2 text-slate-900 font-black text-sm uppercase tracking-widest border-b border-slate-50 mb-2">
                    Hi, {user.firstName || user.username}
                  </div>
                  {!isAdmin && (
                    <Link
                      to="/my-bookings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 w-full py-2 text-emerald-600 font-bold"
                    >
                      <BookOpen className="h-4 w-4" /> My Bookings
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-center shadow-lg active:scale-95 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-slate-600 font-medium">Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full bg-primary text-white py-2 rounded-lg font-semibold text-center">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
