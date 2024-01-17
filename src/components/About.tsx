import React, {useEffect, useRef, useState} from 'react';
import {motion, useInView} from 'framer-motion';

const About = ({sliderRef}: {sliderRef: React.RefObject<HTMLDivElement>}) => {
  const [variant, setVariant] = useState<'inView' | 'outsideView'>('outsideView');
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {margin: '-50% 0px 0px 0px', root: sliderRef});

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

  useEffect(() => {
    if (isInView) {
      setVariant('inView');
    } else {
      setVariant('outsideView');
    }
  }, [isInView]);

  return (
    <motion.div className="about__details" ref={ref} variants={container} initial="inView" animate={variant}>
      <motion.span variants={item}>
          Маленькая <span className="text-gradient">студия</span>
      </motion.span>
      <motion.span variants={item}>
        <span className="text-gradient">c большими</span> идеями
      </motion.span>
      <motion.span variants={item}>и огромными</motion.span>
      <motion.span variants={item}>
        <span className="text-gradient">возможностями.</span>
      </motion.span>
      <motion.p className="about__goal" variants={item}>
          Наша цель – <span className="text-primary">№1</span> в категории{' '}
        <span className="text-primary">Утилиты.</span>
      </motion.p>
      <motion.p className="about__bottom" variants={item}>
          Быстро. Легко. Успешно.
      </motion.p>
    </motion.div>
  );
};

export default About;
