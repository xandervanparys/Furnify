import { Vector3, Plane } from 'three'
import { createContext, useRef, useContext, useCallback, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useIntersectionContext } from '../../contexts/IntersectionContext'

const vector = new Vector3()
const plane = new Plane(new Vector3(0, 1, 0), 0)
const surfaceContext = createContext()

function useDrag(onDrag) {
  const controls = useThree((state) => state.controls)
  const activatePlane = useContext(surfaceContext)
  const [hovered, hover] = useState(false)
  const [active, activate] = useState(false)
  const out = useCallback(() => hover(false), [])
  const over = useCallback((e) => (e.stopPropagation(), hover(true)), [])

  const down = useCallback(
    (e) => {
      e.stopPropagation()
      activate(true)
      activatePlane(true)
      if (controls) controls.enabled = false
      e.target.setPointerCapture(e.pointerId)
    },
    [controls]
  )

  const up = useCallback(
    (e) => {
      activate(false)
      activatePlane(false)
      if (controls) controls.enabled = true
      e.target.releasePointerCapture(e.pointerId)
    },
    [controls]
  )

  const move = useCallback(
    (e) => {
      e.stopPropagation()
      if (active && e.ray.intersectPlane(plane, vector)) onDrag(vector)
    },
    [onDrag, active]
  )
  return [{ onPointerOver: over, onPointerOut: out, onPointerDown: down, onPointerUp: up, onPointerMove: move }, active, hovered]
}

function Surface({ children, surfX, surfZ, ...props }) {
  const plane = useRef()
  const [active, activate] = useState(false)


  useFrame((state, delta) => {
    easing.damp(plane.current.material, 'opacity', active ? 0.25 : 0, 0.1, delta)
  })

  return (
    <group {...props}>
      <group scale={[surfX, 1, surfZ]} position={[0, 0.04, 0]}>
        <mesh receiveShadow ref={plane} rotation-x={-Math.PI / 2}>
          <planeGeometry />
          <meshStandardMaterial transparent color="lightblue" polygonOffset polygonOffsetUnits={1} polygonOffsetFactor={1} />
        </mesh>
      </group>
      <surfaceContext.Provider value={activate}>{children}</surfaceContext.Provider>
    </group>
  )
}

export { Surface, useDrag }