import "./styles.css";

// Require the L-system library
import LSystem from "lindenmayer";
import plant from "./plant"

const main = document.querySelector("main");

// Create a series of plants
for (let x = 0; x<10; x++) {
  // Create a canvas
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  main.appendChild(canvas);

  // Create the plant
  const plantVariation = plant(canvas);
  plantVariation.draw();
}