import React from 'react';
import { Rocket, Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 z-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white brand-font">FreePlinko</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The premier destination for free online Plinko. Experience fair physics, instant gameplay, and a community of thousands of winners.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Game</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Play Online</a></li>
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Download App</a></li>
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Leaderboard</a></li>
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Provably Fair</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              18+ Only. Please play responsibly. This game involves risk.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} FreePlinko.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;