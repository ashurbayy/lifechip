import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Shield } from "lucide-react";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isLoading } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold text-primary font-medium">LifeChip</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`font-medium ${isActive("/") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            Home
          </Link>
          <Link href="/how-it-works" className={`font-medium ${isActive("/how-it-works") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            How It Works
          </Link>
          <Link href="/emergency-responders" className={`font-medium ${isActive("/emergency-responders") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            For Responders
          </Link>
          <Link href="/contact" className={`font-medium ${isActive("/contact") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            Contact
          </Link>
          
          {isLoading ? (
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          ) : user ? (
            <>
              <Link href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button variant="default">Register Chip</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white border-t ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2 space-y-2">
          <Link href="/" onClick={closeMobileMenu} className={`block py-2 font-medium ${isActive("/") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            Home
          </Link>
          <Link href="/how-it-works" onClick={closeMobileMenu} className={`block py-2 font-medium ${isActive("/how-it-works") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            How It Works
          </Link>
          <Link href="/emergency-responders" onClick={closeMobileMenu} className={`block py-2 font-medium ${isActive("/emergency-responders") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            For Responders
          </Link>
          <Link href="/contact" onClick={closeMobileMenu} className={`block py-2 font-medium ${isActive("/contact") ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors`}>
            Contact
          </Link>
          
          {isLoading ? (
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          ) : user ? (
            <Link href="/dashboard" onClick={closeMobileMenu} className="block py-2 bg-primary text-white px-4 rounded-md hover:bg-primary-dark transition-colors">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/register" onClick={closeMobileMenu} className="block py-2 bg-primary text-white px-4 rounded-md hover:bg-primary-dark transition-colors">
                Register Chip
              </Link>
              <Link href="/login" onClick={closeMobileMenu} className="block py-2 mt-2 text-primary border border-primary px-4 rounded-md hover:bg-primary hover:text-white transition-colors">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
