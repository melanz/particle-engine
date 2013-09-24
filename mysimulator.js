module.exports = function(position, velocity, ground, dt) {

	// allocate vectors for the next state
	var nextPosition
	var nextVelocity
	
	// determine the normal of the ground
	var xGround1 = -1;
	var xGround2 = 1;
	var yGround1 = -ground[0]*xGround1/ground[1];
	var yGround2 = -ground[0]*xGround2/ground[1];
	var lGround = Math.sqrt((xGround2-xGround1)*(xGround2-xGround1)+(yGround2-yGround1)*(yGround2-yGround1));
	var nGround = [-(yGround2-yGround1)/lGround, (xGround2-xGround1)/lGround];
	
	// load function to correct the state of the particle
	var correctState = require("./stateCorrector.js");

	// Compute next state here
    nextPosition = new Array();
    nextVelocity = new Array();
	for(var i=0; i<position.length; i++) {
        var xPos = position[i][0]
        xPos+=dt*velocity[i][0]
        var yPos = position[i][1]
        yPos+=dt*velocity[i][1]
        nextPosition.push([xPos,yPos])
        nextVelocity.push(velocity[i])
		
		// Determine if the point has exited the boundary at the next state
		if(nextPosition[i][0] < -1) {
			// particle has hit the left wall
			console.log("Left wall hit!");
			var nstate = correctState(1, 0, -1, dt, [1,0], position[i], velocity[i]);
			console.log("Fixed pos: ("+nstate.position[0]+", "+nstate.position[1]+")");
			nextPosition[i] = nstate.position;
			nextVelocity[i] = nstate.velocity;
		}
		if(nextPosition[i][0] > 1) {
			// particle has hit the right wall
			console.log("Right wall hit!");
			var nstate = correctState(1, 0, 1, dt, [1,0], position[i], velocity[i]);
			nextPosition[i] = nstate.position;
			nextVelocity[i] = nstate.velocity;
		}
		if(nextPosition[i][1] > 1) {
			// particle has hit the ceiling
			console.log("Ceiling hit!");
			var nstate = correctState(0, 1, 1, dt, [0,-1], position[i], velocity[i]);
			nextPosition[i] = nstate.position;
			nextVelocity[i] = nstate.velocity;
		}
		if(ground[0]*nextPosition[i][0]+ground[1]*nextPosition[i][1] < 0) {
			// particle has hit the ground
			console.log("Ground hit!");
			var nstate = correctState(ground[0], ground[1], 0, dt, nGround, position[i], velocity[i]);
			nextPosition[i] = nstate.position;
			nextVelocity[i] = nstate.velocity;
		}
	}

	return {
		position: nextPosition,
		velocity: nextVelocity
	}
}