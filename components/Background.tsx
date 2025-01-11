import React from 'react';
import Hyperspeed from '@/components/ui/Hyperspeed';

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-b from-gray-950 via-black to-black">
      <div className="w-full h-full absolute">
        <Hyperspeed 
          effectOptions={{
            distortion: 'deepDistortion',
            length: 400,
            roadWidth: 18,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 50,
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x1a1a1a,
              brokenLines: 0x1a1a1a,
              leftCars: [0x22C55E, 0x16A34A, 0x15803D],
              rightCars: [0x22C55E, 0x16A34A, 0x15803D],
              sticks: 0x22C55E,
            }
          }}
        />
      </div>
    </div>
  );
};

export default Background; 