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

    ctx.beginPath();

    // Draw the head
    ctx.arc(coordinates[0][0], coordinates[0][1], 25, 0, 2 * Math.PI);

    // Draw the neck and upper body
    ctx.moveTo(coordinates[0][0], coordinates[0][1] + 25);
    ctx.lineTo(coordinates[1][0], coordinates[1][1]);
    ctx.lineTo(coordinates[2][0], coordinates[2][1]);
    ctx.lineTo(coordinates[3][0], coordinates[3][1]);

    // Draw the right arm
    ctx.moveTo(coordinates[3][0], coordinates[3][1]);
    ctx.lineTo(coordinates[5][0], coordinates[5][1]);
    ctx.lineTo(coordinates[7][0], coordinates[7][1]);

    // Draw the right leg
    ctx.moveTo(coordinates[3][0], coordinates[3][1] + 25);
    ctx.lineTo(coordinates[9][0], coordinates[9][1]);
    ctx.lineTo(coordinates[11][0], coordinates[11][1]);
    ctx.lineTo(coordinates[13][0], coordinates[13][1]);

    // Draw the left leg
    ctx.moveTo(coordinates[2][0], coordinates[2][1] + 25);
    ctx.lineTo(coordinates[8][0], coordinates[8][1]);
    ctx.lineTo(coordinates[10][0], coordinates[10][1]);
    ctx.lineTo(coordinates[12][0], coordinates[12][1]);

    // Draw the left arm
    ctx.moveTo(coordinates[2][0], coordinates[2][1]);
    ctx.lineTo(coordinates[4][0], coordinates[4][1]);
    ctx.lineTo(coordinates[6][0], coordinates[6][1]);

    // Set the line style and draw the path
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }, [coordinates]);

  return (<canvas ref={canvasRef} width="200" height="400"></canvas>);
}
