import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';

export const dynamic = 'force-static';
export const revalidate = 60;

const sources = {
  straight: 'static/iphone-motion.webm',
  reversed: 'static/iphone-motion-reverse.webm',
};

const preloadHeavyImageForNextStep = () => {
  const img = new Image();
  img.src = sources.reversed;
};

const isVideoPlaying = (video: HTMLVideoElement) =>
  !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversed, setIsReversed] = useState(false);

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

  const shouldPreventChangingVideoSrcRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoPlaying(video) && currentSlide !== prevSlideRef.current) {
      video.pause();
      video.currentTime = 0;
      setIsReversed(currentSlide >= 1);
      shouldPreventChangingVideoSrcRef.current = true;
      return;
    }
    shouldPreventChangingVideoSrcRef.current = false;
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
      onAnimationStart={() => {}}
      onAnimationComplete={() => {
        if (!shouldPreventChangingVideoSrcRef.current) setIsReversed(currentSlide >= 1);
      }}
      animate={getAnimatedStyles()}
      initial={{opacity: 0}}
      transition={{duration: 1.4, opacity: {duration: 0.2}}}
      src={sources[isReversed ? 'reversed' : 'straight']}
      className="iphone-motion"
      ref={videoRef}
      muted
    />
  );
};

export default IphoneMotion;
