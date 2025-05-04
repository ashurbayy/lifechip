import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { insertMedicalProfileSchema } from "@shared/schema";
import type { InsertMedicalProfile, MedicalProfile, EmergencyContact } from "@shared/schema";
import { 
  PlusCircle, 
  Save, 
  AlertTriangle, 
  Trash2,
  ArrowLeft
} from "lucide-react";

const Profile: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newCondition, setNewCondition] = useState("");
  
  const { data: medicalProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["/api/medical-profile"],
    enabled: !!user,
    onSuccess: (data: MedicalProfile) => {
      if (data) {
        // Initialize form with existing data
        form.reset({
          userId: data.userId,
          chipId: data.chipId,
          bloodType: data.bloodType || "",
          allergies: data.allergies || [],
          medications: data.medications || [],
          conditions: data.conditions || [],
          emergencyContacts: data.emergencyContacts || [],
          notes: data.notes || ""
        });
        
        // Initialize state arrays
        setAllergies(data.allergies || []);
        setMedications(data.medications || []);
        setConditions(data.conditions || []);
        setEmergencyContacts(data.emergencyContacts as EmergencyContact[] || []);
      }
    }
  });
  
  const form = useForm<InsertMedicalProfile>({
    resolver: zodResolver(insertMedicalProfileSchema),
    defaultValues: {
      userId: user?.id || 0,
      chipId: "",
      bloodType: "",
      allergies: [],
      medications: [],
      conditions: [],
      emergencyContacts: [],
      notes: ""
    }
  });
  
  const createProfileMutation = useMutation({
    mutationFn: (data: InsertMedicalProfile) => {
      return apiRequest("POST", "/api/medical-profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Profile Created",
        description: "Your medical profile has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/medical-profile"] });
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem creating your profile. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<InsertMedicalProfile>) => {
      return apiRequest("PUT", `/api/medical-profile/${medicalProfile?.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your medical profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/medical-profile"] });
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: InsertMedicalProfile) => {
    // Update arrays with current state
    data.allergies = allergies;
    data.medications = medications;
    data.conditions = conditions;
    data.emergencyContacts = emergencyContacts;
    
    if (medicalProfile) {
      updateProfileMutation.mutate(data);
    } else {
      createProfileMutation.mutate(data);
    }
  };
  
  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "") {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };
  
  const handleAddMedication = () => {
    if (newMedication.trim() !== "") {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };
  
  const handleAddCondition = () => {
    if (newCondition.trim() !== "") {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition("");
    }
  };
  
  const handleRemoveAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };
  
  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };
  
  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };
  
  const handleAddEmergencyContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      { name: "", relationship: "", phone: "" }
    ]);
  };
  
  const handleUpdateEmergencyContact = (index: number, field: keyof EmergencyContact, value: string) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value
    };
    setEmergencyContacts(updatedContacts);
  };
  
  const handleRemoveEmergencyContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };
  
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    setLocation("/login");
    return null;
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => setLocation("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{medicalProfile ? "Update Medical Profile" : "Create Medical Profile"}</CardTitle>
              <CardDescription>
                Enter your medical information to be accessed in emergency situations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          This information will be accessible to emergency responders when they scan your LifeChip. 
                          Please ensure all information is accurate and up-to-date.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormField
                        control={form.control}
                        name="chipId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LifeChip ID</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter the ID on your chip" 
                                {...field} 
                                disabled={medicalProfile !== undefined}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Type</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., A+, O-, AB+" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Allergies</h3>
                    <div className="flex flex-wrap gap-2">
                      {allergies.map((allergy, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                          <span>{allergy}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveAllergy(index)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add an allergy" 
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAllergy())}
                      />
                      <Button type="button" onClick={handleAddAllergy}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Medications</h3>
                    <div className="flex flex-wrap gap-2">
                      {medications.map((medication, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                          <span>{medication}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveMedication(index)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a medication" 
                        value={newMedication}
                        onChange={(e) => setNewMedication(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMedication())}
                      />
                      <Button type="button" onClick={handleAddMedication}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Medical Conditions</h3>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map((condition, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                          <span>{condition}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveCondition(index)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a condition" 
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCondition())}
                      />
                      <Button type="button" onClick={handleAddCondition}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Emergency Contacts</h3>
                      <Button type="button" variant="outline" onClick={handleAddEmergencyContact}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Contact
                      </Button>
                    </div>
                    
                    {emergencyContacts.length > 0 ? (
                      <div className="space-y-6">
                        {emergencyContacts.map((contact, index) => (
                          <div key={index} className="p-4 border rounded-lg space-y-4">
                            <div className="flex justify-between">
                              <h4 className="font-medium">Emergency Contact #{index + 1}</h4>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveEmergencyContact(index)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <Input 
                                  placeholder="Full Name" 
                                  value={contact.name}
                                  onChange={(e) => handleUpdateEmergencyContact(index, 'name', e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                                <Input 
                                  placeholder="e.g., Spouse, Parent, Doctor" 
                                  value={contact.relationship}
                                  onChange={(e) => handleUpdateEmergencyContact(index, 'relationship', e.target.value)}
                                />
                              </div>
                              
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <Input 
                                  placeholder="Phone Number" 
                                  value={contact.phone}
                                  onChange={(e) => handleUpdateEmergencyContact(index, 'phone', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-dashed rounded-lg p-6 text-center">
                        <p className="text-gray-500">No emergency contacts added yet.</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Add emergency contacts that should be notified in case of a medical emergency.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Add any additional medical information here..." 
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createProfileMutation.isPending || updateProfileMutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {medicalProfile ? "Update Profile" : "Create Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Profile;
