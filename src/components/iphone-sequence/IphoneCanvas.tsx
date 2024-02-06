import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {getAnimatedStyles} from '@/components/iphone-sequence/animatedStyles';
import {renderFrame} from '@/components/iphone-sequence/renderFrame';
import {preloadImages} from "@/components/sequnces/preloadImages";

const frameCount = 120;

export const getFrameSrc = (index: number) => `iphone/${(index + 1).toString().padStart(4, '0')}-min.png`;

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

  const drawNextFrame = () => {
    requestAnimationFrame(time => {
      if (!visible) {
        if (isForwardDirectionRef.current) {
          renderFrame(canvasRef.current!, getFrameSrc(119));
          prevFrameRef.current = 119;
          animationStartedAtRef.current = {time, frame: prevFrameRef.current};
        } else {
          prevFrameRef.current = 1;
          animationStartedAtRef.current = {time, frame: prevFrameRef.current};
          renderFrame(canvasRef.current!, getFrameSrc(1));
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
    preloadImages(frameCount, getFrameSrc, onAllImagesLoad);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const [width, height] = isMobileWidth ? [1000, 1000] : [1920, 1920];
    canvas.height = height;
    canvas.width = width;
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

  useEffect(() => {
    if (visible && !animationStartedAtRef.current.time) {
      renderFrame(canvasRef.current!, getFrameSrc(1));
    }
  }, [visible]);

  const style = visible && currentSlide <= 1 ? {opacity: 1} : {opacity: 0};

  return (
    <motion.canvas
      suppressHydrationWarning={true}
      animate={{...getAnimatedStyles(currentSlide, width), ...style}}
      initial={false}
      hidden={!visible}
      transition={{duration: visible ? 1.4 : 0, opacity: {duration: 0.2}}}
      className="iphone-motion"
      id="iphone-motion"
      ref={canvasRef}
    />
  );
};

export default IphoneCanvas;
