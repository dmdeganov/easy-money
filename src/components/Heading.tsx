'use client';
import React, {useEffect, useRef, useState} from 'react';
import {motion, useInView} from 'framer-motion';

const Heading = ({sliderRef, isInView}: {sliderRef: React.RefObject<HTMLDivElement>; isInView: boolean}) => {
  const hgroupRef = useRef<HTMLElement>(null);
  // const isInView = useInView(hgroupRef, {margin: '-50% 0px 0px 0px', root: sliderRef});

  const container = {
    outsideView: {opacity: 0, transition: {duration: 0.1, when: 'beforeChildren'}},
    inView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0,
      },
    },
  };

  const item = {
    outsideView: {opacity: 0, x: 80, height: 0, transition: {duration: 0.3}},
    inView: {
      opacity: 1,
      height: 'auto',
      x: 0,
      transition: {ease: 'easeOut', duration: 0.5, opacity: {duration: 0.8}},
    },
  };

  return (
    <div className="heading">
      <motion.hgroup
        initial="outsideView"
        animate={isInView ? 'inView' : 'outsideView'}
        ref={hgroupRef}
        variants={container}
      >
        <motion.div variants={item} className="text-gradient">
          Студия
        </motion.div>
        <motion.div variants={item}>Мобильной разработки</motion.div>
        <motion.div variants={item}>Полного цикла</motion.div>
      </motion.hgroup>
    </div>
  );
};

export default Heading;
