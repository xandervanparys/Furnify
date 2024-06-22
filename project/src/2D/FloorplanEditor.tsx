import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  SpriteMaterial,
  Sprite,
  Vector3,
  Vector2,
  Plane,
  Raycaster,
  BufferGeometry,
  LineBasicMaterial,
  Line,
} from "three";
import * as THREE from "three";
import { DrawableLine, LinePrimitive, TextSprite } from "./components/Line";
import { DrawablePoint, Point } from "./components/Point";
import { use } from "i18next";
import { use2d } from "../contexts/2dContext";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

/**
 * Keeps track of the current mouse position in 3D space
 * @param camera
 * @returns current mouse position in 3D space: Vector3 | null
 */
const useMousePosition = (camera) => {
  const [currentMousePosition, setCurrentMousePosition] =
    useState<Vector3 | null>(null);

  useEffect(() => {
    const raycaster = new Raycaster();
    const planeXZ = new Plane(new Vector3(0, 1, 0), 0); // Change the plane to XZ
    const mousePosition = new Vector2();

    const updatePosition = (x, y, rect) => {
      mousePosition.x = ((x - rect.left) / rect.width) * 2 - 1;
      mousePosition.y = -((y - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mousePosition, camera);
      const intersection = new Vector3();
      raycaster.ray.intersectPlane(planeXZ, intersection); // Use the new plane
      if (intersection) {
        setCurrentMousePosition(intersection);
      }
    };

    const handleMouseMove = (event) => {
      const rect = event.target.getBoundingClientRect();
      updatePosition(event.clientX, event.clientY, rect);
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = touch.target.getBoundingClientRect();
        updatePosition(touch.clientX, touch.clientY, rect);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, [camera]);

  return currentMousePosition;
};

/**
 * FloorplanEditor component logic and rendering
 * @returns FloorplanEditor component
 */
export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const { points, setPoints, latestPointRef } = use2d();
  const { lines, setLines, tempLineRef } = use2d();
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const { isHoveringCanvas, setIsHoveringCanvas } = use2d();
  const { orthogonalMode, toggleOrthogonalMode } = use2d();
  const [isNearStart, setIsNearStart] = useState<boolean>(false);
  const { isClosed, setIsClosed } = use2d();
  const { snappingMode, setSnappingMode } = use2d();
  const { gridSize, setGridSize } = use2d();
  const currentMousePosition = useMousePosition(camera);
  const snapThreshold: number = 0.4;

  const checkShapeClosed = (): boolean => {
    if (points.length > 2 && points[points.length - 1] == points[0]) return true;
    else return false;
  };

  /**
   * Clear the scene of all points and lines
   */
  const clearScene = () => {
    lines.forEach((line: DrawableLine) => {
      if (line.line) scene.remove(line.line);
      if (line.geometry) line.geometry.dispose();
      if (line.material) line.material.dispose();
    });
    if (tempLineRef.current) {
      tempLineRef.current.removeFromScene(scene);
      tempLineRef.current = null;
    }
    if (latestPointRef.current) latestPointRef.current = null;
  };

  const isCloseToStart = (point: DrawablePoint) => {
    if (points.length < 2) return false;
    const start = points[0];
    return (
      Math.sqrt(
        Math.pow(point.x - start.x, 2) + Math.pow(point.z - start.z, 2) // Use x and z for distance calculation
      ) < snapThreshold
    );
  };

  useEffect(() => {
    if (points.length === 0 && lines.length === 0) {
      clearScene();
    }
  }, [points, lines]);

  useEffect(() => {
    if (!isDrawing || points.length < 2) {
      setIsNearStart(false);
      return;
    }

    const checkProximity = (event: MouseEvent) => {
      if (!currentMousePosition || points.length < 1) return;

      const start = points[0];
      const distance = currentMousePosition.distanceTo(start);

      if (distance < snapThreshold) {
        setIsNearStart(true);
      } else {
        setIsNearStart(false);
      }
    };

    window.addEventListener("mousemove", checkProximity);
    return () => window.removeEventListener("mousemove", checkProximity);
  }, [currentMousePosition, isDrawing, points]);

  useEffect(() => {
    const toggleDrawingKey = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        toggleDrawing();
      }
    };

    window.addEventListener("keydown", toggleDrawingKey);
    return () => window.removeEventListener("keydown", toggleDrawingKey);
  }, []);

  const addPoint = useCallback(
    (newPoint: DrawablePoint) => {
      const lastPoint = points.length > 0 ? points[points.length - 1] : null;

      if (orthogonalMode && lastPoint && !isCloseToStart(newPoint)) {
        const dx = Math.abs(newPoint.x - lastPoint.x);
        const dz = Math.abs(newPoint.z - lastPoint.z); // Use x and z for orthogonal mode

        if (dx > dz) {
          newPoint.z = lastPoint.z;
        } else {
          newPoint.x = lastPoint.x;
        }
      }

      if (isDrawing && points.length > 1 && isCloseToStart(newPoint)) {
        newPoint = points[0];
        toggleDrawing();
        if (tempLineRef.current) {
          tempLineRef.current.removeFromScene(scene);
          tempLineRef.current = null;
        }
      }

      if (snappingMode && gridSize > 0 && !isCloseToStart(newPoint)) {
        const snappedX = Math.round(newPoint.x / gridSize) * gridSize;
        const snappedZ = Math.round(newPoint.z / gridSize) * gridSize; // Use x and z for snapping
        newPoint.set(snappedX, newPoint.y, snappedZ);
      }

      latestPointRef.current = newPoint;
      setPoints((prevPoints) => {
        const updatedPoints = [...prevPoints, newPoint];
        if (updatedPoints.length > 1) {
          const start = updatedPoints[updatedPoints.length - 2];
          const newLine = new DrawableLine(start, newPoint);
          newLine.addToScene(scene);
          setLines((prevLines) => [...prevLines, newLine]);
        }
        if (updatedPoints.length > 2 && updatedPoints[updatedPoints.length - 1] == updatedPoints[0]) { setIsClosed(true); }
        else setIsClosed(false);
        return updatedPoints;
      });

    },
    [scene, isDrawing, points, orthogonalMode, snappingMode, gridSize]
  );

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      toggleDrawing();
    };

    const handleClick = (event: MouseEvent) => {
      if (!isDrawing) return;

      if (
        drawingCanvasRef.current &&
        drawingCanvasRef.current.contains(event.target)
      ) {
        event.preventDefault();
        if (currentMousePosition) {
          addPoint(
            new DrawablePoint(
              currentMousePosition.x,
              currentMousePosition.y,
              currentMousePosition.z
            )
          );
          if (tempLineRef.current) {
            tempLineRef.current.removeFromScene(scene);
            tempLineRef.current = null;
          }
        }
      } else {
        toggleDrawing();
        return;
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [addPoint, currentMousePosition, scene, isDrawing]);

  useFrame(() => {
    if (
      isDrawing &&
      currentMousePosition &&
      latestPointRef.current &&
      isHoveringCanvas
    ) {
      let endPoint = new Vector3(
        currentMousePosition.x,
        currentMousePosition.y,
        currentMousePosition.z
      );

      if (isCloseToStart(endPoint)) {
        endPoint = points[0];
      } else if (orthogonalMode) {
        const lastPoint = latestPointRef.current;
        const dx = Math.abs(endPoint.x - lastPoint.x);
        const dz = Math.abs(endPoint.z - lastPoint.z);

        if (dx > dz) {
          endPoint.z = lastPoint.z;
        } else {
          endPoint.x = lastPoint.x;
        }
      }

      if (snappingMode) {
        const snappedX = Math.round(endPoint.x / gridSize) * gridSize;
        const snappedZ = Math.round(endPoint.z / gridSize) * gridSize;
        endPoint.set(snappedX, endPoint.y, snappedZ);
      }

      if (!tempLineRef.current) {
        const tempLine = new DrawableLine(latestPointRef.current, endPoint);
        tempLine.addToScene(scene);
        tempLineRef.current = tempLine;
      } else {
        tempLineRef.current.update(endPoint);
      }
    } else if (tempLineRef.current) {
      tempLineRef.current.removeFromScene(scene);
      tempLineRef.current = null;
    }
  });

  const lineLengthSprites = points
    .slice(1)
    .map((point: DrawablePoint, index: number) => {
      const start = points[index];
      const end = point;
      const length = start.distanceTo(end).toFixed(2);
      const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
      return <TextSprite key={index} text={`${length}m`} position={midpoint} />;
    });

  return (
    <>
      {points.map((point: DrawablePoint, index: number) => (
        <Point
          key={index}
          point={point}
          color={isNearStart && index === 0 ? "yellow" : "red"}
          scale={isNearStart && index === 0 ? 1.5 : 1}
        />
      ))}
      {lines.map((line: DrawableLine, index: number) => (
        <LinePrimitive key={index} line={line.line} />
      ))}
      {lineLengthSprites}
      {isDrawing && tempLineRef.current && (
        <TextSprite
          key={points.length}
          text={`${tempLineRef.current.getLength().toFixed(2)}m`}
          position={tempLineRef.current.getMidPoint()}
        />
      )}
    </>
  );
};
