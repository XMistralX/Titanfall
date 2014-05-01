var Player = cc.Sprite.extend({
    ctor: function( x, y, gameLayer ) 
    {
        this._super();
        this.initWithFile( 'images/marco.png' );
        this.gameLayer = gameLayer;

        this.x = x;
        this.y = y;
        this.g = -1;
        this.vx = 0;
        this.vy = 0;

        this._moveLeft = false;
        this._moveRight = false;
        this._jump = false;

        this.ground = null;
        this.blocks = [];

        this.updateSpritePosition();
    },

    updateSpritePosition: function() 
    {
        this.setPosition( cc.p( Math.round( this._x ),
                                Math.round( this._y ) ) );
    },

    getPlayerRect: function() 
    {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
    
    update: function( dt) 
    {
        var currentPositionRect = this.getPlayerRect();

        //this.updateYMovement();
        this.updateXMovement();

        var newPositionRect = this.getPlayerRect();
        this.handleCollision( currentPositionRect,
                              newPositionRect );

        this.updateSpritePosition();
    },

    updateXMovement: function() 
    {
        if(this.gameLayer._isWalking)
        {
            if ( this.moveRight ) 
            {
                this._x += 10 ;
                this.setFlippedX(false);
                this._moveRight = false;
                console.log("move left");
            } 
            if( this.moveLeft)
            {
                this._x -= 10;
                this.setFlippedX(true);
                this._moveLeft = false;
                console.log("move right");
            }
        }
        
    },

    updateYMovement: function() 
    {
        /*if ( this.ground ) 
        {
            this.vy = 0;
            if ( this.jump ) 
            {
                this.vy = this.jumpV;
                this.y = this.ground.getTopY() + this.vy;
                this.ground = null;
            }
        } 
        else 
        {
            this.vy += this.g;
            this.y += this.vy;
        }*/
    },

    isSameDirection: function( dir )
    {
        return ( ( ( this.vx >=0 ) && ( dir >= 0 ) ) ||
                 ( ( this.vx <= 0 ) && ( dir <= 0 ) ) );
    },

    handleCollision: function( oldRect, newRect ) 
    {
        if ( this.ground ) {
            if ( !this.ground.onTop( newRect ) ) 
            {
                this.ground = null;
            }
        } 
        else 
        {
            if ( this.vy <= 0 ) 
            {
                var topBlock = this.findTopBlock( this.blocks,
                                                  oldRect,
                                                  newRect );
                
                if ( topBlock ) 
                {
                    this.ground = topBlock;
                   
                    this.vy = 0;
                }
            }
        }
    },
    
    findTopBlock: function( blocks, oldRect, newRect ) 
    {
        var topBlock = null;
        var topBlockY = -1;
        
        blocks.forEach( function( b ) 
        {
            if ( b.hitTop( oldRect, newRect ) ) 
            {
                if ( b.getTopY() > topBlockY ) 
                {
                    topBlockY = b.getTopY();
                    topBlock = b;
                }
            }
        }, this );
        
        return topBlock;
    },
    
    setBlocks: function( blocks ) 
    {
        this.blocks = blocks;
    }
});

Player.KEYMAP = {}
Player.KEYMAP[cc.KEY.left] = 'moveLeft';
Player.KEYMAP[cc.KEY.right] = 'moveRight';
Player.KEYMAP[cc.KEY.up] = 'jump';

        
