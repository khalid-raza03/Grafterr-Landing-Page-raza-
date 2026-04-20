import { useState } from 'react'
import styles from './App.module.css';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';

function App() {

  return (
    <>
     <div className={styles.mainWrapper}>

      <div >
          <HeroSection />
          <FeaturesSection />
        
      </div>
     </div>
    </>
  )
}

export default App
