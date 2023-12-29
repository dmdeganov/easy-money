'use client';
import React, {useRef, useState} from 'react';
import Header from '@/components/Header';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import {useScroll, motion, useMotionValueEvent} from 'framer-motion';
import Image from 'next/image';
import ContactUsForm from '@/components/ContactUsForm';

const Page = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({container: sliderRef});

  const [activeLink, setActiveLink] = useState<'about' | 'principles' | 'projects' | ''>('about');

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
    if (scrollY >= 0.8) {
      setActiveLink('');
    }
  });

  return (
    <>
      <Header activeLink={activeLink} />
      <div className="main-slider" ref={sliderRef}>
        <section className="main-slider__slide heading" id="about">
          <hgroup>
            <motion.h1 style={{opacity: 1}}>
              <span className="text-gradient">Студия</span>
              <br />
              <span>Мобильной разработки</span>
              <br />
              <span>Полного цикла</span>
            </motion.h1>
          </hgroup>
        </section>
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
        <section className="main-slider__slide contact">
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
