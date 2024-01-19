import React, {useEffect, useRef, useState} from 'react';
import {motion, useInView} from 'framer-motion';

const About = ({sliderRef}: {sliderRef: React.RefObject<HTMLDivElement>}) => {
  const [variant, setVariant] = useState<'inView' | 'outsideView'>('outsideView');
  const ref = useRef<HTMLParagraphElement>(null);
  // const isInView = useInView(ref, {margin: '-50% 0px 0px 0px', root: sliderRef});
  const isInView = useInView(ref, {root: sliderRef});

  console.log({isInView, })

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
    console.log()
    if (isInView) {
      setVariant('inView');
    } else {
      setVariant('outsideView');
    }
  }, [isInView]);

  return (
    <motion.div className="about__details" ref={ref} variants={container} initial="inView" animate={variant}>
      <motion.div variants={item}>
        Маленькая <div className="text-gradient">студия</div>
      </motion.div>
      <motion.div variants={item}>
        <div className="text-gradient">c большими</div> идеями
      </motion.div>
      <motion.div variants={item}>и огромными</motion.div>
      <motion.div variants={item}>
        <div className="text-gradient">возможностями.</div>
      </motion.div>
      <motion.div className="about__goal" variants={item}>
        Наша цель – <div className="text-primary">№1</div> в категории <div className="text-primary">Утилиты.</div>
      </motion.div>
      {/*<motion.p className="about__bottom" variants={item}>*/}
      {/*  <span>Быстро. Легко. Успешно.</span>*/}
      {/*</motion.p>*/}
    </motion.div>
  );
};

export default About;
