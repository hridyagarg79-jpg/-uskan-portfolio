import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const ConnectSphere: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Create text positions around sphere
    const textPositions = useMemo(() => {
        const positions = [];
        const text = 'CONNECT · CONNECT · CONNECT · ';
        const charCount = text.length;
        for (let i = 0; i < charCount; i++) {
            const angle = (i / charCount) * Math.PI * 2;
            positions.push({
                char: text[i],
                angle,
                x: Math.cos(angle) * 1.15,
                z: Math.sin(angle) * 1.15,
            });
        }
        return positions;
    }, []);

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group>
                {/* Core sphere */}
                <mesh ref={meshRef}>
                    <sphereGeometry args={[0.9, 64, 64]} />
                    <meshStandardMaterial
                        color="#1a1a24"
                        roughness={0.15}
                        metalness={0.8}
                        envMapIntensity={1.5}
                    />
                </mesh>

                {/* Glass outer shell */}
                <mesh>
                    <sphereGeometry args={[0.95, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#C4B5FD"
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.9}
                        thickness={0.5}
                        transparent
                        opacity={0.15}
                    />
                </mesh>

                {/* Rotating text ring */}
                <group ref={groupRef}>
                    {textPositions.map((pos, i) => (
                        <Text
                            key={i}
                            position={[pos.x, 0, pos.z]}
                            rotation={[0, -pos.angle + Math.PI / 2, 0]}
                            fontSize={0.14}
                            color="#C4B5FD"
                            font="/fonts/Inter-Medium.woff"
                            anchorX="center"
                            anchorY="middle"
                            letterSpacing={0.1}
                        >
                            {pos.char}
                        </Text>
                    ))}
                </group>
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
                camera={{ position: [0, 0, 3.5], fov: 45 }}
                style={{ pointerEvents: 'none' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <pointLight position={[-3, -3, 2]} intensity={0.3} color="#C4B5FD" />
                <pointLight position={[3, 0, -2]} intensity={0.2} color="#F0C6D4" />
                <ConnectSphere />
            </Canvas>
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/20 group-hover:shadow-[0_0_40px_-10px_rgba(196,181,253,0.2)] transition-all duration-700 pointer-events-none" />
        </div>
    );
};

export default Connect3D;
