import styles from "./FeaturesSection.module.css";
import Carousel from "../ui/Carousel";
import { CarouselSkeleton, FeatureSkeleton } from "../ui/Skeleton";

const FeaturesSection = ({
  featuresData,
  carouselData,
  loading,
  error,
  onRetry,
}) => {
  if (loading) {
    return (
      <>
        <div className="responsive-container">
          <FeatureSkeleton />
        </div>
        <div className={styles.productSlider}>
          <CarouselSkeleton items={3} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="responsive-container">
        <div className={styles.errorState}>
          <p className={styles.errorText}>{error}</p>
          <button type="button" className={styles.retryBtn} onClick={onRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { title, titleAccent, subtitle, products } = featuresData ?? {};

  const safeTitle = title || "";
  const safeTitleAccent = titleAccent || "";
  const hasAccentInTitle = safeTitle.includes(safeTitleAccent);
  const hasPlaceholderGap = /\s{2,}/.test(safeTitle);

  let beforeAccent = safeTitle;
  let afterAccent = "";

  if (hasAccentInTitle) {
    [beforeAccent, afterAccent] = safeTitle.split(safeTitleAccent);
  } else if (hasPlaceholderGap) {
    [beforeAccent, afterAccent] = safeTitle.split(/\s{2,}/);
  }

  return (
    <>
    <div className="responsive-container">
   <div className={`${styles.wrapper} ${styles.fadeIn}`}>     
      <h3 className={styles.subHeadline}>
        {beforeAccent}
        <strong className={styles.titleAccent}>{safeTitleAccent}</strong>
        {afterAccent}
      </h3>

      <p className={styles.subtitle}>
        {subtitle}
      </p>
      </div>
    </div>
 
      <div className={styles.productSlider}>
       {/* product slider  */}
      <Carousel products={products ?? []} carouselConfig={carouselData} />
     </div>
    </>
  );
};

export default FeaturesSection;
