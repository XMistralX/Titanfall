var Player = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/marco.png');
		this.direction = 0;
		console.log("Created Object");
	},
	keyboardInput : function( e ){
		if( e == cc.KEY.left){
			this.direction = Player.DIR.Left;
			movement();
		}
		else if( e == cc.KEY.right){
			this.direction = Player.DIR.Right;
			movement();
		}
	},
	movement : function(){
		var pos = this.getPosition();
		if( this.direction == Player.DIR.Left){
			this.setPosition( new cc.Point( pos.x - 5 , pos.y  ));
		}
		else if( this.direction == Player.DIR.Right){
			this.setPosition( new cc.Point( pos.x + 5 , pos.y  ));
		}
	},
	update : function( dt){
		keyboardInput();
	}



});
Player.DIR = {
	Left: 1,
	Right: 2
};
