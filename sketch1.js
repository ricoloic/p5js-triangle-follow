var config = {
    scale: 150,
    spacing: 30,
    lag: 15,
    colorRadiusPercent: 0.7,
    effectRadius: 100_000 * 10,
    palette: 'happy',
};

const size = config.scale - config.spacing;
let rows, cols, displacementX, displacementY, maxDistanceFromMouse;

let xOff = 0;
let yOff = 1000;
let zOff = 344;

const positions = [];
const colorMap = [];

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    pixelDensity(1);
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    cols = floor(width / config.scale);
    rows = floor(height / config.scale);

    for (let x = 0; x < cols; x++) {
        colorMap[x] = [];
        for (let y = 0; y < rows; y++) {
            colorMap[x][y] = random(COLOR_PALETTES[config.palette]);
        }
    }

    displacementX = width - cols * config.scale;
    displacementY = height - rows * config.scale;

    // maxDistanceFromMouse = sqrt(width / 2 * width / 2 + height / 2 * height / 2);
    maxDistanceFromMouse = sqrt(config.effectRadius);
}

function draw() {
    background(0);

    positions.push([mouseX, mouseY]);
    // positions.push([
    //     noise(xOff, zOff) * width,

    //     noise(yOff, zOff) * height
    // ]);
    if (positions.length > config.lag) {
        positions.shift();
    }

    let avgX = 0;
    let avgY = 0;
    for (let i = 0; i < positions.length; i++) {
        avgX += positions[i][0];
        avgY += positions[i][1];
    }
    avgX /= positions.length;
    avgY /= positions.length;

    // stroke('red');
    // noFill();
    // strokeWeight(3);
    // rect(displacementX / 2, displacementY / 2, cols * config.scale, rows * config.scale);

    fill('white');
    noStroke();
    for (let row = 1; row <= rows; row++) {
        const isOdd = row % 2 !== 0;
        const colsCount = isOdd ? cols : cols - 1;
        for (let col = 1; col <= colsCount; col++) {
            const x = ((displacementX / 2) + col * config.scale - config.spacing / 2 - size / 2) + (row % 2 === 0 ? config.scale / 2 : 0);
            const y = ((displacementY / 2) + row * config.scale - config.spacing / 2 - size / 2);
            const dX = x - avgX;
            const dY = y - avgY;
            const distanceFromMouse = sqrt(dX * dX + dY * dY);
            const amt = map(distanceFromMouse, 0, maxDistanceFromMouse, 1, 0);
            const interpolatedSize = lerp(size * 0, size * 0.55, amt);
            const ang = atan2(-dX, dY);
            const collor = colorMap[col - 1][row - 1].rgba;
            if (amt > config.colorRadiusPercent) {
                fill(
                    collor.r * amt,
                    collor.g * amt,
                    collor.b * amt,
                    amt * 255
                );
            } else {
                fill(
                    collor.r * amt + 255 * (1 - amt),
                    collor.g * amt + 255 * (1 - amt),
                    collor.b * amt + 255 * (1 - amt),
                    amt * 100
                );
            }
            push();
            const pos = createVector(x, y);
            const mouseV = createVector(avgX, avgY);
            pos.add(p5.Vector.sub(pos, mouseV).setMag(size * 2));
            translate(pos.x, pos.y);
            rotate(ang);
            triangle(-interpolatedSize, interpolatedSize, 0, -interpolatedSize, interpolatedSize, interpolatedSize);
            pop();
            //ellipse(x, y, interpolatedSize);
        }
    }

    zOff += 0.025;
}
