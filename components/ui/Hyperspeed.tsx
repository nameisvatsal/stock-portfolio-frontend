import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HyperspeedProps {
  effectOptions: {
    distortion: string;
    length: number;
    roadWidth: number;
    islandWidth: number;
    lanesPerRoad: number;
    fov: number;
    fovSpeedUp: number;
    speedUp: number;
    carLightsFade: number;
    totalSideLightSticks: number;
    lightPairsPerRoadWay: number;
    colors: {
      roadColor: number;
      islandColor: number;
      background: number;
      shoulderLines: number;
      brokenLines: number;
      leftCars: number[];
      rightCars: number[];
      sticks: number;
    };
  };
}

const Hyperspeed: React.FC<HyperspeedProps> = ({ effectOptions }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(effectOptions.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Basic animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [effectOptions]);

  return <div ref={containerRef} />;
};

export default Hyperspeed;
