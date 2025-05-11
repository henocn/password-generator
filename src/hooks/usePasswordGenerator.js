import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { 
  generatePassword, 
  generatePersonalizedPassword,
  evaluatePasswordStrength,
  explainPassword
} from '../utils/passwordUtils'

const usePasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [personalInfo, setPersonalInfo] = useState({ info1: '', info2: '', info3: '' })
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [explanation, setExplanation] = useState('')
  const [isPersonalized, setIsPersonalized] = useState(false)

  // Générer un mot de passe standard
  const generateNewPassword = useCallback(() => {
    const options = {
      length: passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    }
    
    const newPassword = generatePassword(options)
    setPassword(newPassword)
    setPasswordStrength(evaluatePasswordStrength(newPassword))
    setExplanation(explainPassword(newPassword))
    setIsPersonalized(false)
    
    toast.success('Nouveau mot de passe généré !')
  }, [passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols])

  // Générer un mot de passe personnalisé
  const generatePersonalPassword = useCallback(() => {
    if (!personalInfo.info1 && !personalInfo.info2 && !personalInfo.info3) {
      toast.error('Veuillez saisir au moins une information personnelle')
      return
    }
    
    const newPassword = generatePersonalizedPassword(personalInfo)
    setPassword(newPassword)
    setPasswordStrength(evaluatePasswordStrength(newPassword))
    
    // Créer une explication personnalisée
    let explanation = explainPassword(newPassword)
    explanation += ' Il est basé sur vos informations personnelles, ce qui le rend mémorisable pour vous.'
    setExplanation(explanation)
    setIsPersonalized(true)
    
    toast.success('Mot de passe personnalisé généré !')
  }, [personalInfo])

  // Copier le mot de passe dans le presse-papier
  const copyToClipboard = useCallback(() => {
    if (!password) {
      toast.error('Aucun mot de passe à copier')
      return
    }
    
    navigator.clipboard.writeText(password)
      .then(() => toast.success('Mot de passe copié !'))
      .catch(() => toast.error('Échec de la copie'))
  }, [password])

  return {
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
    isPersonalized,
    generateNewPassword,
    generatePersonalPassword,
    copyToClipboard
  }
}

export default usePasswordGenerator
