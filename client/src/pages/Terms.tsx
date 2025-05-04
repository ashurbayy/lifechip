import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle } from "lucide-react";

const Terms: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <FileText className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the LifeChip medical information system and related services 
              (collectively, the "Services"), you agree to be bound by these Terms of Service. If you 
              do not agree to these Terms, you may not access or use the Services.
            </p>
            
            <h2>2. Description of Services</h2>
            <p>
              LifeChip provides a medical information system based on NFC technology. The Services 
              allow you to store your medical information securely and make it accessible to emergency 
              medical personnel by scanning your LifeChip device.
            </p>
            
            <h2>3. Account Registration and Security</h2>
            <p>
              To use certain features of the Services, you must register for an account. You agree to 
              provide accurate, current, and complete information and to update this information to 
              maintain its accuracy. You are responsible for maintaining the confidentiality of your 
              account credentials and for all activities that occur under your account.
            </p>
            
            <h2>4. Medical Information</h2>
            <p>
              You are solely responsible for the accuracy and completeness of the medical information 
              you provide. LifeChip does not verify the accuracy of user-provided medical information. 
              Emergency responders and healthcare providers rely on this information in medical situations, 
              so it is critical that you keep your information up to date.
            </p>
            
            <h2>5. User Responsibilities</h2>
            <p>When using our Services, you agree not to:</p>
            <ul>
              <li>Provide false or misleading information</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Attempt to gain unauthorized access to any part of the Services</li>
              <li>Use the Services for any illegal or unauthorized purpose</li>
            </ul>
            
            <h2>6. Payment and Subscription</h2>
            <p>
              Some aspects of our Services require payment, such as purchasing LifeChip devices or premium 
              subscription features. All payments are non-refundable except as required by law or as 
              explicitly stated in our refund policy. Subscription services will automatically renew unless 
              canceled according to our cancellation procedures.
            </p>
            
            <h2>7. Intellectual Property</h2>
            <p>
              The Services, including all content, features, and functionality, are owned by LifeChip 
              and are protected by copyright, trademark, and other intellectual property laws. You may 
              not reproduce, distribute, modify, create derivative works of, publicly display, or exploit 
              any portion of our Services without our prior written consent.
            </p>
            
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, 
              WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF 
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LIFECHIP SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR 
              REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, 
              OR OTHER INTANGIBLE LOSSES.
            </p>
            
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless LifeChip and its officers, directors, 
              employees, agents, and affiliates from and against any and all claims, damages, obligations, 
              losses, liabilities, costs, and expenses arising from your use of the Services or your 
              violation of these Terms.
            </p>
            
            <h2>11. Term and Termination</h2>
            <p>
              These Terms will remain in effect until terminated by you or by us. We may, in our sole 
              discretion, suspend or terminate your access to the Services at any time for any reason, 
              including if we believe you have violated these Terms.
            </p>
            
            <h2>12. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make material changes, we will notify you 
              through the Services or by other means. Your continued use of the Services after such 
              notification constitutes your acceptance of the modified Terms.
            </p>
            
            <h2>13. Governing Law</h2>
            <p>
              These Terms and your use of the Services shall be governed by and construed in accordance 
              with the laws of the United States, without giving effect to any principles of conflicts of law.
            </p>
            
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@lifechip.com<br />
              <strong>Phone:</strong> (800) LIFE-CHIP<br />
              <strong>Address:</strong> 123 Medical Drive, Healthcare City, HC 12345
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/register">
              <Button variant="default">Register Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
