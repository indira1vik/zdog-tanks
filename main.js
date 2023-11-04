let updatedLiquidValue = 6;
let updateCriticalValue = 20;
let updateReorderValue = 55;
let updateOverflowValue = 80;

const ll = document.getElementById("ll");
const cl = document.getElementById("cl");
const rl = document.getElementById("rl");
const ol = document.getElementById("ol");

const selectElement = document.getElementById("tt");

selectElement.addEventListener("change", function () {
    const selectedValue = selectElement.value;

    // Use a switch statement to handle different cases
    switch (selectedValue) {
        case "cuboid":
            // Handle Cuboid case
            console.log("Selected Cuboid");
            CuboidTank(ll, cl, ol, rl, updatedLiquidValue, updateCriticalValue, updateOverflowValue, updateReorderValue);
            break;
        case "cube":
            // Handle Cube case
            console.log("Selected Cube");
            break;
        case "cylinder":
            // Handle Cylinder case
            console.log("Selected Cylinder");
            CylinderTank(ll, cl, ol, rl, updatedLiquidValue, updateCriticalValue, updateOverflowValue, updateReorderValue);
            break;
        case "sphere":
            // Handle Sphere case
            console.log("Selected Sphere");
            break;
        default:
            // Handle the default case (e.g., "Select Tank" option)
            console.log("Please select a valid option");
            break;
    }
});

import { CuboidTank } from './cuboid.js';
import { CylinderTank } from './cylinder.js';

