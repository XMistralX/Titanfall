var Bullet = cc.Sprite.extend({
    ctor:function( x, y , bulletDirection  , gameLayer)
    {
        this._super();
        this.initWithFile('images/Bullet.png');

        this.x = x;
        this.y = y;
        this.setAnchorPoint(cc.p(0,0));
        this._vx = 5;
        this.gameLayer = gameLayer;
        this.bulletDirection = bulletDirection;

        this.setPosition( this.x , this.y);
        this.gameLayer.addChild(this);
    },

    getX : function ()
    {
        return this.x;
    },

    bulletConstraint : function ( dt) 
    {
        if( bullet.getX() > this.gameLayer.getMaxX() )
            this.gameLayer.removeChild(this);
    },


    update : function ( dt )
    {
        this.updateMovement();
        this.updateSpritePosition();
    },

    updateMovement : function ()
    {
    	if( bulletDirection == "left")
    	{
    		this.x -= this._vx;
    	}
    	if( bulletDirection == "right")
    	{
    		this.x += this._vx;
    	}
    },

    updateSpritePosition : function ()
    {
    	this.setPosition( cc.p( Math.round( this.x ),
    							Math.round( this.y ) ) );
    },

    handleCollision : function ( rect )
    {
        if( cc.rectIntersectsRect( rect, this.getRect() ) )
            return true;
        return false;
    },

    getRect : function ()
    {
        return this.getBoundingBox();
    },

    checkBoundary : function ()
    {
        if( this.x >this.gameLayer.getMaxX()  && this.x > 0 )
            return true;
        if( this.y > this.gameLayer.getMaxY()  && this.y > 0)
            return true;
        return false;
    },

    
});