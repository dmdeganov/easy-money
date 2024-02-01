import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
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
    img.hidden = true;
    img.id = getFrameSrc(i);
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
  }
};

const getAnimatedStyles = (currentSlide: number, isMobileWidth: boolean) => {
  if (isMobileWidth) {
    return {
      opacity: currentSlide === 4 ? 1 : 0,
    };
  } else {
    return {opacity: currentSlide === 4 ? 1 : 0, y: '5vh', x: '-15%'};
  }
};

const LaptopCanvas = ({currentSlide}: {currentSlide: number}) => {
  const {isMobileWidth} = useContext(WindowSizeContext);
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
    preloadImages();
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const [width, height] = isMobileWidth ? [1000, 1000] : [1920, 1920];
    canvasSizeRef.current = {height, width};
    canvas.height = height;
    canvas.width = width;
    const context = canvasRef.current!.getContext('2d');

    setTimeout(() => {
      const initialImage = document.getElementById(getFrameSrc(1)) as HTMLImageElement;
      context!.drawImage(initialImage, 0, 0, width, height);
    }, 1000);
  }, []);

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
    <motion.canvas
      animate={getAnimatedStyles(currentSlide, isMobileWidth)}
      initial={{opacity: 0}}
      transition={{duration: 1.6}}
      className="laptop-motion"
      ref={canvasRef}
    />
  );
};

export default LaptopCanvas;