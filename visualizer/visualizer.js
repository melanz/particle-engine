var doTimeStep = require("../mysimulator.js")

var groundX = document.body.querySelector("#groundX").value
var groundY = document.body.querySelector("#groundY").value
var timeStep = document.body.querySelector("#timeStep").value
var scale = document.body.querySelector("#scale").value
var resetButton = document.body.querySelector("#reset")
var canvas = document.body.querySelector("#canvas")
var context = canvas.getContext("2d")
var interval
var position = new Array()
var initialPosition = new Array()
var velocity = new Array()
var initialVelocity = new Array()

var tempPos

function initialize() {
    timeStep = document.body.querySelector("#timeStep").value
    interval = setInterval(draw,1000*timeStep)
    
    resetButton.addEventListener("click",reset)
    canvas.addEventListener("mousedown",addParticle,false);
    canvas.addEventListener("mouseup",addVelocity,false);
}

function draw() {
    //timeStep = document.body.querySelector("#timeStep").value
    scale = document.body.querySelector("#scale").value
    canvas.width = scale*2;
    canvas.height = scale*2;
    
    context.fillStyle = "rgb(255, 255, 255)"
    context.fillRect(0, 0, 400*scale/200, 400*scale/200)
    
    drawBoundary()
    drawParticles()
    var newState = doTimeStep(position, velocity, [groundX, groundY], timeStep)
    position = newState.position
    velocity = newState.velocity
}

function convertCartesianToPixels(point) {
    var newPoint = [0, 0]
    newPoint[0] = scale*(point[0]+1)
    newPoint[1] = scale*(1-point[1])
    
    return newPoint
}

function convertPixelsToCartesian(point) {
    var newPoint = [0, 0]
    newPoint[0] = point[0]/scale-1
    newPoint[1] = 1-point[1]/scale
    
    return newPoint
}

function drawPoint(position) {
    var pos = convertCartesianToPixels(position)
    context.strokeStyle = "rgb(0, 0, 255)"
    context.beginPath();
    context.arc(pos[0],pos[1],3*scale/200,0,2*Math.PI)
    context.stroke();
}

function drawLine(startCart, endCart) {
    context.strokeStyle = "rgb(255, 0, 0)"
    var start = convertCartesianToPixels(startCart)
    var end = convertCartesianToPixels(endCart)
    context.moveTo(start[0],start[1])
    context.lineTo(end[0],end[1])
    context.stroke();
}

function drawBoundary() {
    var point1 = [-1, groundX/groundY]
    var point2 = [-1, 1]
    var point3 = [1, 1]
    var point4 = [1, -groundX/groundY]
    
    drawLine(point1,point2)
    drawLine(point2,point3)
    drawLine(point3,point4)
    drawLine(point4,point1)
}

function drawParticles() {
    for (var i=0;i<position.length;i++) {
        drawPoint(position[i])
    }
}

function reset() {
    clearInterval(interval)
    timeStep = document.body.querySelector("#timeStep").value
    groundX = document.body.querySelector("#groundX").value
    groundY = document.body.querySelector("#groundY").value
    console.log("Resetting (dt = "+timeStep+")")
    interval = setInterval(draw,1000*timeStep)
    
    position = initialPosition
    velocity = initialVelocity
}

function addParticle(event) {
    //console.log("Point added at px("+event.pageX+", "+event.pageY+")")
    var point = [0,0];
    point = convertPixelsToCartesian([event.pageX-canvas.offsetLeft, event.pageY-canvas.offsetTop])
    //position.push(point)
    //console.log(position)
    //initialPosition.push(point)
    console.log("Point added at ("+point[0]+", "+point[1]+")")
    console.log(" ");
    tempPos = point
}

function addVelocity(event) {
    var end = convertPixelsToCartesian([event.pageX-canvas.offsetLeft, event.pageY-canvas.offsetTop])
    var start = tempPos;//initialPosition[initialPosition.length-1];
    drawLine(start,end)
    var vel = [0,0]
    vel[0] = end[0]-start[0];
    vel[1] = end[1]-start[1];
    position.push(tempPos)
    velocity.push(vel)
    initialPosition.push(tempPos)
    initialVelocity.push(vel)
    //console.log("Velocity added at ("+vel[0]+", "+vel[1]+")")
}

initialize()


