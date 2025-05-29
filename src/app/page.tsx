'use client';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Intro from './components/Intro';
import Water from './components/Water';
import Cursos from './components/Cursos';
import Faq from './components/Faq';
import { useState } from 'react';

export default function Home() {
  const [stage, setStage] = useState<string>('header');

  return (
    <>
      <Navbar stage={stage} />
      <Header setStage={setStage} />
      <Intro setStage={setStage} />
      <Water setStage={setStage} />
      <Cursos setStage={setStage} />
      <Faq setStage={setStage} />
    </>
  );
}
