"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Badge from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Award, 
  Shield, 
  CheckCircle, 
  Clock, 
  Leaf,
  Users,
  FileCheck,
  Trophy,
  Star,
  Calendar,
  Building2
} from 'lucide-react'

const BadgeCard = ({ badge, onVerify }) => {
  const getBadgeIcon = (type) => {
    switch(type) {
      case 'conduct': return <Shield className="h-6 w-6" />
      case 'complaint': return <CheckCircle className="h-6 w-6" />
      case 'sustainability': return <Leaf className="h-6 w-6" />
      case 'leadership': return <Users className="h-6 w-6" />
      case 'training': return <FileCheck className="h-6 w-6" />
      default: return <Award className="h-6 w-6" />
    }
  }

  const getBadgeColor = (type) => {
    switch(type) {
      case 'conduct': return 'from-blue-500 to-indigo-600'
      case 'complaint': return 'from-green-500 to-emerald-600'
      case 'sustainability': return 'from-green-500 to-teal-600'
      case 'leadership': return 'from-purple-500 to-pink-600'
      case 'training': return 'from-orange-500 to-red-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'self-claimed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${getBadgeColor(badge.type)} rounded-full flex items-center justify-center text-white`}>
            {getBadgeIcon(badge.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor(badge.status)} border`}>
          {badge.status === 'self-claimed' ? 'Self-Claimed' : badge.status.charAt(0).toUpperCase() + badge.status.slice(1)}
        </Badge>
      </div>

      {badge.details && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{badge.details}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="space-y-1">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Earned: {formatDate(badge.earnedAt)}</span>
          </div>
          {badge.verifiedAt && (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>Verified: {formatDate(badge.verifiedAt)}</span>
            </div>
          )}
          {badge.verifiedBy && (
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span>By: {badge.verifiedBy}</span>
            </div>
          )}
        </div>
        
        {badge.expiresAt && (
          <div className="text-right">
            <div className="flex items-center text-orange-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Expires: {formatDate(badge.expiresAt)}</span>
            </div>
          </div>
        )}
      </div>

      {badge.status === 'self-claimed' && onVerify && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onVerify(badge.id)}
            className="w-full"
          >
            <Shield className="h-4 w-4 mr-2" />
            Request Employer Verification
          </Button>
        </div>
      )}
    </motion.div>
  )
}

