"use client"

import { useState } from "react"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"

export default function GenerateCode() {
  const [generatedCode, setGeneratedCode] = useState("")
  const [isCodeGenerated, setIsCodeGenerated] = useState(false)

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const handleGenerateCode = () => {
    const newCode = generateRandomCode()
    setGeneratedCode(newCode)
    setIsCodeGenerated(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    // You could add a toast notification here
  }

  return (
    <Layout title="Generate Code - SunLighter">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate One-Time Code</h2>
            <p className="text-gray-600">Create a secure code to share your employment status with companies</p>
          </div>

          {!isCodeGenerated ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">
                  Click the button below to generate a secure one-time verification code.
                </p>
              </div>

              <Button onClick={handleGenerateCode} className="w-full">
                Generate One-Time Code
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
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

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your One-Time Code</h3>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                  <div className="text-3xl font-bold text-blue-600 tracking-wider mb-2">{generatedCode}</div>
                  <Button variant="outline" onClick={copyToClipboard} className="text-sm bg-transparent">
                    Copy Code
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-medium text-yellow-800 mb-2">Important:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>
                      • This code is valid for <strong>5 minutes</strong>
                    </li>
                    <li>• Share it with a company to let them check your current employment status</li>
                    <li>• The code can only be used once</li>
                    <li>• Keep this code secure and only share with trusted parties</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsCodeGenerated(false)
                    setGeneratedCode("")
                  }}
                  className="w-full"
                >
                  Generate New Code
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/dashboard")} className="w-full">
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  )
}
