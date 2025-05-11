import React from 'react'
import styles from './Slider.module.css'

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  valueDisplay,
  className = ''
}) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value))
  }

  // Calculer le pourcentage pour la couleur de remplissage
  const percentage = ((value - min) / (max - min)) * 100
  
  return (
    <div className={`${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
          {valueDisplay && (
            <span className="text-sm font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
              {valueDisplay}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={`w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer ${styles.slider}`}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`
          }}
        />
      </div>
    </div>
  )
}

export default Slider
