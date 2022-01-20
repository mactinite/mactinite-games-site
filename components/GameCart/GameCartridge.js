import { useRef, useState, Suspense, useEffect } from "react";
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useTexture, useFBX, useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useGesture } from "react-use-gesture";
import * as THREE from 'three';
import { MeshStandardMaterial, Vector2 } from "three";
export default function GameCartridge({ position, imageUrl = "https://picsum.photos/350/350.jpg" }) {

    return (

        <Suspense fallback={null}>
            <Cart position={position} imageUrl={imageUrl} />
        </Suspense>
    )
}


const Cart = ({ position, imageUrl }) => {
    // This reference gives us direct access to the THREE.Mesh object
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    const ref = useRef();
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    let fbx = useFBX("GameSystem/GameboyCartridge.fbx").clone();
    const [spring, api] = useSpring(() => ({ scale: [1, 1, 1], position: position, rotation: [0,0,0], config: { friction: 10 } }))

    console.log(fbx);
    const bind = useGesture({
        onDrag: ({ offset: [x, y], delta: [dX, dY] }) => api.start({ position: [position[0] + (x / aspect), position[1] + (-y / aspect), position[2]], rotation: [dY * 0.1,-dX * 0.1, 0] }),
        onHover: ({ hovering }) => api.start({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
    });

    return (
        <a.group
            ref={ref}
            {...spring}
            {...bind()}
        >
            <mesh
                {...fbx.children[2]}
            >
                <meshStandardMaterial map={texture} />
            </mesh>
            <mesh
                {...fbx.children[0]}
            >
            </mesh>
            <mesh
                {...fbx.children[1]}
            >
            </mesh>
        </a.group>
    )
}