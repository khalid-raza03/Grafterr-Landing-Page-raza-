import { useState } from 'react'
import styles from './App.module.css';
import HeroSection from './components/sections/HeroSection';

function App() {

  return (
    <>
     <div className={styles.mainWrapper}>

      <div className="responsive-container">
          <HeroSection />
          
      </div>
     </div>
    </>
  )
}

export default App
