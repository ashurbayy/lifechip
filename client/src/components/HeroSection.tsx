import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Your Medical Information, Always Accessible
            </h1>
            <p className="text-lg mb-8">
              LifeChip enables emergency responders to access your critical medical information when seconds count. A simple tap of your NFC chip could save your life.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Register Your Chip
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Medical professional using NFC technology"
              className="rounded-lg shadow-xl w-full h-auto"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
