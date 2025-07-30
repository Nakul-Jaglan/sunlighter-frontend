"use client"

import { useState } from "react"
import Layout from "../components/layout/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"

export default function AddEmployment() {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    startDate: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock company suggestions
  const [companySuggestions] = useState(["ZeniTech Solutions", "DataFlow Inc", "StartupXYZ", "TechCorp", "InnovateLab"])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Layout title="Verification Requested - SunLighter">
        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Requested!</h2>
              <p className="text-gray-600 mb-4">
                We've sent a verification request to <strong>{formData.companyName}</strong> for your role as{" "}
                <strong>{formData.role}</strong>.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-yellow-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• The company will receive a verification request</li>
                  <li>• They can verify your employment details</li>
                  <li>• You'll be notified once verification is complete</li>
                  <li>• This typically takes 1-3 business days</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
                Back to Dashboard
              </Button>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                Add Another Employment
              </Button>
            </div>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Add Employment - SunLighter">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Employment</h2>
            <p className="text-gray-600">Add your employment details for verification</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Company Name"
                placeholder="Enter or select company name"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                required
              />
              {formData.companyName && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {companySuggestions
                      .filter((company) => company.toLowerCase().includes(formData.companyName.toLowerCase()))
                      .slice(0, 3)
                      .map((company) => (
                        <button
                          key={company}
                          type="button"
                          onClick={() => handleInputChange("companyName", company)}
                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                        >
                          {company}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Role"
              placeholder="Enter your job title/role"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              required
            />

            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              Request Verification
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </a>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
