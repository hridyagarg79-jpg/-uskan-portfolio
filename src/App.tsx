import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Process from './components/Process';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import FloatingParticles from './components/FloatingParticles';
import CurrentlyStrip from './components/CurrentlyStrip';
import Obsessions from './components/Obsessions';
import PageLoadIntro from './components/PageLoadIntro';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import ScrollHueShift from './components/ScrollHueShift';
import BackToTop from './components/BackToTop';
import CursorRipple from './components/CursorRipple';
import SmoothScroll from './components/SmoothScroll';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';

function HomePage() {
  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-bg">
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <CurrentlyStrip />
          <section id="work"><Work /></section>
          <WhyWorkWithMe />
          <Process />
          <Services />
          <Obsessions />
          <Testimonials />
          <section id="about"><About /></section>
          <Footer />
        </main>
      </div>
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={
          <PageTransition><ProjectPage /></PageTransition>
        } />
        <Route path="*" element={
          <PageTransition><NotFound /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <BrowserRouter>
      <SmoothScroll />
      {!introComplete && <PageLoadIntro onComplete={handleIntroComplete} />}
      <ScrollHueShift />
      <CustomCursor />
      <CursorRipple />
      <ScrollProgress />
      <FloatingParticles />
      <KonamiEasterEgg />
      <BackToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
