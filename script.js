document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quoteForm');
    const squareFootageInput = document.getElementById('square-footage');
    const numRoomsInput = document.getElementById('num-rooms');
    const paintTypeInput = document.getElementById('paint-type');
    const estimatedCostDisplay = document.getElementById('estimatedCost');

    // Base costs and multipliers (can be adjusted)
    const BASE_JOB_COST = 150; // Covers initial setup, basic overhead
    const COST_PER_SQ_FT_STANDARD = 0.75;
    const COST_PER_ROOM_STANDARD = 50;
    const PAINT_TYPE_MULTIPLIER = {
        'standard': 1.0,
        'premium': 1.2,
        'specialty': 1.5
    };
    const WORKER_HOURLY_RATE_AVG = 17.5; // Average of $15-$20
    const WORKER_HOURS_PER_100_SQ_FT = 0.5; // Rough estimate of worker hours needed per 100 sq ft

    function calculateRoughEstimate() {
        const squareFootage = parseFloat(squareFootageInput.value) || 0;
        const numRooms = parseFloat(numRoomsInput.value) || 0;
        const paintType = paintTypeInput.value;

        let materialAndBaseCost = BASE_JOB_COST;

        // Cost based on square footage
        materialAndBaseCost += squareFootage * COST_PER_SQ_FT_STANDARD;

        // Cost based on number of rooms
        materialAndBaseCost += numRooms * COST_PER_ROOM_STANDARD;

        // Adjust for paint type
        materialAndBaseCost *= PAINT_TYPE_MULTIPLIER[paintType];

        // Factor in worker costs (very rough, assuming 1-2 workers)
        // This is a simplified model. A real estimate would be more complex.
        const estimatedWorkerHours = (squareFootage / 100) * WORKER_HOURS_PER_100_SQ_FT;
        const workerCost = estimatedWorkerHours * WORKER_HOURLY_RATE_AVG * 1.5; // Assuming 1.5 workers on average

        let totalEstimate = materialAndBaseCost + workerCost;

        // Ensure it stays within the desired range ($250 - $600) if possible, or adjust logic
        // For now, just display the calculated value.
        // If the user wants to enforce the range, we'd need to cap it.

        estimatedCostDisplay.textContent = `$${totalEstimate.toFixed(2)}`;
    }

    // Recalculate on input change
    squareFootageInput.addEventListener('input', calculateRoughEstimate);
    numRoomsInput.addEventListener('input', calculateRoughEstimate);
    paintTypeInput.addEventListener('change', calculateRoughEstimate);

    // Initial calculation
    calculateRoughEstimate();

    // Handle form submission (Formspree will take over)
    quoteForm.addEventListener('submit', (event) => {
        // Formspree handles the actual submission.
        // We just ensure the estimate is calculated before submission.
        calculateRoughEstimate();
    });
});
