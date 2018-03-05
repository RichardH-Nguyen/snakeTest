//JsSnake object
function JsSnake(ctx, xPosition, yPosition, frameLength) {
    this.ctx = ctx;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.frameLength = frameLength;

    this.runGame = function () {


        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.xPosition, this.yPosition, 30, 50);
        console.log(this.xPosition);
        //setInterval(this.gameLoop, this.frameLength, this.ctx, this.xPosition, this.yPosition); //run gameLoop at interval frameLength.

        this.gameLoop(this.ctx, this.xPosition, this.yPosition);



    };

    this.gameLoop = function (ctx, x, y) {

        x += 2;
        y += 4;
        ctx.clearRect(0, 0, 100, 100);
        ctx.fillStyle = "blue";
        console.log('square');
        ctx.fillRect(x, y, 30, 50); //update position
        console.log(x);


        setTimeout(this.gameLoop, this.frameLength, ctx, x, y);

    };
}




$(function(){
   var canvas = $("#snakeCan").get(0); //DOM element of canvas
   var ctx = canvas.getContext("2d"); //context of canvas
   //ctx.fillStyle = "#fe57a1";
   //ctx.fillRect(10, 10 , 30, 30);

    var snakeOb = new JsSnake(ctx, 0, 0, 500); //create object
    snakeOb.runGame(); //run game


});