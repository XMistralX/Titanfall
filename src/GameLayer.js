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
    },
    onKeyDown: function( e ){
        if( e == cc.KEY.left){
            this.player.setFlippedX(true);
            this.player.movement(1);
        }
        else if( e == cc.KEY.right){
            this.player.setFlippedX(false);
            this.player.movement(2);
        }
    },/**createBlocks : function(){
        this.blocks = [];
        var groundBlock = new Block(0,0,700,160);
        this.blocks.push(groundBlock);

        this.blocks.forEach( function (b ){
            this.addChild( b );    
        },this);
    }
        
    **/

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        //Create Background
        var background = new BackgroundLayer();
        // Create GameLater
        var layer = new GameLayer();
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
