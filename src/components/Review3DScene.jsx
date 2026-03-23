import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { mockReviews } from '../data/reviews';
import ReviewCard from './ReviewCard';
import FullReviewModal from './FullReviewModal';

function ReviewSphere({ reviews, setHovered, onCardClick }) {
  const radius = 8;
  
  // Create an invisible sphere for occlusion so back cards are hidden
  const sphereRef = useRef();

  // Calculate positions and rotations for spherical distribution
  const elements = useMemo(() => {
    const count = reviews.length;
    const items = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const position = new THREE.Vector3(x * radius, y * radius, z * radius);
      
      const dummy = new THREE.Object3D();
      dummy.position.copy(position);
      // Look away from center
      dummy.lookAt(position.clone().multiplyScalar(2));
      
      items.push({
        position,
        rotation: dummy.rotation.clone()
      });
    }
    return items;
  }, [reviews, radius]);

  return (
    <group>
      {/* Central occlusion sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[radius - 0.5, 32, 32]} />
        <meshBasicMaterial color="#0f0f1a" transparent opacity={0.6} />
      </mesh>

      {reviews.map((review, i) => {
        const { position, rotation } = elements[i];

        return (
          <group 
            key={review.id} 
            position={position}
            rotation={rotation}
          >
            <Html
              transform
              occlude={[sphereRef]}
              pointerEvents="none" /* Let the inner div handle pointer events */
              zIndexRange={[100, 0]}
            >
              <div 
                style={{
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto',
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                <div 
                  className="card-wrapper" 
                  style={{
                    opacity: 1, /* We can add opacity fade here if we wanted based on distance */
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ReviewCard 
                    review={review} 
                    onClick={() => onCardClick(review)} 
                  />
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function Review3DScene() {
  const [hovered, setHovered] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          cursor: hovered ? 'pointer' : 'grab',
          touchAction: 'none'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Subtle background stars to add depth to our "floating universe" */}
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <ReviewSphere 
          reviews={mockReviews} 
          setHovered={setHovered}
          onCardClick={setSelectedReview}
        />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={!hovered && !selectedReview}
          autoRotateSpeed={1.0}
          rotateSpeed={0.8}
          dampingFactor={0.05}
          makeDefault
        />
      </Canvas>
      
      {selectedReview && (
        <FullReviewModal 
          review={selectedReview} 
          onClose={() => setSelectedReview(null)} 
        />
      )}
    </>
  );
}
