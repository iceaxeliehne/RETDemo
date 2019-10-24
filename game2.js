
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// adding background tiles
var background = {
    'tile_images': ['grass_tile.png','stoneOnGrass.png','flower.png'],
    'tile_objects': [],
    'tile_locations': [],
    'tile_size': 25,
    'start': function() {
        for(var i = 0; i < this.tile_images.length; i++) {
            var tile = new Image();
            tile.src = this.tile_images[i];
            this.tile_objects.push(tile);
        }
        for(var i = 0; i < (c.width/this.tile_size); i++) {
            for (var j = 0; j < (c.height/this.tile_size); j++) {
                var tile = this.tile_objects[Math.floor(Math.random()* this.tile_objects.length)];
                //console.log(this.tile_locations);
                var tile_info = {
                    'tile_object_index': Math.floor(Math.random()* this.tile_objects.length),
                    'x': i * this.tile_size,
                    'y': j * this.tile_size
                }
                this.tile_locations.push(tile_info);
            }
        }
    },
    'draw': function() {
        for(var i = 0; i < this.tile_locations.length; i++) {
                var tile = this.tile_objects[this.tile_locations[i].tile_object_index];
                console.log(this.tile_objects);
                ctx.drawImage(tile, this.tile_locations[i].x, this.tile_locations[i].y, this.tile_size, this.tile_size);
            
        }
    },
}
background.start();


// create player object
// parameters are like settings that you can change
// parameters can also be functions that will run code when called
var player = {
    'spriteSheetImage': 'character.png', //sprite sheet image to view this file have a look at the github repo 
    'sprite': null, //this will be set later
    'frame_number': 0, // current frame of spritesheet being displayed
    'number_of_frames': 4, // number of animation frames on the spritesheet
    'numberOfRows': 2, // on the spritesheet
    'numberOfColumns': 2, // on the spritesheet
    'frameWidth': null, // this will be set later
    'frameHeight': null, // these are used to display a single frame of the sprite animation
    'sx': 0, // this is the coordinate of the animation frame on the spritesheet
    'sy': 0,
    'canDraw': false, // this stops and starts the sprite from drawing. we need to have it turned off until the spritesheet image has loaded
    'frameRate': 12, // this is not used
    'prev_x': c.width / 2, // storing the previous position of the sprite can help us to check if the sprite has moved and needs animation
    'prev_y': 0,
    'pos_x': c.width / 2, // the position that the sprite will be drawn
    'pos_y': 0,
    'unit_size': 50, // the size that the sprite will be drawn 
    'colour': "#FF0000", // not used
    'move_down': false, // used to tell the player to move it's position down the screen
    'stop_animation': false, // used to tell the player to go back to the first animation frame
    'start': function() { // this function is only called once when the page loads
        this.sprite = new Image(); // create an image object for the player
        this.sprite.src = this.spriteSheetImage; // set the spritesheet image to the sprite Image object
        this.sprite.onload = imageLoaded; // set the onload function so that we can detect the frame width and height once the image has loaded
    },
    'draw': function() { // this function is called every frame, over and over
        //ctx.fillStyle = this.colour;
        //ctx.fillRect(this.pos_x, this.pos_y, this.unit_size, this.unit_size);
        //console.log(this.canDraw);
        if (this.canDraw) { // check that the sprite is ready to draw
            //console.log(this.frame_number);
            ctx.drawImage(this.sprite, this.sx, this.sy, this.frameWidth, this.frameHeight, this.pos_x, this.pos_y, this.unit_size, this.unit_size); // draws the sprite to the canvas using the Image object the position of the current frame, the frame size, and the position and size of the sprite
        }
        
    },
    'update': function() { // this function is called every page but before the draw() function. this way we can update the players position before we draw.
        if (this.move_down) { // check if the user pressed the down button
            this.pos_y += 1; // move the player down the screen
            this.move_down = false; // prevent this block from running again unless the player acts
        }
        if (this.prev_x != this.pos_x || this.prev_y != this.pos_y) { // this is checking if the player has changed it's position since the last frame
            // player has moved so needs animation
            this.frame_number ++; // increas frame number by 1
            if (this.frame_number == this.number_of_frames) { // if we have gone passed the last frame 
                this.frame_number = 0; // we need to set it back to the start
            }
        }
        if (this.stop_animation) { // check if the player has stopped pressing down
            this.frame_number = 0; // set the frame number to 0. this is the frame where the character is standing
            this.stop_animation = false; // stop this block from running again
        }

        this.sx = (this.frame_number % this.numberOfColumns) * this.frameWidth; // update the position of the frame on the spritesheet
        this.sy = Math.floor(this.frame_number / this.numberOfRows) * this.frameHeight;

        this.prev_x = this.pos_x; // set the prev position to the current position so that next frame we will be able to compare them
        this.prev_y = this.pos_y;
    },
};

function imageLoaded() { // this is called when the spritesheet image has loaded
    //console.log("image loaded");
    var imgWidth = player.sprite.width;
    var imgHeight = player.sprite.height;
    player.frameWidth = imgWidth / player.numberOfColumns; // set the width of the frames
    player.frameHeight = imgHeight / player.numberOfRows;
    player.canDraw = true; // now that we know the frame size we can start to draw the sprite
}

player.start(); // call the player stat function

document.addEventListener("keypress", function(event) { // this function is called whenever the user is pressing a key 
    // log the keycode to the console
    //console.log(event.keyCode);

    //check if user has pressed 's' meaningn 'down'
    if (event.keyCode == 115) { // check if the user is pressing the 's' key. 's' = 115
        //alert("you pressed 'down'");
        player.move_down = true; // tell the player to move down
    }

});

document.addEventListener("keyup", function(event) { // this is called when the player releases a key
    // log the keycode to the console
    //console.log(event.keyCode);

    //check if user has pressed 's' meaningn 'down'
    if (event.keyCode == 83) { // in the keyup function 's' = 83
        
        //alert("you pressed 'down'");
        player.stop_animation = true; // tells the player to set the character to their standing still animation frame
    }


});


// set the interval so that the updateGameState function will be called repeatedly
setInterval(updateGameState, 1000 / 60);

// this function is called repeatedly. this is where we update the game
function updateGameState() {
    ctx.clearRect(0, 0, c.width, c.height); // clear the canvas
    background.draw();
    player.update(); // update the player
    player.draw(); // draw the player sprite
};
