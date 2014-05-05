// make UpdateXMovement update constantly
var screenWidth = 700 ;
var screenHeight = 216;

var g_sharedGameLayer;
var GameLayer = cc.LayerColor.extend(
{
    _bulletBatch : null,
    _maxX : 2126,
    _maxY : 260,

    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 0 ) , this.getMaxX() , this.getMaxY());
        this.setPosition( new cc.Point( 0, 0 ) );
    
        this.background = new Background(0,0);
        this.addChild(this.background);
        this.player = new Player( 400, 25, this);
        
        this.fx = new FXLayer();


        var followAction = cc.Follow.create(this.player , cc.rect(0,0,2126,216));
        this.runAction(followAction);
        this.addChild( this.player);
        this.setKeyboardEnabled( true );
        this.player.scheduleUpdate();
        this.background.scheduleUpdate();
        this.scheduleUpdate();
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
        bullet.scheduleUpdate();
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


