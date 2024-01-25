import React, {useContext, useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';

const frameCount = 120;

const getFrameSrc = (index: number) => `iphone/${(index + 1).toString().padStart(4, '0')}-min.png`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.width = 0;
    img.height = 0;
    img.hidden = true;
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
  }
};

const animationDuration = 2000;

const fps = animationDuration / frameCount;

const getAnimatedStyles = (currentSlide: number, isMobileWidth: boolean) => {
  if (isMobileWidth) {
    switch (currentSlide) {
      case 0:
        return {
          opacity: 1,
          left: 0,
          y: '-20%',
          scale: 1.1,
        };
      case 1:
        return {
          opacity: 1,
          left: 'unset',
          right: 0,
          y: '30%',
          scale: 1.1,
        };
      default:
        return {scale: 1.4, opacity: 0, x: -300, y: 100};
    }
  } else {
    switch (currentSlide) {
      case 0:
        return {scale: 1.4, x: -50, opacity: 1};
      case 1:
        return {
          scale: 1.4,
          x: -300,
          y: 100,
          opacity: 1,
        };
      default:
        return {scale: 1.4, opacity: 0, x: -300, y: 100};
    }
  }
};

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const prevSlideRef = useRef(currentSlide);
  const [_, set_] = useState(0);
  const {isMobileWidth} = useContext(WindowSizeContext);

  const animationStartedAtRef = useRef({time: 0, frame: 0});
  const isForwardDirectionRef = useRef(true);
  const prevFrameRef = useRef(1);
  const isNewSequenceRef = useRef(false);
  const counter = useRef(0);
  const prevCounter = useRef(0);

  const drawNextFrame = () => {
    requestAnimationFrame(time => {
      if (isNewSequenceRef.current) {
        animationStartedAtRef.current = {time, frame: prevFrameRef.current};
        isNewSequenceRef.current = false;
      }
      const framesPassed = time - animationStartedAtRef.current.time;
      const actualFrame =
        animationStartedAtRef.current.frame + Math.ceil(framesPassed / fps) * (isForwardDirectionRef.current ? 1 : -1);
      if (actualFrame === prevFrameRef.current) {
        drawNextFrame();
        return;
      }
      if (actualFrame >= 1 && actualFrame <= 119) {
        prevFrameRef.current = actualFrame;
        imgRef.current!.src = getFrameSrc(actualFrame);
        drawNextFrame();
        counter.current++;
      } else {
        prevCounter.current = counter.current;
        counter.current = 0;
        set_(prev => prev + 1);
        return;
      }
    });
  };

  const playForward = () => {
    isNewSequenceRef.current = true;
    isForwardDirectionRef.current = true;
    drawNextFrame();
  };
  const playReverse = () => {
    isNewSequenceRef.current = true;
    isForwardDirectionRef.current = false;
    drawNextFrame();
  };

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    const img = imgRef.current!;
    img.src = getFrameSrc(1);
    img.addEventListener(
      'load',
      () => {
        img.style.opacity = '1';
      },
      {once: true},
    );
  }, []);

  useEffect(() => {
    if (currentSlide === prevSlideRef.current) return;
    if (prevSlideRef.current === 0 && currentSlide === 1) {
      playForward();
    }
    if (prevSlideRef.current === 1 && currentSlide === 0) {
      playReverse();
    }
    prevSlideRef.current = currentSlide;
  }, [currentSlide]);

  return (
    <>
      <motion.div id="frame-counter" animate={{opacity: currentSlide > 1 ? 0 : 1}} initial={false}>
        {prevCounter.current}
      </motion.div>
      <motion.img
        height="100%"
        ref={imgRef}
        animate={getAnimatedStyles(currentSlide, isMobileWidth)}
        initial={{scale: 1, opacity: 0}}
        transition={{duration: 1.4, opacity: {duration: 0.2}}}
        className="iphone-motion"
        id="iphone-motion"
      />
    </>
  );
};

export default IphoneMotion;
