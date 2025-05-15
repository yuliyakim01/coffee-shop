import Bartons from '@/components/homePage-components/Bartons';
import HomePageHero from '@/components/homePage-components/HomePageHero';
import OpeningHours from '@/components/homePage-components/OpeningHours';
import OurMenu from '@/components/homePage-components/OurMenu';
import React from 'react';

function HomePage() {
  return (
    <div className="w-full h-full flex-1 flex flex-col ">
      <HomePageHero />
      <Bartons />
      <OpeningHours />
      <OurMenu />
    </div>
  );
}

export default HomePage;
