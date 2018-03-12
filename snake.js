//JsSnake object
function JsSnake(ctx, xPosition, yPosition, blockSize, currDirect, opDirect, color) {
        this.ctx = ctx;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.blockSize = blockSize;
        this.currDirect = currDirect;
        this.opDirect = opDirect;
        this.color = color;


        this.collide = false;
        this.collideOuter = false;
        this.snake = [];
        this.snake.push([this.xPosition, this.yPosition]);

        this.createBlock = function () {
            for (var i = 0; i < this.snake.length; i++) {
                this.xPosition = this.snake[i][0] * blockSize;
                this.yPosition = this.snake[i][1] * blockSize;
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = "white";
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.xPosition, this.yPosition, this.blockSize, this.blockSize)
            }
        };

        this.move = function () {


            var newPosition = this.snake[0].slice();


            if (this.currDirect === "left") {
                newPosition[0] -= 1
            }
            else if (this.currDirect === "up") {
                newPosition[1] -= 1
            }
            else if (this.currDirect === "right") {
                newPosition[0] += 1
            }
            else if (this.currDirect === "down") {
                newPosition[1] += 1
            }

            this.collide = this.collisionInner(newPosition[0], newPosition[1]);


            if(this.collide === false) {
                this.snake.unshift(newPosition);

                //array.pop();

            }
            else{
                console.log(this.collide);
                //this.gameOver();
            }

        };

        this.collisionInner = function (x, y) {
            //console.log(array.length);
            var bool = false;
            for (var i = 0; i < this.snake.length; i++) {

                if (this.snake[i][0] === x && this.snake[i][1] === y) {
                    bool = true;
                }
                else if(x < 0 || x > 100){
                    bool = true;
                }
                else if(y < 0 || y > 70){
                    bool = true;
                }

            }

            return bool;
        };

        this.gameOver = function () {
            alert("what")
        }

}




$(function(){
   var canvas = $("#snakeCan").get(0); //DOM element of canvas

   var ctx = canvas.getContext("2d"); //context of canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1000, 700);

   //ctx.fillRect(10, 10 , 30, 30);

    var snakeP2 = new JsSnake(ctx, 95, 65, 10, "left", "right", "#ffcb30");
    var snakeOb = new JsSnake(ctx, 1, 2, 10, "right", "left", "#6bd2ff"); //create object
    //var snakeP2 = new JsSnake(ctx, 100, 200, 500, 10, "right", "left", "red");
    var gameStart = setInterval(function () {

        snakeP2.createBlock();
        snakeOb.createBlock();

        snakeP2.move();
        snakeOb.move();
        controlP1(snakeOb);
        controlP2(snakeP2);
        snakeOb.collideOuter = collisionOuter(snakeOb.snake[0][0], snakeOb.snake[0][1], snakeP2.snake);
        snakeP2.collideOuter = collisionOuter(snakeP2.snake[0][0], snakeP2.snake[0][1], snakeOb.snake);
        console.log(snakeOb.collide);

        if (snakeOb.collide === true || snakeOb.collideOuter === true || snakeP2.collide === true || snakeP2.collideOuter === true){
            clearInterval(gameStart);
           declareWinner(snakeOb, snakeP2);
        }

    }, 100);

    if(snakeOb.collide === true){
        clearInterval(gameStart);
    }

    function controlP1(object){
        $(document).keydown(function (event) {
            var newDirect = object.currDirect;
            //keycodes: left arrow = 37, up arrow = 38, right arrow = 39, down arrow = 40
            var keyNum = event.keyCode;

            if(keyNum === 37){
                newDirect = "left"
            }
            else if(keyNum === 38){
                newDirect = "up"
            }
            else if(keyNum === 39){
                newDirect = "right"
            }
            else if(keyNum === 40) {
                newDirect = "down"
            }

            else{
                return;
            }

            validDirect(newDirect, object);



        })
    }

    function controlP2(object){
        $(document).keydown(function (event) {
            var newDirect;
            //keys: w = 65, a = 87, s = 68, d = 83
            var keyNum = event.keyCode;

            if(keyNum === 65){
                newDirect = "left"
            }
            else if(keyNum === 87){
                newDirect = "up"
            }
            else if(keyNum === 68){
                newDirect = "right"
            }
            else if(keyNum === 83) {
                newDirect = "down"
            }
            else{
                return;
            }

            validDirect(newDirect, object);
            console.log(newDirect);


        })
    }

    function validDirect(newDirect, object){
        //var currentDirect;
        if(newDirect !== object.opDirect){
            object.currDirect = newDirect;
            if(object.currDirect === "left"){
                object.opDirect = "right";
            }
            else if(object.currDirect === "up"){
                object.opDirect = "down";
            }
            else if(object.currDirect === "right"){
                object.opDirect = "left";
            }
            else if(object.currDirect === "down"){
                object.opDirect = "up";
            }
        }

    }

    function collisionOuter(x, y, array) {
        //console.log(array.length);
        var bool = false;
        for (var i = 0; i < array.length; i++) {

            if (array[i][0] === x && array[i][1] === y) {
                bool = true;
            }

        }
        return bool;
    }

    function declareWinner(object1, object2){
        if(object1.collide!== true && object1.collideOuter!== true){

            ctx.font = "30px Arial";
            ctx.fillStyle = object1.color;
            ctx.textAlign = "center";
            ctx.fillText("BLUE wins", canvas.width/2, canvas.height/2);
        }
        else if(object2.collide !== true && object2.collideOuter!== true){

            ctx.font = "30px Arial";
            ctx.fillStyle = object2.color;
            ctx.textAlign = "center";
            ctx.fillText("RED wins", canvas.width/2, canvas.height/2);
        }else{
            ctx.font = "30px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("TIE!", canvas.width/2, canvas.height/2);
        }
    }

    function gameLoop(object1, object2){
        object2.createBlock();
        object1.createBlock();

        object2.move();
        object1.move();
        controlP1(object1);
        controlP2(object2);
        object1.collideOuter = collisionOuter(object1.snake[0][0], object1.snake[0][1], object2.snake);
        object2.collideOuter = collisionOuter(object2.snake[0][0], object2.snake[0][1], object1.snake);

    }
});