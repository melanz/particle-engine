module.exports = function(a, b, c, dt, n, position, velocity) {
	// given a wall represented by the function a*x+b*y=c, determine the correct state
	
	var px0 = position[0];
	var py0 = position[1];
	var vx0 = velocity[0];
	var vy0 = velocity[1];
	
	// determine time of collision
	var tColl = (-c+a*px0+b*py0)/(a*vx0+b*vy0);
	
	// determine position of collision
	var pColl = [px0+tColl*dt*vx0, py0+tColl*dt*vy0];
	
	// determine reflected velocity
	var dotvn = vx0*n[0]+vy0*n[1];
	var dotnn = n[0]*n[0]+n[1]*n[1];
	var nextVelocity = [vx0-2*n[0]*dotvn/dotnn, vy0-2*n[1]*dotvn/dotnn];
	var nextPosition = [pColl[0]+dt*(1-tColl)*nextVelocity[0], pColl[1]+dt*(1-tColl)*nextVelocity[1]];
	
	return {
		position: nextPosition,
		velocity: nextVelocity
	}
}