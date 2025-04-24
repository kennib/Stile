import "./styles.css";

// Require the L-system library
import LSystem from "lindenmayer";

// First init the canvas to draw the Tree on.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Set up some variables
let segmentLength = 80;
let leafLength = 20;
let leafWidth = 6;
let linewidth = segmentLength / 6;

// Now initialize the L-System to generate the tree
// We use the syntax for creating stochastic productions, see: https://github.com/nylki/lindenmayer/blob/master/docs/index.md#stochastic
// If you'd rather use your own stochastic function in the productions,
// you can do that too, see how it is done in this example:  https://codepen.io/nylki/pen/XdOqPd

var tree = new LSystem({
  productions: {
    X: {
      successors: [
        { weight: 0.4, successor: "FF-[FX]++[FX]" },
        { weight: 0.3, successor: "F-L" },
      ],
    },
    F: {
      successors: [{ weight: 1.0, successor: "F" }],
    },
  },
  finals: {
    // Draw the trunk
    F: () => {
      ctx.lineWidth += (Math.random() - 0.5) / 100;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, segmentLength / (tree.iterations + 1));
      ctx.stroke();
      ctx.translate(0, segmentLength / (tree.iterations + 1) - 1.5);
    },
    // Draw a leaf
    L: () => {
      ctx.lineWidth += (Math.random() - 0.5) / 100;
      ctx.beginPath();
      ctx.ellipse(0, leafLength, leafWidth, leafLength, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.translate(0, segmentLength / (tree.iterations + 1) - 1.5);
    },
    // Go left
    "+": () => {
      ctx.rotate((Math.PI / 180) * 22.5);
    },
    // Go right
    "-": () => {
      ctx.rotate((Math.PI / 180) * -22.5);
    },
    // Start branch
    "[": () => {
      ctx.save();
      ctx.lineWidth *= 0.65;
      // Make strokes lighter in branches
      // to simulate depth
      ctx.globalAlpha *= Math.random() * (1.0 - 0.7) + 0.7;
      segmentLength -= 10;
    },
    // End branch
    "]": () => {
      ctx.restore();
      ctx.lineWidth *= 0.9;
      segmentLength += 10;
    },
  },
});

function draw() {
  // Set up the colour
  ctx.strokeStyle = "rgb(55, 29, 4)";
  ctx.fillStyle = "rgb(50, 200, 44)";

  // Freshly init the L-System
  tree.setAxiom("FFFF-[X]++[X]");
  // Run the 5 iterations of the L-System
  tree.iterate(6);

  // Finally draw
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Translate so that tree is (more or less) in the center
  ctx.translate(canvas.width / 2, canvas.height / 1.4);
  ctx.rotate(Math.PI);
  ctx.lineWidth = linewidth;
  tree.final();
}

draw();
