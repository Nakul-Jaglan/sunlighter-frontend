"use client"
import { createContext, useContext } from 'react'

const TabsContext = createContext()

export function Tabs({ children, value, onValueChange, className = '' }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '' }) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 w-full ${className}`}>
      {children}
    </div>
  )
}

export function TabsTrigger({ children, value, className = '' }) {
  const { value: activeValue, onValueChange } = useContext(TabsContext)
  const isActive = value === activeValue
  
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 ${
        isActive 
          ? 'bg-white text-gray-950 shadow-sm' 
          : 'hover:bg-gray-200'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, className = '' }) {
  const { value: activeValue } = useContext(TabsContext)
  
  if (value !== activeValue) {
    return null
  }
  
  return (
    <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>
  )
}
