import zxcvbn from 'zxcvbn'

// Caractères disponibles par catégorie
const CHARS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
}

/**
 * Génère un mot de passe aléatoire selon les options spécifiées
 */
export const generatePassword = (options) => {
  const { length = 12, includeLowercase = true, includeUppercase = true, 
          includeNumbers = true, includeSymbols = true } = options
  
  let chars = ''
  if (includeLowercase) chars += CHARS.lowercase
  if (includeUppercase) chars += CHARS.uppercase
  if (includeNumbers) chars += CHARS.numbers
  if (includeSymbols) chars += CHARS.symbols
  
  // Si aucune option n'est sélectionnée, utiliser les minuscules par défaut
  if (!chars) chars = CHARS.lowercase
  
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars[randomIndex]
  }
  
  return password
}

/**
 * Génère un mot de passe basé sur des informations personnelles
 */
export const generatePersonalizedPassword = (personalInfo) => {
  const { info1 = '', info2 = '', info3 = '' } = personalInfo
  
  // Extraire des parties des informations personnelles
  const parts = []
  if (info1) parts.push(info1.slice(0, 3))
  if (info2) parts.push(info2.slice(0, 3))
  if (info3) parts.push(info3.slice(0, 3))
  
  // Ajouter des caractères aléatoires
  let base = parts.join('')
  base = base.replace(/\s+/g, ''); // Supprimer les espaces
  
  // Ajouter des caractères spéciaux et des chiffres
  const randomChars = generatePassword({
    length: Math.max(12 - base.length, 6),
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true
  })
  
  // Mélanger le tout
  const combined = base + randomChars
  return shuffleString(combined)
}

/**
 * Mélange les caractères d'une chaîne
 */
const shuffleString = (str) => {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

/**
 * Évalue la force d'un mot de passe
 */
export const evaluatePasswordStrength = (password) => {
  const result = zxcvbn(password)
  
  // Score de 0 à 4
  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort']
  const strengthColors = ['#ff4d4d', '#ffaa00', '#ffcc00', '#73e600', '#00b300']
  
  return {
    score: result.score,
    label: strengthLabels[result.score],
    color: strengthColors[result.score],
    feedback: result.feedback.suggestions.join(' '),
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second
  }
}

/**
 * Explique la composition d'un mot de passe
 */
export const explainPassword = (password) => {
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^A-Za-z0-9]/.test(password)
  
  const parts = []
  if (hasLower) parts.push('minuscules')
  if (hasUpper) parts.push('majuscules')
  if (hasNumber) parts.push('chiffres')
  if (hasSymbol) parts.push('symboles')
  
  return `Ce mot de passe de ${password.length} caractères contient des ${parts.join(', ')}.`
}
