import { Canvas, useFrame } from '@react-three/fiber';
import GameCartridge from './GameCart/GameCartridge';
import { OrbitControls } from '@react-three/drei';
export default function CartridgeSystem({ games = [] }) {
    return (
        <Canvas className="w-full" camera={{ position: [0, 0, 10]}} > 
            <ambientLight />
            <pointLight position={[20, 10, 5]} />
            {games.map((game, index) => {
                // const details = <SanityBlockContent blocks={game.details} />;
                return (
                    <GameCartridge key={index} position={[(index * 3) - 6, 0, 1]} imageUrl={game.thumbnail}  />
                );
            })}

        </Canvas>
    )
}

