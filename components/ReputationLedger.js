"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Badge from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Star,
  Calendar,
  RotateCcw,
  Archive,
  TrendingUp,
  MessageSquare,
  User,
  Eye,
  RefreshCw
} from 'lucide-react'

const ReputationItem = ({ item, onRefresh, onArchive }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'expiring': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'expired': return 'bg-red-100 text-red-800 border-red-200'
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'endorsement': return <User className="h-4 w-4" />
      case 'review': return <Star className="h-4 w-4" />
      case 'feedback': return <MessageSquare className="h-4 w-4" />
      default: return <CheckCircle className="h-4 w-4" />
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysUntilExpiration = (expiryDate) => {
    const now = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const isExpiringSoon = (expiryDate) => {
    const days = getDaysUntilExpiration(expiryDate)
    return days <= 30 && days > 0
  }

  const isExpired = (expiryDate) => {
    return getDaysUntilExpiration(expiryDate) <= 0
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
            {getTypeIcon(item.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">{item.title}</h4>
              {item.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{item.rating}/5</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.source}</p>
            <p className="text-gray-800 leading-relaxed">{item.content}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor(item.status)} border flex-shrink-0`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      </div>

      {/* Time Information */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Created: {formatDate(item.createdAt)}
          </span>
          {item.expiresAt && (
            <span className={`flex items-center ${
              isExpired(item.expiresAt) 
                ? 'text-red-600' 
                : isExpiringSoon(item.expiresAt) 
                  ? 'text-yellow-600' 
                  : 'text-gray-600'
            }`}>
              <Clock className="h-4 w-4 mr-1" />
              {isExpired(item.expiresAt) 
                ? `Expired ${Math.abs(getDaysUntilExpiration(item.expiresAt))} days ago`
                : `Expires in ${getDaysUntilExpiration(item.expiresAt)} days`
              }
            </span>
          )}
        </div>
        {item.views && (
          <span className="flex items-center text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            {item.views} views
          </span>
        )}
      </div>

      {/* Actions */}
      {item.status !== 'archived' && (
        <div className="flex space-x-3">
          {(item.status === 'expiring' || isExpiringSoon(item.expiresAt)) && onRefresh && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRefresh(item.id)}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          )}
          {onArchive && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onArchive(item.id)}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </Button>
          )}
        </div>
      )}

      {/* Expiring Warning */}
      {isExpiringSoon(item.expiresAt) && item.status === 'active' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-yellow-800">Expiring Soon</h5>
              <p className="text-sm text-yellow-700">
                This item will expire in {getDaysUntilExpiration(item.expiresAt)} days. 
                Consider refreshing it to maintain your reputation score.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

const RefreshModal = ({ item, isOpen, onClose, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customMessage, setCustomMessage] = useState('')

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onConfirm(item.id, customMessage)
      onClose()
    } catch (error) {
      console.error('Failed to refresh item:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-lg w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Refresh Reputation Item</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">{item.title}</h4>
            <p className="text-sm text-blue-800">From: {item.source}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Message (Optional)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Add a personal note to your refresh request..."
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-yellow-800">About Refreshing</h5>
                <p className="text-sm text-yellow-700 mt-1">
                  We&apos;ll reach out to the original source to update this item with current information. 
                  The refresh extends the expiry date by 1 year from approval.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Sending Request...' : 'Send Refresh Request'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ReputationLedger() {
  const [reputationItems, setReputationItems] = useState([])
  const [activeTab, setActiveTab] = useState('active')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showRefreshModal, setShowRefreshModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data - replace with actual API calls
  const mockData = [
    {
      id: 1,
      type: 'endorsement',
      title: 'Leadership & Reliability Endorsement',
      content: 'Consistently delivered high-quality work on time and showed excellent leadership during our Q2 project. Great communication and problem-solving skills.',
      source: 'Sarah Chen, Project Manager at TechCorp',
      rating: null,
      status: 'active',
      createdAt: '2024-02-15T10:00:00Z',
      expiresAt: '2025-02-15T10:00:00Z',
      views: 23
    },
    {
      id: 2,
      type: 'review',
      title: 'Freelance Project Review',
      content: 'Outstanding work on the mobile app development project. Delivered ahead of schedule with clean, well-documented code.',
      source: 'StartupXYZ Client Review',
      rating: 5,
      status: 'active',
      createdAt: '2024-03-20T14:30:00Z',
      expiresAt: '2025-03-20T14:30:00Z',
      views: 18
    },
    {
      id: 3,
      type: 'feedback',
      title: 'Team Collaboration Feedback',
      content: 'Excellent team player who helped onboard new members and maintained positive team dynamics throughout the project.',
      source: 'DataFlow Inc Team Lead',
      rating: null,
      status: 'expiring',
      createdAt: '2023-09-10T09:15:00Z',
      expiresAt: '2024-09-10T09:15:00Z',
      views: 31
    },
    {
      id: 4,
      type: 'endorsement',
      title: 'Technical Excellence',
      content: 'Demonstrated strong technical skills and innovative problem-solving approach. Always willing to help teammates.',
      source: 'Former Colleague at InnovateLab',
      rating: null,
      status: 'expired',
      createdAt: '2023-01-15T16:00:00Z',
      expiresAt: '2024-01-15T16:00:00Z',
      views: 42
    },
    {
      id: 5,
      type: 'review',
      title: 'Client Project Satisfaction',
      content: 'Professional, reliable, and delivered exactly what was promised. Would definitely work with again.',
      source: 'E-commerce Client',
      rating: 4,
      status: 'archived',
      createdAt: '2023-05-20T11:30:00Z',
      expiresAt: '2024-05-20T11:30:00Z',
      views: 15
    }
  ]

  useEffect(() => {
    loadReputationData()
  }, [])

  const loadReputationData = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // const data = await api.reputation.getAll()
      setTimeout(() => {
        setReputationItems(mockData)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load reputation data:', error)
      setError('Failed to load reputation ledger')
      setIsLoading(false)
    }
  }

  const handleRefreshRequest = async (itemId, customMessage = '') => {
    try {
      // TODO: Replace with actual API call
      console.log('Refreshing item:', itemId, customMessage)
      
      setReputationItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, status: 'pending-refresh' }
            : item
        )
      )
    } catch (error) {
      throw new Error('Failed to send refresh request')
    }
  }

  const handleArchive = async (itemId) => {
    try {
      // TODO: Replace with actual API call
      console.log('Archiving item:', itemId)
      
      setReputationItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, status: 'archived' }
            : item
        )
      )
    } catch (error) {
      console.error('Failed to archive item:', error)
    }
  }

  const getFilteredItems = (status) => {
    switch(status) {
      case 'active': 
        return reputationItems.filter(item => item.status === 'active')
      case 'expiring': 
        return reputationItems.filter(item => item.status === 'expiring' || item.status === 'pending-refresh')
      case 'expired': 
        return reputationItems.filter(item => item.status === 'expired')
      case 'archived': 
        return reputationItems.filter(item => item.status === 'archived')
      default: 
        return reputationItems
    }
  }

  const getStatistics = () => {
    const active = reputationItems.filter(item => item.status === 'active').length
    const expiring = reputationItems.filter(item => item.status === 'expiring').length
    const expired = reputationItems.filter(item => item.status === 'expired').length
    const archived = reputationItems.filter(item => item.status === 'archived').length
    const totalViews = reputationItems.reduce((sum, item) => sum + (item.views || 0), 0)
    const avgRating = reputationItems.filter(item => item.rating)
      .reduce((sum, item, _, arr) => sum + item.rating / arr.length, 0)
    
    return { active, expiring, expired, archived, totalViews, avgRating }
  }

  const stats = getStatistics()

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reputation Ledger</h1>
            <p className="text-gray-600">Time-limited feedback and endorsements from your professional network</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Items</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.expiring}</div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </Card>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Active ({stats.active})</span>
          </TabsTrigger>
          <TabsTrigger value="expiring" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Expiring ({stats.expiring})</span>
          </TabsTrigger>
          <TabsTrigger value="expired" className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>Expired ({stats.expired})</span>
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center space-x-2">
            <Archive className="h-4 w-4" />
            <span>Archived ({stats.archived})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-6">
            {getFilteredItems(activeTab).length > 0 ? (
              getFilteredItems(activeTab).map((item) => (
                <ReputationItem
                  key={item.id}
                  item={item}
                  onRefresh={(itemId) => {
                    setSelectedItem(item)
                    setShowRefreshModal(true)
                  }}
                  onArchive={handleArchive}
                />
              ))
            ) : (
              <Card className="p-12 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} items
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'active' 
                    ? "You don't have any active reputation items yet."
                    : activeTab === 'expiring'
                    ? "No items are expiring soon."
                    : activeTab === 'expired'
                    ? "No items have expired."
                    : "No items have been archived."
                  }
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Information Panel */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start">
          <RotateCcw className="h-6 w-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">How Time-Limited Reputation Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Fair & Current:</strong> All items expire after 1 year to keep reputation current</li>
              <li>• <strong>Refresh System:</strong> Request updates from original sources before expiration</li>
              <li>• <strong>Growth-Focused:</strong> No permanent &quot;black marks&quot; - everyone can improve</li>
              <li>• <strong>Archive Option:</strong> Keep expired items for personal reference</li>
              <li>• <strong>Transparent:</strong> All dates and sources are clearly visible</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Refresh Modal */}
      <RefreshModal
        item={selectedItem}
        isOpen={showRefreshModal}
        onClose={() => {
          setShowRefreshModal(false)
          setSelectedItem(null)
        }}
        onConfirm={handleRefreshRequest}
      />
    </div>
  )
}
