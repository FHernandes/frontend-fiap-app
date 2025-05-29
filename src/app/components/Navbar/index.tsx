'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import logo from '@/app/assets/images/logo-fiap.svg';
import style from './navbar.module.scss';

interface NavbarProps {
  stage: string;
}

const stageMap: Record<string, number> = {
  header: 0,
  intro: 1,
  water: 2,
  cursos: 3,
  faq: 4,
};

const Navbar = ({ stage }: NavbarProps) => {
  useEffect(() => {
    const step = stageMap[stage] ?? 0;

    gsap.to(`.${style.progressBarFill}`, {
      width: `${(step / 4) * 100}%`,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [stage]);

  return (
    <div className={style.container}>
      <nav className={style.navbar}>
        <Image src={logo} alt="FIAP" className={style.logo} priority />
      </nav>
      <div className={style.progressBar}>
        <div className={style.progressBarFill}></div>
      </div>
    </div>
  );
};

export default Navbar;
