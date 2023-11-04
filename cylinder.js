let illo;
let canLq;

export function CylinderTank(ll, cl, ol, rl, updatedLiquidValue, updateCriticalValue, updateOverflowValue, updateReorderValue) {
    ol.value = updateOverflowValue;
    ol.addEventListener("input", function () {
        const inputValue = parseInt(ol.value, 10);
        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 99) {
            updateOverflowValue = inputValue;
            updateLiquidLevel(updatedLiquidValue, updateCriticalValue, updateReorderValue, updateOverflowValue);
        }
    });

    rl.value = updateReorderValue;
    rl.addEventListener("input", function () {
        const inputValue = parseInt(rl.value, 10);
        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= updateOverflowValue) {
            updateReorderValue = inputValue;
            updateLiquidLevel(updatedLiquidValue, updateCriticalValue, updateReorderValue, updateOverflowValue);
        }
    });

    cl.value = updateCriticalValue;
    cl.addEventListener("input", function () {
        const inputValue = parseInt(cl.value, 10);
        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= updateOverflowValue) {
            updateCriticalValue = inputValue;
            updateLiquidLevel(updatedLiquidValue, updateCriticalValue, updateReorderValue, updateOverflowValue);
        }
    });

    ll.value = updatedLiquidValue;
    ll.addEventListener("input", function () {
        const inputValue = parseInt(ll.value, 10);
        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 99) {
            updatedLiquidValue = inputValue;
            updateLiquidLevel(updatedLiquidValue, updateCriticalValue, updateReorderValue, updateOverflowValue);
        }
    });

    // Zdog
    if (!illo) {
        illo = new Zdog.Illustration({
            element: '.zdog-canvas',
            dragRotate: true,
            zoom: 3
        });
    }

    let can = new Zdog.Cylinder({
        addTo: illo,
        diameter: 60,
        length: 100,
        stroke: false,
        rotate: { x: Zdog.TAU / 4 },
        color: 'rgba(0, 0, 0, 0.4)',
    });
    canLq = new Zdog.Cylinder({
        addTo: illo,
        diameter: 60,
        length: 0,
        translate: { z: 0 },
        rotate: { x: Zdog.TAU / 4 },
        stroke: false,
        color: 'rgba(255, 100, 0, 1)',
    });



    // Liquid Update Value
    const baseLevelTranslate = -50;
    function updateLiquidLevel(level, criticalValue, reorderValue, overflowValue) {
        if (canLq) {
            canLq.remove();
        }
        const maxLiquidHeight = (overflowValue / 100) * 100;
        const scaledLevel = (level / 100) * maxLiquidHeight;
        const scaledClevel = (criticalValue / 100) * maxLiquidHeight;
        const scaledRlevel = (reorderValue / 100) * maxLiquidHeight;

        const translation = baseLevelTranslate + (scaledLevel / 2);
        let liquidColor = 'rgba(0, 255, 100, 1)';

        if (scaledLevel <= scaledClevel) {
            liquidColor = 'rgba(255, 60, 0, 1)';
        } else if (scaledLevel >= scaledClevel && scaledLevel < scaledRlevel) {
            liquidColor = 'rgba(255, 140, 0, 1)';
        } else if (scaledLevel >= scaledRlevel) {
            liquidColor = 'rgba(0, 255, 60, 1)';
        }
        canLq = new Zdog.Cylinder({
            addTo: can,
            diameter: 60,
            length: scaledLevel,
            translate: { z: translation },
            rotate: { x: Zdog.TAU / 2 },
            stroke: false,
            color: liquidColor,
        });
        canLq.updateGraph();
    }
    // Animate Function
    function animate() {
        illo.rotate.y += 0.002;
        illo.updateRenderGraph();
        requestAnimationFrame(animate);
    }
    animate();
}