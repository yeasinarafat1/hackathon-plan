import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data - replace with actual data from your API
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://github.com/shadcn.png",
  complaints: {
    total: 12,
    resolved: 8,
    cancelled: 2,
    inProgress: 2,
  },
};

const complaintsHistory = [
  {
    id: 1,
    caseNumber: "CASE-1234",
    status: "Resolved",
    date: "2024-03-15",
    description: "Unauthorized construction in residential area",
  },
  {
    id: 2,
    caseNumber: "CASE-5678",
    status: "In Progress",
    date: "2024-03-12",
    description: "Public harassment complaint",
  },
  {
    id: 3,
    caseNumber: "CASE-9012",
    status: "Pending",
    date: "2024-03-10",
    description: "Corruption allegation",
  },
  {
    id: 4,
    caseNumber: "CASE-3456",
    status: "Cancelled",
    date: "2024-03-08",
    description: "Noise pollution complaint",
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 bg-white p-6 rounded-lg shadow-sm">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Complaints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.complaints.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {user.complaints.resolved}
              </div>
              <Progress
                value={(user.complaints.resolved / user.complaints.total) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {user.complaints.cancelled}
              </div>
              <Progress
                value={
                  (user.complaints.cancelled / user.complaints.total) * 100
                }
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Complaints History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Complaint History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaintsHistory.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{complaint.caseNumber}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(complaint.date).toLocaleDateString()}
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">
                        {complaint.description}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : complaint.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : complaint.status === "Pending"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
