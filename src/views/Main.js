import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import DifficultyLevels from '../components/DifficultyLevels';
import HowItWorks from '../components/HowItWorks';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Main = () => {
  const [currentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentPage === 'home' && (
        <>
          <HeroSection />
          <FeaturesSection />
          <DifficultyLevels />
          <HowItWorks />
          <CTASection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Main;
