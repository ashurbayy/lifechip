import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { loginSchema } from "@shared/schema";
import type { LoginCredentials } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const { setUser } = useAuth();
  
  const form = useForm<LoginCredentials & { rememberMe: boolean }>({
    resolver: zodResolver(loginSchema.extend({
      rememberMe: z.boolean().optional().default(false)
    })),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => {
      return apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: async (response) => {
      const userData = await response.json();
      setUser(userData);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to LifeChip!",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: LoginCredentials & { rememberMe: boolean }) => {
    const { rememberMe, ...loginData } = data;
    loginMutation.mutate(loginData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your@email.com" 
                  type="email" 
                  {...field} 
                  disabled={loginMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your password" 
                  type="password" 
                  {...field} 
                  disabled={loginMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    disabled={loginMutation.isPending}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
              </FormItem>
            )}
          />
          
          <a href="#forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

import { z } from "zod";

export default LoginForm;
