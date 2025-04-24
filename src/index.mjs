import "./styles.css";

// Require the L-system library
import LSystem from "lindenmayer";
import { plant, defaultStats } from "./plant"

const main = document.querySelector("main");
const statsDisplay = document.querySelector("aside")

// Create a series of plants
for (let x = 0; x<15; x++) {
    // Create a canvas
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    main.appendChild(canvas);

    // Create the plant
    const plantVariation = plant(canvas);
    plantVariation.draw();

    // Update the stats display on hover
    canvas.addEventListener("mouseover", () => {
        // display plant stats
        for (const stat in plantVariation.stats) {
            const output = statsDisplay.querySelector(`output[name=${stat}]`);
            console.log(`output[name=${stat}]`)
            output.value = plantVariation.stats[stat];
        }
        // display L-system code
        const output = statsDisplay.querySelector("output[name=code]");
        output.value = plantVariation.lsystem.getString();
    })
}


// Create the stats display
for (const stat in { ...defaultStats, "code": undefined }) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    label.innerText = stat;
    let output = document.createElement("output");
    output.name = stat;

    statsDisplay.querySelector('ul').appendChild(li);
    li.appendChild(label);
    li.appendChild(output);
}