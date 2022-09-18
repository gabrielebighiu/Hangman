// Variables below are used to draw inside the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;

// Draws the gallow when the page loads
function drawGallow() {
    ctx.fillRect(180, 280, 240, 3);
    ctx.fillRect(230, 40, 3, 240);
    ctx.fillRect(230, 40, 100, 3);
    ctx.fillRect(330, 40, 3, 40);
    // Line below will allow the rest of the hangmand to be drawn when the time comes
    ctx.beginPath();
}

function updateHangman(lives) {
    // Draws:
    if (lives == 5) {
        // Head
        ctx.arc(331, 100, 20, 0, Math.PI * 2, false);
    } else if (lives == 4) {
        // Body 
        ctx.moveTo(331, 120);
        ctx.lineTo(331, 210);
    } else if (lives == 3) {
        // Left Arm
        ctx.moveTo(331, 130);
        ctx.lineTo(300, 170);
    } else if (lives == 2) {
        // Right Arm
        ctx.moveTo(331, 130);
        ctx.lineTo(362, 170);
    } else if (lives == 1) {
        // Left Leg
        ctx.moveTo(331, 210);
        ctx.lineTo(300, 250);
    } else if (lives == 0) {
        // Right Leg
        ctx.moveTo(331, 210);
        ctx.lineTo(362, 250);
    }
    ctx.stroke();
}
