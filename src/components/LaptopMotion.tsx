import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';

const LaptopMotion = ({currentSlide}: {currentSlide: number}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState('laptop-motion.webm');

  const getAnimatedStyles = () => {
    if (currentSlide === 4) {
      return {scale: 1, opacity: 1};
    }
    return {scale: 1, opacity: 0};
  };
  useEffect(() => {
    console.log({currentSlide});
    if (currentSlide === 4) {
      videoRef.current!.play();
    }
  }, [currentSlide]);

  return (
    <motion.video
      animate={getAnimatedStyles()}
      initial={{opacity: 0, x: '-5vw', y: '10vh'}}
      transition={{duration: 1, opacity: {duration: 0.2}}}
      src={videoSrc}
      className="laptop-motion"
      ref={videoRef}
      muted
    />
  );
};

export default LaptopMotion;
