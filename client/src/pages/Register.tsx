import React from "react";
import { Link, useLocation } from "wouter";
import RegisterForm from "@/components/RegisterForm";
import { Shield } from "lucide-react";

const Register: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleSuccessfulRegistration = () => {
    setLocation("/login");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                <h1 className="text-2xl font-bold">Register Your LifeChip</h1>
                <p className="text-gray-600">Create your account and register your medical information</p>
              </div>
              
              <RegisterForm onSuccess={handleSuccessfulRegistration} />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="text-primary font-medium hover:underline">Log In</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-blue-800 mb-2">Why Register Your LifeChip?</h2>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Provide emergency responders with immediate access to your critical medical information</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ensure your allergies, medications, and conditions are known in an emergency</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Update your information anytime through your secure online account</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
