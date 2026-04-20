import { useEffect, useRef, useState } from 'react';
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
  const [loopIndex, setLoopIndex] = useState(safeProducts.length);
  const [isLoopResetting, setIsLoopResetting] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchCurrentX = useRef(null);
  const touchCurrentY = useRef(null);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView(itemsPerViewConfig));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    itemsPerViewConfig.desktop,
    itemsPerViewConfig.tablet,
    itemsPerViewConfig.mobile,
  ]);

  const isCircularLoop =
    safeProducts.length > 0 && safeProducts.length <= itemsPerView;
  const circularSlides = isCircularLoop
    ? [...safeProducts, ...safeProducts, ...safeProducts]
    : [];
  const circularLength = safeProducts.length;
  const circularCurrentIndex = circularLength
    ? ((loopIndex % circularLength) + circularLength) % circularLength
    : 0;

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

  useEffect(() => {
    if (!isCircularLoop || circularLength === 0) return;

    setIsLoopResetting(true);
    setLoopIndex(circularLength);

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setIsLoopResetting(false));
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [isCircularLoop, circularLength, itemsPerView]);

  const normalizeLoopIndex = () => {
    if (!isCircularLoop || circularLength === 0) return;

    let normalized = loopIndex;
    if (loopIndex >= circularLength * 2) normalized = loopIndex - circularLength;
    if (loopIndex < circularLength) normalized = loopIndex + circularLength;

    if (normalized !== loopIndex) {
      setIsLoopResetting(true);
      setLoopIndex(normalized);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsLoopResetting(false))
      );
    }
  };

  const loopNext = () => {
    if (circularLength <= 1) return;
    setLoopIndex((prevValue) => prevValue + 1);
  };

  const loopPrev = () => {
    if (circularLength <= 1) return;
    setLoopIndex((prevValue) => prevValue - 1);
  };

  const resetTouch = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    touchCurrentY.current = null;
  };

  const handleCircularTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchCurrentX.current = touch.clientX;
    touchCurrentY.current = touch.clientY;
  };

  const handleCircularTouchMove = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;

    touchCurrentX.current = touch.clientX;
    touchCurrentY.current = touch.clientY;
  };

  const handleCircularTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      resetTouch();
      return;
    }

    const endTouch = event.changedTouches?.[0];
    const endX = endTouch?.clientX ?? touchCurrentX.current ?? touchStartX.current;
    const endY = endTouch?.clientY ?? touchCurrentY.current ?? touchStartY.current;

    const deltaX = touchStartX.current - endX;
    const deltaY = Math.abs(touchStartY.current - endY);
    const swipeThreshold = 35;

    if (deltaY > Math.abs(deltaX)) {
      resetTouch();
      return;
    }

    if (deltaX >= swipeThreshold) {
      loopNext();
    } else if (deltaX <= -swipeThreshold) {
      loopPrev();
    }

    resetTouch();
  };

  return (
    <>
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carouselTrack}
        style={{
          transform: isCircularLoop
            ? `translateX(-${loopIndex * (100 / itemsPerView)}%)`
            : `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          transitionDuration: isCircularLoop && isLoopResetting
            ? "0ms"
            : `${transitionDuration}ms`,
        }}
        onTransitionEnd={isCircularLoop ? normalizeLoopIndex : undefined}
        onTouchStart={isCircularLoop ? handleCircularTouchStart : handleTouchStart}
        onTouchMove={isCircularLoop ? handleCircularTouchMove : handleTouchMove}
        onTouchEnd={isCircularLoop ? handleCircularTouchEnd : handleTouchEnd}
      >
        {(isCircularLoop ? circularSlides : safeProducts).map((product, index) => {
          const originalIndex = isCircularLoop
            ? index % circularLength
            : index;
          const productKey = product?.id ?? product?.title ?? index;

          return (
          <div
            key={`${productKey}-${index}`}
            className={styles.carouselItem}
            style={{ minWidth: `${100 / itemsPerView}%` }}
          >
            <ProductCard title={product?.title} img={product?.img} index={originalIndex} />
          </div>
          );
        })}
      </div>
    </div>
    {showArrows && (
        <>
          <button
            type="button"
            className={styles.prevBtn}
            onClick={isCircularLoop ? loopPrev : prev}
            disabled={isCircularLoop ? circularLength <= 1 : !goPrev}
          >
            <img src={arrowUrl} alt="prev" className={styles.arrowLeft} />
          </button>
          <button
            type="button"
            className={styles.nextBtn}
            onClick={isCircularLoop ? loopNext : next}
            disabled={isCircularLoop ? circularLength <= 1 : !goNext}
          >
            <img src={arrowUrl} alt="next" className={styles.arrowRight} />
          </button>
        </>
      )}
    </>
  );
};

export default Carousel;
