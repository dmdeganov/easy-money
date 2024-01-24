import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {height, width} from '@mui/system';

const frameCount = 120;

const getFrameSrc = (index: number) => `iphone/${index.toString().padStart(4, '0')}-min.png`;

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.width = 0;
    img.height = 0;

    // Add the id attribute to the <img> element
    img.id = getFrameSrc(i);
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
  }
};

const animationDuration = 2000;

const fps = animationDuration / frameCount;

const getAnimatedStyles = (currentSlide: number) => {
  // return {
  //   scale: 1,
  //   x: -300,
  //   y: -50,
  //   opacity: 1,
  // };
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
};

const IphoneMotion = ({currentSlide}: {currentSlide: number}) => {
  const prevSlideRef = useRef(currentSlide);
  const [_, set_] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animationStartedAtRef = useRef({time: 0, frame: 0});
  const isForwardDirectionRef = useRef(true);
  const prevFrameRef = useRef(1);
  const isNewSequenceRef = useRef(false);
  const counter = useRef(0);
  const prevCounter = useRef(0);
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
      if (actualFrame >= 1 && actualFrame <= 120) {
        prevFrameRef.current = actualFrame;
        const img = document.getElementById(getFrameSrc(actualFrame)) as HTMLImageElement;
        context!.clearRect(0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
        context!.drawImage(img, 0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
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

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    // const {height, width} = canvasRef.current!.getBoundingClientRect();
    const [width, height] = [1920, 1920];
    canvasSizeRef.current = {height, width};
    canvas.height = height;
    canvas.width = width;
    const context = canvasRef.current!.getContext('2d');
    setTimeout(() => {
      const initialImage = document.getElementById(getFrameSrc(1)) as HTMLImageElement;
      console.log(initialImage);
      context!.drawImage(initialImage, 0, 0, width, height);
    }, 1000);
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

  console.log(getAnimatedStyles(currentSlide).opacity);
  return (
    <>
      <motion.div id="frame-counter" animate={{opacity: currentSlide > 1 ? 0 : 1}} initial={false}>
        {prevCounter.current}
      </motion.div>
      <motion.canvas
        animate={getAnimatedStyles(currentSlide)}
        initial={{opacity: 0}}
        transition={{duration: 1.4, opacity: {duration: 0.2}}}
        className="iphone-motion"
        id="iphone-motion"
        ref={canvasRef}
      />
    </>
  );
};

export default IphoneMotion;
