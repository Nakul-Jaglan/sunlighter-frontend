"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Badge from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { 
  TrendingUp, 
  Shield, 
  Award, 
  Star,
  Clock,
  Users,
  CheckCircle,
  BarChart3,
  Sparkles,
  Info
} from 'lucide-react'

const TrustScoreDisplay = ({ score, trend, breakdown }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 55) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGradient = (score) => {
    if (score >= 85) return 'from-green-500 to-emerald-600'
    if (score >= 70) return 'from-blue-500 to-indigo-600'
    if (score >= 55) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 55) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center mb-8"
    >
      <div className={`relative w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br ${getScoreGradient(score)} p-1`}>
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
          <div>
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              TRUST SCORE
            </div>
          </div>
        </div>
        
        {/* Trend indicator */}
        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
          trend >= 0 ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {trend >= 0 ? '+' : ''}{trend}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Community Trust Score
      </h2>
      <p className={`text-lg font-semibold mb-2 ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </p>
      <p className="text-gray-600 max-w-md mx-auto">
        Dynamic trust indicator based on peer endorsements, verified achievements, and behavioral reliability
      </p>
    </motion.div>
  )
}

const ComponentScore = ({ component, onClick }) => {
  const getImpactColor = (impact) => {
    switch(impact) {
      case 'high': return 'text-purple-600'
      case 'medium': return 'text-blue-600'
      case 'low': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
            <component.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{component.title}</h3>
            <p className="text-sm text-gray-600">{component.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold ${getScoreColor(component.score)}`}>
            {component.score}
          </div>
          <div className="text-xs text-gray-500">/{component.maxScore}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(component.score / component.maxScore) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Weight: <span className={`font-medium ${getImpactColor(component.impact)}`}>
              {component.impact}
            </span>
          </span>
          <span className="text-gray-600">
            Items: <span className="font-medium">{component.count}</span>
          </span>
        </div>
        <Badge className={`${
          component.trend >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        } border-0`}>
          {component.trend >= 0 ? '+' : ''}{component.trend}
        </Badge>
      </div>
    </motion.div>
  )
}

