import React from 'react'
import { FiCheck } from 'react-icons/fi'
import Slider from '../UI/Slider/Slider'
import styles from './PasswordOptions.module.css'

const PasswordOptions = ({
  passwordLength,
  setPasswordLength,
  includeLowercase,
  setIncludeLowercase,
  includeUppercase,
  setIncludeUppercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols
}) => {
  // Fonction pour gérer les changements de checkbox
  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked)
  }

  // Composant de case à cocher personnalisé
  const Checkbox = ({ id, checked, onChange, label }) => (
    <div className="flex items-center mb-3">
      <label 
        htmlFor={id} 
        className="flex items-center cursor-pointer group"
      >
        <div className={`
          w-5 h-5 rounded border flex items-center justify-center mr-3
          ${checked 
            ? 'bg-blue-600 border-blue-600' 
            : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400 dark:group-hover:border-blue-500'
          }
          transition-colors duration-200
        `}>
          {checked && <FiCheck className="text-white text-sm" />}
        </div>
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
      </label>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
    </div>
  )

  return (
    <div className={styles.optionsContainer}>
      <div className="mb-6">
        <Slider
          min={4}
          max={32}
          value={passwordLength}
          onChange={setPasswordLength}
          label="Longueur du mot de passe"
          valueDisplay={`${passwordLength} caractères`}
        />
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Types de caractères à inclure
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Checkbox
            id="lowercase"
            checked={includeLowercase}
            onChange={handleCheckboxChange(setIncludeLowercase)}
            label="Minuscules (a-z)"
          />
          
          <Checkbox
            id="uppercase"
            checked={includeUppercase}
            onChange={handleCheckboxChange(setIncludeUppercase)}
            label="Majuscules (A-Z)"
          />
          
          <Checkbox
            id="numbers"
            checked={includeNumbers}
            onChange={handleCheckboxChange(setIncludeNumbers)}
            label="Chiffres (0-9)"
          />
          
          <Checkbox
            id="symbols"
            checked={includeSymbols}
            onChange={handleCheckboxChange(setIncludeSymbols)}
            label="Symboles (!@#$...)"
          />
        </div>
      </div>
    </div>
  )
}

export default PasswordOptions
