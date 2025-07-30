"use client"

import { useState } from "react"
import Layout from "../components/layout/Layout"
import Card from "../components/Card"
import Button from "../components/Button"

export default function Dashboard() {
  // Mock user data
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    userId: "102500",
  })

  // Mock employment data
  const [employments] = useState([
    {
      id: 1,
      companyName: "ZeniTech Solutions",
      role: "Senior Software Engineer",
      startDate: "January 2023",
      status: "Verified",
    },
    {
      id: 2,
      companyName: "DataFlow Inc",
      role: "Frontend Developer",
      startDate: "March 2021",
      status: "Unverified",
    },
    {
      id: 3,
      companyName: "StartupXYZ",
      role: "Full Stack Developer",
      startDate: "June 2019",
      status: "Verified",
    },
  ])

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium"
    if (status === "Verified") {
      return `${baseClasses} bg-green-100 text-green-800`
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800`
  }

  return (
    <Layout title="Dashboard - SunLighter">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 mr-20">Welcome, {user.name}</h2>
              <div className="space-y-1 text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">User ID:</span> {user.userId}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="py-2" variant="outline" onClick={() => (window.location.href = "/generate-code")}>
                Generate Code
              </Button>
              <Button className="py-2" onClick={() => (window.location.href = "/add-employment")}>Add Employment</Button>
            </div>
          </div>
        </Card>

        {/* Employment History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Employment History</h3>
            <Button className="py-2" variant="outline" onClick={() => (window.location.href = "/add-employment")}>
              Add Employment
            </Button>
          </div>

          <div className="space-y-4">
            {employments.map((employment) => (
              <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{employment.companyName}</h4>
                      <span className={getStatusBadge(employment.status)}>{employment.status}</span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Role:</span> {employment.role}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Start Date:</span> {employment.startDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="text-sm px-4 py-2 bg-transparent">
                      Edit
                    </Button>
                    {employment.status === "Unverified" && (
                      <Button className="text-sm px-4 py-2">Request Verification</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {employments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No employment records found</p>
              <Button onClick={() => (window.location.href = "/add-employment")}>Add Your First Employment</Button>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  )
}
