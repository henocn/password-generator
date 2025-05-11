import React, { useState } from 'react'
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          GeneWord
        </h1>
        <PasswordGenerator />
      </div>
    </div>
  )
}

export default App
