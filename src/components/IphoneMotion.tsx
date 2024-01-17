import React, {useEffect, useRef} from 'react';
import {motion} from 'framer-motion';

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const getAnimatedStyles = () => {
    if (currentSlide === 0) {
      return {scale: 1.4, x: -50, rotateZ: '10deg'};
    }
    if (currentSlide === 1) {
      return {
        scale: 1.4,
        x: -200,
        y: 100,
        rotateZ: '0deg',
      };
    }
    return {opacity: 0};
  };

  useEffect(() => {
    const video = videoRef.current!;
    console.log(currentSlide);
    if (currentSlide === 0) {
      video.currentTime = 0;
      video.pause();
      return;
    }
    if (currentSlide === 1) {
      console.log('play');
      video.play();
    }
  }, [currentSlide]);

  return (
    <motion.video
      animate={getAnimatedStyles()}
      initial={false}
      transition={{duration: 2, opacity: {duration: 0.1}}}
      src="iphone-motion.webm"
      id="iphone-motion"
      ref={videoRef}
      muted
    />
  );
};

export default IphoneMotion;
