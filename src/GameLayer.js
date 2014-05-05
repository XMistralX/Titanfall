// make UpdateXMovement update constantly
var screenWidth = 700 ;
var screenHeight = 216;

var g_sharedGameLayer;
var GameLayer = cc.LayerColor.extend(
{
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 0 ) ,2126,260);
        this.setPosition( new cc.Point( 0, 0 ) );
        this._isWalking = false;
        this._maxX = 2126;
    
        this.background = new Background(0,0);
        this.addChild(this.background);
        this.player = new Player( 400, 25, this);
        this._isWalking = false;

        var followAction = cc.Follow.create(this.player , cc.rect(0,0,2126,216));
        this.runAction(followAction);
        this.addChild( this.player);
        this.setKeyboardEnabled( true );
        this.player.scheduleUpdate();
        this.background.scheduleUpdate();
        this.scheduleUpdate();
        this.bullet = new Bullet( 400 ,30 , "left");
        this.addChild(this.bullet);
        g_sharedGameLayer = this;
        
        return true;
    },
    
    onKeyDown: function( e )
    {
        this.player.handleKeyDown( e );
    },

    onKeyUp : function ( e )
    {
        this.player.handleKeyUp( e );
    },

    createBlocks : function()
    {
        this.blocks = [];

        

        this.blocks.forEach( function (b )
        {
            this.addChild( b );    
        },this);
    },

    addBullet : function ( bullet )
    {
        this.addChild(bullet);
    },

    getMaxX : function ()
    {
        return this._maxX;
    },

    getMaxY : function ()
    {
        return this._maxY;
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


