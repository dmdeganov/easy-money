import React, {useContext, useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';

const frameCount = 97;
const animationDuration = 1600;

const fps = animationDuration / frameCount;

const getFrameSrc = (index: number) => `laptop/${(index + 6).toString().padStart(4, '0')}.png`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.width = 0;
    img.height = 0;
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
  }
};

const getAnimatedStyles = (currentSlide: number, isMobileWidth: boolean) => {
  if (isMobileWidth) {
    return {
      opacity: currentSlide === 4 ? 1 : 0,
      x: '15%',
    };
  } else {
    return {opacity: currentSlide === 4 ? 1 : 0};
  }
};

const LaptopMotion = ({currentSlide}: {currentSlide: number}) => {
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
      if (actualFrame >= 1 && actualFrame <= frameCount) {
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

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    const img = imgRef.current!;
    img.src = getFrameSrc(50);
    img.addEventListener(
      'load',
      () => {
        // img.style.opacity = '1';
      },
      {once: true},
    );
  }, []);

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
    if (currentSlide === prevSlideRef.current) return;
    if (prevSlideRef.current === 3 && currentSlide === 4) {
      playForward();
    }
    if (prevSlideRef.current === 4 && currentSlide === 3) {
      playReverse();
    }
    prevSlideRef.current = currentSlide;
  }, [currentSlide]);

  return (
    <motion.img
      height="100%"
      ref={imgRef}
      animate={getAnimatedStyles(currentSlide, isMobileWidth)}
      initial={{opacity: 0}}
      transition={{duration: 1.6}}
      className="laptop-motion"
    />
  );
};

export default LaptopMotion;
