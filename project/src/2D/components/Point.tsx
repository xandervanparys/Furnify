import React from 'react';
import * as THREE from 'three';
import { CanvasTexture, SpriteMaterial, Sprite, Vector3, Vector2, Plane, Raycaster, BufferGeometry, LineBasicMaterial, Line } from 'three';

export class DrawablePoint extends Vector3 {}

export const Point: React.FC<{ key: number, point: Vector3, color: string, scale: number }> = ({ point, color = 'red', scale = 1 }) => (
    <mesh position={[point.x, point.y, point.z]} scale={[scale, scale, scale]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );