import React from "react";
import { ShieldCheck, LockKeyhole, BookCheck, Check, X } from "lucide-react";

const TrustSecuritySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Your Privacy & Security</h2>
          <p className="text-center text-gray-600 mb-12">
            At LifeChip, we understand the importance of keeping your medical information secure and private.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SecurityFeature 
              icon={<LockKeyhole className="h-8 w-8" />}
              title="End-to-End Encryption"
              description="Your data is encrypted from the moment it's entered and can only be decrypted by authorized personnel."
            />
            
            <SecurityFeature 
              icon={<ShieldCheck className="h-8 w-8" />}
              title="HIPAA Compliant"
              description="Our systems adhere to all healthcare privacy regulations and standards for medical information."
            />
            
            <SecurityFeature 
              icon={<BookCheck className="h-8 w-8" />}
              title="Access Control"
              description="You control who can access your information and can view detailed access logs at any time."
            />
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-primary mr-4">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Commitment to Privacy</h3>
                <p className="text-gray-600 mb-4">
                  LifeChip is committed to maintaining the highest standards of privacy and security for your medical information. 
                  We understand the sensitive nature of health data and have implemented comprehensive measures to protect it.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">We will never:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        <span>Sell your data to third parties</span>
                      </li>
                      <li className="flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        <span>Share information without consent</span>
                      </li>
                      <li className="flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        <span>Use your data for advertising</span>
                      </li>
                      <li className="flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        <span>Retain data longer than necessary</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">We will always:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Encrypt all sensitive information</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Require verification for access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Provide access logs and alerts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Update security measures regularly</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <a href="/privacy" className="text-primary hover:underline font-medium">Read our full Privacy Policy →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SecurityFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-light text-white mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TrustSecuritySection;
