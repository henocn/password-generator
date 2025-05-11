import React from 'react'
import styles from './Card.module.css'

const Card = ({ 
  children, 
  title = null,
  subtitle = null,
  className = '',
  elevation = 'medium',
  noPadding = false
}) => {
  const elevationClasses = {
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg'
  }

  const paddingClass = noPadding ? '' : 'p-6'
  
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl ${elevationClasses[elevation]} ${paddingClass} ${className} ${styles.card}`}>
      {title && (
        <div className={`${!noPadding ? 'mb-4' : ''}`}>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">{title}</h2>
          {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
