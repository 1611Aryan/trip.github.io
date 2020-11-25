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
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
const Particle = function (x, y, radius, color, distance, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = 0;
    this.distance = distance;
    this.speed = speed;
    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
    this.magic = () => {
        this.radians += this.speed;
        this.x = x + Math.cos(this.radians) * this.distance;
        this.y = y + Math.sin(this.radians) * this.distance;
        this.draw();
    };
};
const particles = [];
for (let i = 0; i < 1000; i++) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    const radius = 5;
    const color = randColor();
    const distance = (Math.random() * 10) * 40;
    const speed = (Math.random() - 0.5) / 2;
    const particle = new Particle(x, y, radius, color, distance, speed / 10);
    particles.push(particle);
}
console.log(particles);
const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach(particle => {
        particle.magic();
    });
};
animate();
