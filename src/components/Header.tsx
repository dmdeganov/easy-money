import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import OutlinedButton from '@/components/OutlinedButton';

const Header = ({currentSlide, sliderRef}: {currentSlide: number; sliderRef: React.RefObject<HTMLDivElement>}) => {
  const disableScrollingByLinksRef = useRef(true);

  const scrollToElementWithId = (elementId: string) => {
    if (disableScrollingByLinksRef.current) return;
    const element = document.getElementById(elementId);
    if (!element) return;
    sliderRef.current!.scrollTo(0, element.offsetTop);
  };

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      disableScrollingByLinksRef.current = false;
      const buttonCollection = headerRef.current!.getElementsByTagName('button');
      for (let i = 0; i < buttonCollection.length; i++) {
        buttonCollection[i].style.cursor = 'pointer';
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <header>
      <div className="header-inner" ref={headerRef}>
        <Image src="/logo.svg" alt="Easy Money Logo" width={81} height={30} />
        <nav>
          <button
            className={`link ${[0, 1].includes(currentSlide) ? ' link--active' : ''}`}
            onClick={() => scrollToElementWithId('about')}
          >
            <span>О нас</span>
            <span className="link__underline" />
          </button>
          <button
            className={`link ${currentSlide === 2 ? ' link--active' : ''}`}
            onClick={() => scrollToElementWithId('principles')}
          >
            <span>Принципы</span>
            <div className="link__underline" />
          </button>
          <button
            className={`link ${currentSlide === 3 ? ' link--active' : ''}`}
            onClick={() => scrollToElementWithId('projects')}
          >
            <span>Работы</span>
            <div className="link__underline" />
          </button>
        </nav>
        <OutlinedButton onClick={() => scrollToElementWithId('contact-us')}>Работа с нами</OutlinedButton>
      </div>
    </header>
  );
};

export default Header;
