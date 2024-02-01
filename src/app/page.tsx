'use client';
import React, {useRef, useState} from 'react';
import Header from '@/components/Header';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import {useScroll, useMotionValueEvent} from 'framer-motion';
import ContactUsForm from '@/components/ContactUsForm';
import SliderIndicator from '@/components/SliderIndicator';
import Heading from '@/components/Heading';
import Projects from '@/components/Projects';
import About from '@/components/About';
import {useThrottle} from '@/hooks/useThrottle';
import IphoneCanvas from '@/components/IphoneCanvas';
import LaptopCanvas from "@/components/LaptopCanvas";

const scrollYMap: {[k: number]: number} = {
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 0.75,
  4: 1,
};
const threshold = 0.03;

const Page = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({container: sliderRef});
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevScrollY = useRef<number>(0);

  const onScrollYChange = (scrollY: number) => {
    const direction = scrollY > prevScrollY.current ? 'down' : 'up';
    if (direction === 'down') {
      if (scrollY > scrollYMap[currentSlide] + threshold) {
        setCurrentSlide(prev => Math.min(4, prev + 1));
      }
    }
    if (direction === 'up') {
      if (scrollY < scrollYMap[currentSlide] - threshold) {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      }
    }
    prevScrollY.current = scrollY;
  };
  const onScrollYChangeThrottled = useThrottle(onScrollYChange, 50);
  useMotionValueEvent(scrollYProgress, 'change', onScrollYChangeThrottled);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY === 100) {
      sliderRef.current!.scrollBy(0, 100);
    }
    if (e.deltaY === -100) {
      sliderRef.current!.scrollBy(0, -100);
    }
  };

  return (
    <>
      <Header currentSlide={currentSlide} sliderRef={sliderRef} />
      <SliderIndicator currentSlide={currentSlide} />
      <IphoneCanvas currentSlide={currentSlide} />
      <div className="main-slider" ref={sliderRef} onWheel={onWheel}>
        <section className="main-slider__slide" id="about">
          <Heading sliderRef={sliderRef} isInView={currentSlide === 0} />
        </section>
        <section className="main-slider__slide">
          <About isInView={currentSlide === 1} />
        </section>
        <section className="main-slider__slide" id="principles">
          <PrinciplesSlider />
        </section>
        <section className="main-slider__slide" id="projects">
          <Projects isInView={currentSlide === 2} />
        </section>
        <section className="main-slider__slide" id="contact-us">
          <div className="contact">
            <hgroup>
              <h2>
                <span className="text-gradient">Работа</span>
                <span> с нами</span>
              </h2>
              <a className="contact__email" href="mailto:we@ezmoney.studio">
                we@ezmoney.studio
              </a>
            </hgroup>
            <h3>
              Написать <span className="text-gradient">нам</span>
            </h3>
            <ContactUsForm />
            <p className="copyright">
              Copyright © 2024 <b>EasyMoney Agency.</b> All Right Reserved
            </p>
          </div>
          <p className="copyright-mobile">
            Copyright © 2024 <b>EasyMoney Agency.</b> All Right Reserved
          </p>
        </section>
      </div>
      <LaptopCanvas currentSlide={currentSlide} />
    </>
  );
};

export default Page;
