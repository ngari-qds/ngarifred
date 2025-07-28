
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, BookOpen } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h1 className="serif-heading text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Hi, I'm Fred. I build signals, systems, and stories—where math meets meaning.
              </h1>
              
              <p className="serif-body text-lg lg:text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md">
                Quantitative researcher focused on alpha extraction, model innovation, and clarity through data.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-500/80 hover:bg-blue-500 text-white px-8 py-4 text-lg elegant-transition backdrop-blur-md shadow-lg hover:shadow-xl border border-blue-400/50"
                >
                  <Link to="/about">
                    About Me
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-4 text-lg elegant-transition backdrop-blur-md shadow-lg hover:shadow-xl bg-white/10"
                >
                  <Link to="/contact">
                    Contact
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Large Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
                  <img
                    src="/dga.png"
                    alt="Fred Mwaniki working on quantitative analysis"
                    className="w-full h-[500px] lg:h-[600px] object-cover rounded-xl"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="section-spacing">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group elegant-transition hover:transform hover:scale-105 bg-blue-500/15 backdrop-blur-md rounded-2xl p-6 border border-blue-300/30 shadow-xl hover:shadow-2xl">
              <div className="bg-blue-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/40 elegant-transition backdrop-blur-sm border border-blue-400/50 shadow-lg">
                <TrendingUp className="h-8 w-8 text-blue-300 drop-shadow-md" />
              </div>
              <h3 className="serif-heading text-xl font-semibold mb-2 text-white drop-shadow-md">Signal Processing</h3>
              <p className="serif-body text-blue-200 drop-shadow-sm">
                Extracting alpha from market noise through sophisticated quantitative methods.
              </p>
            </div>
            
            <div className="text-center group elegant-transition hover:transform hover:scale-105 bg-purple-500/15 backdrop-blur-md rounded-2xl p-6 border border-purple-300/30 shadow-xl hover:shadow-2xl">
              <div className="bg-purple-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/40 elegant-transition backdrop-blur-sm border border-purple-400/50 shadow-lg">
                <BarChart3 className="h-8 w-8 text-purple-300 drop-shadow-md" />
              </div>
              <h3 className="serif-heading text-xl font-semibold mb-2 text-white drop-shadow-md">Model Innovation</h3>
              <p className="serif-body text-purple-200 drop-shadow-sm">
                Building robust systems that adapt and evolve with changing market dynamics.
              </p>
            </div>
            
            <div className="text-center group elegant-transition hover:transform hover:scale-105 bg-green-500/15 backdrop-blur-md rounded-2xl p-6 border border-green-300/30 shadow-xl hover:shadow-2xl">
              <div className="bg-green-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/40 elegant-transition backdrop-blur-sm border border-green-400/50 shadow-lg">
                <BookOpen className="h-8 w-8 text-green-300 drop-shadow-md" />
              </div>
              <h3 className="serif-heading text-xl font-semibold mb-2 text-white drop-shadow-md">Clear Communication</h3>
              <p className="serif-body text-green-200 drop-shadow-sm">
                Translating complex quantitative insights into actionable intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="section-spacing">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="serif-heading text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Recent Work
            </h2>
            <p className="serif-body text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              A glimpse into current projects and research initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-xl elegant-transition hover:shadow-2xl border border-white/20 hover:border-blue-400/50">
              <h3 className="serif-heading text-xl font-semibold mb-3 text-white drop-shadow-md">Signal Decay Analysis</h3>
              <p className="serif-body text-gray-100 mb-4 drop-shadow-sm">
                Investigating the half-life of trading signals across different market regimes.
              </p>
              <Link 
                to="/portfolio" 
                className="text-blue-400 hover:text-blue-300 elegant-transition font-medium drop-shadow-sm hover:bg-blue-500/20 px-3 py-1 rounded-lg backdrop-blur-sm"
              >
                View Project →
              </Link>
            </div>
            
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-xl elegant-transition hover:shadow-2xl border border-white/20 hover:border-purple-400/50">
              <h3 className="serif-heading text-xl font-semibold mb-3 text-white drop-shadow-md">Model Drift Detection</h3>
              <p className="serif-body text-gray-100 mb-4 drop-shadow-sm">
                Developing early warning systems for systematic model degradation.
              </p>
              <Link 
                to="/portfolio" 
                className="text-purple-400 hover:text-purple-300 elegant-transition font-medium drop-shadow-sm hover:bg-purple-500/20 px-3 py-1 rounded-lg backdrop-blur-sm"
              >
                View Project →
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="elegant-transition bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 shadow-lg hover:shadow-xl">
              <Link to="/portfolio">
                View All Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
