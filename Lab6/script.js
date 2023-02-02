let canvas = document.querySelector('#canvas');
let context = canvas.getContext("2d");
const counter=document.querySelector('#no');

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

canvas.width = windowWidth * 0.2;
canvas.height = windowHeight * 0.2;

canvas.style.background = "#ff8";

class Circle {
    constructor(xpos, ypos, rad, color, speed) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.rad = rad;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;

    }

    draw(context) {
        context.beginPath();
        context.arc(this.xpos, this.ypos, this.rad, 0, Math.PI * 2, false);
        context.fillStyle='green';
        context.fill();
        context.closePath();
    }

    update() {

        this.draw(context);
        if ((this.xpos + this.rad) > canvas.width) {
            this.dx = -this.dx;
        }
        if ((this.xpos - this.rad) < 0) {
            this.dx = -this.dx;
        }
        if ((this.ypos + this.rad) > canvas.height) {
            this.dy = -this.dy;
        }
        if ((this.ypos - this.rad) < 0) {
            this.dy = -this.dy;
        }
        this.xpos += this.dx;
        this.ypos += this.dy;
    }


}

const getDistance = (circle1, circle2) => {
    return Math.sqrt(Math.pow(circle2.xpos - circle1.xpos, 2) + Math.pow(circle2.ypos - circle1.ypos, 2));
}

const randomX = (rad) => Math.random() * (canvas.width - (2 * rad) - 2) + rad + 1;
const randomY = (rad) => Math.random() * (canvas.height - (2 * rad) - 2) + rad + 1;
const randomSpeed= ()=> Math.random() *4 -2;

const changeWindowSize = () => {
    const width = document.querySelector('#width').value;
    const height = document.querySelector('#height').value;
    canvas.width = windowWidth * width / 100;
    canvas.height = windowHeight * height / 100;
}

let circles = [];
counter.innerHTML=circles.length.toString();

const reset=()=>{
    circles=[];
    counter.innerHTML=circles.length.toString();
}

const start=()=>{
    if (circles.length===0){
        addNewBall();
    }
}

let updateCircle = () => {
    requestAnimationFrame(updateCircle);
    context.clearRect(0, 0, windowWidth, windowHeight)
    circles.forEach(circle => circle.update());
    mapCircles();
    document.querySelector('#fps').innerHTML=checkFps();
}

const addNewBall=()=>{
    const rad=Math.random()* 20;
    const circle=new Circle(randomX(rad), randomY(rad), rad, "red", randomSpeed());
    circle.draw(context);
    circles.push(circle);
    counter.innerHTML=circles.length.toString();
}

const mapCircles=()=>{
    circles.forEach(x=>{
        circles.forEach(y=>{
            if (x===y) {}
            else if (getDistance(x, y)-x.rad-y.rad<100) {
                // console.log(getDistance(x, y))
                drawLine(x, y);
            }
        })
    });
}

const drawLine=(c1, c2)=>{
    context.beginPath();
    context.moveTo(c1.xpos, c1.ypos);
    context.lineTo(c2.xpos, c2.ypos);
    context.strokeStyle='green';
    context.stroke();
    context.closePath();
}

let lastCalledTime=Date.now();
let tmpTime=Date.now();
let lastValue=0;

const checkFps=()=>{
    const now=Date.now();
    const value=(now-lastCalledTime);
    if (now-tmpTime>500){
        lastValue=Math.round(1000/value);
        tmpTime=now;
        lastCalledTime=now;
        return lastValue;
    }
    else{
        lastCalledTime=now;
        return lastValue
    }
}

const removeBall=()=>{
    let num=parseInt(counter.innerHTML);
    if (num>0){
        counter.innerHTML=circles.length.toString();
        circles.pop();
    }
}

updateCircle()

document.querySelector('#changeSize').addEventListener('click', () => {
    changeWindowSize()
});

document.querySelector('#start').addEventListener('click', ()=>{start()});
document.querySelector('#reset').addEventListener('click', ()=>{reset()});
document.querySelector('#setBalls').addEventListener('change', ()=>{ reset(); for (let i=0; i<parseInt(document.querySelector('#setBalls').value); i++) addNewBall()});

