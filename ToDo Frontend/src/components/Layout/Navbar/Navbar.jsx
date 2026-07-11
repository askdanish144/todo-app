import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { handleSignOut } from "../../../services/AuthServices";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleClick = async () => {
    try {
      // ✅ Pass them directly into your service function
      await handleSignOut(setIsLoggedIn, setUser);
    } catch (error) {
      console.error("Could not log out. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-slate-900 transition hover:text-indigo-600"
          onClick={() => setIsMenuOpen(false)}
        >
          ToDo App
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn ?
            <>
              <Link
                to={'/signin'}
                className="rounded-full px-4 py-2 text-sm font-medium transition text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Sign In
              </Link>

              <Link
                to={'/signup'}
                className="rounded-full px-4 py-2 text-sm font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
            :
            <button
              className="rounded-full px-4 py-2 text-sm font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleClick}>
              Sign Out
            </button>
          }

        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col gap-6 bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">ToDo App</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close navigation menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3">

          {!isLoggedIn ?
            <>
              <Link
                to={'/signin'}
                className="rounded-full px-4 py-2 text-sm font-medium transition text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Sign In
              </Link>

              <Link
                to={'/signup'}
                className="rounded-full px-4 py-2 text-sm font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
            :
            <Link
              to={'/signup'}
              className="rounded-full px-4 py-2 text-sm font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Sign Out
            </Link>
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
