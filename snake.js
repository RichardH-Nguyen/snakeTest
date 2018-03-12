//JsSnake object
function JsSnake(ctx, xPosition, yPosition, frameLength, blockSize, currDirect, opDirect, color) {
        this.ctx = ctx;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.frameLength = frameLength; //might not need this in class
        this.blockSize = blockSize;
        this.currDirect = currDirect;
        this.opDirect = opDirect;
        this.color = color;

        this.newDirect = "";
        this.collide = false;
        this.snake = [];
        this.snake.push([this.xPosition, this.yPosition]);

        this.createBlock = function () {
            for (var i = 0; i < this.snake.length; i++) {
                this.xPosition = this.snake[i][0] * blockSize;
                this.yPosition = this.snake[i][1] * blockSize;
                ctx.fillStyle = this.color;
                ctx.fillRect(this.xPosition, this.yPosition, this.blockSize, this.blockSize)
            }
        };

        this.move = function () {
            //this.control();

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

            this.collide = this.collisionDetection(newPosition[0], newPosition[1]);


            if (this.collide === false) {
                this.snake.unshift(newPosition);
                console.log(newPosition);
                //array.pop();

            }
            else
            this.gameOver();
        };

        this.control = function () {

            var direct = $(document).keydown(function (event) {

                //keycodes: l = 37, u = 38, r = 39, d = 40
                var keyNum = event.keyCode;
                var direct;

                if (keyNum === 37) {

                    direct = "left"
                }
                else if (keyNum === 38) {
                    direct = "up"
                }
                else if (keyNum === 39) {
                    direct = "right"
                }
                else if (keyNum === 40) {
                    direct = "down"
                }
                else {
                    return;
                }
                return direct;

            });


            this.validDirect(direct);


        };

        this.validDirect = function (direct) {
            console.log(direct);
            if (direct !== this.opDirect) {
                this.currDirect = direct;
                if (this.currDirect === "left") {
                    this.opDirect = "right";
                }
                else if (this.currDirect === "up") {
                    this.opDirect = "down";
                }
                else if (this.currDirect === "right") {
                    this.opDirect = "left";
                }
                else if (this.currDirect === "down") {
                    this.opDirect = "up";
                }
            }
        };

        this.collisionDetection = function (x, y) {
            //console.log(array.length);
            var bool = false;
            for (var i = 0; i < this.snake.length; i++) {

                if (this.snake[i][0] === x && this.snake[i][1] === y) {
                    bool = true;
                }

            }

            return bool;
        };

        this.gameOver = function () {
            alert("gameover")
        }

}




$(function(){
   var canvas = $("#snakeCan").get(0); //DOM element of canvas

   var ctx = canvas.getContext("2d"); //context of canvas

   //ctx.fillRect(10, 10 , 30, 30);

    var snakeP2 = new JsSnake(ctx, 5, 9, 200, 10, "right", "left", "red");
    var snakeOb = new JsSnake(ctx, 1, 2, 200, 10, "right", "left", "blue"); //create object
    //var snakeP2 = new JsSnake(ctx, 100, 200, 500, 10, "right", "left", "red");
    var gameStart = setInterval(function () {

        snakeP2.createBlock();
        snakeOb.createBlock();

        snakeP2.move();
        snakeOb.move();
        controlP1(snakeOb);
        controlP2(snakeP2);


    }, snakeOb.frameLength);

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
            console.log(newDirect);


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
});