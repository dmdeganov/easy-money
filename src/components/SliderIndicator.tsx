import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';

const arr = [0, 1, 2, 3, 4];

const SliderIndicator = ({currentSlide}: {currentSlide: number}) => {
  const {isMobileWidth} = useContext(WindowSizeContext);

  return (
    <div className={`slider-indicator${isMobileWidth ? ' slider-indicator--mobile' : ''}`}>
      {arr.map(dot => {
        const isActive = dot === currentSlide;
        const style = {
          backgroundColor: isActive ? '#E3FD52' : '#ffffff80',
          // scale: isActive ?
          width: isActive ? '10px' : '6px',
          height: isActive ? '10px' : '6px',
        };

        return (
          <div key={dot} className="slider-indicator__dot-container">
            <motion.div
              className={`slider-indicator__dot${isActive ? ' active' : ''}`}
              animate={style}
              transition={{ease: 'easeOut'}}
            />
          </div>
        );
      })}
      <motion.div
        className="slider-indicator__outside-circle"
        animate={{[isMobileWidth ? 'x' : 'y']: `${currentSlide * 24}px`}}
        transition={{ease: 'easeInOut'}}
      />
    </div>
  );
};

export default SliderIndicator;
