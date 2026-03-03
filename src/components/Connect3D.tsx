import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const RotatingRing: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <torusGeometry args={[1.1, 0.015, 16, 100]} />
                <meshStandardMaterial color="#C4B5FD" emissive="#C4B5FD" emissiveIntensity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 6, 0, 0]}>
                <torusGeometry args={[1.15, 0.01, 16, 100]} />
                <meshStandardMaterial color="#F0C6D4" emissive="#F0C6D4" emissiveIntensity={0.2} transparent opacity={0.6} />
            </mesh>
        </group>
    );
};

const Sphere: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
            <group>
                {/* Core sphere */}
                <mesh ref={meshRef}>
                    <sphereGeometry args={[0.85, 64, 64]} />
                    <meshStandardMaterial
                        color="#1a1a24"
                        roughness={0.15}
                        metalness={0.9}
                    />
                </mesh>

                {/* Glass outer shell */}
                <mesh>
                    <sphereGeometry args={[0.9, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#C4B5FD"
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.85}
                        thickness={0.5}
                        transparent
                        opacity={0.12}
                    />
                </mesh>

                {/* Rotating rings */}
                <RotatingRing />

                {/* HTML label */}
                <Html center distanceFactor={4} style={{ pointerEvents: 'none' }}>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-accent/80 whitespace-nowrap select-none">
                        CONNECT
                    </div>
                </Html>
            </group>
        </Float>
    );
};

const Connect3D: React.FC = () => {
    const handleClick = () => {
        const footer = document.querySelector('#contact');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            className="w-40 h-40 md:w-48 md:h-48 cursor-none relative group"
            onClick={handleClick}
            data-cursor-text="Click"
        >
            <Canvas
                camera={{ position: [0, 0, 3.2], fov: 45 }}
                style={{ pointerEvents: 'none' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.7} />
                <pointLight position={[-3, -3, 2]} intensity={0.3} color="#C4B5FD" />
                <pointLight position={[3, 0, -2]} intensity={0.2} color="#F0C6D4" />
                <Sphere />
            </Canvas>
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/20 group-hover:shadow-[0_0_40px_-10px_rgba(196,181,253,0.2)] transition-all duration-700 pointer-events-none" />
        </div>
    );
};

export default Connect3D;
