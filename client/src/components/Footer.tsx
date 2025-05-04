import React from "react";
import { Link } from "wouter";
import { Shield } from "lucide-react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold text-white font-medium">LifeChip</span>
            </div>
            <p className="text-gray-400 mb-4">Providing critical medical information when it matters most.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <a className="text-gray-400 hover:text-white transition-colors">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a className="text-gray-400 hover:text-white transition-colors">Register Chip</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a className="text-gray-400 hover:text-white transition-colors">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/emergency-responders">
                  <a className="text-gray-400 hover:text-white transition-colors">For Responders</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <a className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </Link>
              </li>
              <li>
                <a href="#hipaa" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</a>
              </li>
              <li>
                <a href="#data-protection" className="text-gray-400 hover:text-white transition-colors">Data Protection</a>
              </li>
              <li>
                <a href="#cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-medium">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="text-primary mr-2 h-5 w-5 mt-0.5" />
                <span className="text-gray-400">123 Medical Drive<br/>Healthcare City, HC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-primary mr-2 h-5 w-5" />
                <span className="text-gray-400">(800) LIFE-CHIP</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2 h-5 w-5" />
                <span className="text-gray-400">support@lifechip.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LifeChip Medical Information Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
