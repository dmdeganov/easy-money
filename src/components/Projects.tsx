import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {motion, useInView} from 'framer-motion';

const Projects = () => {
  const [variant, setVariant] = useState<'inView' | 'outsideView'>('inView');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const container = {
    inView: {opacity: 1},
    outsideView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const project = {
    inView: {x: 40, y: 40, opacity: 0},
    outsideView: {x: 0, y: 0, opacity: 1, transition: {ease: 'easeOut', duration: 0.3}},
  };

  useEffect(() => {
    if (isInView) {
      setVariant('outsideView');
    } else {
      setVariant('inView');
    }
  }, [isInView]);

  return (
    <>
      <h2>
        Наши <span className="text-gradient">проекты</span>
      </h2>
      <motion.div
        className="projects"
        ref={ref}
        variants={container}
        animate={variant}
        onClick={() => setVariant(prev => (prev === 'inView' ? 'outsideView' : 'inView'))}
      >
        <motion.article className="project-card" variants={project}>
          <Image src="/wi-fi-scanner.png" alt="Wi-Fi Scanner Logo" width={120} height={120} />
          <h3>Wi-Fi Scanner</h3>
          <p>
            Приложение для сканирования
            <br /> скрытых устройств по сети Wi-Fi
          </p>
        </motion.article>
        <motion.article className="project-card" variants={project}>
          <Image src="/invoice-creator.png" alt="Invoice Creator Logo" width={120} height={120} />
          <h3>Invoice Creator</h3>
          <p>
            Приложение для создания
            <br /> и отправки инвойсов
          </p>
        </motion.article>
        <motion.article className="project-card" variants={project}>
          <Image src="/bluetooth-radar.png" alt="Bluetooth Radar Logo" width={120} height={120} />
          <h3>Bluetooth Radar</h3>
          <p>
            Приложение для сканирования
            <br /> скрытых устройств по сети Bluetooth
          </p>
        </motion.article>
        <motion.article className="project-card" variants={project}>
          <Image src="/qr-code-generator.png" alt="QR Code Generator" width={120} height={120} />
          <h3>QR Code Generator</h3>
          <p>
            Приложение для генерации
            <br /> и сканирования QR кодов
          </p>
        </motion.article>
        <motion.article className="project-card" variants={project}>
          <Image src="/package-tracker.svg" alt="Package Tracker Logo" width={120} height={120} />
          <h3>Package Tracker</h3>
          <p>
            Приложение для отслеживания
            <br /> посылок
          </p>
        </motion.article>
        <motion.div className="project-card" variants={project}>
          <span className="text-primary">И много других</span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Projects;
