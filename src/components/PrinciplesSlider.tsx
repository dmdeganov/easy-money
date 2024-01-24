import React, {useEffect, useRef, useState} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValueEvent,
  useMotionValue,
} from 'framer-motion';

const timeoutId = 0;

const PrinciplesSlider = ({scrollMainSlider}: {scrollMainSlider: (x: number, y: number) => void}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollXProgress} = useScroll({
    container: ref,
  });
  const xAcceleration = useVelocity(scrollXProgress);
  const cardScale = useTransform(xAcceleration, [-1, -0.1, 0, 0.1, 1], [0.85, 1, 1, 1, 0.85]);
  // console.log(xAcceleration.on('change', console.log));

  const scrollXSpringed = useSpring(scrollXProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundSize = useTransform(scrollXSpringed, [0, 0.5, 1], ['0%', '100%', '0%']);
  const backgroundPosition = useTransform(scrollXProgress, [0, 0.499, 0.5, 1], ['right', 'right', 'left', 'left']);

  function eventWheel(e: WheelEvent) {
    if (!ref.current) return;
    const needToScrollUp = ref.current.scrollLeft === 0 && e.deltaY < 0;
    const needToScrollDown =
      ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 10 && e.deltaY > 0;

    if (needToScrollUp || needToScrollDown) {
      return;
    } else {
      e.stopPropagation();
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) === 100) {
        const directionSign = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
        ref.current.scrollBy({top: 0, left: directionSign * 500, behavior: 'smooth'});
        return;
      }

      ref.current.scrollBy(delta, 0);
    }
  }

  useEffect(() => {
    ref.current!.addEventListener('wheel', eventWheel);
  }, []);

  // const [scaleCard, setScaleCard] = useState(1);

  // useMotionValueEvent(scrollXProgress, 'change', () => {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }
  //   setScaleCard(0.95);
  //   timeoutId = window.setTimeout(() => {
  //     setScaleCard(1);
  //     timeoutId = 0;
  //   }, 100);
  // });

  return (
    <div className="principles">
      <div className="principles__hero">
        <motion.h2 className="principles__hero-text" style={{backgroundSize, backgroundPosition}}>
          Принципы
        </motion.h2>
      </div>
      <div className="principles-slider" ref={ref}>
        <div className="principles-slider__slide" />
        <div className="principles-slider__slide principles-grid">
          <motion.div className="principle-card" style={{scale: cardScale}}>
            <h3>Просто</h3>
            <p>
              <span className="text-primary">Наш фокус</span> – создание мобильных приложений, которые не только легки в
              использовании, но и несут огромную пользу для миллионов пользователей по всему миру.
            </p>
          </motion.div>
          <motion.div className="principle-card" style={{scale: cardScale}}>
            <h3>Современно</h3>
            <p>
              <span className="text-primary">Будущее </span> – за гибкими рабочими моделями. Наша удаленная рабочая
              культура предназначена для современных профессионалов, которые ценят свободу, гибкость и возможность
              вносить свой вклад из любой точки мира.
            </p>
          </motion.div>
          <motion.div className="principle-card" style={{scale: cardScale}}>
            <h3>Успешно</h3>
            <p>
              <span className="text-primary">Финансовый Успех</span> – часть нашей ДНК! Мы понимаем, что успех в
              современном мире мобильных технологий тесно связан не только с инновациями и пользой для пользователей, но
              и с финансовой выгодой. Наш подход к бизнесу уникален тем, что мы всегда стремимся к увеличению доходов и
              рентабельности наших проектов.
            </p>
          </motion.div>
        </div>
        <div className="principles-slider__slide" />
      </div>
    </div>
  );
};

export default PrinciplesSlider;
