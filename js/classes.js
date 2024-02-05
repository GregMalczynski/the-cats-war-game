class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, audioSrc}) {
        this.position = position,
        this.width = 50,
        this.height = 150,
        this.backgroundWidth = 400,
        this.backgroundHeight = 260
        this.image = new Image(),
        this.image.src = imageSrc,
        this.scale = scale,
        this.framesMax = framesMax,
        this.framesCurrent = 0,
        this.framesElapsed = 0,
        this.framesHold = 5,
        this.audio = new Audio(),
        this.audio.src = audioSrc
    }

    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

    update() {
        this.draw()
        this.framesElapsed++
        if ( this.framesElapsed % this.framesHold === 0 ) {

            if ( this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color, 
        offset,
        imageSrc,
        scale = 1,
        framesMax = 1,
        sprites,
        health
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
        })
        this.position = position,
        this.velocity = velocity,
        this.width = 50,
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttack
        this.health = health
        this.framesCurrent = 0,
        this.framesElapsed = 0,
        this.framesHold = 5,
        this.sprites = sprites

        for ( const sprite in this.sprites ) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        console.log(this.sprites)
    }

    update() {
        this.draw()
        this.health
        this.framesElapsed++
        if ( this.framesElapsed % this.framesHold === 0 ) {

            if ( this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // value ( canvas.height ) - fighter position on the ground
        if ( this.position.y + this.height + this.velocity.y >= canvas.height + 5 ) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttack = true
        setTimeout(() => {
            this.isAttack = false
        }, 100)
    }
}