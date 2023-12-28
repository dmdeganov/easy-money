import React, {useEffect, useRef} from 'react';
import {interpolate, motion, useAnimation, useScroll, useTransform} from 'framer-motion';

const PrinciplesSlider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollXProgress} = useScroll({
    container: ref,
  });
  const backgroundSize = useTransform(
    scrollXProgress,
    // Map x from these values:
    [0, 0.5, 1],
    // Into these values:
    ['0%', '100%', '0%'],
  );
  const backgroundPosition = useTransform(
    scrollXProgress,
    // Map x from these values:
    [0, 0.499, 0.5, 1],
    // Into these values:
    ['right', 'right', 'left', 'left'],
  );

  function eventWheel(e: WheelEvent) {
    if (!ref.current) return;
    const needToScrollUp = ref.current.scrollLeft === 0 && e.deltaY < 0;
    const needToScrollDown =
      ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 10 && e.deltaY > 0;

    if (needToScrollUp || needToScrollDown) {
      return;
    } else {
      e.stopPropagation();
      e.preventDefault();
      ref.current.scrollBy(e.deltaY || e.deltaX, 0);
    }
  }

  useEffect(() => {
    ref.current!.addEventListener('wheel', eventWheel);
  }, []);

  return (
    <div className="principles">
      <div className="principles__hero">
        <motion.span className="principles__hero-text" style={{backgroundSize, backgroundPosition}}>
          Принципы
        </motion.span>
      </div>
      <div className="principles-slider" ref={ref}>
        <div className="principles-slider__slide">1</div>
        <div className="principles-slider__slide">2</div>
        <div className="principles-slider__slide">3</div>
        <div className="principles-slider__slide">4</div>
      </div>
    </div>
  );
};

export default PrinciplesSlider;
