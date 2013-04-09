"use strict";
function SnakeItem (position, direction){
    this.position = position;
    this.direction = direction;
}

function Snake(){
    this.snakeBody = {};
    this.add = function(snakeItem){
        this.snakeBoddy[this.snakeBody.length] = snakeItem;
    };
    this.move = function(moveDirection){
        //instananceof direction === Point
        var i = this.snakeBody.length-1;
        for(var i = this.snakeBody.length-1; i > 0; i--){
            this.snakeBody[i].direction =  this.snakeBody[i-1].direction;
            this.snakeBody[i].position = this.snakeBody[i].position.add(this.snakeBody[i].direction);
        }
        this.snakeBody[0].direction =  moveDirection;
        this.snake[0].position = this.snakeBody[0].position.add(moveDirection);
    };
    this.increase = function(moveDirection){
        this.add(this.snakeBody[this.snakeBody.length-1]);

        for(var i = this.snakeBody.length-1; i > 0; i--){
            this.snakeBody[i].direction =  this.snakeBody[i-1].direction;
            this.snakeBody[i].position = this.snakeBody[i].position.add(this.snakeBody[i].direction);
        }
        this.snakeBody[0].direction =  moveDirection;
        this.snake[0].position = this.snakeBody[0].position.add(moveDirection);
    };
}



