import React, {useContext, useEffect, useRef, useState} from 'react';
import {motion, useScroll, useTransform, useSpring} from 'framer-motion';
import {WindowSizeContext} from '@/app/WindowSizeContextProvider';

let timeoutId = 0;

const PrinciplesSlider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollXProgress} = useScroll({
    container: ref,
  });

  const {isMobileWidth} = useContext(WindowSizeContext);

  const scrollXSpringed = useSpring(scrollXProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const [scaleCard, setScaleCard] = useState(1);

  scrollXProgress.on('change', () => {
    setScaleCard(0.97);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      setScaleCard(1);
      clearTimeout(timeoutId);
    }, 150);
  });

  console.log(isMobileWidth)
  const backgroundSize = useTransform(
    scrollXSpringed,
    [0, 0.5, 1],
    isMobileWidth ? ['0%', '50%', '100%'] : ['0%', '100%', '0%'],
  );
  const backgroundPosition = useTransform(scrollXProgress, [0, 0.499, 0.5, 1], isMobileWidth ? ['right', 'right', 'right', 'right'] :['right', 'right', 'left', 'left']);

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
          <motion.div
            className="principle-card"
            animate={{scale: scaleCard}}
            transition={{duration: 0.2, ease: 'easeOut'}}
          >
            <h3>Просто</h3>
            <p>
              <span className="text-primary">Наш фокус</span> – создание мобильных приложений, которые не только легки в
              использовании, но и несут огромную пользу для миллионов пользователей по всему миру.
            </p>
          </motion.div>
          <motion.div
            className="principle-card"
            animate={{scale: scaleCard}}
            transition={{duration: 0.2, ease: 'easeOut'}}
          >
            <h3>Современно</h3>
            <p>
              <span className="text-primary">Будущее </span> – за гибкими рабочими моделями. Наша удаленная рабочая
              культура предназначена для современных профессионалов, которые ценят свободу, гибкость и возможность
              вносить свой вклад из любой точки мира.
            </p>
          </motion.div>
          <motion.div
            className="principle-card"
            animate={{scale: scaleCard}}
            transition={{duration: 0.2, ease: 'easeOut'}}
          >
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
