var Enemy = cc.Sprite.extend({
    ctor: function( x, y ) 
    {
        this._super();
        this.initWithFile( 'images/enemy.png' );

        this.x = x;
        this.y = y;
        this.g = -1;
        this.vx = 0;
        this.vy = 0;

        this._moveLeft = false;
        this._moveRight = false;
        this._jump = false;
        this._attack = false;
        this.flippedX = false;

        this.ground = null;
        this.blocks = [];
        this.bullets = [];
        this.bulletCount = 0;

        this.updateSpritePosition();
    },

    handleKeyDown : function ( e )
    {
        if ( Enemy.KEYMAP[ e ] != undefined ) 
            this[ Enemy.KEYMAP[ e ] ] = true;
        
    },

    handleKeyUp : function ( e )
    {
        if ( Enemy.KEYMAP[ e ] != undefined ) 
            this[ Enemy.KEYMAP[ e ] ] = false;
    },

    updateSpritePosition: function() 
    {
        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },
    
    update: function( dt) 
    {

        var currentPositionRect = this.getEnemyRect();

        //this.updateYMovement();
        
        this.updateXMovement();
        this.updateSpritePosition();
        this.attack();

        var newPositionRect = this.getEnemyRect();
        this.handleCollision( currentPositionRect,
                              newPositionRect );
        this.handleCollision();
        
    },

    updateXMovement: function() 
    {
            // add velocity and accerelation
            if ( this._moveRight ) 
            {
                this.x += 20 ;
                this.flippedX = false;
                this.setFlippedX(this.flippedX);
                this._moveRight = false;
                console.log("move right"+this.x);
            } 
            if( this._moveLeft)
            {
                this.x -= 20;
                this.flippedX = true;
                this.setFlippedX(this.flippedX);
                this._moveLeft = false;
                console.log("move left"+this.x);
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

    intializeBullet : function()
    {
        if( this.flippedX )
        {
            g_bulletArray[g_bulletCount] = new Bullet( this.x, this.y, "left");
            g_sharedGameLayer.addBullet( g_bulletArray[g_bulletCount] );
        }
        else
        {
            g_bulletArray[g_bulletCount] = new Bullet(this.x,this.y,"right");
            g_sharedGameLayer.addBullet( g_bulletArray[g_bulletCount] );
        }

        g_bulletCount++    

    },

    attack : function ()
    {
        
    },
    
    closeTo: function( obj ) 
    {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        console.log(( Math.abs( myPos.x - oPos.x ) <= 5 ));
        return ( ( Math.abs( myPos.x - oPos.x ) <= 5 )  );
    },

    handleCollision : function ()
    {

        g_bulletArray.forEach( function (b )
        {
            if ( this.closeTo( b ) )
            {
                g_sharedGameLayer.removeChild(this);
                g_sharedGameLayer.removeChild(b);
            }
           
                
        },this);
    },
/**
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

        


    },*/
    
    getEnemyRect: function() 
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


        
