import * as THREE from 'three';
import { DrawablePoint } from './Point';
import React, { useEffect } from 'react';
import { Line } from 'three';
import { useThree } from '@react-three/fiber';

export class DrawableLine {
  public geometry: THREE.BufferGeometry;
  public material: THREE.LineBasicMaterial;
  public line: THREE.Line;
  public start: DrawablePoint;
  public end: DrawablePoint;
  
  constructor(start: DrawablePoint, end: DrawablePoint) {
    this.start = start;
    this.end = end;
    this.geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    this.material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    this.line = new THREE.Line(this.geometry, this.material);
  }
  
  update(end: DrawablePoint) {
    if (!this.end.equals(end)) {
    this.end.copy(end);
    this.geometry.setFromPoints([this.start, this.end]);
    this.geometry.attributes.position.needsUpdate = true;
    }
  }
  
  addToScene(scene: THREE.Scene) {
    scene.add(this.line);
  }
  
  removeFromScene(scene: THREE.Scene) {
    scene.remove(this.line);
    this.geometry.dispose();
    this.material.dispose();
  }

  getLength(): number {
    return this.start.distanceTo(this.end);
  }

  getMidPoint(): THREE.Vector3 {
    return new THREE.Vector3().addVectors(this.start, this.end).multiplyScalar(0.5);
  }
}

export const LinePrimitive: React.FC<{ key: number, line: Line }> = ({ line }) => <primitive object={line} />;

export const TextSprite: React.FC<{ key: number, text: string, position: THREE.Vector3 }> = ({ text, position }) => {
  const { scene } = useThree();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error("Unable to get canvas context");

    context.font = '64px serif';
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(text, 0, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);

    sprite.position.copy(position);
    sprite.scale.set(0.5, 0.5, 0.5);
    scene.add(sprite);

    return () => {
      scene.remove(sprite);
      texture.dispose();
      material.dispose();
    };
  }, [text, position, scene]);

  return null;
};
