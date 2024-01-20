import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {Button} from '@mui/material';

const frameCount = 120;
const getFrameSrc = (index: number) => `static/iphone/${index.toString().padStart(4, '0')}-min.png`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = getFrameSrc(i);
  }
};
const imageWidth = 360;
const imageHeight = 326;
const imageSize = 1920;
const animationDuration = 2000;

const fps = animationDuration / frameCount;

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const imgRef = useRef<HTMLDivElement>(null);

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
    imgRef.current!.style.backgroundImage = `url(${getFrameSrc(1)})`;
  }, []);

  const animationStartedAtRef = useRef(0);
  const isForwardDirectionRef = useRef(true);
  const currentFrameRef = useRef(1);

  const drawFrame = () => {
    if (isForwardDirectionRef.current) {
      requestAnimationFrame(() => {
        const time = Date.now();
        const timePassed = time - animationStartedAtRef.current;
        const actualFrame = Math.ceil(timePassed / fps);
        // console.log(timePassed, actualFrame);
        if (actualFrame <= 119) {
          if (actualFrame === currentFrameRef.current) {
            drawFrame();
            return;
          }
          currentFrameRef.current = actualFrame;
          imgRef.current!.style.backgroundImage = imgRef.current!.style.backgroundImage = `url(${getFrameSrc(
            actualFrame,
          )})`;

          drawFrame();
        } else {
          return;
        }
      });
    }
  };

  const playForward = () => {
    animationStartedAtRef.current = Date.now();
    drawFrame();
  };

  useEffect(() => {
    preloadImages();
  }, []);

  // 644, 271

  return (
    <>
      <Button
        onClick={() => {
          playForward();
        }}
      >
        start
      </Button>
      <motion.div
        style={{width: '672.5px', aspectRatio: 1}}
        ref={imgRef}
        // animate={getAnimatedStyles()}
        // initial={{opacity: 0}}
        // transition={{duration: 1.4, opacity: {duration: 0.2}}}
        className="iphone-motion"
        id="iphone-motion"
      />
    </>
  );
};

export default IphoneMotion;
