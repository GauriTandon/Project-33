const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground;
var particles = [];
var plinkos = [];
var divisions = [];

var particle;
var divisionHeight = 300;
var score = 0;
var count = 0;
var gameState = "play";

function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for(var k = 0; k <= width; k = k + 80){
    divisions.push(new Division(k,height-divisionHeight/2,10,divisionHeight));
  }

  for(var j = 75; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,75));
  }

  for(var j = 50; j <= width - 10; j = j + 50){
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 75; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,275));
  }

  for(var j = 50; j <= width - 10; j = j + 50){
    plinkos.push(new Plinko(j,375));
  }
}
 
function draw() {
  background("black");
  textSize(20);
  fill("white");
  text("Score : " +score, 20, 40);
  text("500", 20, 530);
  text("500", 100, 530);
  text("500", 180, 530);
  text("500", 260, 530);
  text("100", 340, 530);
  text("100", 420, 530);
  text("100", 500, 530);
  text("200", 580, 530);
  text("200", 660, 530);
  text("200", 740, 530);

  Engine.update(engine);
  ground.display();

  if ( gameState =="end") {
    textSize(100);
    text("GameOver", 150, 250);
    //mousePressed();
  }

  for(var i = 0; i < plinkos.length; i++){
    plinkos[i].display();
  }

  if(frameCount % 50 === 0){
    particles.push(new Particle(random(50,750),-10,10));
    //score++;
  }

  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  for(var a = 0; a < particles.length; a++){
    particles[a].display();
  }

  if(particle != null){
    particle.display();

    if(particle.body.position.y > 760){

      if(particle.body.position.x < 300){
        score = score + 500;
        particle = null;
        if(count >= 5) gameState = "end";
      }

      else if(particle.body.position.x < 600 && particle.body.position.x > 301){
        score = score + 100;
        particle = null;
        if(count >= 5) gameState = "end";
      }

      else if(particle.body.position.x < 900 && particle.body.position.x > 601){
        score = score + 200;
        particle = null;
        if(count >= 5) gameState = "end";
      }
    }
  }

}

function mousePressed(){
  if(gameState !== "end"){
    count ++;
    particle = new Particle(mouseX,10,10,10);
  }
}

//https://github.com/Kirti504/Plinko2/blob/main/sketch.js