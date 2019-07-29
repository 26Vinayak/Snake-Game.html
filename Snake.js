var cvs = document.getElementById("canvas");
var stx = cvs.getContext("2d");
var snakeW = 10;
var snakeH = 10;
var dir ="right";
function drawsanke(x,y){
    stx.fillStyle = "white";
    stx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
    stx.fillStyle = "black";
    stx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

//create snake
var len = 4;
snake = [];
for(var i=len-1;i>=0;i--)
{
    snake.push({
        x:i,
        y:0
        })
}
document.addEventListener("keydown",dirControl);
//dir control
function dirControl(event){
    if(event.keyCode == 37 && dir!="right")
    {
        dir = "left";
    }
    if(event.keyCode == 38 && dir!="down")
    {
        dir = "up";
    }
    if(event.keyCode == 39 && dir!="left")
    {
        dir = "right";
    }
    if(event.keyCode == 40 && dir!="up")
    {
        dir = "down";
    }
}
//create food
var food= {
    x:Math.round(Math.random()*(cvs.width/snakeW)+1),
    y:Math.round(Math.random()*(cvs.height/snakeH)+1)
}
//draw food
function drawFood(x,y){
    stx.fillStyle = "red";
    stx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
    stx.fillStyle = "black";
    stx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);    
}
function draw(){
    stx.clearRect(0,0,cvs.clientWidth,cvs.height);
    for(var i=0;i<snake.length;i++)
    {
        var X = snake[i].x;
        var Y = snake[i].y;
        drawsanke(X,Y);
    }
    drawFood(food.x,food.y);
    //snake head
    var snakeX = snake[0].x;
    var snakeY  = snake[0].y;
    if(snakeX<0 || snakeY<0 || snakeX>=cvs.width/snakeW || snakeY>=cvs.height/snakeH)
    {
        alert("Game Over");
    }
    if(dir == "right"){snakeX++;}
    else if(dir == "left"){snakeX--;}
    else if(dir == "up"){snakeY--;}
    else if(dir == "down"){snakeY++;}
    if(snakeX == food.x && snakeY == food.y)
    {
        food= {
            x:Math.round(Math.random()*(cvs.width/snakeW-1)+1),
            y:Math.round(Math.random()*(cvs.height/snakeH-1)+1)
        }
        var newhead = {
            x:snakeX,
            y:snakeY
        };
    }
    else
    {
        snake.pop();
        var newhead = {
            x:snakeX,
            y:snakeY
        };
        
    }
    //new head
    
    snake.unshift(newhead);
}//end draw
setInterval(draw,100);