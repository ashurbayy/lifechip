import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
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
            <h2>Introduction</h2>
            <p>
              LifeChip ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our 
              LifeChip medical information system and related services.
            </p>
            <p>
              We understand the sensitivity of medical information and take extensive measures to ensure 
              your data is protected. By using our service, you acknowledge that you have read and 
              understood this Privacy Policy.
            </p>
            
            <h2>Information We Collect</h2>
            <p>We collect several types of information for various purposes:</p>
            <h3>Personal Information</h3>
            <ul>
              <li>Name, contact information, and account credentials</li>
              <li>Payment information when purchasing LifeChip products</li>
              <li>Medical information you choose to store in your profile</li>
            </ul>
            
            <h3>Medical Information</h3>
            <ul>
              <li>Blood type, allergies, and medication lists</li>
              <li>Chronic conditions and diagnoses</li>
              <li>Emergency contact information</li>
              <li>Medical history you choose to add to your profile</li>
            </ul>
            
            <h3>Usage Information</h3>
            <ul>
              <li>Device information and IP address</li>
              <li>Logs of when your LifeChip has been accessed</li>
              <li>Information about how you use our website and services</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>Your information is used for the following purposes:</p>
            <ul>
              <li>To provide emergency medical information to first responders when your LifeChip is scanned</li>
              <li>To create and maintain your account</li>
              <li>To process transactions and send related information</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our services and develop new features</li>
              <li>To send administrative information and important updates</li>
            </ul>
            
            <h2>HIPAA Compliance</h2>
            <p>
              As a provider of medical information services, we comply with the Health Insurance 
              Portability and Accountability Act (HIPAA). We implement physical, technical, and 
              administrative safeguards to protect your health information as required by law.
            </p>
            
            <h2>How We Protect Your Information</h2>
            <p>We implement a variety of security measures to maintain the safety of your information:</p>
            <ul>
              <li>End-to-end encryption for all sensitive data</li>
              <li>Secure authentication processes</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Strict access controls for all staff members</li>
              <li>Physical security measures for our servers and facilities</li>
            </ul>
            
            <h2>Information Sharing</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li>With emergency responders who scan your LifeChip</li>
              <li>With third-party service providers who perform services on our behalf</li>
              <li>If required by law or in response to legal process</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>
            
            <h2>Your Rights and Choices</h2>
            <p>You have several rights regarding your information:</p>
            <ul>
              <li>Access and update your personal and medical information</li>
              <li>Deactivate your LifeChip at any time</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of the personal data we hold about you</li>
            </ul>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@lifechip.com<br />
              <strong>Phone:</strong> (800) LIFE-CHIP<br />
              <strong>Address:</strong> 123 Medical Drive, Healthcare City, HC 12345
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="default">Contact Us With Questions</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
