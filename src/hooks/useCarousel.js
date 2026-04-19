import { useCallback, useEffect, useRef, useState } from "react";

// custom hook for carousel functionality

const useCarousel = (items, itemsPerView) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchX = useRef(null);
  const touchX2 = useRef(null);

  const maxIndex = Math.max(0, items - itemsPerView);

  const goTo = useCallback(
    (index) => {
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);
    },
    [maxIndex],
  );

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  //handles resposnive per view change

  useEffect(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex, Math.max(0, items - itemsPerView)),
    );
  }, [itemsPerView, items]);

  //touh function

  const handleTouchStart = useCallback((e) => {
    touchX.current = e.touches[0].clientX;
    touchX2.current = null;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchX2.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchX.current === null || touchX2.current === null) return;

    const deltaX = touchX.current - touchX2.current;
    const swipeThreshold = 50;

    if (deltaX > swipeThreshold) {
      next();
    } else if (deltaX < -swipeThreshold) {
      prev();
    }

    touchX.current = null;
    touchX2.current = null;
  }, [next, prev]);

    return {
        currentIndex,
        maxIndex,
        goPrev : currentIndex > 0,
        goNext : currentIndex < maxIndex,
        goTo,
        next,
        prev,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
            
};


export default useCarousel;