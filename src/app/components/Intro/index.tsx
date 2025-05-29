'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import intro from '../../assets/images/intro.png';
import tutoriais from '../../assets/images/tutoriais.png';
import style from './intro.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface IntroProps {
  setStage: (stage: string) => void;
}

const Intro = ({ setStage }: IntroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setStage('intro'),
        onEnterBack: () => setStage('intro'),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      // text animation
      tl.fromTo(
        '.text-line-left',
        { x: '-50%', opacity: 0 },
        { x: '0%', opacity: 1, ease: 'power3.out', stagger: 0.2 },
      ).fromTo(
        '.text-line-right',
        { x: '50%', opacity: 0 },
        { x: '0%', opacity: 1, ease: 'power3.out', stagger: 0.2 },
        '<',
      );

      // img animation
      gsap.to('.img-line-left', {
        x: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.img-line-right', {
        x: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div className={style.container} ref={containerRef}>
      <Image src={intro} alt="imersao" className={style.imersao} priority />
      <div className={style.text1}>
        <p className="text-line-left">
          CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.
        </p>
        <p className="text-line-right">
          TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.
        </p>
      </div>
      <div className={style.text2}>
        <div className="img-line-right">
          <Image src={tutoriais} alt="tutoriais" loading="eager" priority />
        </div>
        <div className="img-line-left">
          <Image src={tutoriais} alt="tutoriais" loading="eager" priority />
        </div>
      </div>
    </div>
  );
};

export default Intro;
