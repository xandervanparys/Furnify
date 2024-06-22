import { MathUtils } from 'three'
import { useCallback, useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'
import { useIntersectionContext } from '../../contexts/IntersectionContext'
import { useConfiguratorContext } from '../../contexts/ConfiguratorContext'

export const DLight = ({ obstructionKey, position = [0.5, 0.5, -0.5], dimensions, otype, maxX = 4, maxZ = 4, maxY, clamp = MathUtils.clamp, ...props }) => {
    const ref = useRef();
    const pos = useRef(position);
    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;
    const id = obstructionKey;

    const ceilingHeight = maxY - dimensions[1] / 2;




    const onDrag = useCallback(({ x, z }) => {
        const newY = ceilingHeight;
        const newX = clamp(x, -maxX2 + (dimensions[0] / 2), maxX2 - (dimensions[0] / 2));
        const newZ = clamp(z, -maxZ2 + (dimensions[2] / 2), maxZ2 - (dimensions[2] / 2));
        pos.current = [newX, newY, newZ];
    }, [dimensions, maxX2, maxZ2, maxY, ceilingHeight, clamp]);

    useEffect(() => {
        const [x, y, z] = pos.current;
        const newY = ceilingHeight;
        const newX = clamp(x, -maxX2 + (dimensions[0] / 2), maxX2 - (dimensions[0] / 2));
        const newZ = clamp(z, -maxZ2 + (dimensions[2] / 2), maxZ2 - (dimensions[2] / 2));
        pos.current = [newX, newY, newZ];
    }, [dimensions, maxX2, maxZ2, maxY, ceilingHeight, clamp]);

    const [events, active, hovered] = useDrag(onDrag);

    const [delayedActive, setDelayedActive] = useState(false);
    let timeoutId = null;

    useEffect(() => {
        if (active) {
            // If active is true, set delayedActive to true immediately
            setDelayedActive(true);
            // Clear any existing timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        } else {
            // If active is false, set delayedActive to false after a 2-second delay
            timeoutId = setTimeout(() => {
                setDelayedActive(false);
            }, 500);
        }

        // Clean up on unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [active]);


    useEffect(() => {
        document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto';
    }, [active, hovered]);

    useFrame((state, delta) => {
        if (delayedActive) {
            easing.damp3(ref.current.position, pos.current, 0.1, delta);
        } else {
            easing.damp3(ref.current.position, pos.current, 0, delta);
        }
        easing.dampC(ref.current.material.color, active ? 'grey' : hovered ? 'lightblue' : '#ffdc7a', 0.1, delta);
    });

    const { addDObstructionPosition, removeDObstructionPosition } = useConfiguratorContext();

    useEffect(()=> {    
        addDObstructionPosition(pos.current, id);
    }, [addDObstructionPosition, removeDObstructionPosition, active, dimensions,]);

    const { addDObstruction, removeDObstruction } = useIntersectionContext();


    //sending mesh data to IntersectionContext when component mounts
    useEffect(() => {
        addDObstruction(ref.current, id);
    }, [addDObstruction, removeDObstruction, active, dimensions,]);

    return (
        <mesh ref={ref} scale={[dimensions[0], dimensions[1], dimensions[2]]} receiveShadow {...events} {...props}>
            <boxGeometry />
            <pointLight power={100} decay={2} castShadow></pointLight>
            <meshStandardMaterial />
        </mesh>
    );
};