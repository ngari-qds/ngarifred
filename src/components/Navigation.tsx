
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/cv", label: "CV / Docs" },
    { path: "/quotes", label: "Quotes" },
    { path: "/resources", label: "Resources" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-2xl border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/15 to-background/20 backdrop-blur-xl" />
      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced styling */}
          <Link to="/" className="serif-heading text-2xl font-bold text-white-glass elegant-transition hover:text-blue-glass enhanced-heading group">
            <span className="relative">
              Fred Mwaniki
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </span>
          </Link>

          {/* Desktop Navigation with enhanced glass effects */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`serif-body text-sm elegant-transition enhanced-text relative group ${
                  isActive(item.path)
                    ? "text-white-glass font-semibold"
                    : "text-gray-glass hover:text-white-glass"
                }`}
              >
                <div className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-glass-blue border border-blue-400/30 shadow-lg shadow-blue-500/20"
                    : "hover:bg-glass-light border border-transparent hover:border-white/20 hover:shadow-lg hover:shadow-white/10"
                }`}>
                  {item.label}
                </div>
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-lg -z-10" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions with enhanced styling */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Search modal")}
              className="elegant-transition text-gray-glass hover:text-white-glass glass-button rounded-full hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = 'mailto:fred@fredmwaniki.com'}
              className="elegant-transition text-gray-glass hover:text-white-glass glass-button rounded-full hover:shadow-lg hover:shadow-green-500/20"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button with enhanced styling */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = 'mailto:fred@fredmwaniki.com'}
              className="elegant-transition text-gray-glass hover:text-white-glass glass-button rounded-full"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="elegant-transition text-gray-glass hover:text-white-glass glass-button rounded-full"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with enhanced glass effects */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-white/10">
            <div className="absolute inset-0 bg-glass-dark backdrop-blur-xl rounded-b-2xl" />
            <div className="relative flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`serif-body text-base elegant-transition enhanced-text group ${
                    isActive(item.path)
                      ? "text-white-glass font-semibold"
                      : "text-gray-glass hover:text-white-glass"
                  }`}
                >
                  <div className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-glass-blue border border-blue-400/30 shadow-lg shadow-blue-500/20"
                      : "hover:bg-glass-light border border-transparent hover:border-white/20"
                  }`}>
                    {item.label}
                  </div>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="justify-start elegant-transition text-gray-glass hover:text-white-glass glass-button rounded-xl mt-2"
                onClick={() => console.log("Search modal")}
              >
                <Search className="h-4 w-4 mr-3" />
                Search (⌘K)
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
