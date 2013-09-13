var stepSimulator = require("../mysimulator.js")

var position = [[0, 0.5]];
var velocity = [[0, 1.0]];
var ground   = [0, 1];
var dt       = 0.1;
var tol		 = 1e-6;

for(var t=0.0; t<1.0; t+=dt) {
	// check position at current time
	console.log("Time: "+t+" Pos: ("+position[0][0]+", "+position[0][1]+") Vel: ("+velocity[0][0]+", "+velocity[0][1]+")");
	console.assert(position[0][0]==0);
	console.log("Assertion 1 passed");
	console.assert(Math.abs(position[0][1]-1.0+Math.abs(t-0.5))<tol);
	console.log("Assertion 2 passed");
  
	// update to next time step
	var nstate = stepSimulator(position, velocity, ground, dt);
	position = nstate.position;
	velocity = nstate.velocity;
	console.log();
}