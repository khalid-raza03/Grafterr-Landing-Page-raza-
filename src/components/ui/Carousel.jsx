import { useEffect, useState } from 'react';
import useCarousel from '../../hooks/useCarousel';
import ProductCard from './ProductCard';
import styles from './Carousel.module.css';

const DEFAULT_ITEMS_PER_VIEW = { desktop: 3, tablet: 2, mobile: 1 };

const getItemsPerView = (carouselConfig) => {
  const width = window.innerWidth;
  if (width >= 1024) return carouselConfig.desktop;
  if (width >= 768) return carouselConfig.tablet;
  return carouselConfig.mobile;
};

const Carousel = ({ products = [], carouselConfig = {} }) => {
  const itemsPerViewConfig = carouselConfig.itemsPerView ?? DEFAULT_ITEMS_PER_VIEW;
  const showArrows = carouselConfig.showArrows ?? true;
  const arrowUrl = carouselConfig.url ?? "/images/arrow.png";
  const transitionDuration = carouselConfig.transitionDuration ?? 300;
  const safeProducts = products ?? [];

  const [itemsPerView, setItemsPerView] = useState(() =>
    getItemsPerView(itemsPerViewConfig)
  );

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView(itemsPerViewConfig));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    itemsPerViewConfig.desktop,
    itemsPerViewConfig.tablet,
    itemsPerViewConfig.mobile,
  ]);

  const isCircularLoop = carouselConfig.circular ?? false;

  const {
    currentIndex,
    goPrev,
    goNext,
    prev,
    next,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCarousel(safeProducts.length, itemsPerView, { circular: isCircularLoop });

  const visibleProducts = isCircularLoop
    ? safeProducts.map((_, slotIndex) => {
        const originalIndex = (currentIndex + slotIndex) % safeProducts.length;
        return {
          product: safeProducts[originalIndex],
          originalIndex,
          key: safeProducts[originalIndex]?.id ?? safeProducts[originalIndex]?.title ?? originalIndex,
        };
      })
    : safeProducts.map((product, originalIndex) => ({
        product,
        originalIndex,
        key: product?.id ?? product?.title ?? originalIndex,
      }));

  return (
    <>
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carouselTrack}
        style={{
          transform: isCircularLoop
            ? "translateX(0)"
            : `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleProducts.map(({ product, originalIndex, key }, index) => (
          <div
            key={`${key}-${index}`}
            className={styles.carouselItem}
            style={{ minWidth: `${100 / itemsPerView}%` }}
          >
            <ProductCard title={product?.title} img={product?.img} index={originalIndex} />
          </div>
        ))}
      </div>
    </div>
    {showArrows && (
        <>
          <button
            type="button"
            className={styles.prevBtn}
            onClick={prev}
            disabled={!goPrev}
          >
            <img src={arrowUrl} alt="prev" className={styles.arrowLeft} />
          </button>
          <button
            type="button"
            className={styles.nextBtn}
            onClick={next}
            disabled={!goNext}
          >
            <img src={arrowUrl} alt="next" className={styles.arrowRight} />
          </button>
        </>
      )}
    </>
  );
};

export default Carousel;
