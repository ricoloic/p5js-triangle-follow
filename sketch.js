const SIDE = 40;
const HALF_SIDE = SIDE / 2;
const SPACING = 10;
const HALF_SPACING = SPACING / 2;
const SIZE = SIDE + SPACING;
const HALF_SIZE = SIZE / 2;
const ADDED = 1;
const MOVE_AMOUNT = 200;
const MAX_RADIUS = 1_000;

let cols, rows;

let remaining;

let angles = [];
const MAP = [];

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    pixelDensity(1);
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    noStroke();

    cols = floor(width / SIZE);
    rows = floor(height / SIZE);

    for (let col = -ADDED; col < cols + ADDED; col++) {
        MAP[col + ADDED] = [];
        for (let row = -ADDED; row < rows + ADDED; row++) {
            MAP[col + ADDED][row + ADDED] = random(COLOR_PALETTES.neon);
        }
    }

    remaining = {
        x: (width - (cols * SIZE)) / 2,
        y: (height - (rows * SIZE)) / 2,
    };

    angles[0] = 0 + TWO_PI / 3 * 0;
    angles[1] = 0 + TWO_PI / 3 * 1;
    angles[2] = 0 + TWO_PI / 3 * 2;
}

function draw() {
    background(0);

    for (let col = -ADDED; col < cols + ADDED; col++) {
        for (let row = -ADDED; row < rows + ADDED; row++) {
            const even = row % 2 === 0;
            const bx = col * SIZE + remaining.x + (even ? HALF_SIZE : 0);
            const by = row * SIZE + remaining.y;

            const x = bx + HALF_SPACING;
            const y = by + HALF_SPACING;

            const cx = x + HALF_SIDE;
            const cy = y + HALF_SIDE;

            const dx = mouseX - cx;
            const dy = mouseY - cy;

            const ra = atan2(dy, dx);

            const d = dist(cx, cy, mouseX, mouseY);
            const rd = map(d, 0, MAX_RADIUS, 1, 0);

            if (rd < 0) continue;

            const ma = ra + PI;

            const ox = cos(ma) * MOVE_AMOUNT * rd;
            const oy = sin(ma) * MOVE_AMOUNT * rd;

            const c = MAP[col + ADDED][row + ADDED].rgba;

            fill(c.r, c.g, c.b, 255 * rd);
            tri(cx + ox, cy + oy, ra, rd);
        }
    }
}

function tri(x, y, a, m) {
    const side = m * HALF_SIDE;
    push();
    translate(x, y);
    rotate(a);
    triangle(
        cos(angles[0]) * side,
        sin(angles[0]) * side,
        cos(angles[1]) * side,
        sin(angles[1]) * side,
        cos(angles[2]) * side,
        sin(angles[2]) * side,
    );
    pop();
}
