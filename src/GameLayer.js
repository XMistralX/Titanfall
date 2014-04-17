var screenWidth = 700 ;
var screenHeight = 216;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 0 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.createBlocks();

        this.player = new Player();
        this.player.setPosition( new cc.Point ( 150 , 220 ) );
        this.addChild( this.player);
        this.player.scheduleUpdate();

        this.setKeyboardEnabled( true );
        

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

    },

    createBlocks : function(){
        this.blocks = [];

        var groundBlock = new Block(50,150,800,200);
        this.blocks.push(groundBlock); 
        console.log("Hello");

        this.blocks.forEach( function (b ){
            this.addChild( b );    
        },this);
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
        this.background.setPosition( new cc.Point(400,300));
        this.addChild( this.background);
        console.log("Layer");
        return true;
    }

});
