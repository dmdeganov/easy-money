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
import IphoneMotion from '@/components/IphoneMotion';
import LaptopMotion from '@/components/LaptopMotion';

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

  useMotionValueEvent(scrollYProgress, 'change', scrollY => {
    const direction = scrollY > prevScrollY.current ? 'down' : 'up';
    if (direction === 'down') {
      if (scrollY > scrollYMap[currentSlide] + threshold) {
        setCurrentSlide(prev => prev + 1);
      }
    }
    if (direction === 'up') {
      if (scrollY < scrollYMap[currentSlide] - threshold) {
        setCurrentSlide(prev => prev - 1);
      }
    }
    prevScrollY.current = scrollY;
  });

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
      <IphoneMotion currentSlide={currentSlide} />

      <div className="main-slider" ref={sliderRef} onWheel={onWheel}>
        <section className="main-slider__slide heading" id="about">
          <Heading sliderRef={sliderRef} />
        </section>
        <section className="main-slider__slide about">
          <About sliderRef={sliderRef} />
        </section>
        <section className="main-slider__slide" id="principles">
          <PrinciplesSlider
            scrollMainSlider={(x: number, y: number) => {
              sliderRef.current?.scrollBy(x, y);
            }}
          />
        </section>
        <section className="main-slider__slide" id="projects">
          <Projects />
        </section>

        <section className="main-slider__slide contact" id="contact-us">
          <hgroup>
            <h2>
              <span className="text-gradient">Работа</span> с нами
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
        </section>
      </div>
      <LaptopMotion currentSlide={currentSlide} />
    </>
  );
};

export default Page;
