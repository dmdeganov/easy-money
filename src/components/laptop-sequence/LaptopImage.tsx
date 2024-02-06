import React, {useContext} from 'react';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';
import {motion} from 'framer-motion';

import {getFrameSrc} from '@/components/laptop-sequence/LaptopCanvas';
import {animatedStyles} from '@/components/laptop-sequence/animatedStyles';

const LaptopImage = ({hidden}: {hidden: boolean}) => {
  const {width} = useContext(WindowSizeContext);
  const style = hidden
    ? {
      opacity: 0,
      display: 'none',
    }
    : undefined;

  return (
    <motion.img
      initial={{opacity: 0}}
      transition={{duration: 1.6, opacity: {duration: 0.2}}}
      className="laptop-motion"
      src={getFrameSrc(96)}
      alt=""
      animate={{
        ...animatedStyles(4, width),
        ...style,
      }}
    />
  );
};

export default LaptopImage;
