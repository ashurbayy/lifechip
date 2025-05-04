import React from "react";
import { Clock, Shield, RefreshCw } from "lucide-react";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Immediate Access",
      description: "Critical medical information available instantly to first responders in emergency situations."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Data",
      description: "Your sensitive medical information is encrypted and protected with industry-leading security standards."
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Always Updated",
      description: "Easily update your medical information anytime through our secure online portal."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center font-medium mb-12">Why Choose LifeChip?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-light text-white mb-4 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 font-medium">{benefit.title}</h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
