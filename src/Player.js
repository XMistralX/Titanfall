var Player = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/marco.png');
	},
	movement: function(){
		var pos = this.getPosition();
		if( this.direction == Player.DIR.Left){
			this.setPosition( new cc.Point( pos.x - 10 , pos.y  ));
		}
		else if( this.direction == Player.DIR.Right){
			this.setPosition( new cc.Point( pos.x + 10 , pos.y  ));
		}
	},
	health : 100,
});
Player.DIR = {
	Left: 1,
	Right: 2
};
