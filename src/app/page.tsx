'use client';
import React, {useEffect, useRef} from 'react';
import Header from '@/components/Header';
import {useInView} from '@react-spring/core';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import OutlinedButton from '@/components/OutlinedButton';
// import ThreeCanvas from '@/components/ThreeCanvas';
// import IPhoneScene from '@/app/test/IphoneScene';
// import {Canvas} from "@react-three/fiber";

const Page = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [principlesSectionRef, inView] = useInView({amount: 0.9});
  console.log({inView});

  const scrollToNextSlide = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy(0, 100);
  };

  return (
    <>
      <Header />
      <main>
        {/*<div className="slider-wrapper">*/}
        <div className="slider" style={{overflowY: inView ? 'hidden' : 'scroll'}} ref={sliderRef}>
          <div className="slider__slide">
            1<OutlinedButton onClick={scrollToNextSlide}>click</OutlinedButton>
          </div>
          <div className="slider__slide">2</div>
          <div className="slider__slide slider__slide--horizontal" ref={principlesSectionRef}>
            <PrinciplesSlider scrollParentSlider={(x: number, y: number) => sliderRef.current?.scrollBy(x, y)} />
          </div>
          <div className="slider__slide">4</div>
          <div className="slider__slide">5</div>
        </div>
        {/*</div>*/}
      </main>
    </>
  );
};

export default Page;

// <div className="iphone">
//   <Canvas>
//     <IPhoneScene />
//   </Canvas>
// </div>
