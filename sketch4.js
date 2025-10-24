let cols, rows;

const SIDE = 75;
const HALF_SIDE = SIDE / 2;
const SPACING = 20;
const HALF_SPACING = SPACING / 2;
const SIZE = SIDE + SPACING;
const HALF_SIZE = SIZE / 2;

const DISPLACEMENT = 150;

const COLOR_MAP = [];

let remaining;

let angles;

const MAX = 1000;
const ADDED_EDGES = 20;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    noStroke();

    cols = floor(width / SIZE);
    rows = floor(height / SIZE);

    for (let col = -ADDED_EDGES; col < cols + ADDED_EDGES; col++) {
        COLOR_MAP[col + ADDED_EDGES] = [];
        for (let row = -ADDED_EDGES; row < rows + ADDED_EDGES; row++) {
            COLOR_MAP[col + ADDED_EDGES][row + ADDED_EDGES] = random(COLOR_PALETTES.pastel).rgba;
        }
    }

    remaining = [
        (width - (cols * SIZE)) / 2,
        (height - (rows * SIZE)) / 2,
    ];

    angles = [
        -HALF_PI,
        -HALF_PI + (TWO_PI / 3),
        -HALF_PI + (TWO_PI / 3 * 2),
    ];
}

function tri(x, y, a, amount) {
    push();
    translate(x, y);
    rotate(a);
    triangle(
        cos(angles[0]) * HALF_SIDE * amount,
        sin(angles[0]) * HALF_SIDE * amount,
        cos(angles[1]) * HALF_SIDE * amount,
        sin(angles[1]) * HALF_SIDE * amount,
        cos(angles[2]) * HALF_SIDE * amount,
        sin(angles[2]) * HALF_SIDE * amount,
    );
    pop();
}

function draw() {
    background(0);

    for (let col = -ADDED_EDGES; col < cols + ADDED_EDGES; col++) {
        for (let row = -ADDED_EDGES; row < rows + ADDED_EDGES; row++) {
            const odd = row % 2 === 0;
            const bx = col * SIZE + remaining[0] + (odd ? HALF_SIZE : 0);
            const by = row * SIZE + remaining[1];

            const x = bx + HALF_SPACING;
            const y = by + HALF_SPACING;

            const cx = x + HALF_SIDE;
            const cy = y + HALF_SIDE;

            const dx = mouseX - cx;
            const dy = mouseY - cy;
            const da = atan2(dy, dx);

            const distance = dist(mouseX, mouseY, cx, cy);
            const amount = max(0, map(distance, 0, MAX, 1, 0));

            // fill(50, 220, 190);
            const rgb = COLOR_MAP[col + ADDED_EDGES][row + ADDED_EDGES];
            fill(rgb.r, rgb.g, rgb.b, 255 * (amount > 0.7 ? map(distance, 0, MAX * 2, 1, 0) : map(distance, 0, MAX * 4, 1, 0)));
            tri(
                cx + cos(da - PI) * DISPLACEMENT * amount,
                cy + sin(da - PI) * DISPLACEMENT * amount,
                da + HALF_PI,
                amount
            );
            // tri(cx, cy, da);
        }
    }
}
