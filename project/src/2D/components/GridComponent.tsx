import React, { useMemo } from "react";
import { extend, useThree } from "@react-three/fiber";
import {
    LineBasicMaterial,
    BufferGeometry,
    LineSegments,
    Vector3,
  } from "three";
import * as THREE from "three";

// Extend r3f with LineSegments if not already available
extend({ LineSegments: THREE.LineSegments });

export const GridComponent = ({
  size = 100,
  divisions = 11,  // Ensuring it's odd
  color = "grey",
  centerLineColor = "white",
}) => {
  const { scene } = useThree();
  const yPosGrid = -0.01; // Just below the XZ plane to show lines above it

  const { geometry, material, centerMaterial } = useMemo(() => {
    const points: Vector3[] = [];
    const step = size / divisions;
    const halfSize = size / 2;

    const material = new THREE.LineBasicMaterial({ color });
    const centerMaterial = new THREE.LineBasicMaterial({ color: centerLineColor });

    // Adjust the loop to start from the negative half to positive half of the grid
    for (let i = -Math.floor(divisions / 2); i <= Math.floor(divisions / 2); i++) {
      const offset = i * step;

      // Horizontal lines on XZ plane
      points.push(new THREE.Vector3(-halfSize, yPosGrid, offset), new THREE.Vector3(halfSize, yPosGrid, offset));
      // Vertical lines on XZ plane
      points.push(new THREE.Vector3(offset, yPosGrid, -halfSize), new THREE.Vector3(offset, yPosGrid, halfSize));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return { geometry, material, centerMaterial };
  }, [size, divisions, color, centerLineColor]);

  return (
    <lineSegments geometry={geometry} material={material}>
      {/* No children needed as this is a static object */}
    </lineSegments>
  );
};
