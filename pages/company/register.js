"use client"

import { useState } from "react"
import Layout from "../../components/layout/Layout"
import Card from "../../components/Card"
import Button from "../../components/Button"
import Input from "../../components/Input"

export default function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyHandle: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [companyId] = useState("COMP-2024-001") // Mock company ID

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-suggest company handle from company name
    if (field === "companyName" && value.length >= 3) {
      const suggestedHandle = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 15)

      if (!formData.companyHandle) {
        setFormData((prev) => ({
          ...prev,
          companyHandle: suggestedHandle,
        }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Layout title="Company Registration Successful - SunLighter">
        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Created Successfully!</h2>
              <p className="text-gray-600 mb-4">Your company account is now active.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Your Company ID is:</p>
                <p className="text-xl font-bold text-blue-600">{companyId}</p>
              </div>
            </div>
            <Button onClick={() => (window.location.href = "/employer/verify")}>Start Verifying Employees</Button>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Company Registration - SunLighter">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Your Company</h2>
            <p className="text-gray-600">Join SunLighter to verify employee information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Company Name"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />

            <Input
              label="Company Email"
              type="email"
              placeholder="Enter company email address"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange("companyEmail", e.target.value)}
              required
            />

            <Input
              label="Company Handle"
              placeholder="Enter company handle (min 3 characters)"
              value={formData.companyHandle}
              onChange={(e) => handleInputChange("companyHandle", e.target.value)}
              minLength={3}
              required
            />
            <p className="text-xs text-gray-500 mt-1">This will be your unique identifier on the platform</p>

            <Button type="submit" className="w-full py-2">
              Register Company
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need to register as an individual?{" "}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                User Registration
              </a>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
