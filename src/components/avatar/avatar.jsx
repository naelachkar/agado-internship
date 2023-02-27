import { useEffect, useRef } from "react";
import bodyImage from "../assets/body.png"

export default function Avatar() {
  const coordinates = [
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

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load the image of the body
    const img = new Image();
    img.src = bodyImage;

    // Draw the image onto the canvas when it has finished loading
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Draw the joints onto the canvas using the coordinates
    ctx.fillStyle = "red"; // Set the color of the joints
    coordinates.forEach(([x, y]) => {
      ctx.fillRect(x, y, 10, 10); // Draw a small square at each joint
    });
  }, [coordinates]);

  return <canvas ref={canvasRef} width="200" height="400"></canvas>;
}
