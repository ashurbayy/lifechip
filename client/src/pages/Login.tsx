import React from "react";
import { Link, useLocation } from "wouter";
import LoginForm from "@/components/LoginForm";
import { Shield } from "lucide-react";

const Login: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleSuccessfulLogin = () => {
    setLocation("/dashboard");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                <h1 className="text-2xl font-bold">Log In to LifeChip</h1>
                <p className="text-gray-600">Access your medical profile</p>
              </div>
              
              <LoginForm onSuccess={handleSuccessfulLogin} />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register">
                    <a className="text-primary font-medium hover:underline">Register</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
