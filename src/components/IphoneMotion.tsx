import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {Button} from '@mui/material';

const frameCount = 120;
const getFrameSrc = (index: number) => `iphone/${index.toString().padStart(4, '0')}-min.png`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.width = 0;
    img.height = 0;

    // Add the id attribute to the <img> element
    img.id = `iphone-${i}`;
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
  }
};

let counter = 0;

const animationDuration = 2000;

const fps = animationDuration / frameCount;

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const prevSlideRef = useRef(0);
  const getAnimatedStyles = () => {
    if (currentSlide === 0) {
      return {scale: 1.4, x: -250, opacity: 1};
    }
    if (currentSlide === 1) {
      return {
        scale: 1.4,
        x: -400,
        y: 100,
        rotateZ: '0deg',
        opacity: 1,
      };
    }
    return {scale: 1, x: -200, y: 100, opacity: 0};
  };

  const shouldPreventChangingVideoSrcRef = useRef(false);

  useEffect(() => {
    const img = imgRef.current!;
    img.src = getFrameSrc(1);
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
        if (actualFrame <= 119) {
          if (actualFrame === currentFrameRef.current) {
            drawFrame();
            return;
          }
          currentFrameRef.current = actualFrame;
          imgRef.current!.src = getFrameSrc(actualFrame);
          drawFrame();
          counter++;
        } else {
          console.log(counter);
          counter = 0;
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
      <motion.img
        height="100%"
        style={{width: '672.5px', aspectRatio: 1, display: 'block'}}
        ref={imgRef}
        animate={getAnimatedStyles()}
        // initial={{opacity: 0}}
        // transition={{duration: 1.4, opacity: {duration: 0.2}}}
        className="iphone-motion"
        id="iphone-motion"
      />
    </>
  );
};

export default IphoneMotion;
