//JsSnake object
function JsSnake(ctx, xPosition, yPosition, frameLength) {
    this.ctx = ctx;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.frameLength = frameLength;

    this.runGame = function () {


        this.ctx.fillStyle = "#fe57a1";
        this.ctx.fillRect(this.xPosition, this.yPosition, 30, 50);

        setInterval(this.gameLoop, this.frameLength)

    };

    this.gameLoop = function () {

        ctx.clearRect(0, 0, 100, 100);
        ctx.fillStyle = "#fe57a1";
        ctx.fillRect(parseInt(this.xPosition), parseInt(this.yPosition), 30, 50);
        this.yPosition += 4;
        this.xPosition += 2;



        console.log(this.yPosition);
    };
}




$(function(){
   var canvas = $("#snakeCan").get(0); //DOM element of canvas
   var ctx = canvas.getContext("2d"); //context of canvas
   //ctx.fillStyle = "#fe57a1";
   //ctx.fillRect(10, 10 , 30, 30);

    var snakeOb = new JsSnake(ctx, 0, 0, 500);
    setInterval(snakeOb.runGame(), 500)


});