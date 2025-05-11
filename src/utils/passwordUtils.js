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
  try {
    const { info1 = '', info2 = '', info3 = '' } = personalInfo;
    
    // Extraire des parties des informations personnelles
    let parts = [];
    
    // Traiter chaque information si elle existe
    if (info1 && typeof info1 === 'string' && info1.trim() !== '') {
      parts.push(info1.trim().slice(0, 3));
    }
    
    if (info2 && typeof info2 === 'string' && info2.trim() !== '') {
      parts.push(info2.trim().slice(0, 3));
    }
    
    if (info3 && typeof info3 === 'string' && info3.trim() !== '') {
      parts.push(info3.trim().slice(0, 3));
    }
    
    // Si aucune partie valide n'a été extraite, utiliser une chaîne par défaut
    if (parts.length === 0) {
      parts = ['Pwd'];
    }
    
    // Mélanger le tableau parts de manière aléatoire et supprimer les espaces
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }
    let base = parts.join('');
    base = base.replace(/\s+/g, '');

    // Ajouter des caractères aléatoires pour atteindre une longueur minimale
    const additionalLength = Math.max(12 - base.length, 6);
    
    // Générer des caractères aléatoires
    let randomChars = '';
    const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    for (let i = 0; i < additionalLength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      randomChars += allChars[randomIndex];
    }
    
    // Combiner les parties et les caractères aléatoires
    const combined = Math.random() < 0.5 ? base + randomChars : randomChars + base;    return combined;

    // on pourrait aussi chercher à malaxer une fois encore le mot de passe
    // return shuffleString(combined);

  } catch (error) {
    return generatePassword({ length: 12, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: true });
  }
}

/**
 * Mélange les caractères d'une chaîne
 */
const shuffleString = (str) => {
  try {
    if (!str || typeof str !== 'string') {
      return 'Password123!';
    }
    
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  } catch (error) {
    console.error("Erreur dans shuffleString:", error);
    return 'Password123!';
  }
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
