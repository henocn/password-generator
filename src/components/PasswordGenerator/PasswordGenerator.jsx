import React, { useState, useEffect } from 'react'
import { FiKey, FiUser, FiRefreshCw } from 'react-icons/fi'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import PasswordOptions from '../PasswordOptions/PasswordOptions'
import PasswordResult from '../PasswordResult/PasswordResult'
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm'
import usePasswordGenerator from '../../hooks/usePasswordGenerator'
import styles from './PasswordGenerator.module.css'

const PasswordGenerator = () => {
  const [activeTab, setActiveTab] = useState('standard')
  const passwordGenerator = usePasswordGenerator()
  
  const {
    password,
    passwordLength,
    setPasswordLength,
    includeLowercase,
    setIncludeLowercase,
    includeUppercase,
    setIncludeUppercase,
    includeNumbers,
    setIncludeNumbers,
    includeSymbols,
    setIncludeSymbols,
    personalInfo,
    setPersonalInfo,
    passwordStrength,
    explanation,
    generateNewPassword,
    generatePersonalPassword,
    copyToClipboard
  } = passwordGenerator

  // Générer un mot de passe au chargement initial
  useEffect(() => {
    generateNewPassword()
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.container}>
      <Card elevation="high" className="overflow-hidden">
        {/* Onglets */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors
              ${activeTab === 'standard' 
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
              }`}
            onClick={() => handleTabChange('standard')}
          >
            <div className="flex items-center justify-center gap-2">
              <FiKey />
              <span>Générateur Standard</span>
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors
              ${activeTab === 'personal' 
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
              }`}
            onClick={() => handleTabChange('personal')}
          >
            <div className="flex items-center justify-center gap-2">
              <FiUser />
              <span>Générateur Personnalisé</span>
            </div>
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6">
          {/* Résultat du mot de passe (commun aux deux onglets) */}
          <PasswordResult
            password={password}
            strength={passwordStrength}
            explanation={explanation}
            onCopy={copyToClipboard}
            onRegenerate={activeTab === 'standard' ? generateNewPassword : generatePersonalPassword}
          />

          {/* Contenu spécifique à l'onglet */}
          <div className="mt-8">
            {activeTab === 'standard' ? (
              <>
                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
                  Options du mot de passe
                </h3>
                <PasswordOptions
                  passwordLength={passwordLength}
                  setPasswordLength={setPasswordLength}
                  includeLowercase={includeLowercase}
                  setIncludeLowercase={setIncludeLowercase}
                  includeUppercase={includeUppercase}
                  setIncludeUppercase={setIncludeUppercase}
                  includeNumbers={includeNumbers}
                  setIncludeNumbers={setIncludeNumbers}
                  includeSymbols={includeSymbols}
                  setIncludeSymbols={setIncludeSymbols}
                />
                <div className="mt-6">
                  <Button
                    onClick={generateNewPassword}
                    variant="primary"
                    fullWidth
                    icon={<FiRefreshCw />}
                  >
                    Générer un nouveau mot de passe
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
                  Créer un mot de passe mémorisable
                </h3>
                <PersonalInfoForm
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                  onGenerate={generatePersonalPassword}
                />
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Section d'information */}
      <Card className="mt-6 p-5">
        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
          Conseils pour un mot de passe sécurisé
        </h3>
        <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
          <li>Utilisez au moins 12 caractères</li>
          <li>Combinez lettres majuscules, minuscules, chiffres et symboles</li>
          <li>Évitez les séquences prévisibles comme "123456" ou "qwerty"</li>
          <li>N'utilisez pas d'informations personnelles évidentes</li>
          <li>Utilisez un mot de passe unique pour chaque compte important</li>
        </ul>
      </Card>
    </div>
  )
}

export default PasswordGenerator
