import React from 'react';
import {Canvas} from '@react-three/fiber';
import Box from '@/components/Box';

const ThreeCanvas = () => {
  return (
    <Canvas>
      <ambientLight />
      <perspectiveCamera  position={[0, 0, 1]} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default ThreeCanvas;
