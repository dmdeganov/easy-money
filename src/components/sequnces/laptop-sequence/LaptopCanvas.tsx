import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {animatedStyles} from '@/components/sequnces/laptop-sequence/animatedStyles';
import {renderFrame} from '@/components/sequnces/iphone-sequence/renderFrame';
import {preloadImage, preloadImages} from '@/components/sequnces/preloadImages';

const frameCount = 97;
const animationDuration = 1600;

const fps = animationDuration / frameCount;

export const getFrameSrc = (index: number) => `laptop/${(index + 6).toString().padStart(4, '0')}.png`;

const LaptopCanvas = ({
  currentSlide,
  areImagesForIphoneSequenceLoaded,
  onAllImagesLoad,
  visible,
}: {
  currentSlide: number;
  areImagesForIphoneSequenceLoaded: boolean;
  onAllImagesLoad: () => void;
  visible: boolean;
}) => {
  const {isMobileWidth, width} = useContext(WindowSizeContext);
  const prevSlideRef = useRef(currentSlide);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloadImagesWasCalledRef = useRef(false);

  const animationStartedAtRef = useRef({time: 0, frame: 0});
  const isForwardDirectionRef = useRef(true);
  const prevFrameRef = useRef(1);
  const isNewSequenceRef = useRef(false);

  const drawNextFrame = () => {
    requestAnimationFrame(time => {
      if (!visible) {
        if (currentSlide === 4) {
          renderFrame(canvasRef.current!, 'laptop-last');
        } else {
          renderFrame(canvasRef.current!, 'laptop-first');
        }
        return;
      }
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
        renderFrame(canvasRef.current!, getFrameSrc(actualFrame));
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
    if (currentSlide > 1 && !preloadImagesWasCalledRef.current) {
      preloadImagesWasCalledRef.current = true;
      preloadImages(frameCount, getFrameSrc, onAllImagesLoad);
    }
  }, [currentSlide, areImagesForIphoneSequenceLoaded, preloadImagesWasCalledRef.current]);

  1;
  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const [width, height] = isMobileWidth ? [1000, 1000] : [1920, 1920];
    canvas.height = height;
    canvas.width = width;
    preloadImage(getFrameSrc(1), 'laptop-first');
    preloadImage(getFrameSrc(frameCount - 1), 'laptop-last');
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

  const style = visible && currentSlide >= 4 ? {opacity: 1} : {opacity: 0};

  return (
    <motion.canvas
      suppressHydrationWarning={true}
      animate={{...animatedStyles(currentSlide, width), ...style}}
      initial={false}
      hidden={!visible}
      transition={{duration: 1.6}}
      className="laptop-motion"
      ref={canvasRef}
    />
  );
};

export default LaptopCanvas;
