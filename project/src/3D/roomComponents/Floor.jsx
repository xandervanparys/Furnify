import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export const Floor = ({ width, height, depth, position }) => {

    const floorTexture = useTexture({
        map: './textures/laminate_floor/laminate_floor_02_diff_1k.jpg',
        displacement: './textures/laminate_floor/laminate_floor_02_disp_1k.jpg',
        aoMap: './textures/laminate_floor/laminate_floor_02_arm_1k.jpg',
        // roughnessMap: './textures/laminate_floor/laminate_floor_02_arm_1k.jpg', // uit om glans te voorkomen
        metalnessMap: './textures/laminate_floor/laminate_floor_02_arm_1k.jpg',
        normalMap: './textures/laminate_floor/laminate_floor_02_nor_gl_1k.jpg',
    });

    // const floorTexture = useTexture({
    //     map: './textures/wood068/Wood068_1K-JPG_Color.jpg', // Color map
    //     displacementMap: './textures/wood068/Wood068_1K-JPG_Displacement.jpg', // Displacement map for height information
    //     normalMap: './textures/wood068/Wood068_1K-JPG_NormalGL.jpg',
    // });

    // const floorTexture = useTexture({
    //     map: './textures/laminate_floor_01/laminate_floor_diff_1k.jpg',
    //     displacement: './textures/laminate_floor_01/laminate_floor_disp_1k.jpg',
    //     aoMap: './textures/laminate_floor_01/laminate_floor_arm_1k.jpg',
    //     // roughnessMap: './textures/laminate_floor/laminate_floor_arm_1k.jpg', // uit om glans te voorkomen
    //     metalnessMap: './textures/laminate_floor_01/laminate_floor_arm_1k.jpg',
    //     normalMap: './textures/laminate_floor_01/laminate_floor_nor_gl_1k.jpg',
    // });




    // Apply texture repetition to all textures
    useEffect(() => {
        const repeatTextures = [
            floorTexture.map,
            floorTexture.displacement,
            floorTexture.aoMap,
            floorTexture.roughnessMap,
            floorTexture.metalnessMap,
            floorTexture.normalMap
        ];

        let repeatWidth = Math.floor(width / 3);
        let repeatDepth = Math.floor(depth / 3);

        repeatTextures.forEach(texture => {
            if (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(repeatWidth, repeatDepth)
                texture.needsUpdate = true;
            }
        });
    }, [width, depth]);

    return (
        <ColoredBox
            width={width}
            height={height}
            depth={depth}
            position={position}
            color="white"
            textures={floorTexture}
            addColorToTexture={true}
        />
    );
};
