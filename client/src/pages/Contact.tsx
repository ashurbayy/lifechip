import React from "react";
import { Link } from "wouter";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MessageSquare
} from "lucide-react";

const Contact: React.FC = () => {
  const faqs = [
    {
      question: "How secure is my medical information?",
      answer: "Your medical information is encrypted using industry-standard security protocols. Only authorized healthcare providers can access your information by scanning your LifeChip with an NFC-enabled device. We comply with HIPAA and other medical data protection regulations to ensure your information remains secure."
    },
    {
      question: "What happens if I lose my LifeChip?",
      answer: "If you lose your LifeChip, you can immediately deactivate it through your online account. This prevents anyone from accessing your information. You can then order a replacement chip and activate it with your existing account information."
    },
    {
      question: "Can I update my medical information?",
      answer: "Yes, you can update your medical information at any time by logging into your account. Any changes you make are immediately reflected in the data that healthcare providers will see when they scan your LifeChip."
    },
    {
      question: "How do emergency responders access my information?",
      answer: "Emergency responders can access your medical information by simply scanning your LifeChip with any NFC-enabled smartphone. No special app is required. The chip contains a secure link to your medical profile."
    },
    {
      question: "Is there a subscription fee?",
      answer: "LifeChip has a one-time purchase cost for the physical chip, and an optional annual subscription for premium features. Basic emergency medical information storage is available with no recurring fees."
    }
  ];

  return (
    <>
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact & Support</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Have questions about LifeChip? Our support team is here to help you.</p>
          
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <ContactInfo 
                    icon={<MapPin className="h-5 w-5" />}
                    title="Address"
                    content={<>123 Medical Drive<br/>Healthcare City, HC 12345</>}
                  />
                  
                  <ContactInfo 
                    icon={<Phone className="h-5 w-5" />}
                    title="Phone"
                    content={<>(800) LIFE-CHIP<br/>(800) 543-3244</>}
                  />
                  
                  <ContactInfo 
                    icon={<Mail className="h-5 w-5" />}
                    title="Email"
                    content={<>support@lifechip.com<br/>info@lifechip.com</>}
                  />
                  
                  <ContactInfo 
                    icon={<Clock className="h-5 w-5" />}
                    title="Hours"
                    content={<>Monday - Friday: 8am - 8pm EST<br/>Saturday: 9am - 5pm EST</>}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Facebook">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Instagram">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
                <ContactForm />
              </div>
              
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-blue-700">Need immediate assistance?</h3>
                    <p className="mt-2 text-blue-600">Our support team is available via live chat during business hours. <a href="#chat" className="font-medium underline">Start a chat now</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-start">
      <div className="text-primary mr-3">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default Contact;
