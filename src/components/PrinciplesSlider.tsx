import React, {useEffect, useRef} from 'react';
import OutlinedButton from '@/components/OutlinedButton';

const PrinciplesSlider = ({scrollParentSlider}: {scrollParentSlider?: (x: number, y: number) => void}) => {
  const ref = useRef<HTMLDivElement>(null);

  function eventWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const leftEdgeReached = ref.current.scrollLeft === 0;
    const rightEdgeReached = ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 10;
    if (leftEdgeReached && e.deltaY < 0) {
      scrollParentSlider!(0, -100);
    }
    if (rightEdgeReached && e.deltaY > 0) {
      scrollParentSlider!(0, 100);
      ref.current!.scrollTo(0, 0);
    }
    ref.current.scrollBy(e.deltaY, 0);
  }

  useEffect(() => {}, []);

  return (
    <div className="principles">
      <OutlinedButton onClick={() => scrollParentSlider!(0, 100)}>click</OutlinedButton>
      <div className="principles-slider-wrapper">
        <div className="principles-slider" ref={ref} onWheel={eventWheel}>
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
