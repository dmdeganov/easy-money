import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {getAnimatedStyles} from '@/components/iphone-sequence/animatedStyles';

const frameCount = 120;

export const getFrameSrc = (index: number) => `iphone/${(index + 1).toString().padStart(4, '0')}-min.png`;

const preloadImages = (onAllImagesLoad: () => void) => {
  let count = 0;
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.width = 0;
    img.height = 0;
    img.hidden = true;
    img.id = getFrameSrc(i);
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
    img.onload = () => {
      count++;
      if (count === frameCount - 1) {
        onAllImagesLoad();
      }
    };
  }
};

const animationDuration = 2000;

const fps = animationDuration / frameCount;

const IphoneCanvas = ({
  currentSlide,
  onAllImagesLoad,
  visible,
}: {
  currentSlide: number;
  onAllImagesLoad: () => void;
  visible: boolean;
}) => {
  const {width, isMobileWidth} = useContext(WindowSizeContext);

  const prevSlideRef = useRef(currentSlide);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationStartedAtRef = useRef({time: 0, frame: 0});
  const isForwardDirectionRef = useRef(true);
  const prevFrameRef = useRef(1);
  const isNewSequenceRef = useRef(false);
  const canvasSizeRef = useRef({
    height: 0,
    width: 0,
  });

  const drawNextFrame = () => {
    requestAnimationFrame(time => {
      const context = canvasRef.current!.getContext('2d');

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
      if (actualFrame >= 1 && actualFrame < frameCount) {
        prevFrameRef.current = actualFrame;
        const img = document.getElementById(getFrameSrc(actualFrame)) as HTMLImageElement;
        context!.clearRect(0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
        context!.drawImage(img, 0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
        drawNextFrame();
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
    preloadImages(onAllImagesLoad);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const [width, height] = isMobileWidth ? [1000, 1000] : [1920, 1920];
    canvasSizeRef.current = {height, width};
    canvas.height = height;
    canvas.width = width;
  }, []);

  useEffect(() => {
    if (visible) {
      const context = canvasRef.current!.getContext('2d');
      const initialImage = document.getElementById(getFrameSrc(1)) as HTMLImageElement;
      context!.drawImage(initialImage, 0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
    }
  }, [visible]);

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

  const style = visible && currentSlide <= 1 ? {opacity: 1} : {opacity: 0};

  return (
    <motion.canvas
      suppressHydrationWarning={true}
      animate={{...getAnimatedStyles(currentSlide, width), ...style}}
      initial={false}
      hidden={!visible}
      transition={{duration: 1.4, opacity: {duration: 0.2}}}
      className="iphone-motion"
      id="iphone-motion"
      ref={canvasRef}
    />
  );
};

export default IphoneCanvas;
