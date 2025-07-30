"use client"

import { useState } from "react"
import Layout from "../../components/Layout"
import Card from "../../components/Card"
import Button from "../../components/Button"
import Input from "../../components/Input"

export default function EmployerVerify() {
  const [code, setCode] = useState("")
  const [verificationResult, setVerificationResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock verification data
  const mockVerificationData = {
    X7A9QK: {
      valid: true,
      employmentStatus: "Currently employed",
      employer: "ZeniTech Solutions",
      startDate: "January 2023",
      role: "Senior Software Engineer",
      allowedInfo: true,
    },
    EXPIRED: {
      valid: false,
      reason: "Code expired",
    },
    INVALID: {
      valid: false,
      reason: "Invalid code",
    },
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = mockVerificationData[code.toUpperCase()] || {
        valid: false,
        reason: "Code expired or invalid",
      }

      setVerificationResult(result)
      setIsLoading(false)
    }, 1000)
  }

  const resetForm = () => {
    setCode("")
    setVerificationResult(null)
  }

  return (
    <Layout title="Verify Employee - SunLighter">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Employee</h2>
            <p className="text-gray-600">
              Enter the one-time code provided by the employee to verify their employment status
            </p>
          </div>

          {!verificationResult ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <Input
                label="One-Time Verification Code"
                placeholder="Enter 6-character code (e.g., X7A9QK)"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                className="text-center"
              />

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Sample Codes for Testing:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <code className="bg-white px-2 py-1 rounded">X7A9QK</code> - Valid employment
                  </p>
                  <p>
                    <code className="bg-white px-2 py-1 rounded">EXPIRED</code> - Expired code
                  </p>
                  <p>
                    <code className="bg-white px-2 py-1 rounded">INVALID</code> - Invalid code
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || code.length < 6}>
                {isLoading ? "Verifying..." : "Check Code"}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              {verificationResult.valid ? (
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-green-600 mb-4">✅ Employment Verified</h3>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                    <h4 className="font-medium text-green-800 mb-3">Employment Details:</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <p>
                        <strong>Status:</strong> {verificationResult.employmentStatus}
                      </p>
                      {verificationResult.allowedInfo && (
                        <>
                          <p>
                            <strong>Employer:</strong> {verificationResult.employer}
                          </p>
                          <p>
                            <strong>Role:</strong> {verificationResult.role}
                          </p>
                          <p>
                            <strong>Start Date:</strong> {verificationResult.startDate}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-red-600 mb-4">❌ Verification Failed</h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700">
                      <strong>Reason:</strong> {verificationResult.reason}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button onClick={resetForm} className="w-full">
                  Verify Another Code
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/company/register")}
                  className="w-full"
                >
                  Company Registration
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Verification codes are valid for 5 minutes and can only be used once
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
