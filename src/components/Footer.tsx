
import { Github, Linkedin, Mail, MapPin, Clock, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md text-white border-t border-white/20 relative z-10 shadow-2xl">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Side - Copyright & Brand */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div>
              <p className="serif-body text-sm text-white enhanced-text drop-shadow-lg">
                © {new Date().getFullYear()} Fred Mwaniki. All rights reserved.
              </p>
              <p className="serif-body text-xs text-white/90 mt-1 enhanced-text drop-shadow-md">
                Building signals, systems, and stories—where math meets meaning.
              </p>
            </div>
          </div>

          {/* Right Side - Location, Status & Social */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Location & Status */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-sm">
              <div className="flex items-center space-x-2 text-white/90 enhanced-text">
                <MapPin className="h-3 w-3" />
                <span className="serif-body drop-shadow-sm">Based in Kenya</span>
              </div>
              
              <div className="flex items-center space-x-2 text-green-300 enhanced-text">
                <div className="h-2 w-2 bg-green-300 rounded-full animate-pulse shadow-lg"></div>
                <span className="serif-body text-sm drop-shadow-sm">Available for collaborations</span>
              </div>
              
              <div className="flex items-center space-x-2 text-white/90 enhanced-text">
                <Clock className="h-3 w-3" />
                <span className="serif-body text-sm drop-shadow-sm">UTC+3</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://linkedin.com/in/fred-mwaniki" 
                className="elegant-transition hover:text-blue-300 text-white/90 hover:scale-110 enhanced-text hover:bg-white/10 p-2 rounded-full backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://github.com/fred-mwaniki" 
                className="elegant-transition hover:text-blue-300 text-white/90 hover:scale-110 enhanced-text hover:bg-white/10 p-2 rounded-full backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="mailto:fred@example.com" 
                className="elegant-transition hover:text-blue-300 text-white/90 hover:scale-110 enhanced-text hover:bg-white/10 p-2 rounded-full backdrop-blur-sm"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider with Accent */}
        <div className="py-3 border-t border-white/20 bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <div className="flex items-center space-x-4 text-xs text-white/90 enhanced-text">
              <a href="/portfolio" className="elegant-transition hover:text-blue-300 hover:bg-white/10 px-2 py-1 rounded backdrop-blur-sm">Portfolio</a>
              <a href="/blog" className="elegant-transition hover:text-blue-300 hover:bg-white/10 px-2 py-1 rounded backdrop-blur-sm">Blog</a>
              <a href="/cv" className="elegant-transition hover:text-blue-300 hover:bg-white/10 px-2 py-1 rounded backdrop-blur-sm">CV</a>
              <a href="/contact" className="elegant-transition hover:text-blue-300 hover:bg-white/10 px-2 py-1 rounded backdrop-blur-sm">Contact</a>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-white/90 enhanced-text">
              <span className="drop-shadow-sm">Made with</span>
              <Heart className="h-3 w-3 text-red-400 animate-pulse" />
              <span className="drop-shadow-sm">and lots of</span>
              <span className="text-blue-300 font-medium drop-shadow-sm">caffeine</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
