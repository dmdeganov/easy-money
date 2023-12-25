import React from 'react';
import Image from 'next/image';
import OutlinedButton from '@/components/OutlinedButton';

const Header = () => {
  return (
    <header className="header">
      <Image src="/logo.svg" alt="Logo" width={81} height={30} />
      <nav>
        <a href="#">О нас</a>
        <a href="#">Принципы</a>
        <a href="#">Работы</a>
      </nav>
      <OutlinedButton>Работа с нами</OutlinedButton>
    </header>
  );
};

export default Header;
