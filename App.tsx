import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Game from './pages/Game';

// Wrapper to conditionally render layout elements if needed, 
// though we want Header/Footer on all pages for this design.
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Auto-scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://cdn.svgator.com/images/2022/06/use-svg-as-background-image-particle-animation.svg')] opacity-20 pointer-events-none z-0"></div>
      <Navbar />
      <main className="flex-grow z-10 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;