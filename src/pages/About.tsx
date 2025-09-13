
import { Download, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import quotesData from "@/quotes.json";

const About = () => {
  const QUOTES = quotesData.map((q) => q.quote);
  const [currentQuote, setCurrentQuote] = useState(0);

  const timelineSteps = [
    {
      title: "Curiosity",
      description: "Started with questions about market patterns and human behavior in financial systems.",
    },
    {
      title: "Skills",
      description: "Developed expertise in quantitative methods, machine learning, and systematic trading.",
    },
    {
      title: "Current Focus",
      description: "Building robust alpha generation systems while maintaining intellectual rigor and clarity.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [QUOTES.length]);

  return (
    <div className="section-spacing">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* header + animated cards section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left content */}
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <h1 className="serif-heading text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in drop-shadow-lg">
                  About Fred
                </h1>
                <p className="serif-body text-xl text-gray-100 leading-relaxed mb-8 animate-fade-in drop-shadow-md">
                  A deep dive into the professional journey and philosophy behind the work.
                </p>
              </div>
              
              {/* Philosophy */}
              <div className="bg-white/10 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/20 animate-fade-in hover:shadow-2xl transition-all duration-300 shadow-lg">
                <h2 className="serif-heading text-xl font-semibold text-white mb-4 drop-shadow-md">
                  Research Philosophy
                </h2>
                <div className="space-y-4">
                  <p className="serif-body text-lg leading-relaxed text-gray-100 drop-shadow-sm">
                    His work focuses on signal processing, model robustness, and the critical challenge of maintaining edge in adaptive market environments.
                  </p>
                  <p className="serif-body text-lg leading-relaxed text-blue-200 drop-shadow-sm">
                    Fred believes that the most powerful insights emerge when rigorous quantitative methods meet clear, purposeful communication.
                  </p>
                  <p className="serif-body text-lg leading-relaxed text-gray-100 drop-shadow-sm">
                    He approaches each project with intellectual curiosity and a commitment to building systems that not only perform but also provide meaningful understanding of the underlying market mechanisms.
                  </p>
                </div>
              </div>
              
              {/* expertise + focus cards */}
              <div className="grid gap-4">
                <div
                  className="bg-blue-500/15 backdrop-blur-md p-5 rounded-2xl border border-blue-300/30 animate-fade-in hover:scale-105 transition-all duration-300 hover:shadow-xl shadow-lg"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="serif-heading text-lg font-semibold text-white mb-2 drop-shadow-md">
                    Core Expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-3 serif-body text-blue-200 text-sm">
                    {[
                      "Statistical Modeling",
                      "Machine Learning",
                      "Systematic Trading",
                      "Signal Processing",
                    ].map((skill) => (
                      <div key={skill} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 shadow-sm" />
                        <span className="drop-shadow-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div
                  className="bg-purple-500/15 backdrop-blur-md p-5 rounded-2xl border border-purple-300/30 animate-fade-in hover:scale-105 transition-all duration-300 hover:shadow-xl shadow-lg"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="serif-heading text-lg font-semibold text-white mb-2 drop-shadow-md">
                    Current Focus
                  </h3>
                  <p className="serif-body text-purple-200 text-sm drop-shadow-sm">
                    Building robust alpha generation systems while maintaining intellectual rigor and clarity.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Profile Image */}
            <div className="order-1 lg:order-2">
              <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/20 hover:shadow-2xl transition-all duration-500 shadow-xl">
                  <img
                    src="/Fred-Img.jpg"
                    alt="Fred Mwaniki - Quantitative Researcher"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-2xl -z-10 animate-pulse backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quote carousel */}
        <section className="mb-16">
          <div className="text-center">
            <div className="bg-black/20 backdrop-blur-md p-12 rounded-2xl min-h-[200px] flex items-center justify-center border border-white/20 shadow-2xl">
              <div className="max-w-2xl">
                <Quote className="h-8 w-8 text-blue-400 mx-auto mb-6 opacity-80 drop-shadow-md" />
                <blockquote className="serif-heading text-2xl lg:text-3xl font-medium text-white italic drop-shadow-lg">
                  "{QUOTES[currentQuote]}"
                </blockquote>
                <cite className="serif-body text-gray-300 mt-4 block drop-shadow-sm">— Fred Mwaniki</cite>
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              {QUOTES.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-3 h-3 rounded-full elegant-transition shadow-md ${
                    index === currentQuote ? "bg-blue-400" : "bg-white/40"
                  }`}
                  aria-label={`Quote ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Timeline */}
        <section className="mb-16">
          <h2 className="serif-heading text-3xl font-bold text-white text-center mb-12 drop-shadow-lg">
            Journey: Curiosity → Conviction
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-400/40 hidden lg:block shadow-sm" />
            <div className="space-y-12 lg:space-y-16">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:text-left text-center`}
                >
                  <div className="lg:w-5/12 w-full">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                      <h3 className="serif-heading text-xl font-semibold text-white mb-3 drop-shadow-md">
                        {step.title}
                      </h3>
                      <p className="serif-body text-gray-200 drop-shadow-sm">{step.description}</p>
                    </div>
                  </div>
                  <div className="lg:w-2/12 w-full flex justify-center my-4 lg:my-0">
                    <div className="w-4 h-4 bg-blue-400 rounded-full border-4 border-white/20 shadow-lg backdrop-blur-sm" />
                  </div>
                  <div className="lg:w-5/12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Download */}
        <section className="text-center">
          <div className="bg-green-500/15 backdrop-blur-md p-8 rounded-2xl border border-green-300/30 shadow-xl">
            <h3 className="serif-heading text-2xl font-semibold text-white mb-4 drop-shadow-md">
              Professional Profile
            </h3>
            <p className="serif-body text-green-200 mb-6 drop-shadow-sm">
              Download a comprehensive one‑page profile for a deeper look into Fred's background and expertise.
            </p>
            <Button
              size="lg"
              className="bg-green-500/80 hover:bg-green-500 text-white border border-green-400/50 backdrop-blur-md elegant-transition shadow-lg hover:shadow-xl"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Profile PDF
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
