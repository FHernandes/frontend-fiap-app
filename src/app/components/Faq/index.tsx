'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CoursesFaqData } from '@/app/utils/coursesFaqData';
import style from './faq.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface FaqProps {
  setStage: (stage: string) => void;
}

const Faq = ({ setStage }: FaqProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [openItem, setOpenItem] = useState<number[]>([]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setStage('faq'),
      onEnterBack: () => setStage('faq'),
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
  }, []);

  useEffect(() => {
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const line = item.querySelector(`.${style.line}`);

      if (!line) return;

      item.addEventListener('mouseenter', () => {
        gsap.to(line, {
          width: '100%',
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(line, {
          width: '40px',
          duration: 0.5,
          ease: 'power2.inOut',
        });
      });
    });
  }, []);

  const toggleItem = (index: number) => {
    setOpenItem((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className={style.container} ref={containerRef}>
      <div>
        <div>
          <p className={style.title1}>FAQ</p>
          <p className={style.subTitle}>Dúvidas Frequentes</p>
        </div>

        <div className={style.items}>
          {CoursesFaqData.map((course, i) => (
            <div
              key={i}
              className={`${style.courseContainer} ${
                openItem.includes(i) ? style.open : ''
              }`}
              onClick={() => toggleItem(i)}
            >
              <div className={style.line} />
              <p className={style.title2}>{course.title}</p>
              <p className={style.description}>{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
