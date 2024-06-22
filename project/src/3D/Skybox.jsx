import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

export const Skybox = ({ path }) => {
    const { scene } = useThree();

    useEffect(() => {
        if (path == "day") {
            console.log("Loading skybox images...");
            const textureLoader = new CubeTextureLoader();
            textureLoader.load([
                '/other/skyboxes/day/xpos.bmp',
                '/other/skyboxes/day/xneg.bmp',
                '/other/skyboxes/day/ypos.bmp',
                '/other/skyboxes/day/yneg.bmp',
                '/other/skyboxes/day/zpos.bmp',
                '/other/skyboxes/day/zneg.bmp',
            ], (texture) => {
                scene.background = texture;
                console.log("Skybox texture loaded successfully:", texture);
            }, undefined, (error) => {
                console.error("Error loading skybox texture:", error);
            });
        } else if (path == "night") {
            console.log("Loading nightbox images...");
            const textureLoader = new CubeTextureLoader();
            textureLoader.load([
                '/other/skyboxes/night/right.png',
                '/other/skyboxes/night/left.png',
                '/other/skyboxes/night/top.png',
                '/other/skyboxes/night/bottom.png',
                '/other/skyboxes/night/front.png',
                '/other/skyboxes/night/back.png',
            ], (texture) => {
                scene.background = texture;
                console.log("Nightbox texture loaded successfully:", texture);
            }, undefined, (error) => {
                console.error("Error loading nightbox texture:", error);
            });
        }
    }, [scene, path]);

    return null;
};