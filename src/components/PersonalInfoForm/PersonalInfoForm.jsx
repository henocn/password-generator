import React from 'react'
import { FiInfo } from 'react-icons/fi'
import Button from '../UI/Button/Button'
import styles from './PersonalInfoForm.module.css'

const PersonalInfoForm = ({ personalInfo, setPersonalInfo, onGenerate }) => {
  const handleChange = (field) => (e) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: e.target.value
    })
  }

  return (
    <div className={styles.formContainer}>
      <div className="mb-4 p-3 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-start">
        <FiInfo className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Entrez jusqu'à trois informations personnelles (comme un nom, une date, un lieu...) 
          pour créer un mot de passe mémorisable mais sécurisé.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="info1" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Information 1
          </label>
          <input
            type="text"
            id="info1"
            value={personalInfo.info1}
            onChange={handleChange('info1')}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            placeholder="Ex: nom de votre animal"
          />
        </div>

        <div>
          <label 
            htmlFor="info2" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Information 2 (optionnel)
          </label>
          <input
            type="text"
            id="info2"
            value={personalInfo.info2}
            onChange={handleChange('info2')}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            placeholder="Ex: année de naissance"
          />
        </div>

        <div>
          <label 
            htmlFor="info3" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Information 3 (optionnel)
          </label>
          <input
            type="text"
            id="info3"
            value={personalInfo.info3}
            onChange={handleChange('info3')}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            placeholder="Ex: lieu préféré"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button 
          onClick={onGenerate}
          variant="primary"
          fullWidth
        >
          Générer un mot de passe personnalisé
        </Button>
      </div>
    </div>
  )
}

export default PersonalInfoForm
