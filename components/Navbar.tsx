import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isGame = location.pathname === '/game';

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300">
              <Rocket className="text-white w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 brand-font">
              FreePlinko
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-pink-400 ${!isGame ? 'text-pink-400' : 'text-slate-300'}`}>
              Home
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-to-play" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              How to Play
            </a>
            
            {!isGame && (
              <Link 
                to="/game" 
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-violet-500/20 transition-all transform hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-current" />
                Play Online
              </Link>
            )}
            
            <a 
              href="https://apps.apple.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold border border-white/20 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
            >
              Get App
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 p-4 space-y-4 animate-in slide-in-from-top-5">
          <Link to="/" className="block text-base font-medium text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/game" className="block text-base font-medium text-pink-400" onClick={() => setIsOpen(false)}>Play Now</Link>
          <a href="#features" className="block text-base font-medium text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Features</a>
          <a href="https://apps.apple.com" className="block w-full text-center bg-white/10 py-2 rounded-lg font-bold mt-4">Download App</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;