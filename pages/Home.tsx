import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Download, Zap, ShieldCheck, Trophy, Smartphone, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-0">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-semibold tracking-wide animate-bounce-slow">
            #1 RATED ONLINE PLINKO GAME
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            DROP THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">BALL</span><br />
            WIN IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">ALL</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate arcade experience is here. High multipliers, instant play, and no downloads required for web users. Are you ready to take the risk?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/game"
              className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="fill-slate-900 w-5 h-5" /> 
                Play Online Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Link>
            
            <a 
              href="https://apps.apple.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-white/20 hover:border-white/50 text-white rounded-full font-bold text-lg flex items-center gap-2 transition-all hover:bg-slate-800"
            >
              <Download className="w-5 h-5" />
              Get the iOS App
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex justify-center gap-8 text-slate-500 opacity-70">
            <div className="flex items-center gap-2"><ShieldCheck size={16}/> Provably Fair</div>
            <div className="flex items-center gap-2"><Zap size={16}/> Instant Loads</div>
            <div className="flex items-center gap-2"><Trophy size={16}/> Daily Winners</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose <span className="text-pink-500">FreePlinko?</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">We've rebuilt the classic game from the ground up for the modern web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="w-10 h-10 text-yellow-400" />, 
                title: "Zero Latency", 
                desc: "Our optimized physics engine runs at 60FPS directly in your browser. No lag, just smooth dropping action." 
              },
              { 
                icon: <ShieldCheck className="w-10 h-10 text-green-400" />, 
                title: "100% Fair", 
                desc: "Every drop is calculated using a cryptographically secure random number generator. Transparency is our priority." 
              },
              { 
                icon: <Smartphone className="w-10 h-10 text-purple-400" />, 
                title: "Mobile First", 
                desc: "Play on the go. Our responsive design ensures the perfect experience on iPhone, iPad, or Android." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-pink-500/30 transition-all hover:-translate-y-2 group">
                <div className="mb-6 p-4 rounded-xl bg-slate-950 inline-block shadow-lg group-hover:shadow-pink-500/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-pink-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
               <h2 className="text-4xl md:text-5xl font-bold mb-6">Mastering the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Plinko Board</span></h2>
               <div className="space-y-8">
                 {[
                   { step: "01", title: "Set Your Bet", text: "Choose your wager amount. Start small to test the waters or go big for maximum returns." },
                   { step: "02", title: "Adjust Risk Level", text: "Select Low, Medium, or High risk. High risk means bigger multipliers at the edges, but lower in the center." },
                   { step: "03", title: "Drop & Win", text: "Click to drop the ball. Watch it bounce through the pins and land in a multiplier slot. It's that simple!" }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6">
                     <span className="text-5xl font-black text-white/10">{item.step}</span>
                     <div>
                       <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                       <p className="text-slate-400">{item.text}</p>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="mt-10">
                 <Link to="/game" className="inline-flex items-center gap-2 text-pink-400 font-bold hover:text-pink-300 transition-colors">
                   Start Playing Tutorial <ArrowRight size={20} />
                 </Link>
               </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 shadow-2xl p-4 flex items-center justify-center relative overflow-hidden group">
                 {/* Decorative elements representing the game */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 <div className="w-[80%] h-[80%] border-2 border-dashed border-white/20 rounded-full animate-spin-slow"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <div className="w-20 h-20 bg-pink-500 rounded-full blur-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                   <Zap className="w-24 h-24 text-white relative z-10 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-20 bg-slate-950 text-slate-400">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-invert prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">What is Plinko? The Origins of the Game</h2>
            <p className="mb-6">
              Plinko is a game of chance that originated from the popular American game show "The Price is Right" in 1983. 
              The concept is deceptively simple yet endlessly engaging: a player drops a chip (or ball) down a pegboard, 
              watching it bounce randomly until it lands in a slot at the bottom, each assigned a different cash value.
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">How Online Plinko Works</h3>
            <p className="mb-6">
              Our digital version recreates this excitement using advanced physics simulations. Unlike the TV show, 
              FreePlinko allows you to customize your risk level. Adjusting the number of rows (from 8 to 16) 
              dramatically changes the volatility of the game. More rows mean higher potential multipliers at the edges, 
              but a harder path to reach them.
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">Winning Strategies</h3>
            <p>
              While Plinko is primarily a game of luck, smart bankroll management is key. Many players prefer the "Low" 
              risk setting for consistent, smaller wins, while thrill-seekers opt for "High" risk with 16 rows to chase 
              the elusive 1000x multiplier.
            </p>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-900 to-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold mb-8">Ready to Test Your Luck?</h2>
          <p className="text-xl text-indigo-200 mb-10">Join thousands of players winning big every day.</p>
          <div className="flex justify-center gap-4">
            <Link to="/game" className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
              Play Now - It's Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;