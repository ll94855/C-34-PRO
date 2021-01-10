//Create variables here
var dog, happyDog, database, foodS, foodStock, dog_img;

function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  dog_img = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dog_img);
  
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(0,255,0);
  drawSprites();
  //add styles here
  fill(0,0,0,150);
  rect(90,85,325,20);
  fill("white");
  text("Feed the dog by pressing the up arrow on your keyboard.",100,100);
  fill(0,0,0,150);
  rect(191.5,385,120,20);
  fill("white");
  text("Food remaining: "+foodS,200,400);

  feedDog();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog()
{
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
}
