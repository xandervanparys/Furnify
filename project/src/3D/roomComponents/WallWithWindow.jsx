import React from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { WallMesh } from './WallMesh';

export const WallWithWindow = ({ width, height, depth, position, visible, windows, doors, walloutlets, switches, giveColor, wall }) => {


  return (
    <>
      {visible && (
        <WallMesh
          width={width}
          height={height}
          depth={depth}
          position={position}
          windows={windows}
          doors={doors}
          walloutlets={walloutlets}
          switches={switches}
          wallTexture={null}
          giveColor={giveColor}
          wall={wall}
        />
      )}
    </>
  );
};

