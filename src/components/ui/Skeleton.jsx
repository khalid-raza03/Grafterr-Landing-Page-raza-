import React from 'react'
import styles from './Skeleton.module.css'

const toCssUnit = (value) => (typeof value === "number" ? `${value}px` : value);

const Skeleton = ({ width = "100%", height = "auto", className = "" }) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`.trim()}
      aria-label="Loading content..."
      style={{ width: toCssUnit(width), height: toCssUnit(height) }}
    />
  )
}

export const HeroSkeleton = () =>(
    <div className={styles.heroSkeleton}>
        <div className={styles.heroSkeletonIn}>
          <Skeleton width={180} height={32} />
          <Skeleton width="80%" height={64} />
          <Skeleton width='60%' height={28} />
          <Skeleton width="75%" height={38} />
          <Skeleton width="45%" height={58} />
          <Skeleton width="50%" height={50} />
        </div>
    </div>
);


export const FeatureSkeleton = () => (
  <div className={styles.featuresSkeleton}>
    <div className={styles.featuresSkeletonRow}>
      {[0, 1, 2].map((item) => (
        <div key={item} className={styles.rowSkeleton}>
          <Skeleton width={180} height={12} />
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={28} />
          <Skeleton width="75%" height={18} />
          <Skeleton width="45%" height={16} />
        </div>
      ))}
    </div>
  </div>
);

export const CarouselSkeleton = ({ items = 3 }) => (
  <div className={styles.carouselSkeleton} aria-hidden="true">
    <div className={styles.carouselSkeletonTrack}>
      {Array.from({ length: items }).map((_, item) => (
        <div key={item} className={styles.carouselSkeletonCard}>
          <Skeleton width="55%" height={34} />
          <Skeleton className={styles.carouselSkeletonImage} height="72%" />
        </div>
      ))}
    </div>
  </div>
);


export default Skeleton
