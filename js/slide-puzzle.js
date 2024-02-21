const gameBoard = document.getElementById('gameBoard')
const modal = document.getElementById('winModal')
const winMessage = document.getElementById('winMessage')

let emptyIndex = 16
const tiles = []
const size = 4
let shuffled = false

let gameTimer;
let seconds = 0;
let timeString = ""

const initGame = () => {
    for (let i = 1; i <= 16; i++) {
        const tile = document.createElement('button')
        tile.classList.add('tile')
        if (i < 16) {
            tile.innerText = i
            tile.addEventListener('click', () => swap(i))
        } else {
            tile.innerText = 0
            tile.addEventListener('click', () => swap(i))
            tile.classList.add('empty')
        }
        tiles.push(tile)
        gameBoard.appendChild(tile)
    }
    setTimeout(() => {
        shuffle()
    }, 300)
}

const shuffle = () => {
    let minShuffles = 100
    let totalShuffles = minShuffles + Math.floor(Math.random() * (400 - 200) + 200);

    console.log('total shuffles: ' + totalShuffles)
    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4)
            let direction = 0
            if (x == 0) {
                direction = emptyIndex + 1
            } else if (x == 1) {
                direction = emptyIndex - 1
            } else if (x == 2) {
                direction = emptyIndex + size
            } else if (x == 3) {
                direction = emptyIndex - size
            }

            swap(direction);

            if (i >= totalShuffles - 1) {
                shuffled = true
            }
        }, i * 10)
    }
    stopTimer()
    startTimer()
}

const swap = (clicked) => {
    if (clicked <= 0 || clicked > 16) {
        return
    }

    if (clicked === emptyIndex + 1 && clicked % size !== 1 ||
        clicked === emptyIndex - 1 && clicked % size !== 0 ||
        clicked === emptyIndex + size ||
        clicked === emptyIndex - size) {
        
        setSelected(clicked)

        if (shuffled && checkWin()) {
            stopTimer()
            winMessage.textContent = "Congratulations! You've solved the puzzle in " + timeString;
            modal.style.display = "block";
        }
    }
}

const setSelected = (clicked) => {
    [tiles[clicked-1].innerText, tiles[emptyIndex-1].innerText] = [tiles[emptyIndex-1].innerText, tiles[clicked-1].innerText]

    tiles[clicked-1].classList.add('empty')
    tiles[emptyIndex-1].classList.remove('empty')
    
    emptyIndex = clicked
}

const checkWin = () => {
    for (let i = 0; i < tiles.length - 1; i++) {
        
        if (tiles[i].innerText != i + 1) {
            return false
        }
    }
    return true
}

const startTimer = () => {
    seconds = 0
    timeString = ""
    gameTimer = setInterval(function() {
        seconds++
    }, 1000)
}

const stopTimer = () => {
    clearInterval(gameTimer)
    const mins = String(Math.floor((seconds / 60) % 60))
    const sdns = String(seconds % 60)
    timeString = mins + ' minutes ' + sdns + ' seconds!'
}

document.addEventListener('DOMContentLoaded', initGame)

document.querySelector('#shuffle').addEventListener('click', shuffle)

document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = "none";
})

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
      }
})
