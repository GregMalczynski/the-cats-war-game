const startPage = document.querySelector('.startPage')
const btnStart = document.querySelector('.btn-start')
let visible = true

const handleClick = () => {
    visible = false
    if ( visible ) {
        startPage.style.display = 'visible'
    } else {
        startPage.style.display = 'none'
        animate()
        decreaseTimer()
    }
}

function handleClickPlayAgain() {
    document.querySelector('.playAgain').style.visibility = 'hidden'
    document.querySelector('.displayText').innerHTML = ''
    timerValue = 30
    decreaseTimer()
    player.position.x = 200
    player.position.y = 100
    player.health = 100
    document.querySelector('.playerHealth').style.width = player.health + '%'

    enemy.position.x = 750
    enemy.position.y = 100
    enemy.health = 100
    document.querySelector('.enemyHealth').style.width = enemy.health + '%'
}

btnStart.addEventListener('click', handleClick)

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.imageSmoothingEnabled = false;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.3

const background = new Sprite({
    position: {
        x: -25,
        y: 0
    },
    imageSrc: './img/background.jpg',
    scale: 0.86
})

const bulb = new Sprite({
    position: {
        x: 65,
        y: 0
    },
    imageSrc: './img/bulb.png',
    scale: 3.8,
    framesMax: 8
})

const player = new Fighter({
    position: {
        x: 200,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: 'red',
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/black-cat-idle.png',
    scale: 4,
    framesMax: 8,
    sprites: {
        idle: {
            imageSrc: './img/black-cat-idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/black-cat-idle.png',
            framesMax: 8
        }
    },
    health: 100
})

const enemy = new Fighter({
    position: {
        x: 750,
        y: 100
    },
    velocity: {
        x: 0,
        y: 5
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/white-cat-idle.png',
    scale: 4,
    framesMax: 8,
    sprites: {
        idle: {
            imageSrc: './img/white-cat-idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/white-cat-run.png',
            framesMax: 8
        }
    },
    health: 100
})

const keys = {
    a: {
        isPressed: false
    },
    d: {
        isPressed: false
    },
    w: {
        isPressed: false
    },
    arrowLeft: {
        isPressed: false
    },
    arrowRight: {
        isPressed: false
    },
    arrowUp: {
        isPressed: false
    }
}

//decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    bulb.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if ( keys.a.isPressed && player.lastKey == 'a' ) {
        player.velocity.x = -5
        player.image = player.sprites.run.image
    } else if ( keys.d.isPressed && player.lastKey == 'd') {
        player.velocity.x = 5
        player.image = player.sprites.run.image
    } else if ( keys.w.isPressed && player.lastKey == 'w') {
        player.velocity.y = -10
        const audio = new Audio('./audio/meow.wav')
        audio.pause()
        audio.play()
    } else {
        player.image = player.sprites.idle.image
    }

    // enemy movement
    if ( keys.arrowLeft.isPressed && enemy.lastKey == 'ArrowLeft' ) {
        enemy.velocity.x = -5
        enemy.image = enemy.sprites.run.image
    } else if ( keys.arrowRight.isPressed && enemy.lastKey == 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.image = enemy.sprites.run.image
    } else if ( keys.arrowUp.isPressed && enemy.lastKey == 'ArrowUp') {
        enemy.velocity.y = -10
        const audio = new Audio('./audio/meow.wav')
        audio.pause()
        audio.play()
        
    } else {
        enemy.image = enemy.sprites.idle.image
    }
    // detect collision
    if ( 
    rectCollision({
        rect1: player,
        rect2: enemy
    }) &&
        player.isAttack
        ) {
        console.log('colision')
        player.isAttack = false
        enemy.health -= 10
        document.querySelector('.enemyHealth').style.width = enemy.health + '%'

        const audio = new Audio('./audio/punch.wav')
        audio.playbackRate = 1.5
        audio.play()
        }

    if ( 
    rectCollision({
        rect1: enemy,
        rect2: player
    }) &&
        enemy.isAttack
        ) {
        console.log('colision enemy')
        enemy.isAttack = false
        player.health -= 10
        document.querySelector('.playerHealth').style.width = player.health + '%'
        const audio = new Audio('./audio/punch.wav')
        audio.playbackRate = 1.2
        audio.play()
        }
        if ( enemy.health <= 0 || player.health <= 0 ) {
            determineWinner({player, enemy, timerId})
        }
    }

//animate()

window.addEventListener('keydown', (e) => {
    console.log(e)
    switch(e.key) {

        // player keys
        case 'a':
            keys.a.isPressed = true
            player.lastKey = 'a'
        break;
        case 'd':
            keys.d.isPressed = true
            player.lastKey = 'd'
        break;
        case 'w':
            keys.w.isPressed = true
            player.lastKey = 'w'
        break;
        case ' ':
            player.attack()
        break;

        // enemy keys
        case 'ArrowLeft':
            keys.arrowLeft.isPressed = true
            enemy.lastKey = 'ArrowLeft'
        break;
        case 'ArrowRight':
            keys.arrowRight.isPressed = true
            enemy.lastKey = 'ArrowRight'
        break;
        case 'ArrowUp':
            keys.arrowUp.isPressed = true
            enemy.lastKey = 'ArrowUp'
        break;
        case 'ArrowDown':
            enemy.attack()
        break;
    }
})

window.addEventListener('keyup', (e) => {
    console.log(e)
    switch(e.key) {

        // player keys
        case 'a':
            keys.a.isPressed = false
            player.lastKey = 'a'
        break
        case 'd':
            keys.d.isPressed = false
            player.lastKey = 'd'
        break;
        case 'w':
            keys.w.isPressed = false
            player.lastKey = 'w'
        break;

        // enemy keys
        case 'ArrowLeft':
            keys.arrowLeft.isPressed = false
            enemy.lastKey = 'ArrowLeft'
        break;
        case 'ArrowRight':
            keys.arrowRight.isPressed = false
            enemy.lastKey = 'ArrowRight'
        break;
        case 'ArrowUp':
            keys.arrowUp.isPressed = false
            enemy.lastKey = 'ArrowUp'
        break;
    }
})