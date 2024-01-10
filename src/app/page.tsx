'use client';
import React, {useRef, useState} from 'react';
import Header from '@/components/Header';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import {useScroll, motion, useMotionValueEvent} from 'framer-motion';
import Image from 'next/image';
import ContactUsForm from '@/components/ContactUsForm';
import SliderIndicator from '@/components/SliderIndicator';

const Page = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({container: sliderRef});
  const [currentSlide, setCurrentSlide] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', scrollY => {
    if (scrollY < 0.2) {
      setCurrentSlide(0);
      return;
    }
    if (scrollY < 0.4) {
      setCurrentSlide(1);
      return;
    }
    if (scrollY < 0.6) {
      setCurrentSlide(2);
      return;
    }
    if (scrollY < 0.8) {
      setCurrentSlide(3);
      return;
    }
    setCurrentSlide(4);
  });

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY === 100) {
      e.preventDefault();
      sliderRef.current!.scrollBy(0, 100);
    }
    if (e.deltaY === -100) {
      e.preventDefault();
      sliderRef.current!.scrollBy(0, -100);
    }
  };

  return (
    <>
      <Header currentSlide={currentSlide} />
      <SliderIndicator currentSlide={currentSlide} />
      <div className="main-slider" ref={sliderRef} onWheel={onWheel}>
        <motion.section className="main-slider__slide heading" id="about">
          <hgroup>
            <motion.h1
              style={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: false, root: sliderRef, amount: 1, margin: '-50px 0px 0px 0px'}}
            >
              <span className="text-gradient">Студия</span>
              <br />
              <span>Мобильной разработки</span>
              <br />
              <span>Полного цикла</span>
            </motion.h1>
          </hgroup>
        </motion.section>
        <section className="main-slider__slide about">
          <div className="about__top">
            <p className="about__details">
              <strong>
                Маленькая <span className="text-gradient">студия</span>
                <br />
                <span className="text-gradient">c большими</span> идеями
                <br />
                и огромными <br />
                <span className="text-gradient">возможностями.</span>
              </strong>
            </p>
            <p className="about__goal">
              Наша цель – <span className="text-primary">№1</span> в категории{' '}
              <span className="text-primary">Утилиты.</span>
            </p>
          </div>
          <div className="about__bottom">
            <p>Быстро. Легко. Успешно.</p>
          </div>
        </section>
        <section className="main-slider__slide" id="principles">
          <PrinciplesSlider
            scrollMainSlider={(x: number, y: number) => {
              sliderRef.current?.scrollBy(x, y);
            }}
          />
        </section>
        <section className="main-slider__slide" id="projects">
          <h2>
            Наши <span className="text-gradient">проекты</span>
          </h2>
          <div className="projects">
            <article className="project-card">
              <Image src="/wi-fi-scanner.png" alt="Wi-Fi Scanner Logo" width={120} height={120} />
              <h3>Wi-Fi Scanner</h3>
              <p>
                Приложение для сканирования
                <br /> скрытых устройств по сети Wi-Fi
              </p>
            </article>
            <article className="project-card">
              <Image src="/invoice-creator.png" alt="Invoice Creator Logo" width={120} height={120} />
              <h3>Invoice Creator</h3>
              <p>
                Приложение для создания
                <br /> и отправки инвойсов
              </p>
            </article>
            <article className="project-card">
              <Image src="/bluetooth-radar.png" alt="Bluetooth Radar Logo" width={120} height={120} />
              <h3>Bluetooth Radar</h3>
              <p>
                Приложение для сканирования
                <br /> скрытых устройств по сети Bluetooth
              </p>
            </article>
            <article className="project-card">
              <Image src="/qr-code-generator.png" alt="QR Code Generator" width={120} height={120} />
              <h3>QR Code Generator</h3>
              <p>
                Приложение для генерации
                <br /> и сканирования QR кодов
              </p>
            </article>
            <article className="project-card">
              <Image src="/package-tracker.svg" alt="Package Tracker Logo" width={120} height={120} />
              <h3>Package Tracker</h3>
              <p>
                Приложение для отслеживания
                <br /> посылок
              </p>
            </article>
            <div className="project-card">
              <span className="text-primary">И много других</span>
            </div>
          </div>
        </section>
        <section className="main-slider__slide contact" id="contact-us">
          <hgroup>
            <h2>
              <span className="text-gradient">Работа</span> с нами
            </h2>
            <p>we@ezmoney.studio</p>
          </hgroup>
          <ContactUsForm />
        </section>
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
