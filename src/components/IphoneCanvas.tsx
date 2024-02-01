import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {height, width} from '@mui/system';

const frameCount = 120;

const getFrameSrc = (index: number) => `iphone/${(index + 1).toString().padStart(4, '0')}-min.png`;

const preloadImages = (setAreImagesLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
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
        setAreImagesLoaded(true);
      }
    };
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
          y: '-10vh',
          scale: 1.1,
          x: 0,
        };
      case 1:
        return {
          opacity: 1,
          y: '30%',
          scale: 1.1,
          x: '-45%',
        };
      default:
        return {
          opacity: 0,
          x: '-30%',
          y: '60%',
          scale: 1.1,
        };
    }
  } else {
    switch (currentSlide) {
      case 0:
        return {scale: 1.3, x: -50, opacity: 1, y: 0};
      case 1:
        return {
          scale: 1.3,
          x: -300,
          y: 200,
          opacity: 1,
        };
      default:
        return {scale: 1.3, opacity: 0, x: -300, y: 400};
    }
  }
};

const IphoneCanvas = ({currentSlide}: {currentSlide: number}) => {
  const {isMobileWidth} = useContext(WindowSizeContext);

  const prevSlideRef = useRef(currentSlide);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
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
    preloadImages(setAreImagesLoaded);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const [width, height] = isMobileWidth ? [1000, 1000] : [1920, 1920];
    canvasSizeRef.current = {height, width};
    canvas.height = height;
    canvas.width = width;
    const context = canvasRef.current!.getContext('2d');

    setTimeout(() => {}, 1000);
  }, []);

  useEffect(() => {
    if (areImagesLoaded) {
      const context = canvasRef.current!.getContext('2d');
      const initialImage = document.getElementById(getFrameSrc(1)) as HTMLImageElement;
      context!.drawImage(initialImage, 0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
    }
  }, [areImagesLoaded]);

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
    <motion.canvas
      animate={areImagesLoaded ? getAnimatedStyles(currentSlide, isMobileWidth) : {}}
      initial={{opacity: 0}}
      transition={{duration: 1.4, opacity: {duration: 0.2}}}
      className="iphone-motion"
      id="iphone-motion"
      ref={canvasRef}
    />
  );
};

export default IphoneCanvas;
