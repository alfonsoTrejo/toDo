import React, { Suspense, useRef, useState, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { AnimationMixer } from 'three';

const Avatar3D = React.memo(({ playAnimation }) => {
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const mixer = useRef<AnimationMixer | null>(null);
  const [action, setAction] = useState<any>(null);

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new AnimationMixer(gltf.scene);
      const clips = gltf.animations.map(clip => mixer.current?.clipAction(clip));
      setAction(clips[0]);
    }
  }, [gltf]);

  useEffect(() => {
    if (action) {
      if (playAnimation) {
        action.play();
      } else {
        action.stop();
      }
    }
  }, [playAnimation, action]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={7} />;
});

interface AvatarMiniProps {
  className?: string;
  isAnimating?: boolean;
  isLoading?: boolean;
}

const AvatarMini = forwardRef<any, AvatarMiniProps>(({ className, isAnimating: externalIsAnimating, isLoading }, ref) => {
  const [internalIsAnimating, setInternalIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      setInternalIsAnimating(true);
      audioRef.current?.play();
    },
    stopAnimation: () => {
      setInternalIsAnimating(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    },
  }));

  const isAnimating = externalIsAnimating || internalIsAnimating;

  useEffect(() => {
    if (!isAnimating && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isAnimating]);

  const toggleAnimation = () => {
    if (!isLoading) {
      setInternalIsAnimating(prev => !prev);
      if (!internalIsAnimating && audioRef.current) {
        audioRef.current.play();
      } else if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const buttonStyle = useMemo(() => ({
    position: 'absolute' as const,
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px',
    background: isLoading ? 'gray' : 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: isLoading ? 'not-allowed' : 'pointer'
  }), [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <Canvas style={{ display: 'block', height: '100%', width: '100%' }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Avatar3D playAnimation={isAnimating} />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </Suspense>
      <button 
        onClick={toggleAnimation}
        disabled={isLoading}
        style={buttonStyle}
      >
        {isAnimating ? 'Detener Animación' : 'Reproducir Animación'}
      </button>
      <audio ref={audioRef} loop>
        <source src="/rolon1.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
});

AvatarMini.displayName = 'AvatarMini';

export default AvatarMini;