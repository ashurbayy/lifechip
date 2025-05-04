import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCircle, 
  Heart, 
  ClipboardList, 
  AlertCircle, 
  Plus, 
  RefreshCw,
  FileText,
  Settings,
  Clock,
  LogOut
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const { data: medicalProfile, isLoading } = useQuery({
    queryKey: ["/api/medical-profile"],
    enabled: !!user
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.fullName || user.username}</h1>
              <p className="text-gray-600">Manage your LifeChip medical information</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleLogout} className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <Link href="/profile">
                <Button variant="default" className="flex items-center">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medical">Medical Info</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard 
                  icon={<Heart className="h-6 w-6 text-rose-500" />}
                  title="Medical Profile"
                  value={medicalProfile ? "Complete" : "Incomplete"}
                  status={medicalProfile ? "success" : "warning"}
                />
                
                <StatsCard 
                  icon={<ClipboardList className="h-6 w-6 text-amber-500" />}
                  title="Emergency Contacts"
                  value={medicalProfile?.emergencyContacts?.length > 0 ? `${medicalProfile.emergencyContacts.length} Contacts` : "None Added"}
                  status={medicalProfile?.emergencyContacts?.length > 0 ? "success" : "warning"}
                />
                
                <StatsCard 
                  icon={<RefreshCw className="h-6 w-6 text-emerald-500" />}
                  title="Last Updated"
                  value={medicalProfile?.updatedAt ? new Date(medicalProfile.updatedAt).toLocaleDateString() : "Never"}
                  status={medicalProfile?.updatedAt ? "success" : "warning"}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!medicalProfile ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                        Medical Profile Not Found
                      </CardTitle>
                      <CardDescription>
                        You haven't registered your LifeChip with your medical information yet.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        To make your critical medical information accessible to emergency responders, 
                        you need to create your medical profile and register your LifeChip.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/profile">
                        <Button className="w-full flex items-center justify-center">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Medical Profile
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Medical Profile</CardTitle>
                      <CardDescription>
                        Key medical information available to emergency responders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Blood Type</dt>
                          <dd className="mt-1 text-sm text-gray-900">{medicalProfile.bloodType || "Not specified"}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Chip ID</dt>
                          <dd className="mt-1 text-sm text-gray-900">{medicalProfile.chipId}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {medicalProfile.allergies?.length > 0 
                              ? medicalProfile.allergies.join(", ") 
                              : "No allergies listed"}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Conditions</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {medicalProfile.conditions?.length > 0 
                              ? medicalProfile.conditions.join(", ") 
                              : "No conditions listed"}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                    <CardFooter>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full flex items-center justify-center">
                          <Settings className="h-4 w-4 mr-2" />
                          Update Medical Profile
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Manage your LifeChip account and data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-4">
                    <Link href="/profile">
                      <Button variant="outline" className="w-full justify-start">
                        <UserCircle className="h-4 w-4 mr-2" />
                        Edit Profile Information
                      </Button>
                    </Link>
                    <Link href="/emergency-responders">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        View Responder Instructions
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Request Replacement Chip
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="medical">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : !medicalProfile ? (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">No Medical Profile Found</h2>
                  <p className="text-gray-600 mb-6">
                    You haven't created your medical profile yet. This information is critical for emergency responders.
                  </p>
                  <Link href="/profile">
                    <Button size="lg" className="flex items-center justify-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Medical Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 bg-primary text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Medical Information</h2>
                    <Link href="/profile">
                      <Button variant="secondary" size="sm" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Medical Details</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-3">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Blood Type</dt>
                            <dd className="mt-1 text-gray-900">{medicalProfile.bloodType || "Not specified"}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                            <dd className="mt-1 text-gray-900">
                              {medicalProfile.allergies?.length > 0 
                                ? (
                                  <ul className="list-disc pl-5">
                                    {medicalProfile.allergies.map((allergy, index) => (
                                      <li key={index}>{allergy}</li>
                                    ))}
                                  </ul>
                                ) 
                                : "No allergies listed"}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Conditions</dt>
                            <dd className="mt-1 text-gray-900">
                              {medicalProfile.conditions?.length > 0 
                                ? (
                                  <ul className="list-disc pl-5">
                                    {medicalProfile.conditions.map((condition, index) => (
                                      <li key={index}>{condition}</li>
                                    ))}
                                  </ul>
                                ) 
                                : "No conditions listed"}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Medications</dt>
                            <dd className="mt-1 text-gray-900">
                              {medicalProfile.medications?.length > 0 
                                ? (
                                  <ul className="list-disc pl-5">
                                    {medicalProfile.medications.map((medication, index) => (
                                      <li key={index}>{medication}</li>
                                    ))}
                                  </ul>
                                ) 
                                : "No medications listed"}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
                        {medicalProfile.emergencyContacts?.length > 0 ? (
                          <div className="space-y-6">
                            {(medicalProfile.emergencyContacts as any[]).map((contact, index) => (
                              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-gray-600">Relationship: {contact.relationship}</p>
                                <p className="text-sm text-gray-600">Phone: {contact.phone}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600">No emergency contacts have been added.</p>
                        )}
                        
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
                          <p className="text-gray-700">
                            {medicalProfile.notes || "No additional notes provided."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Track when your LifeChip has been accessed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    {/* In a real app, this would show actual activity logs */}
                    <div className="p-4 border-b text-center">
                      <p className="text-gray-500">No recent activity to display.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        When emergency responders access your LifeChip, the activity will be logged here.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    For security, all access to your medical information is logged and timestamped.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  status: "success" | "warning" | "error";
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800";
      case "warning": return "bg-amber-100 text-amber-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor()}`}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
