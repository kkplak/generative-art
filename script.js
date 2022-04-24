const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

const edge = 200;
let drawing = false;

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse.x);
})


class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedX = 0;
        this.speedY = 0;
    }
    draw(){
        this.speedX += (Math.random() - 8 /2);
        this.speedy += (Math.random() - 4 /2);
        this.x += this.speedX;
        this.y += this.speedY;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX  * distanceX + distanceY * distanceY);
        const radius = (-distance / edge + 1) * edge / 20;

        if (radius >0) {
         requestAnimationFrame(this.draw.bind(this));
         ctx.beginPath();
         ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.strokeStyle = 'black';
         ctx.stroke();
        }
    }
}


function branchOut(){

    if(drawing) {
    const centerX = mouse.x;
    const centerY = mouse.y;
    for( let i = 0; i < 3; i++) {
        const root = new Root(mouse.x, mouse.y, 'white', centerX, centerY);
        root.draw();
    }
    }
}
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.heigth = window.innerHeight;

});

window.addEventListener('mousemove', function(){
   // ctx.fillStyle = 'rgba(255,255,255,0.03)';
   //ctx.fillRect(0,0, canvas.width, canvas.heigth);
    branchOut();
})

window.addEventListener('mousedown', function(){
    drawing = true;
})

window.addEventListener('mouseup', function(){
    drawing = false;
})