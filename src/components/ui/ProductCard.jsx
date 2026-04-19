import React from 'react'
import styles from './ProductCard.module.css'

const ProductCard = ({ title, img }) => {
  return (
    <div className={styles.productCard}>
      <h3 className={styles.productTitle}>{title}</h3>
      <img className={styles.productImg} src={img} alt={title} />
    </div>
  )
}

export default ProductCard