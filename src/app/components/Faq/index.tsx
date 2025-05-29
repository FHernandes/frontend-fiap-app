'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import style from './faq.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface FaqProps {
  setStage: (stage: string) => void;
}

const Faq = ({ setStage }: FaqProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

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
          width: '40px', // ou valor inicial que você quiser
          duration: 0.5,
          ease: 'power2.inOut',
        });
      });
    });
  }, []);

  const courses = [
    {
      title: 'QUANDO POSSO ME MATRICULAR?',
      description:
        'Você pode se matricular em qualquer dia e hora, basta acessar a página do curso e se inscrever.',
    },
    {
      title: 'POSSO FAZER DOIS OU MAIS CURSOS AO MESMO TEMPO?',
      description:
        'Sim. Apenas atente-se às datas, elas devem ser diferentes, porque cada curso tem sua dinâmica.',
    },
    {
      title: 'QUAIS OS PRÉ-REQUISITOS?',
      description:
        'Cada curso tem seus pré-requisitos descritos na própria página. Identifique-os, para que você obtenha um melhor aproveitamento do seu SHIFT.',
    },
    {
      title: 'QUAL A DURAÇÃO DOS CURSOS?',
      description: 'De 6 a 42 horas.',
    },
    {
      title: 'PRECISO LEVAR ALGUM MATERIAL PARA AS AULAS?',
      description:
        'Não. Os materiais utilizados em sala de aula são fornecidos pela FIAP e as aulas mais técnicas são realizadas em nossos próprios laboratórios. Sugerimos somente que traga o que preferir para suas anotações.',
    },
    {
      title: 'VOU RECEBER CERTIFICADO DE CONCLUSÃO DE CURSO?',
      description:
        'Sim. Ao cumprir pelo menos 75% da carga horária do curso, você receberá um Certificado Digital, que poderá ser acessado na plataforma.',
    },
  ];

  return (
    <div className={style.container} ref={containerRef}>
      <div>
        <div>
          <p className={style.title1}>FAQ</p>
          <p className={style.subTitle}>Dúvidas Frequentes</p>
        </div>

        <div className={style.courses}>
          {courses.map((course, i) => (
            <div
              key={i}
              className={style.courseContainer}
              ref={(el) => (itemsRef.current[i] = el)}
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
