import React, {useState} from 'react';
import Image from 'next/image';
import OutlinedButton from '@/components/OutlinedButton';

// activeLink: 'about' | 'principles' | 'projects' | ''

const Header = ({currentSlide}: {currentSlide: number}) => {
  return (
    <header>
      <div className="header-inner">
        <Image src="/logo.svg" alt="Easy Money Logo" width={81} height={30} />
        <nav>
          <a className={`link ${[0, 1].includes(currentSlide) ? ' link--active' : ''}`} href="#about">
            <span>О нас</span>
            <span className="link__underline" />
          </a>
          <a className={`link ${currentSlide === 2 ? ' link--active' : ''}`} href="#principles">
            <span>Принципы</span>
            <div className="link__underline" />
          </a>
          <a className={`link ${currentSlide === 3 ? ' link--active' : ''}`} href="#projects">
            <span>Работы</span>
            <div className="link__underline" />
          </a>
        </nav>
        <OutlinedButton href="#contact-us">Работа с нами</OutlinedButton>
      </div>
    </header>
  );
};

export default Header;
