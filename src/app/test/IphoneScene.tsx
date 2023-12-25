import React, {useRef, useState} from 'react';
import {useFrame, useLoader, useThree} from '@react-three/fiber';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {useSpring, animated} from '@react-spring/three';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {Euler, Group} from 'three';
import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';

const IPhoneScene = () => {
  const group = useRef<Group>();
  const [active, setActive] = useState(false);
  const {rotation} = useSpring({
    rotation: [Math.PI / 2, Math.PI / 4, 0], // Adjust the target rotation values
    config: {mass: 10, tension: 10, friction: 100},
  });

  useThree(({camera}) => {
    camera.position.set(10, 10, 3);
  });

  // Load the iPhone model using the OBJLoader
  const mtl = useLoader(MTLLoader, 'Iphone_8.mtl');
  mtl.preload();
  mtl.baseUrl = 'Iphone_8.c4d';

  const iPhoneModel = useLoader(OBJLoader, 'Iphone_8.obj', loader => {
    loader.setMaterials(mtl);
  });

  // const iPhoneModel = useLoader(OBJLoader, 'Iphone_8.obj');
  // const wireframeMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ff00});

  // Apply the wireframe material to the iPhone model
  // iPhoneModel.traverse(child => {
  //   if (child instanceof THREE.Mesh) {
  //     child.material = wireframeMaterial;
  //   }
  // });
  // iPhoneModel.position.set(0, 0, 0); // Adjust as needed
  iPhoneModel.scale.set(0.01, 0.01, 0.01);

  useFrame((state, delta) => {
    // Rotate the iPhone model around the Y-axis
    iPhoneModel.rotation.x += 1 * delta;

    // Move the iPhone model along the X-axis in a sine wave pattern
    // iPhoneModel.position.x = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <React.Fragment>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <axesHelper args={[5]} />
      {/* Add your iPhone model to the scene */}
      <animated.group  onClick={() => setActive(prev => !prev)} rotation={rotation}>
        <primitive object={iPhoneModel} position={[1, -1, 2]} />
      </animated.group>

      {/* Add OrbitControls for interaction (optional) */}
      <OrbitControls enableDamping dampingFactor={0.25} />
    </React.Fragment>
  );
};

export default IPhoneScene;
