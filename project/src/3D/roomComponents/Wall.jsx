import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';


export const Wall = ({ width, height, depth, position, visible }) => {
  const wallTexture = useTexture({
    map: './textures/beige_wall/beige_wall_001_ao_1k.jpg',
    displacement: './textures/beige_wall/beige_wall_001_disp_1k.jpg',
    aoMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    // roughnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg', // uit om glans te voorkomen
    metalnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    normalMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
  });

  // Apply texture repetition to all textures
  useEffect(() => {
    const repeatTextures = [
      wallTexture.map,
      wallTexture.displacement,
      wallTexture.aoMap,
      wallTexture.roughnessMap,
      wallTexture.metalnessMap,
      wallTexture.normalMap
    ];

    repeatTextures.forEach(texture => {
      if (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2) // TODO: only change repeat settings when width, depth is divisible by a certain number
        texture.needsUpdate = true;
      }
    });
  }, [width, depth]);

  return (
    <>
      <ColoredBox
        width={width}
        height={height}
        depth={depth}
        position={position}
        color="b5b5b5"
        visible={visible}
        textures={wallTexture}
        addColorToTexture={true}
      />
      
    </>
  );
};