import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Nfc, 
  ShieldCheck, 
  Smartphone,
  PenTool,
  UserPlus,
  Database,
  Check,
  Info
} from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">How LifeChip Works</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Our NFC technology makes accessing critical medical information simple and fast for emergency personnel.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9dc5e45fb4a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="LifeChip NFC technology demonstration" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <div className="space-y-6">
                <StepItem 
                  number={1}
                  title="Register Your LifeChip"
                  description="Purchase your LifeChip and register it to your account on our secure platform."
                />
                
                <StepItem 
                  number={2}
                  title="Enter Your Medical Information"
                  description="Add your essential medical details like allergies, conditions, medications, and emergency contacts."
                />
                
                <StepItem 
                  number={3}
                  title="Wear Your LifeChip"
                  description="Attach your LifeChip to your wristband, keychain, or any preferred location for easy access."
                />
                
                <StepItem 
                  number={4}
                  title="Emergency Access"
                  description="In an emergency, medical professionals can scan your chip with any NFC-enabled smartphone to access your information."
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
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
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Information Can You Store?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard 
              icon={<UserPlus className="h-8 w-8 text-white" />}
              title="Personal Medical Information"
              items={[
                "Blood type and rhesus factor",
                "Allergies and sensitivities",
                "Immunization history",
                "Major surgeries",
                "Organ donor status"
              ]}
            />
            
            <InfoCard 
              icon={<Database className="h-8 w-8 text-white" />}
              title="Health Conditions"
              items={[
                "Chronic conditions",
                "Current medications",
                "Dosage information",
                "Treatment history",
                "Physician notes"
              ]}
            />
            
            <InfoCard 
              icon={<PenTool className="h-8 w-8 text-white" />}
              title="Emergency Contacts"
              items={[
                "Primary emergency contact",
                "Secondary contacts",
                "Primary care physician",
                "Medical specialists",
                "Health insurance information"
              ]}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/register">
              <Button variant="default" size="lg">Register Your Chip Now</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Learn more about how LifeChip works and how it can help you.</p>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <FAQItem 
                question="How does the NFC chip work?"
                answer="The NFC (Near Field Communication) chip contains a unique identifier that, when scanned by an NFC-enabled smartphone, securely connects to our database to retrieve your medical information. The chip itself doesn't store your medical data, ensuring your privacy is maintained even if the chip is lost."
              />
              
              <FAQItem 
                question="Is my medical information secure?"
                answer="Yes, your medical information is highly secure. We use industry-standard encryption protocols, and your data is only accessible when your NFC chip is physically scanned. Additionally, our servers are HIPAA-compliant, ensuring your medical privacy is protected according to healthcare regulations."
              />
              
              <FAQItem 
                question="Do emergency responders need a special app?"
                answer="No, emergency responders don't need to download any special app. Most modern smartphones have built-in NFC readers that can interact with your LifeChip. When scanned, a secure web page opens displaying your critical medical information."
              />
              
              <FAQItem 
                question="What if my LifeChip is lost or damaged?"
                answer="If your LifeChip is lost or damaged, you can easily deactivate it through your online account. Then you can order a replacement chip and activate it with your existing medical profile. We recommend keeping your information up-to-date regardless of chip status."
              />
              
              <FAQItem 
                question="Can I have multiple LifeChips linked to my account?"
                answer="Yes, you can have multiple LifeChips linked to your account. This is useful if you want to have one on your keychain, one on a bracelet, and perhaps one on your phone case or wallet to ensure emergency responders can always find one."
              />
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r max-w-3xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-700">Have more questions?</h3>
                <p className="mt-2 text-blue-600">
                  Contact our support team for additional information about LifeChip and how it can work for your specific needs.{" "}
                  <Link href="/contact">
                    <a className="font-medium underline">Get in touch</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4 mt-1">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-primary p-4 flex items-center">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-dark mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div className={`p-4 bg-gray-50 border-t border-gray-200 ${isOpen ? 'block' : 'hidden'}`}>
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
