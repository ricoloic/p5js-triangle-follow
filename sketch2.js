const size = 150;

let x1, y1;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    pixelDensity(1);
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    x1 = floor(random(-width / 2, width / 2));
    y1 = floor(random(-height / 2, height / 2));
}

function draw() {
    background(0);

    translate(width / 2, height / 2);

    strokeWeight(10);

    const a1 = atan2(y1, x1);
    const d1 = dist(0, 0, x1, y1);
    stroke(190, 116, 170);
    line(0, 0, cos(a1) * d1, sin(a1) * d1);

    const x2 = mouseX - width / 2;
    const y2 = mouseY - height / 2;
    const a2 = atan2(y2, x2);
    const d2 = dist(0, 0, x2, y2);
    stroke(110, 116, 170);
    line(0, 0, cos(a2) * d2, sin(a2) * d2);

    const x3 = x2 - x1;
    const y3 = y2 - y1;
    const a3 = atan2(y3, x3);
    const d3 = dist(x1, y1, x2, y2);
    stroke(110, 210, 140);
    line(x1, y1, x1 + cos(a3) * d3, y1 + sin(a3) * d3);
    line(0, 0, cos(a3) * d3, sin(a3) * d3);

    stroke(255);
    point(x1, y1);
    point(x2, y2, 50);

    renderPosition(0, 0);
    renderPosition(x1, y1);
    renderPosition(x2, y2);
    renderPosition(x3, y3);
}

function renderPosition(x, y) {
    noStroke();
    fill(255);
    console.log(x - 100, y - 50, x + 100, y + 50)
    rectMode(CENTER)
    rect(x, y - 3, 80, 20, 15);
    fill(0);
    textAlign(CENTER);
    text(`(${floor(x)}, ${floor(y)})`, x, y);
}