const AddBadgeModal = ({ isOpen, onClose, onAdd }) => {
  const [selectedType, setSelectedType] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    evidence: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const badgeTypes = [
    {
      id: 'conduct',
      title: 'Code of Conduct Certified',
      description: 'Completed ethics and conduct training',
      icon: Shield,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'complaint',
      title: 'Zero Complaint History',
      description: 'Clean disciplinary record',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'sustainability',
      title: 'Sustainability Contributor',
      description: 'Active in CSR and environmental initiatives',
      icon: Leaf,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'leadership',
      title: 'Team Leadership',
      description: 'Demonstrated leadership capabilities',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'training',
      title: 'Professional Training',
      description: 'Completed specialized training programs',
      icon: FileCheck,
      color: 'from-orange-500 to-red-600'
    }
  ]

  const handleTypeSelect = (type) => {
    const badgeType = badgeTypes.find(b => b.id === type)
    setSelectedType(type)
    setFormData({
      title: badgeType.title,
      description: badgeType.description,
      details: '',
      evidence: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const newBadge = {
        type: selectedType,
        title: formData.title,
        description: formData.description,
        details: formData.details,
        evidence: formData.evidence,
        status: 'self-claimed',
        earnedAt: new Date().toISOString()
      }
      
      await onAdd(newBadge)
      onClose()
      
      // Reset form
      setSelectedType('')
      setFormData({
        title: '',
        description: '',
        details: '',
        evidence: ''
      })
    } catch (error) {
      console.error('Failed to add badge:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Add Achievement Badge</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!selectedType ? (
          <div>
            <p className="text-gray-600 mb-6">Select a badge type to add to your profile:</p>
            <div className="grid gap-4">
              {badgeTypes.map((badge) => {
                const Icon = badge.icon
                return (
                  <button
                    key={badge.id}
                    onClick={() => handleTypeSelect(badge.id)}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center text-white mr-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{badge.title}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Provide specific details about this achievement..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Evidence (Optional)</label>
              <textarea
                value={formData.evidence}
                onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Reference numbers, dates, or other supporting information..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Verification Process</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    This badge will be marked as "Self-Claimed" until verified by your employer. 
                    Only factual elements can be verified, not opinions or subjective assessments.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Adding Badge...' : 'Add Badge'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setSelectedType('')}>
                Back
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default function EthicsBadges() {
  const [badges, setBadges] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data - replace with actual API calls
  const mockBadges = [
    {
      id: 1,
      type: 'conduct',
      title: 'Code of Conduct Certified',
      description: 'Completed comprehensive ethics training',
      details: 'Completed 8-hour ethics and professional conduct certification program covering workplace harassment, data privacy, and conflict of interest policies.',
      status: 'verified',
      earnedAt: '2024-07-15T10:00:00Z',
      verifiedAt: '2024-07-18T14:30:00Z',
      verifiedBy: 'TechCorp Inc HR Department'
    },
    {
      id: 2,
      type: 'complaint',
      title: 'Zero Complaint History',
      description: 'Clean disciplinary record',
      details: 'No formal complaints, disciplinary actions, or HR violations in employment history (last 3 years verified).',
      status: 'verified',
      earnedAt: '2024-08-01T09:00:00Z',
      verifiedAt: '2024-08-01T09:00:00Z',
      verifiedBy: 'TechCorp Inc HR Department',
      expiresAt: '2025-08-01T09:00:00Z'
    },
    {
      id: 3,
      type: 'sustainability',
      title: 'Green Initiative Leader',
      description: 'Led environmental sustainability projects',
      details: 'Spearheaded office recycling program and remote work policy that reduced company carbon footprint by 15%.',
      status: 'self-claimed',
      earnedAt: '2024-08-10T16:00:00Z'
    }
  ]

  useEffect(() => {
    loadBadges()
  }, [])

  const loadBadges = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // const data = await api.badges.getAll()
      setTimeout(() => {
        setBadges(mockBadges)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load badges:', error)
      setError('Failed to load badges')
      setIsLoading(false)
    }
  }

  const handleAddBadge = async (badgeData) => {
    try {
      // TODO: Replace with actual API call
      const newBadge = {
        id: Date.now(),
        ...badgeData
      }
      
      setBadges(prev => [newBadge, ...prev])
    } catch (error) {
      throw new Error('Failed to add badge')
    }
  }

  const handleRequestVerification = async (badgeId) => {
    try {
      // TODO: Replace with actual API call
      console.log('Requesting verification for badge:', badgeId)
      
      setBadges(prev => prev.map(badge => 
        badge.id === badgeId 
          ? { ...badge, status: 'pending' }
          : badge
      ))
    } catch (error) {
      console.error('Failed to request verification:', error)
    }
  }

  const getStatistics = () => {
    const total = badges.length
    const verified = badges.filter(b => b.status === 'verified').length
    const pending = badges.filter(b => b.status === 'pending').length
    const selfClaimed = badges.filter(b => b.status === 'self-claimed').length
    
    return { total, verified, pending, selfClaimed }
  }

  const stats = getStatistics()

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ethics & Responsibility Badges</h1>
            <p className="text-gray-600">Showcase your professional achievements and ethical standards</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Add Badge
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Badges</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <div className="text-sm text-gray-600">Verified</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.selfClaimed}</div>
            <div className="text-sm text-gray-600">Self-Claimed</div>
          </Card>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Badges Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {badges.length > 0 ? (
          badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              onVerify={handleRequestVerification}
            />
          ))
        ) : (
          <div className="col-span-2">
            <Card className="p-12 text-center">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No badges yet</h3>
              <p className="text-gray-600 mb-4">
                Start building your professional reputation by adding achievement badges
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                Add Your First Badge
              </Button>
            </Card>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start">
          <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">How Badge Verification Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Self-Claimed:</strong> Badges you add yourself that need employer verification</li>
              <li>• <strong>Pending:</strong> Verification request sent to your employer</li>
              <li>• <strong>Verified:</strong> Confirmed by employer (only factual elements, not opinions)</li>
              <li>• <strong>Time-Limited:</strong> Some badges expire and need renewal to stay current</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Add Badge Modal */}
      <AddBadgeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddBadge}
      />
    </div>
  )
}
