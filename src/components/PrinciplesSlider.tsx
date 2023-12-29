import React, {useEffect, useRef} from 'react';
import {interpolate, motion, useAnimation, useScroll, useTransform} from 'framer-motion';

const PrinciplesSlider = ({scrollMainSlider}: {scrollMainSlider: (x: number, y: number) => void}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollXProgress} = useScroll({
    container: ref,
  });
  const backgroundSize = useTransform(
    scrollXProgress,
    // Map x from these values:
    [0, 0.5, 1],
    // Into these values:
    ['0%', '100%', '0%'],
  );
  const backgroundPosition = useTransform(
    scrollXProgress,
    // Map x from these values:
    [0, 0.499, 0.5, 1],
    // Into these values:
    ['right', 'right', 'left', 'left'],
  );

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
      ref.current.scrollBy(e.deltaY || e.deltaX, 0);
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
          <div className="principle-card">
            <h3>Просто</h3>
            <p>
              <span className="text-primary">Наш фокус</span> – создание мобильных приложений, которые не только легки в
              использовании, но и несут огромную пользу для миллионов пользователей по всему миру.
            </p>
          </div>
          <div className="principle-card">
            <h3>Современно</h3>
            <p>
              <span className="text-primary">Будущее </span> – за гибкими рабочими моделями. Наша удаленная рабочая
              культура предназначена для современных профессионалов, которые ценят свободу, гибкость и возможность
              вносить свой вклад из любой точки мира.
            </p>
          </div>
          <div className="principle-card">
            <h3>Успешно</h3>
            <p>
              <span className="text-primary">Финансовый Успех</span> – часть нашей ДНК! Мы понимаем, что успех в
              современном мире мобильных технологий тесно связан не только с инновациями и пользой для пользователей, но
              и с финансовой выгодой. Наш подход к бизнесу уникален тем, что мы всегда стремимся к увеличению доходов и
              рентабельности наших проектов.
            </p>
          </div>
        </div>
        <div className="principles-slider__slide" />
      </div>
    </div>
  );
};

export default PrinciplesSlider;
