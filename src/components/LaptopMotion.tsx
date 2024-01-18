import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';

const LaptopMotion = ({currentSlide}: {currentSlide: number}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState('laptop-motion.webm');
  const prevSlideRef = useRef(0);

  useEffect(() => {
    console.log('useEffect currentSlide', currentSlide);
    if (currentSlide === 3 && prevSlideRef.current === 4) {
      videoRef.current!.playbackRate = 2;
      videoRef.current!.play();
    }
    if (currentSlide === 4) {
      // if (videoSrc === 'laptop-motion-reverse.webm') {
      //   setVideoSrc('laptop-motion.webm');
      //   videoRef.current!.play();
      //   return;
      // }
      videoRef.current!.play();
    }
    prevSlideRef.current = currentSlide;
  }, [currentSlide]);

  // console.log('videoSrc', videoSrc);

  return (
    <motion.video
      onAnimationComplete={() => {
        console.log('onAnimationComplete', currentSlide, videoSrc);
        if (currentSlide === 4) {
          console.log("setVideoSrc('laptop-motion-reverse.webm')")
          setVideoSrc('laptop-motion-reverse.webm');
        } else {
          setVideoSrc('laptop-motion.webm');
          console.log("setVideoSrc('laptop-motion.webm')")
        }
      }}
      animate={{opacity: currentSlide === 4 ? 1 : 0}}
      initial={{opacity: 0}}
      transition={{duration: currentSlide === 4 ? 1.6 : 1}}
      src={videoSrc}
      className="laptop-motion"
      ref={videoRef}
      muted
    />
  );
};

export default LaptopMotion;
