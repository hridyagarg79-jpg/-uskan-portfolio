import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const Orb: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock, pointer }) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.12;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointer.x * 0.5, 0.04);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointer.y * 0.3, 0.04);
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 8]} />
                <MeshDistortMaterial
                    color="#C4B5FD"
                    roughness={0.2}
                    metalness={0.7}
                    distort={0.2}
                    speed={1.5}
                    transparent
                    opacity={0.25}
                />
            </mesh>
            <mesh scale={1.4}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#F0C6D4" transparent opacity={0.025} />
            </mesh>
        </Float>
    );
};

const GlassOrb: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.55 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} color="#C4B5FD" />
                <pointLight position={[-3, -3, 2]} intensity={0.3} color="#F0C6D4" />
                <Orb />
            </Canvas>
        </div>
    );
};

export default GlassOrb;
