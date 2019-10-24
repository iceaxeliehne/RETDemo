
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// create player object
// parameters are like settings that you can change
// parameters can also be functions that will run code when called
var player = {
    'spriteSheetImage': 'character.png',
    'sprite': null,
    'frame_number': 0,
    'number_of_frames': 4,
    'numberOfRows': 2,
    'numberOfColumns': 2,
    'frameWidth': null,
    'frameHeight': null,
    'sx': 0,
    'sy': 0,
    'canDraw': false,
    'frameRate': 12,
    'prev_x': c.width / 2,
    'prev_y': 0,
    'pos_x': c.width / 2,
    'pos_y': 0,
    'unit_size': 100,
    'colour': "#FF0000",
    'move_down': false,
    'stop_animation': false,
    'start': function() {
        this.sprite = new Image();
        this.sprite.src = this.spriteSheetImage;
        this.sprite.onload = imageLoaded;
    },
    'draw': function() {
        //ctx.fillStyle = this.colour;
        //ctx.fillRect(this.pos_x, this.pos_y, this.unit_size, this.unit_size);
        //console.log(this.canDraw);
        if (this.canDraw) {
            //console.log(this.frame_number);
            ctx.drawImage(this.sprite, this.sx, this.sy, this.frameWidth, this.frameHeight, this.pos_x, this.pos_y, this.unit_size, this.unit_size);
        }
        
    },
    'update': function() {
        if (this.move_down) {
            this.pos_y += 1;
            this.move_down = false;
        }
        if (this.prev_x != this.pos_x || this.prev_y != this.pos_y) {
            // player has moved so needs animation
            this.frame_number ++;
            if (this.frame_number == this.number_of_frames) {
                this.frame_number = 0;
            }
        }
        if (this.stop_animation) {
            this.frame_number = 0;
            this.stop_animation = false;
        }

        this.sx = (this.frame_number % this.numberOfColumns) * this.frameWidth;
        this.sy = Math.floor(this.frame_number / this.numberOfRows) * this.frameHeight;

        this.prev_x = this.pos_x;
        this.prev_y = this.pos_y;
    },
};

function imageLoaded() {
    //console.log("image loaded");
    var imgWidth = player.sprite.width;
    var imgHeight = player.sprite.height;
    player.frameWidth = imgWidth / player.numberOfColumns;
    player.frameHeight = imgHeight / player.numberOfRows;
    player.canDraw = true;
}

player.start();

document.addEventListener("keypress", function(event) {
    // log the keycode to the console
    //console.log(event.keyCode);

    //check if user has pressed 's' meaningn 'down'
    if (event.keyCode == 115) {
        //alert("you pressed 'down'");
        player.move_down = true;
    }

});

document.addEventListener("keyup", function(event) {
    // log the keycode to the console
    //console.log(event.keyCode);

    //check if user has pressed 's' meaningn 'down'
    if (event.keyCode == 83) {
        
        //alert("you pressed 'down'");
        player.stop_animation = true;
    }


});


// set the interval so that the updateGameState function will be called repeatedly
setInterval(updateGameState, 1000 / 60);

// this function is called repeatedly. this is where we update the game
function updateGameState() {
    ctx.clearRect(0, 0, c.width, c.height);
    player.update();
    player.draw();
};
