"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import Textarea from './ui/textarea'
import Badge from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Users, 
  ThumbsUp, 
  Award, 
  Clock, 
  Send, 
  CheckCircle, 
  Star,
  MessageSquare,
  UserCheck,
  Calendar,
  TrendingUp
} from 'lucide-react'

const EndorsementCard = ({ endorsement, onRespond }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
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
      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {endorsement.endorserName?.charAt(0) || 'A'}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{endorsement.endorserName}</h4>
            <p className="text-sm text-gray-600">{endorsement.endorserRole} at {endorsement.endorserCompany}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor(endorsement.status)} border`}>
          {endorsement.status.charAt(0).toUpperCase() + endorsement.status.slice(1)}
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Values Highlighted:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {endorsement.values?.map((value, index) => (
            <Badge key={index} className="bg-blue-50 text-blue-700 border-blue-200">
              {value}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">
          &quot;{endorsement.message}&quot;
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Requested: {formatDate(endorsement.requestedAt)}
          </span>
          {endorsement.respondedAt && (
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Responded: {formatDate(endorsement.respondedAt)}
            </span>
          )}
        </div>
        {endorsement.expiresAt && (
          <span className="flex items-center text-orange-600">
            <Clock className="h-4 w-4 mr-1" />
            Expires: {formatDate(endorsement.expiresAt)}
          </span>
        )}
      </div>

      {endorsement.status === 'pending' && onRespond && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <Button
              size="sm"
              onClick={() => onRespond(endorsement.id, 'approved')}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRespond(endorsement.id, 'rejected')}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Decline
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

const RequestEndorsementModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    endorserEmail: '',
    endorserName: '',
    endorserRole: '',
    endorserCompany: '',
    values: [],
    customMessage: '',
    projectContext: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableValues = [
    'Reliability', 'Integrity', 'Teamwork', 'Communication', 'Problem Solving',
    'Leadership', 'Adaptability', 'Transparency', 'Accountability', 'Innovation',
    'Professionalism', 'Mentorship', 'Collaboration', 'Time Management'
  ]

  const toggleValue = (value) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.includes(value) 
        ? prev.values.filter(v => v !== value)
        : [...prev.values, value]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({
        endorserEmail: '',
        endorserName: '',
        endorserRole: '',
        endorserCompany: '',
        values: [],
        customMessage: '',
        projectContext: ''
      })
      onClose()
    } catch (error) {
      console.error('Failed to request endorsement:', error)
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
          <h3 className="text-xl font-semibold text-gray-900">Request Peer Endorsement</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Endorser Email"
              type="email"
              value={formData.endorserEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, endorserEmail: e.target.value }))}
              placeholder="colleague@company.com"
              required
            />
            <Input
              label="Endorser Name"
              value={formData.endorserName}
              onChange={(e) => setFormData(prev => ({ ...prev, endorserName: e.target.value }))}
              placeholder="Jane Smith"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Their Role/Title"
              value={formData.endorserRole}
              onChange={(e) => setFormData(prev => ({ ...prev, endorserRole: e.target.value }))}
              placeholder="Senior Manager"
              required
            />
            <Input
              label="Their Company"
              value={formData.endorserCompany}
              onChange={(e) => setFormData(prev => ({ ...prev, endorserCompany: e.target.value }))}
              placeholder="Tech Corp Inc"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Values to Highlight (Select up to 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableValues.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleValue(value)}
                  className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
                    formData.values.includes(value)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  disabled={formData.values.length >= 5 && !formData.values.includes(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {formData.values.length}/5
            </p>
          </div>

          <Textarea
            label="Project/Work Context (Optional)"
            value={formData.projectContext}
            onChange={(e) => setFormData(prev => ({ ...prev, projectContext: e.target.value }))}
            placeholder="Provide context about the project or work relationship..."
            rows={3}
          />

          <Textarea
            label="Custom Message to Endorser (Optional)"
            value={formData.customMessage}
            onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
            placeholder="Hi Jane, would you mind providing a brief endorsement about our collaboration on..."
            rows={3}
          />

          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || formData.values.length === 0}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Sending Request...' : 'Send Endorsement Request'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function PeerEndorsements() {
  const [endorsements, setEndorsements] = useState([])
  const [activeTab, setActiveTab] = useState('received')
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data - replace with actual API calls
  const mockEndorsements = {
    received: [
      {
        id: 1,
        endorserName: 'Sarah Chen',
        endorserRole: 'Senior Project Manager',
        endorserCompany: 'TechCorp Inc',
        values: ['Reliability', 'Communication', 'Problem Solving'],
        message: 'Always met deadlines with transparency and kept the team informed of progress. Great problem-solver who approached challenges methodically.',
        status: 'approved',
        requestedAt: '2024-08-15T10:00:00Z',
        respondedAt: '2024-08-17T14:30:00Z',
        expiresAt: '2025-08-17T14:30:00Z'
      },
      {
        id: 2,
        endorserName: 'Mike Johnson',
        endorserRole: 'Technical Lead',
        endorserCompany: 'StartupXYZ',
        values: ['Teamwork', 'Innovation', 'Mentorship'],
        message: 'Excellent team player who consistently helped junior developers. Brought innovative solutions to complex technical challenges.',
        status: 'pending',
        requestedAt: '2024-08-20T09:15:00Z',
        expiresAt: '2024-09-20T09:15:00Z'
      }
    ],
    given: [
      {
        id: 3,
        endorserName: 'You',
        endorserRole: 'Software Engineer',
        endorserCompany: 'Current Company',
        endorseeName: 'Alex Rodriguez',
        values: ['Leadership', 'Accountability', 'Transparency'],
        message: 'Outstanding leadership during the Q3 project launch. Took accountability for team decisions and maintained transparent communication throughout.',
        status: 'approved',
        requestedAt: '2024-08-10T16:00:00Z',
        respondedAt: '2024-08-12T11:00:00Z'
      }
    ]
  }

  useEffect(() => {
    loadEndorsements()
  }, [])

  const loadEndorsements = async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // const data = await api.endorsements.getAll()
      setTimeout(() => {
        setEndorsements(mockEndorsements)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load endorsements:', error)
      setError('Failed to load endorsements')
      setIsLoading(false)
    }
  }

  const handleRequestEndorsement = async (formData) => {
    try {
      // TODO: Replace with actual API call
      console.log('Requesting endorsement:', formData)
      
      // Mock API response
      const newRequest = {
        id: Date.now(),
        endorserName: formData.endorserName,
        endorserRole: formData.endorserRole,
        endorserCompany: formData.endorserCompany,
        values: formData.values,
        message: 'Pending response from endorser',
        status: 'pending',
        requestedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      }

      setEndorsements(prev => ({
        ...prev,
        received: [newRequest, ...prev.received]
      }))
    } catch (error) {
      throw new Error('Failed to request endorsement')
    }
  }

  const handleRespondToEndorsement = async (endorsementId, status) => {
    try {
      // TODO: Replace with actual API call
      console.log('Responding to endorsement:', endorsementId, status)
      
      setEndorsements(prev => ({
        ...prev,
        received: prev.received.map(e => 
          e.id === endorsementId 
            ? { ...e, status, respondedAt: new Date().toISOString() }
            : e
        )
      }))
    } catch (error) {
      console.error('Failed to respond to endorsement:', error)
    }
  }

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Endorsements</h1>
            <p className="text-gray-600">Values-driven endorsements from colleagues and clients</p>
          </div>
          <Button onClick={() => setShowRequestModal(true)} className="flex items-center">
            <Send className="h-4 w-4 mr-2" />
            Request Endorsement
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{endorsements.received?.length || 0}</div>
            <div className="text-sm text-gray-600">Total Received</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {endorsements.received?.filter(e => e.status === 'approved').length || 0}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {endorsements.received?.filter(e => e.status === 'pending').length || 0}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{endorsements.given?.length || 0}</div>
            <div className="text-sm text-gray-600">Given</div>
          </Card>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'received', name: 'Received', icon: ThumbsUp },
            { id: 'given', name: 'Given', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'received' && (
          <div className="space-y-6">
            {endorsements.received?.length > 0 ? (
              endorsements.received.map((endorsement) => (
                <EndorsementCard
                  key={endorsement.id}
                  endorsement={endorsement}
                  onRespond={handleRespondToEndorsement}
                />
              ))
            ) : (
              <Card className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No endorsements yet</h3>
                <p className="text-gray-600 mb-4">
                  Request endorsements from colleagues to build your reputation
                </p>
                <Button onClick={() => setShowRequestModal(true)}>
                  Request Your First Endorsement
                </Button>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'given' && (
          <div className="space-y-6">
            {endorsements.given?.length > 0 ? (
              endorsements.given.map((endorsement) => (
                <EndorsementCard key={endorsement.id} endorsement={endorsement} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No endorsements given</h3>
                <p className="text-gray-600">
                  Endorsements you provide to colleagues will appear here
                </p>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Request Modal */}
      <RequestEndorsementModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmit={handleRequestEndorsement}
      />
    </div>
  )
}
