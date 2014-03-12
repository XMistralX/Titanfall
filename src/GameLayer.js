var screenWidth = 700 ;
var screenHeight = 216;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 0 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.player = new Player();
        this.player.setPosition( new cc.Point ( 150 , 220 ) );
        this.addChild( this.player);
        this.setKeyboardEnabled( true );
        this.player.scheduleUpdate();
        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        var background = new BackgroundLayer();
        background.init();
        layer.init();
        this.addChild( background);
        this.addChild( layer );
    }
});

var BackgroundLayer = cc.Layer.extend({
    init: function(){
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.background = new Background();
        this.background.setPosition( new cc.Point( 400 ,300));
        this.addChild( this.background);
        console.log("Layer");
        return true;
    }

});
