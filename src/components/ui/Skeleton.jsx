import React from 'react'
import styles from './Skeleton.module.css'


const Skeleton = ({width ="100%", height="auto"}) => {
  return (
    <div
      className={styles.skeleton}
          aria-label="Loading content..."
    >   
    </div>
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


export default Skeleton
