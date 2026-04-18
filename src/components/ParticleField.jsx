// src/components/ParticleField.jsx
// Three.js WebGL interactive particle constellation — Hero background
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 150 }) {
  const mesh = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Generate particle data once
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const origPos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 3
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      origPos[i * 3] = x
      origPos[i * 3 + 1] = y
      origPos[i * 3 + 2] = z
    }
    return [pos, origPos]
  }, [count])

  // Constellation lines buffer
  const lineGeoRef = useRef()
  const linePositions = useMemo(() => new Float32Array(count * count * 2), [count])

  // Mouse listener — useEffect, not useMemo
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const posAttr = mesh.current.geometry.attributes.position
    const time = state.clock.elapsedTime
    let lineIndex = 0

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Gentle organic float
      posAttr.array[i3] = originalPositions[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.15
      posAttr.array[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * 0.2 + i * 0.15) * 0.12
      posAttr.array[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * 0.4 + i * 0.05) * 0.08

      // Mouse repulsion
      const mx = mouse.current.x * viewport.width * 0.5
      const my = mouse.current.y * viewport.height * 0.5
      const dx = posAttr.array[i3] - mx
      const dy = posAttr.array[i3 + 1] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 2) {
        const force = (2 - dist) / 2
        posAttr.array[i3] += dx * force * 0.06
        posAttr.array[i3 + 1] += dy * force * 0.06
      }

      // Constellation lines — connect nearby particles
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3
        const ddx = posAttr.array[i3] - posAttr.array[j3]
        const ddy = posAttr.array[i3 + 1] - posAttr.array[j3 + 1]
        const d = Math.sqrt(ddx * ddx + ddy * ddy)
        if (d < 1.5 && lineIndex < linePositions.length - 6) {
          linePositions[lineIndex++] = posAttr.array[i3]
          linePositions[lineIndex++] = posAttr.array[i3 + 1]
          linePositions[lineIndex++] = posAttr.array[i3 + 2]
          linePositions[lineIndex++] = posAttr.array[j3]
          linePositions[lineIndex++] = posAttr.array[j3 + 1]
          linePositions[lineIndex++] = posAttr.array[j3 + 2]
        }
      }
    }
    posAttr.needsUpdate = true

    if (lineGeoRef.current) {
      const lineAttr = lineGeoRef.current.attributes.position
      for (let k = 0; k < lineIndex; k++) lineAttr.array[k] = linePositions[k]
      lineAttr.needsUpdate = true
      lineGeoRef.current.setDrawRange(0, lineIndex / 3)
    }
  })

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={2} sizeAttenuation transparent opacity={0.5}
          color="#c9a84c" blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#c9a84c" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  )
}

export default function ParticleField() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ pointerEvents: 'auto' }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles count={120} />
      </Canvas>
    </div>
  )
}
