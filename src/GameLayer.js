// make UpdateXMovement update constantly
var screenWidth = 700 ;
var screenHeight = 216;
var GameLayer = cc.LayerColor.extend(
{
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 0 ) ,2126,260);
        this.setPosition( new cc.Point( 0, 0 ) );
        this._isWalking = false;
    
        this.background = new Background(0,0);
        this.addChild(this.background);
        this.background.scheduleUpdate();
        this.player = new Player( 400, 50, this);
        
    
        var followAction = cc.Follow.create(this.player , cc.rect(0,0,2126,216));
        this.runAction(followAction);
        this.addChild( this.player);
        this.setKeyboardEnabled( true );
        this.player.scheduleUpdate();
        this.scheduleUpdate();
        
        return true;
    },
    
    onKeyDown: function( e )
    {
        this._isWalking = true;
        if( e = cc.KEY.left)
        {
            console.log("Left : "+e);
            this.player.moveLeft = true;
        }
        if ( e = cc.KEY.right)
        {
            console.log("Right : "+e);
            this.player.moveRight = true;
        }
    },

    createBlocks : function()
    {
        this.blocks = [];

        

        this.blocks.forEach( function (b ){
            this.addChild( b );    
        },this);
    },

    handleKeyDown : function ( e )
    {
        

    }
        

});

var StartScene = cc.Scene.extend(
{
    onEnter: function() 
    {
        this._super();

        var layer = new GameLayer();

        layer.init();
 
        this.addChild( layer );
    }
});


