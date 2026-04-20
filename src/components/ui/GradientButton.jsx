import React from 'react'
import styles from './GradientButton.module.css';

function GradientButton({children, url}) {
  return (
    <>
      <a href={url} className={styles.btn}>{children}</a>
    </>
  )
}

export default GradientButton
