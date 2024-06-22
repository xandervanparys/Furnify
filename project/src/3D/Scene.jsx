import { Suspense } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import { Room } from './roomComponents/Room.tsx'
import { useConfiguratorContext } from '../contexts/ConfiguratorContext.jsx';
import { Surface } from './Draggables/Surface.jsx';
import { DModel } from './Draggables/DModel.jsx';
import { DObstruction } from './Draggables/DObstruction.jsx';
import { DLight } from './Draggables/DLight.jsx';
import { Loader } from '@react-three/drei';
import { Skybox } from './Skybox.jsx';
import { useIntersectionContext } from '../contexts/IntersectionContext.jsx';
import { ErrorBox } from './other/ErrorBox.jsx';
import {useModuleContext} from "../contexts/ModuleContext.jsx";

const Scene = () => {
    const { dimensions } = useConfiguratorContext();
    const { skyboxPath, setSkyboxPath } = useConfiguratorContext();
    const {chosen_module}=useModuleContext();
    let width = dimensions.width;
    let depth = dimensions.length;
    let height = dimensions.height;
    const { getOtherObstacles, obstructionPositions } = useConfiguratorContext();
    const { getLights } = useConfiguratorContext();
    const { getErrorBoxes } = useIntersectionContext();

    const obstacles = getOtherObstacles();
    const lights = getLights();
    const errorBoxes = getErrorBoxes();

    const { modelPosition } = useConfiguratorContext();

    return (
        <>
            <Canvas linear={false} shadows className="canvas" camera={{ position: [10, 6, 8] }}>
                <Suspense fallback={null}>

                    <ambientLight intensity={1} />
                    <directionalLight castShadow position={[60, 90, 60]} shadow-mapSize={[1024, 1024]}>
                        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
                    </directionalLight>

                    <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />

                    <Surface surfX={width} surfZ={depth}>
                        {/* Render DObstruction for each obstacle */}
                        {obstacles.map((obstacle) => (
                            <DObstruction
                                key={obstacle.id}
                                obstructionKey={obstacle.id}
                                position={obstructionPositions[obstacle.id]}
                                dimensions={[obstacle.width / 100, obstacle.height / 100, obstacle.obstLength / 100]}
                                maxX={width}
                                maxZ={depth}
                                maxY={height}
                                otype={obstacle.type}
                            // Pass any other necessary props to DObstruction
                            />
                        ))}
                        {lights.map((light) => (
                            <DLight
                                key={light.id}
                                obstructionKey={light.id}
                                position={obstructionPositions[light.id]}
                                dimensions={[light.width / 100, light.height / 100, light.obstLength / 100]}
                                maxX={width}
                                maxZ={depth}
                                maxY={height}
                                otype={light.type}
                            // Pass any other necessary props to DObstruction
                            />
                        ))}
                        {/* Render ErrorBox for each Box3 object */}
                        {errorBoxes.map((box) => (
                            <ErrorBox box={box} />
                        ))}

                        {
                            chosen_module.name!= "" ? (
                                <DModel position={modelPosition} scale={0.001} maxX={width} maxZ={depth} />
                            ) : null
                        }
                    </Surface>

                    <OrbitControls makeDefault enablePan={false} minDistance={5} maxDistance={50} minPolarAngle={0} maxPolarAngle={Math.PI - Math.PI / 2} />
                    <Skybox path={skyboxPath} />

                </Suspense>
            </Canvas>
            <Loader />
        </>
    )
}

export default Scene