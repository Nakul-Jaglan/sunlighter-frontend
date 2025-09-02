"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Badge from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  BarChart3,
  Calendar,
  Award,
  Activity,
  Target,
  Zap
} from 'lucide-react'

const ReliabilityMetric = ({ metric, onClick }) => {
  const getColorByScore = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600' 
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (score) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 75) return 'bg-blue-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const formatTrend = (trend) => {
    const sign = trend >= 0 ? '+' : ''
    return `${sign}${trend.toFixed(1)}%`
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
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{metric.title}</h3>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        </div>
        <div className={`text-2xl font-bold ${getColorByScore(metric.score)}`}>
          {metric.score}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Performance</span>
          <span>{metric.score}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${getProgressColor(metric.score)}`}
            initial={{ width: 0 }}
            animate={{ width: `${metric.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{metric.totalProjects}</div>
          <div className="text-sm text-gray-600">Total Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{metric.completionRate}%</div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>

      {/* Trend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${
            metric.trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-4 w-4 ${metric.trend < 0 ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">{formatTrend(metric.trend)}</span>
          </div>
          <span className="text-sm text-gray-500">vs last period</span>
        </div>
        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          {metric.source}
        </Badge>
      </div>
    </motion.div>
  )
}

const MetricDetailModal = ({ metric, isOpen, onClose }) => {
  if (!isOpen || !metric) return null

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{metric.title} Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Score Overview */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{metric.score}%</div>
              <div className="text-gray-700">{metric.description}</div>
            </div>
          </Card>

          {/* Detailed Metrics */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">On-Time Delivery</h4>
              </div>
              <div className="text-2xl font-bold text-green-600">{metric.onTimeRate}%</div>
              <div className="text-sm text-gray-600">Projects delivered on schedule</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Completion Rate</h4>
              </div>
              <div className="text-2xl font-bold text-blue-600">{metric.completionRate}%</div>
              <div className="text-sm text-gray-600">Successfully completed projects</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-semibold text-gray-900">Refund Rate</h4>
              </div>
              <div className="text-2xl font-bold text-yellow-600">{metric.refundRate}%</div>
              <div className="text-sm text-gray-600">Projects requiring refunds</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Client Rating</h4>
              </div>
              <div className="text-2xl font-bold text-purple-600">{metric.avgRating}/5</div>
              <div className="text-sm text-gray-600">Average client satisfaction</div>
            </Card>
          </div>

          {/* Historical Data */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Performance Trend</h4>
            <div className="space-y-3">
              {metric.history?.map((period, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{period.period}</div>
                    <div className="text-sm text-gray-600">{period.projects} projects</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{period.score}%</div>
                    <div className={`text-sm ${period.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {period.change >= 0 ? '+' : ''}{period.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Data Source: {metric.source}</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Data aggregated from verified freelance platforms and client feedback. 
                  Last updated: {formatDate(metric.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function BehavioralReliability() {
  const [metrics, setMetrics] = useState([])
  const [selectedMetric, setSelectedMetric] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data - replace with actual API calls
  const mockMetrics = [
    {
      id: 1,
      title: 'Freelance Platform Performance',
      description: 'Aggregate performance across freelance platforms',
      score: 94,
      trend: 2.3,
      totalProjects: 47,
      completionRate: 96,
      onTimeRate: 94,
      refundRate: 2,
      avgRating: 4.8,
      source: 'Upwork, Fiverr',
      lastUpdated: '2024-08-25T10:00:00Z',
      history: [
        { period: 'Q2 2024', projects: 15, score: 92, change: 1.5 },
        { period: 'Q1 2024', projects: 12, score: 90, change: -0.8 },
        { period: 'Q4 2023', projects: 20, score: 91, change: 3.2 }
      ]
    },
    {
      id: 2,
      title: 'Project Delivery Reliability',
      description: 'On-time delivery and milestone completion',
      score: 88,
      trend: -1.2,
      totalProjects: 23,
      completionRate: 91,
      onTimeRate: 88,
      refundRate: 4,
      avgRating: 4.6,
      source: 'Client Feedback',
      lastUpdated: '2024-08-20T15:30:00Z',
      history: [
        { period: 'Q2 2024', projects: 8, score: 89, change: -1.2 },
        { period: 'Q1 2024', projects: 7, score: 90, change: 2.1 },
        { period: 'Q4 2023', projects: 8, score: 88, change: 1.8 }
      ]
    },
    {
      id: 3,
      title: 'Communication Consistency',
      description: 'Response time and communication reliability',
      score: 91,
      trend: 3.7,
      totalProjects: 35,
      completionRate: 100,
      onTimeRate: 91,
      refundRate: 0,
      avgRating: 4.9,
      source: 'Platform Analytics',
      lastUpdated: '2024-08-22T08:45:00Z',
      history: [
        { period: 'Q2 2024', projects: 12, score: 88, change: 3.7 },
        { period: 'Q1 2024', projects: 11, score: 85, change: 1.2 },
        { period: 'Q4 2023', projects: 12, score: 84, change: -0.5 }
      ]
    }
  ]

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // const data = await api.behavioralMetrics.getAll()
      setTimeout(() => {
        setMetrics(mockMetrics)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load metrics:', error)
      setError('Failed to load behavioral reliability data')
      setIsLoading(false)
    }
  }

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric)
    setShowDetail(true)
  }

  const getOverallScore = () => {
    if (metrics.length === 0) return 0
    const total = metrics.reduce((sum, metric) => sum + metric.score, 0)
    return Math.round(total / metrics.length)
  }

  const overallScore = getOverallScore()

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Behavioral Reliability</h1>
            <p className="text-gray-600">Verified performance metrics from freelance platforms and client feedback</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Overall Score</div>
            <div className={`text-3xl font-bold ${
              overallScore >= 90 ? 'text-green-600' :
              overallScore >= 75 ? 'text-blue-600' :
              overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {overallScore}%
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.reduce((sum, m) => sum + m.totalProjects, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {metrics.length > 0 ? Math.round(metrics.reduce((sum, m) => sum + m.completionRate, 0) / metrics.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Completion</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {metrics.length > 0 ? (metrics.reduce((sum, m) => sum + m.avgRating, 0) / metrics.length).toFixed(1) : '0.0'}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {metrics.length > 0 ? Math.round(metrics.reduce((sum, m) => sum + m.refundRate, 0) / metrics.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Refund Rate</div>
          </Card>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Metrics List */}
      <div className="space-y-6">
        {metrics.length > 0 ? (
          metrics.map((metric) => (
            <ReliabilityMetric
              key={metric.id}
              metric={metric}
              onClick={() => handleMetricClick(metric)}
            />
          ))
        ) : (
          <Card className="p-12 text-center">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No behavioral data available</h3>
            <p className="text-gray-600 mb-4">
              Connect your freelance platform accounts to display behavioral reliability metrics
            </p>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Connect Platforms
            </Button>
          </Card>
        )}
      </div>

      {/* Information Panel */}
      <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">About Behavioral Reliability Signals</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Aggregated Data:</strong> Combined metrics from verified freelance platforms</li>
              <li>• <strong>Anonymized:</strong> No private client details, only behavioral patterns</li>
              <li>• <strong>Ethics-Focused:</strong> Measures reliability, not technical skills</li>
              <li>• <strong>Time-Weighted:</strong> Recent performance has higher impact</li>
              <li>• <strong>Transparent:</strong> All data sources and calculation methods are visible</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Detail Modal */}
      <MetricDetailModal
        metric={selectedMetric}
        isOpen={showDetail}
        onClose={() => {
          setShowDetail(false)
          setSelectedMetric(null)
        }}
      />
    </div>
  )
}
