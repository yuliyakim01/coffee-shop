import Bartons from '@/components/homePage-components/Bartons';
import HomePageHero from '@/components/homePage-components/HomePageHero';
import OpeningHours from '@/components/homePage-components/OpeningHours';
import React from 'react';

function HomePage() {
  return (
    <div className="w-full h-full flex-1 flex flex-col ">
      <HomePageHero />
      <Bartons />
      <OpeningHours />
    </div>
  );
}

export default HomePage;
