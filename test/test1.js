var stepSimulator = require("../mysimulator.js")

var position = [[0, 0.5]];
var velocity = [[.2, 1.0]];
var ground   = [.2, 1];
var dt       = 0.1;
var tol		 = 1e-6;
var v0 = Math.sqrt(velocity[0][0]*velocity[0][0]+velocity[0][1]*velocity[0][1]);

for(var t=0.0; t<10.0; t+=dt) {
	// check position at current time
	console.log("Time: "+t+" Pos: ("+position[0][0]+", "+position[0][1]+") Vel: ("+velocity[0][0]+", "+velocity[0][1]+")");
	
	// check to see that the speed has not changed
	console.assert(Math.abs(Math.sqrt(velocity[0][0]*velocity[0][0]+velocity[0][1]*velocity[0][1])-v0)<tol);
	console.log("Assertion 1 passed");
  
	// update to next time step
	var nstate = stepSimulator(position, velocity, ground, dt);
	position = nstate.position;
	velocity = nstate.velocity;
	console.log();
}