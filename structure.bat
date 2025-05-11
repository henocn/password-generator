@echo off
echo Création de l'architecture du dossier src...

mkdir src
mkdir src\assets
mkdir src\assets\images
mkdir src\components
mkdir src\components\PasswordGenerator
mkdir src\components\PasswordOptions
mkdir src\components\PasswordResult
mkdir src\components\PersonalInfoForm
mkdir src\components\UI
mkdir src\components\UI\Button
mkdir src\components\UI\Card
mkdir src\components\UI\Slider
mkdir src\hooks
mkdir src\utils

echo // Composant principal > src\components\PasswordGenerator\PasswordGenerator.jsx
echo .module-password-generator {} > src\components\PasswordGenerator\PasswordGenerator.module.css

echo // Options de mot de passe > src\components\PasswordOptions\PasswordOptions.jsx
echo .module-password-options {} > src\components\PasswordOptions\PasswordOptions.module.css

echo // Affichage du résultat > src\components\PasswordResult\PasswordResult.jsx
echo .module-password-result {} > src\components\PasswordResult\PasswordResult.module.css

echo // Formulaire d'informations personnelles > src\components\PersonalInfoForm\PersonalInfoForm.jsx
echo .module-personal-info {} > src\components\PersonalInfoForm\PersonalInfoForm.module.css

echo // Composant Button > src\components\UI\Button\Button.jsx
echo .module-button {} > src\components\UI\Button\Button.module.css

echo // Composant Card > src\components\UI\Card\Card.jsx
echo .module-card {} > src\components\UI\Card\Card.module.css

echo // Composant Slider > src\components\UI\Slider\Slider.jsx
echo .module-slider {} > src\components\UI\Slider\Slider.module.css

echo // Hook personnalisé pour la génération de mot de passe > src\hooks\usePasswordGenerator.js

echo // Fonctions utilitaires pour les mots de passe > src\utils\passwordUtils.js

echo // Fichier principal de l'application > src\App.jsx
echo /* Styles globaux de l'application */ > src\App.css

echo // Point d'entrée React > src\main.jsx
echo /* Styles globaux */ > src\index.css

echo Architecture du dossier src créée avec succès!
