import { useCallback, useEffect, useRef, useState } from "react";

// custom hook for carousel functionality

const useCarousel = (items, itemsPerView, options = {}) => {
  const { circular = false } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchCurrentX = useRef(null);
  const touchCurrentY = useRef(null);

  const maxIndex = Math.max(0, items - itemsPerView);
  const hasItems = items > 0;

  const goTo = useCallback(
    (index) => {
      if (!hasItems) {
        setCurrentIndex(0);
        return;
      }

      if (circular) {
        const wrappedIndex = ((index % items) + items) % items;
        setCurrentIndex(wrappedIndex);
        return;
      }

      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);
    },
    [circular, hasItems, items, maxIndex],
  );

  const next = useCallback(() => {
    if (!hasItems) return;

    if (circular) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items);
      return;
    }

    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  }, [circular, hasItems, items, maxIndex]);

  const prev = useCallback(() => {
    if (!hasItems) return;

    if (circular) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items) % items);
      return;
    }

    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, [circular, hasItems, items]);

  //handles resposnive per view change

  useEffect(() => {
    if (!hasItems) {
      setCurrentIndex(0);
      return;
    }

    if (circular) {
      setCurrentIndex((prevIndex) => ((prevIndex % items) + items) % items);
      return;
    }

    setCurrentIndex((prevIndex) => Math.min(prevIndex, Math.max(0, items - itemsPerView)));
  }, [circular, hasItems, itemsPerView, items]);

  //touh function

  const resetTouch = useCallback(() => {
    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    touchCurrentY.current = null;
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches?.[0];
    if (!touch) return;

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchCurrentX.current = touch.clientX;
    touchCurrentY.current = touch.clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches?.[0];
    if (!touch) return;

    touchCurrentX.current = touch.clientX;
    touchCurrentY.current = touch.clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      resetTouch();
      return;
    }

    const endTouch = e.changedTouches?.[0];
    const endX = endTouch?.clientX ?? touchCurrentX.current ?? touchStartX.current;
    const endY = endTouch?.clientY ?? touchCurrentY.current ?? touchStartY.current;

    const deltaX = touchStartX.current - endX;
    const deltaY = Math.abs(touchStartY.current - endY);
    const swipeThreshold = 35;

    // Ignore mostly vertical movement so page scroll stays natural.
    if (deltaY > Math.abs(deltaX)) {
      resetTouch();
      return;
    }

    if (deltaX >= swipeThreshold) {
      next();
    } else if (deltaX <= -swipeThreshold) {
      prev();
    }

    resetTouch();
  }, [next, prev, resetTouch]);

    return {
        currentIndex,
        maxIndex,
        goPrev : circular ? items > 1 : currentIndex > 0,
        goNext : circular ? items > 1 : currentIndex < maxIndex,
        goTo,
        next,
        prev,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
            
};


export default useCarousel;
