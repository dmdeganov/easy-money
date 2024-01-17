import React from 'react';
import Image from 'next/image';
import OutlinedButton from '@/components/OutlinedButton';

// activeLink: 'about' | 'principles' | 'projects' | ''

const Header = ({currentSlide, sliderRef}: {currentSlide: number; sliderRef: React.RefObject<HTMLDivElement>}) => {
  const scrollToElementWithId = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    sliderRef.current!.scrollTo(0, element.offsetTop);
  };
  return (
    <header>
      <div className="header-inner">
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
