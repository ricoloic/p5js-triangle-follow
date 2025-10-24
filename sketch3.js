
const size = 25;
const spacing = 25;

let overflowX, overflowY;

let cols, rows;
let colorMap = [];

let maxDistanceFromMouse;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    cols = floor(width / (size + spacing)) + 2;
    rows = floor(height / (size + spacing)) + 2;

    for (let col = 0; col < cols; col++) {
        colorMap[col] = [];
        for (let row = 0; row < rows; row++) {
            colorMap[col][row] = random(COLOR_PALETTES.happy);
        }
    }

    overflowX = width - cols * (size + spacing);
    overflowY = height - rows * (size + spacing);

    maxDistanceFromMouse = dist(0, 0, width * 0.3, height * 0.3);
}

function draw() {
    background(0);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const isOdd = row % 2 === 0;
            let x = col * (size + spacing) - (isOdd ? (size + spacing) / 2 : 0);
            let y = row * (size + spacing);

            const cX = mouseX - x;
            const cY = mouseY - y;
            const cA = atan2(cY, cX);

            const distanceFromMouse = dist(x, y, mouseX, mouseY);
            const amount = map(distanceFromMouse, 0, maxDistanceFromMouse, 1, 0);

            x += (-cos(cA)) * (amount * 100)
            y += (-sin(cA)) * (amount * 100)

            noStroke();
            const c = colorMap[col][row].rgba;
            fill(c.r, c.g, c.b, amount * (distanceFromMouse < 200 ? 255 : 200));
            push();
            translate(x, y);
            rotate(cA + HALF_PI);
            triangle(-size / 2, 0, 0, -size, size / 2, 0);
            pop();
        }
    }
}
