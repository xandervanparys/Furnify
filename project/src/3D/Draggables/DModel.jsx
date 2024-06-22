import {MathUtils, Color, TextureLoader} from 'three'
import {useCallback, useRef, useEffect, useState} from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import {easing} from 'maath'
import {useDrag} from './Surface'
import {useGLTF} from '@react-three/drei'
import {useConfiguratorContext} from '../../contexts/ConfiguratorContext'
import {useModuleContext} from "../../contexts/ModuleContext.jsx";
import {useIntersectionContext} from '../../contexts/IntersectionContext'

export const DModel = ({
                           position = [0.5, 0.5, -0.5],
                           c = new Color(),
                           round = Math.round,
                           maxX = 4,
                           maxZ = 4,
                           clamp = MathUtils.clamp,
                           ...props
                       }) => {

    const {chosen_module} = useModuleContext();
    const {specs, modelRotation} = useConfiguratorContext();
    const {nodes, materials} = useGLTF('/models/' + chosen_module.name + '.gltf')
    const texture = useLoader(TextureLoader, '/models/' + specs.material + '.jpg')
    const group = useRef();
    const pos = useRef(position)

    const [width, setModelWidth] = useState(chosen_module.width);
    const [depth, setModelDepth] = useState(chosen_module.open);

    //retrieve model position from configuratorcontext
    const {setModelPosition, get,setGet} = useConfiguratorContext();

    // swapping depth and width depending on rotation
    useEffect(() => {
        if (modelRotation === 0) {
            setModelWidth(chosen_module.width);
            setModelDepth(chosen_module.open);
        } else if (modelRotation === Math.PI / 2) {
            setModelWidth(chosen_module.open);
            setModelDepth(chosen_module.width);
        } else if (modelRotation === Math.PI) {
            setModelWidth(chosen_module.width);
            setModelDepth(chosen_module.open);
        } else if (modelRotation === -Math.PI / 2) {
            setModelWidth(chosen_module.open);
            setModelDepth(chosen_module.width);
        }
    }, [modelRotation, chosen_module]);


    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const onDrag = useCallback(({x, z}) => {
        //enable module the stick to the wall again(GET REQUEST)
        setGet(false)
        //zorgt ervoor dat de modullen weer een de muur kleven
        let distanceToRightWall;
        let distanceToLeftWall;
        let distanceToFrontWall;
        let distanceToBackWall;

        //calculate distance to wall depending on its rotation the calcultation is different
        if (modelRotation === 0) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x - width;
            distanceToLeftWall = maxX2 + x;
            distanceToFrontWall = maxZ2 - z - depth;
            distanceToBackWall = maxZ2 + z;
        } else if (modelRotation === Math.PI / 2) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x - width;
            distanceToLeftWall = maxX2 + x;
            distanceToFrontWall = maxZ2 - z;
            distanceToBackWall = maxZ2 + z - depth;
        } else if (modelRotation === Math.PI) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x;
            distanceToLeftWall = maxX2 + x - width;
            distanceToFrontWall = maxZ2 - z;
            distanceToBackWall = maxZ2 + z - depth;
        } else if (modelRotation === -Math.PI / 2) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x;
            distanceToLeftWall = maxX2 + x - width;
            distanceToFrontWall = maxZ2 - z - depth;
            distanceToBackWall = maxZ2 + z;
        }

        // Find the nearest wall
        const nearestWallDistance = Math.min(distanceToRightWall, distanceToLeftWall, distanceToFrontWall, distanceToBackWall);

        let newX = x;
        let newZ = z;

        //new coordinates calculation for each rotation different
        if (modelRotation === 0) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2 - width;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2 - depth;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2
            }

            newX = clamp(newX, -maxX2, maxX2 - width);
            newZ = clamp(newZ, -maxZ2, maxZ2 - depth);

        } else if (modelRotation === Math.PI / 2) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2 - width;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2 + depth;
            }

            newX = clamp(newX, -maxX2, maxX2 - width);
            newZ = clamp(newZ, -maxZ2 + depth, maxZ2);

        } else if (modelRotation === Math.PI) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2 + width;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2 + depth;
            }

            newX = clamp(newX, -maxX2 + width, maxX2);
            newZ = clamp(newZ, -maxZ2 + depth, maxZ2);

        } else if (modelRotation === -Math.PI / 2) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2 + width;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2 - depth;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2
            }

            newX = clamp(newX, -maxX2 + width, maxX2);
            newZ = clamp(newZ, -maxZ2, maxZ2 - depth);
        }


        //update position
        pos.current = [newX, position[1], newZ];

    }, [maxX2, maxZ2, position, clamp, width, depth, modelRotation]);

    //remove ability for module to stick to wall if it comes from get Request
        // makes sure when enlarging the room or rotating the model sticks to the wall in x
        useEffect(() => {
            if(!get){
                const [x, y, z] = pos.current;
                let newX = x
                // different calculation for different rotations
                if (modelRotation === 0) {
                    newX = x < 0 ? -maxX2 : maxX2 - width;
                } else if (modelRotation === Math.PI / 2) {
                    newX = x < 0 ? -maxX2 : maxX2 - width;
                } else if (modelRotation === Math.PI) {
                    newX = x < 0 ? -maxX2 + width : maxX2;
                } else if (modelRotation === -Math.PI / 2) {
                    newX = x < 0 ? -maxX2 + width : maxX2;
                }
                pos.current = [newX, y, z];
            }

        }, [maxX2, width, modelRotation]);

        // makes sure when enlarging the room or rotating the model sticks to the wall in z
        useEffect(() => {
            if(!get){
                const [x, y, z] = pos.current;
                let newZ = z
                // different calculation for different rotations
                if (modelRotation === 0) {
                    newZ = z < 0 ? -maxZ2 : maxZ2 - depth;
                } else if (modelRotation === Math.PI / 2) {
                    newZ = z < 0 ? -maxZ2 + depth : maxZ2;
                } else if (modelRotation === Math.PI) {
                    newZ = z < 0 ? -maxZ2 + depth : maxZ2;
                } else if (modelRotation === -Math.PI / 2) {
                    newZ = z < 0 ? -maxZ2 : maxZ2 - depth;
                }
                pos.current = [x, y, newZ];
            }
        }, [maxZ2, depth, modelRotation]);


    const [events, active, hovered] = useDrag(onDrag);

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered]);

    const [originalColors, setOriginalColors] = useState([]);

    // Sla de oorspronkelijke kleuren op wanneer het component wordt gemonteerd
    useEffect(() => {
        // Sla de oorspronkelijke kleuren van de materialen op
        const originalColors = nodes[chosen_module.name].children.map(object => object.material.color.clone());
        setOriginalColors(originalColors);
    }, [specs.color, nodes]);


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

    useFrame((state, delta) => {
        if (delayedActive) {
            easing.damp3(group.current.position, pos.current, 0.1, delta);
        } else {
            easing.damp3(group.current.position, pos.current, 0, delta);
        }

        group.current.children.forEach((object, i) => {
            // Gebruik de opgeslagen oorspronkelijke kleuren om de kleur terug te zetten wanneer het hover-effect eindigt
            let originalColor = originalColors[i];
            // Making it possible to switch colors on an object
            if (object.material.name.includes("Color")) {
                originalColor = specs.color;
            }

            if (object.material.name.includes("Wood") & object.material.map != null) {
                object.material.map = texture;
            }
            easing.dampC(object.material.color, active ? 'grey' : hovered ? 'lightblue' : originalColor, 0.1, delta);
        });
    });


    //save position also in configuratorcontext
    useEffect(() => {
        setModelPosition(pos.current);
    }, [pos.current]);

    const {addDObstruction, removeDObstruction} = useIntersectionContext();

    //sending mesh data to IntersectionContext when component mounts
    const id = 'model';
    useEffect(() => {
        addDObstruction(group.current, id);
    }, [addDObstruction, removeDObstruction, active]);
    return (
        <>
            <group ref={group} rotation={[0, modelRotation, 0]} {...events} {...props} dispose={null}>
                {nodes[chosen_module.name].children.map(function (object, i) {

                    return <mesh scale={[chosen_module.width / chosen_module.width_options[0].value, 1, 1]}
                                 key={"texture" + i.toString()} geometry={object.geometry} castShadow receiveShadow
                                 material={object.material}/>;
                })}
            </group>

        </>
    )
};