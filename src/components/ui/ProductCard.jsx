import React from 'react'
import styles from './ProductCard.module.css'

const ProductCard = () => {
  return (
    <>
    <div className={styles.productCard}>
        <h3  className={styles.productTitle}>Point of sale</h3>
        <img className={styles.productImg} src="./images/carousel1.png" alt="carousel-1"  />
    </div>
    </>
  )
}

export default ProductCard