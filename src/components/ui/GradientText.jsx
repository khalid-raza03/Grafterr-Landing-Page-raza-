import React from 'react'
import styles from './GradientText.module.css'

const GradientText = ({children}) => {
  return (
    <>
    <span className={styles.gradTxt}>
        {children}
      </span>
</>
  )
}

export default GradientText