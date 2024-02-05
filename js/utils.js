
function rectCollision({ rect1, rect2 }) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x && 
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    )
}
// let playAgain = false

// if ( !playAgain ) {
//     document.querySelector('.playAgain').style.visibility = 'hidden'
// } else {
//     document.querySelector('.playAgain').style.visibility = 'visible'
// }

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    //playAgain = true
    document.querySelector('.playAgain').style.visibility = 'visible'
    const btnPlayAgain = document.querySelector('.btn-playAgain')
    
    document.querySelector('.displayText').style.display = 'flex'
    if ( player.health === enemy.health ) {
        document.querySelector('.displayText').innerHTML = 'Out of time...'
        
    } else if ( player.health > enemy.health ) {
        document.querySelector('.displayText').innerHTML = 'Black Cat</br>Wins!'
        
    } else if ( player.health < enemy.health ) {
        document.querySelector('.displayText').innerHTML = 'White Cat</br>Wins!'

    }

    btnPlayAgain.addEventListener('click', handleClickPlayAgain)
}

let timerValue = 30
let timerId 
function decreaseTimer() {
    if ( timerValue > 0 ){
        timerId = setTimeout(decreaseTimer, 1000)
        timerValue--
        document.querySelector('.timer').innerHTML = timerValue
    }
    if ( timerValue === 0 ) {
        determineWinner({player, enemy})
    }
}