const TrustScoreHistory = ({ history }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score History</h3>
      <div className="space-y-4">
        {history.map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{entry.date}</div>
              <div className="text-sm text-gray-600">{entry.event}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{entry.score}</div>
              <div className={`text-sm ${entry.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {entry.change >= 0 ? '+' : ''}{entry.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function CommunityTrustScore() {
  const [trustData, setTrustData] = useState(null)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data - replace with actual API calls
  const mockTrustData = {
    overallScore: 78,
    trend: 3,
    lastUpdated: '2024-08-25T14:30:00Z',
    components: [
      {
        id: 'endorsements',
        title: 'Peer Endorsements',
        description: 'Values-based endorsements from colleagues',
        score: 85,
        maxScore: 100,
        impact: 'high',
        count: 12,
        trend: 5,
        icon: Users,
        details: {
          approved: 10,
          pending: 2,
          avgRating: 4.7,
          recentEndorsements: [
            { endorser: 'Sarah Chen', value: 'Reliability', date: '2024-08-20' },
            { endorser: 'Mike Johnson', value: 'Teamwork', date: '2024-08-15' }
          ]
        }
      },
      {
        id: 'badges',
        title: 'Verified Badges',
        description: 'Professional achievements and ethics badges',
        score: 72,
        maxScore: 100,
        impact: 'medium',
        count: 5,
        trend: 2,
        icon: Award,
        details: {
          verified: 3,
          selfClaimed: 2,
          categories: ['Ethics', 'Training', 'Sustainability'],
          latest: 'Code of Conduct Certified'
        }
      },
      {
        id: 'reliability',
        title: 'Behavioral Reliability',
        description: 'Performance metrics from work platforms',
        score: 82,
        maxScore: 100,
        impact: 'high',
        count: 47,
        trend: 1,
        icon: TrendingUp,
        details: {
          completionRate: 96,
          onTimeDelivery: 94,
          clientSatisfaction: 4.8,
          totalProjects: 47
        }
      },
      {
        id: 'reputation',
        title: 'Reputation Ledger',
        description: 'Time-limited feedback and reviews',
        score: 68,
        maxScore: 100,
        impact: 'medium',
        count: 23,
        trend: -1,
        icon: Clock,
        details: {
          activeReviews: 18,
          expired: 5,
          avgRating: 4.3,
          responseRate: 95
        }
      }
    ],
    history: [
      { date: '2024-08-25', event: 'New endorsement received', score: 78, change: 3 },
      { date: '2024-08-20', event: 'Badge verification completed', score: 75, change: 2 },
      { date: '2024-08-15', event: 'Reliability score updated', score: 73, change: 1 },
      { date: '2024-08-10', event: 'Endorsement approved', score: 72, change: 4 },
      { date: '2024-08-05', event: 'New behavioral data sync', score: 68, change: -1 }
    ],
    insights: [
      {
        type: 'improvement',
        title: 'Boost Your Score',
        message: 'Request 2 more peer endorsements to reach the "Good" tier (70+)'
      },
      {
        type: 'warning',
        title: 'Expiring Content',
        message: '3 endorsements will expire next month. Consider refreshing them.'
      },
      {
        type: 'achievement',
        title: 'Great Progress!',
        message: 'Your trust score increased by 6 points this month'
      }
    ]
  }

  useEffect(() => {
    loadTrustData()
  }, [])

  const loadTrustData = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // const data = await api.trustScore.get()
      setTimeout(() => {
        setTrustData(mockTrustData)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load trust score:', error)
      setError('Failed to load community trust score')
      setIsLoading(false)
    }
  }

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-full w-32 mx-auto mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!trustData) return null

  return (
    <div className="max-w-4xl mx-auto py-8">
      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Trust Score Display */}
      <TrustScoreDisplay
        score={trustData.overallScore}
        trend={trustData.trend}
        breakdown={trustData.components}
      />

      {/* Insights */}
      <div className="mb-8 space-y-4">
        {trustData.insights.map((insight, index) => {
          const colors = {
            improvement: 'border-blue-200 bg-blue-50 text-blue-800',
            warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
            achievement: 'border-green-200 bg-green-50 text-green-800'
          }
          
          const icons = {
            improvement: TrendingUp,
            warning: Clock,
            achievement: Star
          }
          
          const Icon = icons[insight.type]
          
          return (
            <Alert key={index} className={`${colors[insight.type]} border`}>
              <Icon className="h-4 w-4" />
              <div>
                <div className="font-semibold">{insight.title}</div>
                <AlertDescription>{insight.message}</AlertDescription>
              </div>
            </Alert>
          )
        })}
      </div>

      {/* Component Scores */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Trust Score Components</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {showHistory ? 'Hide' : 'Show'} History
          </Button>
        </div>

        <div className="grid gap-6">
          {trustData.components.map((component) => (
            <ComponentScore
              key={component.id}
              component={component}
              onClick={() => handleComponentClick(component)}
            />
          ))}
        </div>
      </div>

      {/* History */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <TrustScoreHistory history={trustData.history} />
        </motion.div>
      )}

      {/* Information Panel */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <div className="flex items-start">
          <Sparkles className="h-6 w-6 text-purple-600 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">About Community Trust Score</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• <strong>Dynamic Index:</strong> Updates based on recent activity and achievements</li>
              <li>• <strong>Multi-Factor:</strong> Combines endorsements, badges, and behavioral data</li>
              <li>• <strong>Time-Weighted:</strong> Recent contributions have higher impact</li>
              <li>• <strong>Not a Credit Score:</strong> Focuses on professional trust and reliability</li>
              <li>• <strong>Privacy-First:</strong> No sensitive personal information used</li>
              <li>• <strong>Transparent:</strong> All components and calculations are visible</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{selectedComponent.title} Details</h3>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Component Score</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedComponent.score}/{selectedComponent.maxScore}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Impact Weight</div>
                  <div className="text-lg font-semibold text-purple-600 capitalize">
                    {selectedComponent.impact}
                  </div>
                </div>
              </div>

              {/* Component-specific details */}
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Performance Details</h4>
                <div className="space-y-2">
                  {Object.entries(selectedComponent.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium">{Array.isArray(value) ? value.join(', ') : value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">How This Component Works</h4>
                    <p className="text-sm text-blue-800 mt-1">{selectedComponent.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
