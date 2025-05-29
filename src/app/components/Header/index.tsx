'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import style from './header.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  setStage: (stage: string) => void;
}

const Header = ({ setStage }: HeaderProps) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setStage('header'),
        onEnterBack: () => setStage('header'),
      });

      gsap.fromTo(
        '.text-line',
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 3,
          ease: 'power3.out',
          stagger: 0.3,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div className={style.container} ref={containerRef}>
      <p className={style.text1}>
        <span className="text-line">A Melhor Faculdade</span>
        <br />
        <span className={`${style.indent} text-line`}>de Tecnologia</span>
      </p>
      <p className={style.text2}>Sobre</p>
    </div>
  );
};

export default Header;
