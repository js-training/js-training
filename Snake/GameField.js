var GameField = {
    construct: function(snakeLocation, place){
        var tbody = dom("TBODY", {"class": "gameField"});
        this.squares = [];
        this.food = {};
        //  this.bouldersToGo = level.boulders;

        for (var y = 0; y < snakeLocation.field.length; y++) {
            var line = snakeLocation.field[y];
            var tableRow = dom("TR");
            var squareRow = [];
            for (var x = 0; x < line.length; x++) {
                var tableCell = dom("TD");
                tableRow.appendChild(tableCell);
                var square = Square.create(line.charAt(x), tableCell);
                squareRow.push(square);
                if (square.hasPlayer()) {
                    console.log("hasPlayer. x = "+x+"  y="+y );
                    this.playerPos = new Point(x, y);
                }
                if (square.hasFood()) {
                    this.foodPos = new Point(x, y);
                }
            }
            tbody.appendChild(tableRow);
            this.squares.push(squareRow);
        }

        this.table = dom("TABLE", {"class": "gameField"}, tbody);
        this.score = dom("DIV", null, "...");
        //  place.appendChild(this.table);
    },
    getSquare: function(position) {
        return this.squares[position.y][position.x];
    }
};

GameField.place = function(where) {
    where.appendChild(this.score);
    where.appendChild(this.table);
};
GameField.remove = function() {
    removeElement(this.score);
    removeElement(this.table);
};

GameField.move = function(direction) {
    var playerSquare = this.getSquare(this.playerPos);
    var targetPos = this.playerPos.add(direction);
    var targetSquare = this.getSquare(targetPos);

    if (targetSquare.hasFood()) {
        var foodSquare = this.getSquare(this.foodPos);
        var randomDirection = randomTarget();
        while (randomDirection.x + this.foodPos.x > 20 ||
            randomDirection.y + this.foodPos.y > 20 ||
            randomDirection.x + this.foodPos.x < 0 ||
            randomDirection.y + this.foodPos.y < 0) {
            randomDirection = randomTarget();
        }

        var targetRandomPos = this.foodPos.add(randomDirection);

        this.foodPos =  targetRandomPos;
        console.log("new food pos. x = "+this.foodPos.x +"   y = "+this.foodPos.y);
        var targetRandomSquare = this.getSquare(this.foodPos);
        //   targetSquare.clearContent();
        foodSquare.moveContent(targetRandomSquare);
        //    var oldPlayerSquare=  playerSquare;
        playerSquare.moveContent(targetSquare);
        // playerSquare.cloneContent(targetSquare);
        increasePlayer();
        this.playerPos = targetPos;

    } else if(targetSquare.isEmpty()){
        playerSquare.moveContent(targetSquare);
        this.playerPos = targetPos;
    }
};
