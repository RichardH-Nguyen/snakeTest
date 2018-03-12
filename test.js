$(function(){
    var x = 0;
    var y = 0;
    var frameLength = 100;
    var blockSize = 5;
    var currentDirect = "right";
    var newDirect = "";
    var opDirect = "left"; //Opposite direction used so the snake can't go back on itself.
    //var collide = false;

    var canvas = $("#snakeCan").get(0); //DOM element of canvas
    var ctx = canvas.getContext("2d"); //context of canvas
    ctx.fillStyle = "blue";

    var snakeP1 = []; //array properties = ([x,y], currentDirect, opDirect, collision, color)
    snakeP1.push([1, 1]);

    var gameStart = setInterval(function () {

        createBlock(snakeP1);
        move(snakeP1);
        console.log(snakeP1)

    }, frameLength);

    function createBlock(array){
        for( var i = 0 ; i < array.length ; i++){
            x = array[i][0] * blockSize;
            y = array[i][1] * blockSize;
            //ctx.fillStyle = array[4];
            ctx.fillRect(x, y, blockSize, blockSize)
        }
    }

    function move(array){
        control();

        var newPosition = array[0].slice();


        if(currentDirect === "left"){
            newPosition[0] -= 1
        }
        else if(currentDirect === "up"){
            newPosition[1] -= 1
        }
        else if(currentDirect === "right"){
            newPosition[0] += 1
        }
        else if(currentDirect === "down"){
            newPosition[1] += 1
        }

        var collide = collisionDetection(newPosition[0], newPosition[1], array);
        //console.log(collide);

        if(collide === false) {
            array.unshift(newPosition);
            console.log(newPosition);
            //array.pop();

        }
        else
            gameOver();
    }
    function control(){
        $(document).keydown(function (event) {

            //keycodes: l = 37, u = 38, r = 39, d = 40
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

            validDirect();

        })
    }

    function validDirect(){
        if(newDirect !== opDirect){
            currentDirect = newDirect;
            if(currentDirect === "left"){
                opDirect = "right";
            }
            else if(currentDirect === "up"){
                opDirect = "down";
            }
            else if(currentDirect === "right"){
                opDirect = "left";
            }
            else if(currentDirect === "down"){
                opDirect = "up";
            }
        }
    }

    function collisionDetection(x, y, array){
        //console.log(array.length);
        var bool = false;
        for(var i = 0 ; i < array.length ; i++){

            if(array[i][0] === x && array[i][1] === y){
                bool = true;
            }

        }

        return bool;

    }

    function gameOver(){
        clearInterval(gameStart);
        alert("game over");
    }
});