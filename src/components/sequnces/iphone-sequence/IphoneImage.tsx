import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import {getAnimatedStyles} from '@/components/sequnces/iphone-sequence/animatedStyles';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {getFrameSrc} from '@/components/sequnces/iphone-sequence/IphoneCanvas';

interface Props {
  onAnimationCompleted?: () => void;
  hidden: boolean;
  slide: number;
}

const IphoneImage = ({onAnimationCompleted, hidden, slide}: Props) => {
  const {width} = useContext(WindowSizeContext);

  const style = hidden
    ? {
      opacity: 0,
      transitionEnd: {
        display: 'none',
      },
    }
    : undefined;

  return (
    <motion.img
      suppressHydrationWarning={true}
      initial={{opacity: 0}}
      transition={{duration: 1.4, opacity: {duration: 0.2}}}
      onAnimationComplete={onAnimationCompleted}
      src={getFrameSrc(slide === 0 ? 1 : 119)}
      alt=""
      className="iphone-motion static"
      animate={{
        ...getAnimatedStyles(slide, width),
        ...style,
      }}
    />
  );
};

export default IphoneImage;
