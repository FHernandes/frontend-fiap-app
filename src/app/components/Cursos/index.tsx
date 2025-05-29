'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import hide from '@/app/assets/images/hide.png';
import show from '@/app/assets/images/show.png';

import courseData from '@/app/utils/coursesData';
import NavCourses from './NavCourses';
import style from './cursos.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface CursosProps {
  setStage: (stage: string) => void;
}

const Cursos = ({ setStage }: CursosProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileCoursesRef = useRef<HTMLDivElement>(null);
  const desktopCoursesRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('tecnologia');

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setStage('cursos'),
      onEnterBack: () => setStage('cursos'),
    });
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const target = isMobile
      ? mobileCoursesRef.current
      : desktopCoursesRef.current;

    if (target) {
      gsap.fromTo(
        target,
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' },
      );
    }
  }, [selectedCategory]);

  return (
    <div className={style.container} ref={containerRef}>
      <div style={{ width: '100%' }}>
        <div className={style.titleContainer}>
          <div>
            <p className={style.title1}>Cursos</p>
            <p className={style.subTitle}>Cursos de Curta Duração</p>
          </div>
          <NavCourses
            categories={courseData}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* MOBILE VIEW */}
        <div className={style.mobileCoursesWrapper}>
          {courseData.map((cat) => {
            const isSelected = selectedCategory === cat.category;
            return (
              <div key={cat.category}>
                <div
                  className={`${style.mobileNavCourse} ${
                    isSelected ? style.active : ''
                  }`}
                  onClick={() =>
                    isSelected
                      ? setSelectedCategory('')
                      : setSelectedCategory(cat.category)
                  }
                >
                  <p className={style.title}>{cat.title}</p>
                  <Image src={isSelected ? hide : show} alt="show category" />
                </div>

                {isSelected && (
                  <div className={style.mobileCourses} ref={mobileCoursesRef}>
                    <div className={style.courseContainer}>
                      <div className={style.line} />
                      {cat.items.map((course, i) => (
                        <ul key={i}>
                          <li>
                            <span className={style.course}>{course.name}</span>
                            <span className={style.description}>
                              {course.description}
                            </span>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW */}
        <div className={style.courses} ref={desktopCoursesRef}>
          <div key={selectedCategory} className={style.courseContainer}>
            <p className={style.title2}>
              {courseData.find((c) => c.category === selectedCategory)?.title}
            </p>
            <div className={style.line} />
            {courseData
              .find((c) => c.category === selectedCategory)
              ?.items.map((course, i) => (
                <ul key={i}>
                  <li>
                    <span className={style.course}>{course.name}</span>
                    <span className={style.description}>
                      {course.description}
                    </span>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
