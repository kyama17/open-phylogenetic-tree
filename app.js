let dinos = [];
let selectedDino = null;
let lineFrom = null;

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container'); // Attach the canvas to the container

    // Create some sample dinos
    dinos.push(new Dino(100, 200, 'Organism A'));
    dinos.push(new Dino(300, 400, 'Organism B'));
    dinos.push(new Dino(500, 250, 'Organism C'));

    // Get references to the input field and button
    const organismNameInput = select('#organismName');
    const addOrganismButton = select('#addOrganismButton');

    // Add event listener to the button
    addOrganismButton.mousePressed(addOrganism);
}

function addOrganism() {
    const nameInput = select('#organismName');
    const name = nameInput.value().trim();
    const minNameLength = 2;
    const dinoRadius = Dino.radius; // Use static property from Dino class

    if (!name) {
        alert('生き物の名前を入力してください。');
        return;
    }

    if (name.length < minNameLength) {
        alert(`名前は${minNameLength}文字以上で入力してください。`);
        return;
    }

    if (dinos.some(dino => dino.name === name)) {
        alert('同じ名前の生き物が既に存在します。');
        return;
    }

    // Calculate position, ensuring it's within canvas bounds, considering the dino's radius
    // The initial random position is calculated to be somewhat centered.
    const centerAreaFactor = 0.3; // Try to place within the central 30% of canvas
    const centerX = width / 2;
    const centerY = height / 2;
    const rangeX = (width * centerAreaFactor) / 2;
    const rangeY = (height * centerAreaFactor) / 2;

    let x = random(centerX - rangeX, centerX + rangeX);
    let y = random(centerY - rangeY, centerY + rangeY);

    // Clamp values to be within canvas boundaries, accounting for radius
    x = constrain(x, dinoRadius, width - dinoRadius);
    y = constrain(y, dinoRadius, height - dinoRadius);


    const newDino = new Dino(x, y, name);
    dinos.push(newDino);
    nameInput.value(''); // Clear the input field only on success
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
        // Constrain the dino's position within the canvas boundaries
        const dinoRadius = selectedDino.radius;
        selectedDino.x = constrain(mouseX, dinoRadius, width - dinoRadius);
        selectedDino.y = constrain(mouseY, dinoRadius, height - dinoRadius);
    }
}

function mouseReleased() {
    selectedDino = null;
}

class Dino {
    static radius = 40;

    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.radius = Dino.radius; // Use static property
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
