"use client"

import Layout from "../../components/layout/Layout"
import Card from "../../components/Card"
import Button from "../../components/Button"

export default function Home() {
  const features = [
    {
      title: "Privacy-First Verification",
      description: "Your employment data stays secure with one-time verification codes that expire in 5 minutes.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Instant Verification",
      description: "Generate secure codes instantly and share them with employers for immediate verification.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Employment Dashboard",
      description: "Manage all your employment records in one place with verification status tracking.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Register Your Account",
      description: "Create your secure SunLighter profile with basic information.",
    },
    {
      step: "2",
      title: "Add Employment Records",
      description: "Add your current and past employment information to your dashboard.",
    },
    {
      step: "3",
      title: "Generate Verification Codes",
      description: "Create one-time codes when employers need to verify your employment.",
    },
    {
      step: "4",
      title: "Share Securely",
      description: "Share the code with employers who can instantly verify your status.",
    },
  ]

  const handleGetStarted = () => {
    window.location.href = "/signup"
  }

  const handleCompanyRegister = () => {
    window.location.href = "/signup"
  }

  const handleVerifyEmployee = () => {
    window.location.href = "/employer/verify"
  }

  const handleViewDemo = () => {
    window.location.href = "/dashboard"
  }

  return (
    <Layout title="SunLighter - Privacy-First Employment Verification">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy-First Employment Verification</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            SunLighter provides secure, instant employment verification without compromising your privacy. Generate
            one-time codes to share your employment status with trusted parties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleGetStarted} className="px-8 py-4 text-lg">
              Get Started as Employee
            </Button>
            <Button variant="outline" onClick={handleCompanyRegister} className="px-8 py-4 text-lg bg-transparent">
              Register Your Company
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SunLighter?</h2>
            <p className="text-lg text-gray-600">Built with privacy and security at its core</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple, secure employment verification in 4 steps</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Employers Section */}
        <Card className="max-w-4xl mx-auto p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Employers</h2>
            <p className="text-lg text-gray-600 mb-6">
              Instantly verify employee information with secure one-time codes
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Verification</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Enter employee-provided verification codes</li>
                  <li>• Get instant employment status confirmation</li>
                  <li>• View authorized employment details</li>
                  <li>• No lengthy verification processes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Secure & Private</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Codes expire in 5 minutes for security</li>
                  <li>• Single-use verification codes</li>
                  <li>• Employee controls what information is shared</li>
                  <li>• GDPR and privacy compliant</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Button onClick={handleVerifyEmployee} className="mr-4 py-2">
                Verify Employee Now
              </Button>
              <Button variant="outline" onClick={handleCompanyRegister} className="py-2">
                Register Your Company
              </Button>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals who trust SunLighter for secure employment verification
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleGetStarted} className="px-8 py-4 text-lg">
              Create Your Account
            </Button>
            <Button variant="outline" onClick={handleViewDemo} className="px-8 py-4 text-lg bg-transparent">
              View Demo Dashboard
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
