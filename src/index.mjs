import "./styles.css";

// Require the L-system library
import LSystem from "lindenmayer";

// Require the plant L-system
import plant from "plant"

// First init the canvas to draw the plants on
let canvas = document.getElementById("canvas");
let plant = plant(canvas);