import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';

const preloadHeavyImageForNextStep = () => {
  const img = new Image();
  img.src = '/iphone-motion-reverse.webm';
};

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState('iphone-motion.webm');
  const prevSlideRef = useRef(0);
  const getAnimatedStyles = () => {
    if (currentSlide === 0) {
      return {scale: 1.4, x: -50, rotateZ: '10deg', opacity: 1};
    }
    if (currentSlide === 1) {
      return {
        scale: 1.4,
        x: -200,
        y: 100,
        rotateZ: '0deg',
        opacity: 1,
      };
    }
    return {scale: 1, x: -200, y: 100, rotateZ: '0deg', opacity: 0};
  };

  useEffect(() => {
    if (prevSlideRef.current !== currentSlide && currentSlide <= 1) {
      videoRef.current!.play();
      prevSlideRef.current = currentSlide;
    }
  }, [currentSlide]);

  useEffect(() => {
    preloadHeavyImageForNextStep();
  }, []);

  return (
    <motion.video
      onAnimationComplete={() => {
        if (currentSlide >= 1) {
          setVideoSrc('iphone-motion-reverse.webm');
        } else {
          setVideoSrc('iphone-motion.webm');
        }
      }}
      animate={getAnimatedStyles()}
      initial={{opacity: 0}}
      transition={{duration: 1.4, opacity: {duration: 0.2}}}
      src={videoSrc}
      className="iphone-motion"
      ref={videoRef}
      muted
    />
  );
};

export default IphoneMotion;
