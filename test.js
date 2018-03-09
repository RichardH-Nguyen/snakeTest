$(function(){
    var x = 0;
    var y = 0;
    var frameLength = 100;
    var blockSize = 5;
    var currentDirect = "right";
    var newDirect = "";
    var opDirect = "left";

    var canvas = $("#snakeCan").get(0); //DOM element of canvas
    var ctx = canvas.getContext("2d"); //context of canvas
    ctx.fillStyle = "blue";

    var snakeArray = [];
    snakeArray.push([1, 1]);
    snakeArray.push([2, 1]);//array properties = [x,y]
    setInterval(function () {
        //x += 2;
        //y += 0;
        //ctx.clearRect(0, 0, 500, 500);
        //ctx.fillStyle = "blue";
        //console.log(snakeArray[0][0]);
        //ctx.fillRect(snakeArray[0][0] + x, snakeArray[0][1] + y ,10, 10);
        //ctx.fillRect(snakeArray[1][0] + x, snakeArray[1][1] + y ,10, 10);
        createBlock(snakeArray);
        move(snakeArray);
        console.log(snakeArray.length)

    }, frameLength);

    function createBlock(array){
        for( var i = 0 ; i < array.length ; i++){
            x = array[i][0] * blockSize;
            y = array[i][1] * blockSize;
            ctx.fillRect(x, y, blockSize, blockSize)
        }
    }

    function move(array){
        control();

        var newPosition = array[0].slice();

        if(currentDirect === "left"){newPosition[0] -= 1}
        else if(currentDirect === "up"){newPosition[1] -= 1}
        else if(currentDirect === "right"){newPosition[0] += 1}
        else if(currentDirect === "down"){newPosition[1] += 1}

        array.unshift(newPosition);
        //array.pop();
    }
    function control(){
        $(document).keydown(function (event) {
            //keycodes: l = 37, u = 38, r = 39, d = 40
            var keyNum = event.keyCode;

            if(keyNum === 37){
                newDirect = "left";
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
});