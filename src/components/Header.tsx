import React from 'react';
import Image from 'next/image';
import OutlinedButton from '@/components/OutlinedButton';

const Header = ({activeLink}: {activeLink: 'about' | 'principles' | 'projects' | ''}) => {
  console.log(activeLink);

  return (
    <header >
      <div className="header-inner">
        <Image src="/logo.svg" alt="Easy Money Logo" width={81} height={30} />
        <nav>
          <a className={`link ${activeLink === 'about' ? ' link--active' : ''}`} href="#about">
            <span>О нас</span>
            <span className="link__underline" />
          </a>
          <a className={`link ${activeLink === 'principles' ? ' link--active' : ''}`} href="#principles">
            <span>Принципы</span>
            <div className="link__underline" />
          </a>
          <a className={`link ${activeLink === 'projects' ? ' link--active' : ''}`} href="#projects">
            <span>Работы</span>
            <div className="link__underline" />
          </a>
        </nav>
        <OutlinedButton>Работа с нами</OutlinedButton>
      </div>
    </header>
  );
};

export default Header;
