import React from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export const WallMesh = ({ width, height, depth, position, windows, doors, walloutlets, switches, wallTexture, giveColor, wall }) => {
    const wallGeometry = new THREE.BoxGeometry(width, height, depth);
    const wallMesh = new THREE.Mesh(wallGeometry);

    const doorCSGs = doors.map(door => createDoorMesh(door, wall, width, height, depth));
    const windowCSGs = windows.map(window => createWindowMesh(window, wall, width, height, depth));
    const outletCSGs = walloutlets.map(walloutlet => createOutletMesh(walloutlet, wall, width, height, depth));
    const switchCSGs = switches.map(oswitch => createSwitchMesh(oswitch, wall, width, height, depth));

    const wallCSG = CSG.fromMesh(wallMesh);

    const resultCSG = [
        ...windowCSGs,
        ...doorCSGs,
    ].reduce((acc, csg) => acc.subtract(csg), wallCSG);

    const resultCSG2 = [
        ...outletCSGs,
        ...switchCSGs,
    ].reduce((acc, csg) => acc.union(csg), resultCSG)

    const resultMesh = CSG.toMesh(resultCSG2, wallMesh.matrix);
    resultMesh.material = new THREE.MeshStandardMaterial({ ...wallTexture });

    resultMesh.material.color = new THREE.Color('#b5b5b5');

    useFrame((state, delta) => {
        easing.dampC(resultMesh.material.color, giveColor ? 'lightblue' : '#b5b5b5', 0.1, delta);
    });


    return <primitive object={resultMesh} position={position} />;
};

const createDoorMesh = (door, wall, width, height, depth) => {
    const y = 0;
    const x = parseFloat(door.doorXpos) / 100;
    const w_width = parseFloat(door.width) / 100;
    const w_height = parseFloat(door.height) / 100;
    let doorGeometry;

    if (wall === "back") {
        doorGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
        doorGeometry.translate(x + (w_width / 2) - (width / 2) + 0.3, y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "front") {
        doorGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
        doorGeometry.translate(-(x + (w_width / 2) - (width / 2) + 0.3), y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "left") {
        doorGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
        doorGeometry.translate(0, y + (w_height / 2) + (-height / 2), -(x + (w_width / 2) + (-depth / 2) + 0.3));
    }
    if (wall === "right") {
        doorGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
        doorGeometry.translate(0, y + (w_height / 2) + (-height / 2), x + (w_width / 2) + (-depth / 2) + 0.3);
    }

    const doorMesh = new THREE.Mesh(doorGeometry);
    return CSG.fromMesh(doorMesh);
};

const createWindowMesh = (window, wall, width, height, depth) => {
    const x = parseFloat(window.windowXpos) / 100;
    const y = parseFloat(window.windowYpos) / 100;
    const w_width = parseFloat(window.width) / 100;
    const w_height = parseFloat(window.height) / 100;
    let windowGeometry;

    if (wall === "back") {
        windowGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
        windowGeometry.translate(x + (w_width / 2) - (width / 2) + 0.3, y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "front") {
        windowGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
        windowGeometry.translate(-(x + (w_width / 2) - (width / 2) + 0.3), y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "left") {
        windowGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
        windowGeometry.translate(0, y + (w_height / 2) + (-height / 2), -(x + (w_width / 2) + (-depth / 2) + 0.3));
    }
    if (wall === "right") {
        windowGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
        windowGeometry.translate(0, y + (w_height / 2) + (-height / 2), x + (w_width / 2) + (-depth / 2) + 0.3);
    }

    const windowMesh = new THREE.Mesh(windowGeometry);
    return CSG.fromMesh(windowMesh);
};

const createOutletMesh = (walloutlet, wall, width, height, depth) => {
    const x = parseFloat(walloutlet.walloutletXpos) / 100;
    const y = parseFloat(walloutlet.walloutletYpos) / 100;
    const w_width = parseFloat(walloutlet.width) / 100;
    const w_height = parseFloat(walloutlet.height) / 100;
    const w_depth = parseFloat(walloutlet.depth) / 100;

    let walloutletGeometry;

    if (wall === "back") {
        walloutletGeometry = new THREE.BoxGeometry(w_width, w_height, w_depth + 0.0001);
        walloutletGeometry.translate(x + (w_width / 2) - (width / 2) + 0.3, y + (w_height / 2) - (height / 2), (w_depth / 2) + (0.3 / 2));
    }
    if (wall === "front") {
        walloutletGeometry = new THREE.BoxGeometry(w_width, w_height, w_depth + 0.0001);
        walloutletGeometry.translate(-(x + (w_width / 2) - (width / 2) + 0.3), y + (w_height / 2) - (height / 2), -((w_depth / 2) + (0.3 / 2)));
    }
    if (wall === "left") {
        walloutletGeometry = new THREE.BoxGeometry(w_depth, w_height, w_width);
        walloutletGeometry.translate((w_depth / 2) + (0.3 / 2), y + (w_height / 2) + (-height / 2), -(x + (w_width / 2) + (-depth / 2) + 0.3));
    }
    if (wall === "right") {
        walloutletGeometry = new THREE.BoxGeometry(w_depth, w_height, w_width);
        walloutletGeometry.translate(-((w_depth / 2) + (0.3 / 2)), y + (w_height / 2) + (-height / 2), x + (w_width / 2) + (-depth / 2) + 0.3);
    }

    const walloutletMesh = new THREE.Mesh(walloutletGeometry);
    return CSG.fromMesh(walloutletMesh);
};

const createSwitchMesh = (oswitch, wall, width, height, depth) => {
    const x = parseFloat(oswitch.switchXpos) / 100;
    const y = parseFloat(oswitch.switchYpos) / 100;
    const w_width = parseFloat(oswitch.width) / 100;
    const w_height = parseFloat(oswitch.height) / 100;
    const w_depth = parseFloat(oswitch.depth) / 100;

    let switchGeometry;

    if (wall === "back") {
        switchGeometry = new THREE.BoxGeometry(w_width, w_height, w_depth + 0.0001);
        switchGeometry.translate(x + (w_width / 2) - (width / 2) + 0.3, y + (w_height / 2) - (height / 2), (w_depth / 2) + (0.3 / 2));
    }
    if (wall === "front") {
        switchGeometry = new THREE.BoxGeometry(w_width, w_height, w_depth + 0.0001);
        switchGeometry.translate(-(x + (w_width / 2) - (width / 2) + 0.3), y + (w_height / 2) - (height / 2), -((w_depth / 2) + (0.3 / 2)));
    }
    if (wall === "left") {
        switchGeometry = new THREE.BoxGeometry(w_depth, w_height, w_width);
        switchGeometry.translate((w_depth / 2) + (0.3 / 2), y + (w_height / 2) + (-height / 2), -(x + (w_width / 2) + (-depth / 2) + 0.3));
    }
    if (wall === "right") {
        switchGeometry = new THREE.BoxGeometry(w_depth, w_height, w_width);
        switchGeometry.translate(-((w_depth / 2) + (0.3 / 2)), y + (w_height / 2) + (-height / 2), x + (w_width / 2) + (-depth / 2) + 0.3);
    }

    const switchMesh = new THREE.Mesh(switchGeometry);
    return CSG.fromMesh(switchMesh);
};
