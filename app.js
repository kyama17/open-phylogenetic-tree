let dinos = [];
let selectedDino = null;
let lineFrom = null;

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container'); // Attach the canvas to the container

    // Create some sample dinos
    dinos.push(new Dino(100, 200, 'T-Rex'));
    dinos.push(new Dino(300, 400, 'Stegosaurus'));
    dinos.push(new Dino(500, 250, 'Triceratops'));
}

function draw() {
    background(240, 248, 255);

    // Draw lines
    for (let i = 0; i < dinos.length; i++) {
        for (let j = i + 1; j < dinos.length; j++) {
            if (dinos[i].isConnected(dinos[j])) {
                stroke(0);
                strokeWeight(2);
                line(dinos[i].x, dinos[i].y, dinos[j].x, dinos[j].y);
            }
        }
    }

    // Draw dinos
    for (let d of dinos) {
        d.show();
    }
}

function mousePressed() {
    for (let d of dinos) {
        if (d.isMouseOver()) {
            if (keyIsPressed === SHIFT) {
                if (lineFrom) {
                    lineFrom.connect(d);
                    lineFrom = null;
                } else {
                    lineFrom = d;
                }
            } else {
                selectedDino = d;
            }
            return;
        }
    }
    lineFrom = null;
}

function mouseDragged() {
    if (selectedDino) {
        selectedDino.x = mouseX;
        selectedDino.y = mouseY;
    }
}

function mouseReleased() {
    selectedDino = null;
}

class Dino {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.radius = 40;
        this.connections = [];
    }

    show() {
        stroke(0);
        strokeWeight(2);
        if (this === selectedDino || this === lineFrom) {
            fill(255, 150, 0);
        } else {
            fill(255, 204, 0);
        }
        ellipse(this.x, this.y, this.radius * 2);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
    }

    isMouseOver() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < this.radius;
    }

    connect(otherDino) {
        this.connections.push(otherDino);
        otherDino.connections.push(this);
    }

    isConnected(otherDino) {
        return this.connections.includes(otherDino);
    }
}
