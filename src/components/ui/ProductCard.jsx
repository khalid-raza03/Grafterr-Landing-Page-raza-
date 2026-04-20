import React from 'react'
import styles from './ProductCard.module.css'

const ProductCard = ({ title, img, index = 0 }) => {
  const imageVariantClass = styles[`imgVariant${(index % 3) + 1}`];

  return (
    <div className={styles.productCard}>
      <h3 className={styles.productTitle}>{title}</h3>
      <img className={`${styles.productImg} ${imageVariantClass}`} src={img} alt={title} />
    </div>
  )
}

export default ProductCard
