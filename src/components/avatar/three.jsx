import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const jointCoordinates = [
  [100, 50], // Head
  [100, 100], // Neck
  [50, 150], // Left shoulder
  [150, 150], // Right shoulder
  [25, 250], // Left elbow
  [175, 250], // Right elbow
  [25, 350], // Left wrist
  [175, 350], // Right wrist
  [50, 450], // Left hip
  [150, 450], // Right hip
  [50, 600], // Left knee
  [150, 600], // Right knee
  [50, 750], // Left ankle
  [150, 750], // Right ankle
];

export default function Three() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 400;

    const scene = new THREE.Scene();

    // Create the body outline
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const geometry = new THREE.BufferGeometry().setFromPoints(
      jointCoordinates.map((coord) => new THREE.Vector3(coord[0], coord[1], 0))
    );
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Add a light to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Animate the scene
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <h1>Three.js</h1>
      <canvas ref={canvasRef} />
    </>
  );
}
