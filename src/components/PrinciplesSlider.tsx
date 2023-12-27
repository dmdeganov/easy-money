import React, {useEffect, useRef} from 'react';
import OutlinedButton from '@/components/OutlinedButton';

const PrinciplesSlider = ({scrollParentSlider}: {scrollParentSlider?: (x: number, y: number) => void}) => {
  const ref = useRef<HTMLDivElement>(null);

  function eventWheel(e: WheelEvent) {
    if (!ref.current) return;
    const needToScrollUp = ref.current.scrollLeft === 0 && e.deltaY < 0;
    const needToScrollDown =
      ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 10 && e.deltaY > 0;
    console.log(needToScrollUp, needToScrollDown);
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
      <OutlinedButton onClick={() => scrollParentSlider!(0, 100)}>click</OutlinedButton>
      <div className="principles-slider-wrapper">
        <div className="principles-slider" ref={ref}>
          <div className="principles-slider__slide">1</div>
          <div className="principles-slider__slide">2</div>
          <div className="principles-slider__slide">3</div>
          <div className="principles-slider__slide">4</div>
        </div>
      </div>
    </div>
  );
};

export default PrinciplesSlider;
