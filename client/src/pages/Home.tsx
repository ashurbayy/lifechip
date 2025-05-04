import React from "react";
import { Link } from "wouter";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSecuritySection from "@/components/TrustSecuritySection";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Shield, 
  RefreshCw, 
  Nfc, 
  ShieldCheck, 
  Smartphone
} from "lucide-react";

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose LifeChip?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Clock className="h-8 w-8" />}
              title="Immediate Access"
              description="Critical medical information available instantly to first responders in emergency situations."
            />
            
            <BenefitCard 
              icon={<Shield className="h-8 w-8" />}
              title="Secure Data"
              description="Your sensitive medical information is encrypted and protected with industry-leading security standards."
            />
            
            <BenefitCard 
              icon={<RefreshCw className="h-8 w-8" />}
              title="Always Updated"
              description="Easily update your medical information anytime through our secure online portal."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How LifeChip Works</h2>
              <p className="text-gray-600 mb-6">Our NFC technology makes accessing critical medical information simple and fast for emergency personnel.</p>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Register Your LifeChip</h3>
                    <p className="text-gray-600">Purchase your LifeChip and register it to your account on our secure platform.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enter Your Medical Information</h3>
                    <p className="text-gray-600">Add your essential medical details like allergies, conditions, medications, and emergency contacts.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/how-it-works">
                  <Button variant="default">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">The Technology Behind LifeChip</h3>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <Nfc className="h-16 w-16 text-primary mb-3" />
                    <h4 className="text-lg font-semibold mb-2">NFC Technology</h4>
                    <p className="text-gray-600 text-center">Near Field Communication allows secure data transmission with a simple tap.</p>
                  </div>
                </div>
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="h-16 w-16 text-primary mb-3" />
                    <h4 className="text-lg font-semibold mb-2">Encrypted Storage</h4>
                    <p className="text-gray-600 text-center">Your medical data is securely encrypted with bank-level protection standards.</p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <Smartphone className="h-16 w-16 text-primary mb-3" />
                    <h4 className="text-lg font-semibold mb-2">Universal Compatibility</h4>
                    <p className="text-gray-600 text-center">Works with any modern smartphone or NFC-enabled device.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Trust & Security */}
      <TrustSecuritySection />
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Secure Your Medical Information?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">Register your LifeChip today and ensure emergency responders have immediate access to your critical medical information when every second counts.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register">
              <Button variant="secondary" size="lg">Register Your Chip</Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Home;
