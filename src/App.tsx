import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  useState('')

  return (
    <>
      <header className="topbar" role="banner">
        <div className="topbar-title large">AIKU</div>
      </header>

      <div className="app">
        <Outlet />
      </div>
    </>
  )
}

export default App
