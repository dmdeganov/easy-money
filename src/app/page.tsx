'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from '@/components/Header';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import {useScroll, motion, useTransform, useMotionValueEvent} from 'framer-motion';

const Page = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({container: sliderRef});

  const [activeLink, setActiveLink] = useState<'about' | 'principles' | 'projects'>('about');

  useMotionValueEvent(scrollYProgress, 'change', scrollY => {
    if (scrollY < 0.4) {
      setActiveLink('about');
    }
    if (scrollY >= 0.4 && scrollY < 0.6) {
      setActiveLink('principles');
    }
    if (scrollY >= 0.6 && scrollY < 0.8) {
      setActiveLink('projects');
    }
  });

  return (
    <>
      <Header activeLink={activeLink} />
      <div className="main-slider" ref={sliderRef}>
        <section className="main-slider__slide about" id="about">
          <hgroup>
            <motion.h1 style={{opacity: 1}}>
              Студия
              <br />
              <span>Мобильной разработки</span>
              <br />
              <span>Полного цикла</span>
            </motion.h1>
          </hgroup>
        </section>
        <section className="main-slider__slide">
          <h2>
            Маленькая <span>студия</span>
            <br />
            <span>c большими</span> идеями
            <br />
            и огромными <br />
            возможностями.
          </h2>
          <p>Наша цель – №1 в категории Утилиты.</p>
        </section>
        <section className="main-slider__slide" id="principles">
          <PrinciplesSlider />
        </section>
        <section className="main-slider__slide" id="projects">
          4
        </section>
        <section className="main-slider__slide">5</section>
      </div>
    </>
  );
};

export default Page;

// <div className="iphone">
//   <Canvas>
//     <IPhoneScene />
//   </Canvas>
// </div>
