'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import style from './water.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface WaterProps {
  setStage: (stage: string) => void;
}

const Water = ({ setStage }: WaterProps) => {
  const containerRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const frameCount = 192;

  const images = Array.from(
    { length: frameCount },
    (_, i) => `/water/water_${String(i + 1).padStart(3, '0')}.jpg`,
  );

  useGSAP(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const newFrame = Math.floor(progress * (frameCount - 1));
        setFrame(newFrame);
      },
      onEnter: () => setStage('water'),
      onEnterBack: () => setStage('water'),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.imageWrapper}>
        <Image
          src={images[frame]}
          alt="Water animation frame"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};

export default Water;
