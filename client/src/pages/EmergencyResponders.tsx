import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Check, 
  FileText, 
  Shield, 
  Smartphone,
  Info,
  Clock,
  CheckCircle
} from "lucide-react";

const EmergencyResponders: React.FC = () => {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">For Emergency Responders</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Accessing critical medical information has never been easier for healthcare professionals and first responders.</p>
          
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">How to Access Patient Information</h2>
                <ol className="space-y-4">
                  <AccessStep 
                    number={1}
                    title="Locate the LifeChip"
                    description="Look for the LifeChip on the patient's wristband, keychain, or medical ID bracelet."
                  />
                  <AccessStep 
                    number={2}
                    title="Scan with Any Smartphone"
                    description="Tap your NFC-enabled smartphone against the LifeChip to read the information."
                  />
                  <AccessStep 
                    number={3}
                    title="Instant Access"
                    description="Critical medical information appears immediately on your device screen."
                  />
                </ol>
                
                <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Info className="mr-2 h-5 w-5 text-blue-500" />
                    No App Required
                  </h4>
                  <p className="text-gray-600">Emergency responders don't need to download any special app. LifeChip works with the native NFC capabilities of any modern smartphone.</p>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=500&q=80" 
                  alt="Emergency medical responder using smartphone" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard 
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="Available Medical Information"
              items={[
                "Blood type and allergies",
                "Current medications and dosages",
                "Chronic conditions and diagnoses",
                "Recent surgeries or procedures",
                "Emergency contact information",
                "Primary physician contact details"
              ]}
            />
            
            <InfoCard 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Healthcare Provider Registration"
              items={[
                "Verified provider status",
                "Access to detailed patient history",
                "Integration with hospital EHR systems",
                "Audit logs for patient data access"
              ]}
              cta={{
                text: "Register as a Healthcare Provider →",
                link: "/provider-signup"
              }}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Benefits for Emergency Services</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">LifeChip provides crucial advantages for first responders and emergency medical personnel.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Clock className="h-10 w-10" />}
              title="Time-Saving"
              description="Instant access to crucial medical information when time is critical, reducing the need for patient history interviews."
            />
            
            <BenefitCard 
              icon={<AlertCircle className="h-10 w-10" />}
              title="Critical Alerts"
              description="Immediate visibility of life-threatening allergies, conditions, or medication conflicts that require special attention."
            />
            
            <BenefitCard 
              icon={<CheckCircle className="h-10 w-10" />}
              title="Accurate Information"
              description="Reliable, patient-verified medical data that eliminates guesswork in emergency situations."
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">Interested in implementing LifeChip in your emergency response team?</p>
            <Link href="/contact">
              <Button variant="default" size="lg">Contact Us for More Information</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Training Resources</h2>
            <p className="text-center text-gray-600 mb-12">We provide free training resources for emergency responders to effectively use LifeChip in the field.</p>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Available Resources</h3>
              <ul className="space-y-4">
                <li className="flex items-start border-b border-gray-200 pb-4">
                  <Smartphone className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Training Videos</h4>
                    <p className="text-gray-600 mb-2">Step-by-step instruction on accessing LifeChip information in various emergency scenarios.</p>
                    <a href="#videos" className="text-primary hover:underline">Access Training Videos</a>
                  </div>
                </li>
                
                <li className="flex items-start border-b border-gray-200 pb-4">
                  <FileText className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Downloadable Guides</h4>
                    <p className="text-gray-600 mb-2">PDF guides for quick reference on how to access and interpret LifeChip medical data.</p>
                    <a href="#guides" className="text-primary hover:underline">Download Guides</a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Department Training</h4>
                    <p className="text-gray-600 mb-2">We offer free virtual or in-person training sessions for emergency departments and first responder teams.</p>
                    <Link href="/contact">
                      <a className="text-primary hover:underline">Request Department Training</a>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 bg-blue-50 p-5 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-700">Simulation Practice Chips</h3>
                  <p className="mt-2 text-blue-600">
                    We provide free simulation LifeChips for training purposes. These chips are loaded with sample patient
                    data for practicing emergency scenarios.{" "}
                    <Link href="/contact">
                      <a className="font-medium underline">Request simulation chips</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

interface AccessStepProps {
  number: number;
  title: string;
  description: string;
}

const AccessStep: React.FC<AccessStepProps> = ({ number, title, description }) => {
  return (
    <li className="flex">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-3">
        {number}
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  cta?: {
    text: string;
    link: string;
  };
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, items, cta }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          {cta && (
            <div className="mt-4">
              <Link href={cta.link}>
                <a className="text-primary hover:underline font-medium">{cta.text}</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  );
};

export default EmergencyResponders;
