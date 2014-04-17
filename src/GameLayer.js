var screenWidth = 700 ;
var screenHeight = 216;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 0 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.createBlocks();

        this.player = new Player( 400 , 300);
        this.player.setBlocks( this.blocks );
        this.addChild( this.player);
        this.scheduleOnce(function() {
            this.player.scheduleUpdate();
        }, 1);
  

        this.setKeyboardEnabled( true );

        this.scheduleUpdate();
        
        return true;
    },
    
    onKeyDown: function( e ){
        this.player.handleKeyDown( e );
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
