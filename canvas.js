const randColor = () => {
    let color = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
        a: 1 - Math.abs(Math.random() * 0.5)
    };
    if (color.r == 0 && color.g == 0 && color.b == 0) {
        color = {
            r: 1,
            g: 1,
            b: 1,
            a: 1
        };
    }
    return 'rgba(' + color.r * 255 + ',' + color.g * 255 + ',' + color.b * 255 + ',' + color.a + ')';
};
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
const Particle = function (x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * (Math.PI * 2);
    this.distance = (Math.random() * 50) + 70;
    this.speed = 0.05;
    this.prevMouse = {
        x: x,
        y: y
    };
    this.draw = () => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(this.prevPosition.x, this.prevPosition.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    };
    this.magic = () => {
        this.prevPosition = {
            x: this.x,
            y: this.y
        };
        this.prevMouse.x += (mouse.x - this.prevMouse.x) * 0.05;
        this.prevMouse.y += (mouse.y - this.prevMouse.y) * 0.05;
        this.radians += this.speed;
        this.x = this.prevMouse.x + Math.cos(this.radians) * this.distance;
        this.y = this.prevMouse.y + Math.sin(this.radians) * this.distance;
        this.draw();
    };
};
const particles = [];
for (let i = 0; i < 200; i++) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    const radius = (Math.random() * 3) + 2;
    const color = randColor();
    const particle = new Particle(x, y, radius, color);
    particles.push(particle);
}
console.log(particles);
const animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.05)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    particles.forEach(particle => {
        particle.magic();
    });
};
animate();
