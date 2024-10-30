// AvatarMini.tsx
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { AnimationMixer } from 'three';

const Avatar3D: React.FC<{ playAnimation: boolean }> = ({ playAnimation }) => {
  const gltf = useLoader(GLTFLoader, '/scene.gltf'); // Cambia por el nombre de tu archivo
  const mixer = useRef<AnimationMixer | null>(null);
  const [action, setAction] = useState<any>(null);

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new AnimationMixer(gltf.scene);
      const clips = gltf.animations.map(clip => mixer.current?.clipAction(clip));
      setAction(clips[0]); // Guardar la primera acción de animación
    }
  }, [gltf]);

  // Actualiza el mixer si playAnimation cambia
  useEffect(() => {
    if (action) {
      if (playAnimation) {
        action.play(); // Reproducir animación
      } else {
        action.stop(); // Detener animación
      }
    }
  }, [playAnimation, action]);

  // Actualiza la animación en cada frame
  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={7} />;
};

interface AvatarMiniProps {
  className?: string; // Añadir className como prop opcional
}

const AvatarMini: React.FC<AvatarMiniProps> = ({ className }) => {
  const [playAnimation, setPlayAnimation] = useState(false);

  const handlePlayAnimation = () => {
    setPlayAnimation((prev) => !prev); // Cambia el estado para reproducir/parar la animación
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Suspense fallback={<div>Cargando avatar...</div>}>
        <Canvas style={{ display: 'block', height: '100%', width: '100%' }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Avatar3D playAnimation={playAnimation} />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </Suspense>
      <button 
        onClick={handlePlayAnimation} 
        style={{ 
          position: 'absolute', 
          bottom: '10px', // Ajustar la posición del botón
          left: '50%', 
          transform: 'translateX(-50%)', 
          padding: '10px', 
          background: 'blue', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px' 
        }}
      >
        {playAnimation ? 'Detener Animación' : 'Reproducir Animación'}
      </button>
    </div>
  );
};

export default AvatarMini;
