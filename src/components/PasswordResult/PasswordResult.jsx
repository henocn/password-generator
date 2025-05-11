import React from 'react'
import { FiCopy, FiRefreshCw } from 'react-icons/fi'
import Button from '../UI/Button/Button'
import styles from './PasswordResult.module.css'

const PasswordResult = ({ 
  password, 
  strength, 
  explanation, 
  onCopy, 
  onRegenerate 
}) => {
  // Fonction pour afficher la barre de force du mot de passe
  const renderStrengthBar = () => {
    if (!strength) return null
    
    const { score, label, color } = strength
    const segments = 4; // 0-4 score
    
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Force du mot de passe
          </span>
          <span 
            className="text-sm font-semibold" 
            style={{ color }}
          >
            {label}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${(score + 1) * 20}%`,
              backgroundColor: color
            }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.resultContainer}`}>
      {password ? (
        <>
          <div className="relative">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg font-mono text-lg break-all">
                  {password}
                </div>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Button 
                  variant="outline" 
                  onClick={onCopy}
                  icon={<FiCopy />}
                  aria-label="Copier le mot de passe"
                >
                  Copier
                </Button>
              </div>
            </div>
            
            {renderStrengthBar()}
            
            {explanation && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                <h3 className="font-semibold mb-1">À propos de ce mot de passe :</h3>
                <p>{explanation}</p>
                {strength && strength.crackTime && (
                  <p className="mt-2">
                    <span className="font-semibold">Temps estimé pour le cracker :</span> {strength.crackTime}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="secondary" 
              onClick={onRegenerate}
              icon={<FiRefreshCw />}
            >
              Régénérer
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center p-8 text-slate-500 dark:text-slate-400">
          Votre mot de passe apparaîtra ici
        </div>
      )}
    </div>
  )
}

export default PasswordResult
