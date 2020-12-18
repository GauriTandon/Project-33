class Plinko {
    constructor(x,y,radius) {
        var options = {
            //restitution: 1,
            //friction: 0,
            isStatic:true
        }
        this.radius = 10;
        this.body = Bodies.circle(x, y, 10, options);
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;
        stroke(100);
        fill(255);
        ellipseMode(RADIUS);
        ellipse(pos.x, pos.y, this.radius, this.radius);
    }

};