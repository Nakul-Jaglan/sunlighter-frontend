"use client"

export function Alert({ children, className = '' }) {
  return (
    <div className={`relative w-full rounded-lg border p-4 ${className}`}>
      {children}
    </div>
  )
}

export function AlertDescription({ children, className = '' }) {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
      {children}
    </div>
  )
}
