import React, { useEffect, useState } from 'react';
import useCarousel from '../../hooks/useCarousel';
import useContent from '../../hooks/useContent';
import ProductCard from './ProductCard';
import styles from './Carousel.module.css';

const getItemsPerView = (carouselConfig) => {
  const width = window.innerWidth;
  if (width >= 1024) return carouselConfig.desktop;
  if (width >= 768) return carouselConfig.tablet;
  return carouselConfig.mobile;
};

const Carousel = () => {
  const { data, loading, error } = useContent();

  const carouselConfig = data?.carousel?.itemsPerView ?? { desktop: 3, tablet: 2, mobile: 1 };
  const products = data?.featuresSection?.products ?? [];

  const [itemsPerView, setItemsPerView] = useState(() => getItemsPerView(carouselConfig));

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView(carouselConfig));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carouselConfig]);

  const { currentIndex, goPrev, goNext, prev, next, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useCarousel(products.length, itemsPerView);

  const arrowUrl = data?.carousel?.url;
  const showArrows = data?.carousel?.showArrows;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className={styles.carouselItem}
            style={{ minWidth: `${100 / itemsPerView}%` }}
          >
            <ProductCard title={product.title} img={product.img} />
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button className={styles.prevBtn} onClick={prev} disabled={!goPrev}>
            <img src={arrowUrl} alt="prev" className={styles.arrowLeft} />
          </button>
          <button className={styles.nextBtn} onClick={next} disabled={!goNext}>
            <img src={arrowUrl} alt="next" className={styles.arrowRight} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
