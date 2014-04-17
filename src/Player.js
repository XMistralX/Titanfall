var Player = cc.Sprite.extend({

	ctor: function(){
		this._super();
		this.initWithFile('images/Marcc.png');
		this.direction = 0;
		console.log( "Created Object");
	},
	movement: function( LoR){
		
		this.direction = LoR;
		var pos = this.getPosition();
		if( this.direction == Player.DIR.Left){
			this.setPosition( new cc.Point( pos.x - 10 , pos.y  ));
		}
		else if( this.direction == Player.DIR.Right){
			this.setPosition( new cc.Point( pos.x + 10 , pos.y  ));
		}
	}
});

Player.DIR = {

	Left: 1,
	Right: 2
};
