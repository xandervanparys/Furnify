import {useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import { useConfiguratorContext } from "../contexts/ConfiguratorContext";
import {
  Grid3x3,
  House,
  PencilSquare,
  Rulers,
  Trash,
} from "react-bootstrap-icons";
import { useTranslation } from 'react-i18next';
import * as THREE from "three";
import { GridComponent } from "./components/GridComponent";
import "./Floorplan.css";
import { SliderComponent } from "./components/Slider";
import { Skybox } from "../3D/Skybox";
import { SliderHeightComponent } from "./components/SliderHeight";
import {Modals} from "../Modal/Modals.jsx";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const { removeAll } = use2d();
  const { orthogonalMode, toggleOrthogonalMode } = use2d();
  const { isHoveringCanvas, setIsHoveringCanvas } = use2d();
  const { gridSize, setGridSize } = use2d();
  const { snappingMode, setSnappingMode } = use2d();
  const { showGrid, setShowGrid } = use2d();
  const { isClosed, setIsClosed } = use2d();
  const { handleConvertTo3D, sceneObjects, show3D, setShow3D } = use2d();

  const { skyboxPath, setSkyboxPath } = useConfiguratorContext();
  const { setWallProperties, wallProperties } = use2d();

  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleDrawingButtonClick = (event) => {
    event.stopPropagation();
    toggleDrawing();
  };

  const handleRemoveButtonClick = (event) => {
    event.stopPropagation();
    removeAll();
  };

  const handleOrthogonalButtonClick = (event) => {
    event.stopPropagation();
    toggleOrthogonalMode();
  };

  const handleMouseEnter = () => {
    setIsHoveringCanvas(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringCanvas(false);
  };

  const controlsRef = useRef();

  const handleHomeButtonClicked = (event) => {
    event.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleGridButtonCLicked = (event) => {
    event.stopPropagation();
    setShowGrid((prev) => !prev);
    setSnappingMode((prev) => !prev);
  };

  const handle3DButtonClicked = (event) => {
    event.stopPropagation();
    handleConvertTo3D();
    setShow3D(true);
  };

  const goBack=()=>{
    handleClose();
    setShow3D(false);
  }

  const handle2DButtonClicked = (event) => {
    event.stopPropagation();
    setShowModal(true);
    setModalMessage(t('floorplan.backto').toString());
  };


  return (
    <>
      <div className="editor-controls">
        {!show3D && (
          <>
            <button
              className={`btn-circle btn-lg ${isDrawing ? "clicked" : "unclicked"
                }`}
              onClick={handleDrawingButtonClick}
              title={t('floorplan.drawingMode')}
            >
              <PencilSquare />
            </button>

            <button
              className={`btn-circle btn-lg unclicked`}
              onClick={handleRemoveButtonClick}
              title={t('floorplan.remove')}
            >
              <Trash />
            </button>

            <button
              className={`btn-circle btn-lg ${orthogonalMode ? "clicked" : "unclicked"
                }`}
              onClick={handleOrthogonalButtonClick}
              title={t('floorplan.orthogonalMode')}
            >
              <Rulers />
            </button>

            <button
              className={`btn-circle btn-lg unclicked`}
              onClick={handleHomeButtonClicked}
              title={t('floorplan.reset')}
            >
              <House />
            </button>

            <button
              className={`btn-circle btn-lg ${showGrid ? "clicked" : "unclicked"
                }`}
              onClick={handleGridButtonCLicked}
              title={t('floorplan.grid')}
            >
              <Grid3x3 />
            </button>

            {showGrid && (
              <SliderComponent gridSize={gridSize} setgridSize={setGridSize} />
            )}

            {isClosed && (
              <button
                className={`btn-circle btn-lg unclicked`}
                onClick={handle3DButtonClicked}
                title="Convert to 3D"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-badge-3d"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.52 8.368h.664c.646 0 1.055.378 1.06.9.008.537-.427.919-1.086.919-.598-.004-1.037-.325-1.068-.756H3c.03.914.791 1.688 2.153 1.688 1.24 0 2.285-.66 2.272-1.798-.013-.953-.747-1.38-1.292-1.432v-.062c.44-.07 1.125-.527 1.108-1.375-.013-.906-.8-1.57-2.053-1.565-1.31.005-2.043.734-2.074 1.67h1.103c.022-.391.383-.751.936-.751.532 0 .928.33.928.813.004.479-.383.835-.928.835h-.632v.914zm3.606-3.367V11h2.189C12.125 11 13 9.893 13 7.985c0-1.894-.861-2.984-2.685-2.984zm1.187.967h.844c1.112 0 1.621.686 1.621 2.04 0 1.353-.505 2.02-1.621 2.02h-.844z" />
                  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                </svg>
              </button>
            )}
          </>
        )}

        {show3D && (
          <>
            <button
              className={`btn-circle btn-lg unclicked`}
              onClick={handle2DButtonClicked}
              title="Back to 2D"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 414.89"
              >
                <path
                  fillRule="nonzero"
                  d="M80.058 0h351.889c21.902 0 41.854 9.115 56.353 23.619C502.917 38.236 512 58.373 512 80.226v254.438c0 21.804-9.175 41.898-23.766 56.477-14.574 14.58-34.591 23.749-56.287 23.749H80.058c-21.744 0-41.827-9.076-56.423-23.683C9.121 376.698 0 356.686 0 334.664V80.226c0-22.065 9.028-42.131 23.57-56.672C38.101 9.022 58.101 0 80.058 0zm233.541 279.208h-55.233V135.65h54.673c14.77 0 27.535 2.857 38.324 8.582 10.755 5.726 19.082 13.95 24.933 24.673 5.855 10.723 8.822 23.586 8.822 38.524 0 14.965-2.928 27.796-8.784 38.519-5.823 10.728-14.113 18.952-24.808 24.672-10.691 5.726-23.353 8.588-37.927 8.588zm-16.253-33.092h14.868c7.11 0 13.161-1.119 18.192-3.422 5.003-2.303 8.849-6.252 11.483-11.842 2.629-5.628 3.949-13.423 3.949-23.423 0-10.001-1.32-17.796-4.014-23.39-2.7-5.628-6.611-9.572-11.777-11.875-5.166-2.271-11.483-3.422-18.947-3.422h-13.754v77.374zm-168.22 33.092v-28.029l53.555-44.309c3.552-2.928 6.583-5.694 9.147-8.29 2.531-2.602 4.509-5.296 5.889-8.029 1.379-2.765 2.075-5.823 2.075-9.18 0-3.715-.794-6.871-2.374-9.473-1.543-2.629-3.716-4.639-6.481-6.052-2.759-1.445-5.921-2.14-9.538-2.14-3.586 0-6.742.728-9.474 2.173-2.765 1.45-4.867 3.553-6.35 6.383-1.51 2.797-2.238 6.181-2.238 10.228h-37.009c0-10.098 2.238-18.784 6.78-26.085 4.541-7.3 10.956-12.895 19.213-16.812 8.257-3.943 17.958-5.888 29.078-5.888 11.515 0 21.484 1.809 29.903 5.497 8.42 3.65 14.971 8.816 19.539 15.46 4.607 6.611 6.91 14.411 6.91 23.325 0 5.524-1.119 10.984-3.422 16.448-2.304 5.427-6.415 11.446-12.336 18.057-5.921 6.583-14.374 14.411-25.298 23.52l-13.455 11.223v.853h56.059v31.12H129.126zM431.947 33.331H80.058c-13.004 0-24.792 5.286-33.293 13.787-8.496 8.495-13.771 20.218-13.771 33.108v254.438c0 12.809 5.34 24.488 13.836 32.978 8.577 8.583 20.403 13.917 33.228 13.917h351.889c12.744 0 24.515-5.399 33.092-13.982 8.572-8.566 13.967-20.283 13.967-32.913V80.226c0-12.711-5.33-24.471-13.901-33.043-8.501-8.501-20.24-13.852-33.158-13.852z"
                />
              </svg>
            </button>

            <SliderHeightComponent setWallProperties={setWallProperties} wallProperties={wallProperties} />
          </>
        )}
      </div>

      {!show3D && (
        <Canvas
          ref={drawingCanvasRef}
          className="canvas"
          orthographic
          // camera={{ position: [0, 0, 5], zoom: 100 }}
          camera={{ position: [0, 5, 0], zoom: 100, up: [0, 0, -1] }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <FloorplanEditor />
          {/* <axesHelper position={[0, 0, 0]} /> */}
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={false}
            mouseButtons={{
              LEFT: isDrawing ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN,
            }}
            maxZoom={10000}
            minZoom={10}
            zoomToCursor={true}
          />
          {showGrid && (
            <GridComponent
              size={100}
              divisions={100 / gridSize}
              color="lightgrey"
              centerLineColor="lightgrey"
            />
          )}
        </Canvas>
      )}

      {show3D && (
        <Canvas shadows
          ref={drawingCanvasRef}
          className="canvas"
          camera={{ position: [10, 6, 8] }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ambientLight intensity={0.7} />
          <directionalLight castShadow position={[60, 90, 60]} shadow-mapSize={[1024, 1024]}>
            <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
          </directionalLight>
          {sceneObjects.map((object, index) => (
            <primitive key={index} object={object} />
          ))}
          <OrbitControls makeDefault enablePan={true} minDistance={5} maxDistance={50} />
          <Skybox path={skyboxPath} />

          {/* <axesHelper position={[0, 0, 0]} args={[5]} /> */}
        </Canvas>
      )}
      <Modals show={showModal} message={modalMessage} handleClose={handleClose} confirmation={true} onClick={goBack}/>
    </>
  );
};
