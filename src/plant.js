// Require the L-system library
import LSystem from "lindenmayer";

const defaultStats = {
    waterConsumption: 0,
    waterCapacity: 0,
    foodConsumption: 0,
    foodCapacity: 0,
    windResistance: 0,
};

const plant = (canvas) => {
    // Get the canvas context
    let ctx = canvas.getContext("2d");

    // Set up some variables
    let segmentLength = 80;
    let leafLength = 20;
    let leafWidth = 6;
    let linewidth = segmentLength / 6;
    const stats = { ...defaultStats };

    // Now initialize the L-System to generate the plant
    // see: https://github.com/nylki/lindenmayer/blob/master/docs/index.md#stochastic

    const lsystem = new LSystem({
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
                ctx.lineTo(0, segmentLength / (lsystem.iterations + 1));
                ctx.stroke();
                ctx.translate(0, segmentLength / (lsystem.iterations + 1) - 1.5);

                stats.windResistance += 4 - lsystem.iterations;
                stats.foodConsumption += 1;
                stats.waterCapacity += 1;
            },
            // Draw a leaf
            L: () => {
                ctx.lineWidth += (Math.random() - 0.5) / 100;
                ctx.beginPath();
                ctx.ellipse(0, leafLength, leafWidth, leafLength, 0, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.translate(0, segmentLength / (lsystem.iterations + 1) - 1.5);

                stats.waterConsumption += 1;
                stats.foodCapacity += 1;
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

    const draw = () => {
        // Set up the colour
        ctx.strokeStyle = "rgb(55, 29, 4)";
        ctx.fillStyle = "rgb(50, 200, 44)";

        // Init and iterate the L-System
        lsystem.setAxiom("FFFF-[X]++[X]");
        lsystem.iterate(6);

        // Finally draw
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Translate so that plant is (more or less) in the center
        ctx.translate(canvas.width / 2, canvas.height / 1.4);
        ctx.rotate(Math.PI);
        ctx.lineWidth = linewidth;
        lsystem.final();
    }

    return {lsystem, stats, draw};
};

export { plant, defaultStats };