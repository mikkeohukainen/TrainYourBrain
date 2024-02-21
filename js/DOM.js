import { fetchData } from './api.js'

const modal = document.getElementById('winModal')
const winMessage = document.getElementById('winMessage')

let initialState = []
let solution = []
let difficulty = ''
let disable = false
let solutionShown = false
let numOfHints = 0

const fillGrid = async () => {
    const chosenDifficulty = document.querySelector('#difficulty').value
    document.querySelector('#load').textContent = 'loading...'
    const gridObj = await fetchData(chosenDifficulty)

    if (!gridObj) {
      winMessage.textContent = "Failed to load. Please try again."
      modal.style.display = "block"
      return
    }
    document.querySelector('#load').textContent = ''

    initialState = gridObj.value
    solution = gridObj.solution
    difficulty = gridObj.difficulty

    initialState.flat().forEach((value, index) => {
        const cell = document.getElementById(`cell-${index}`)
        if (value !== 0) {
          cell.value = value
          cell.disabled = true
        } else {
          cell.value = ''
          cell.disabled = false
        }
      })

      if (chosenDifficulty === 'Easy') {
        for (let i = 0; i < 5; i++) {
            disable = true
            getHint()
            console.log('Got hint.')
        }
      }
      solutionShown = false
      numOfHints = 0
}

const showSolution = () => {
    solution.flat().forEach((value, index) => {
        const cell = document.getElementById(`cell-${index}`)
        if (value !== 0) {
          cell.value = value
        } else {
          cell.value = ''
          cell.disabled = false
        }
      })
      solutionShown = true
}

const checkSudokuGrid = () => {
    const inputs = document.querySelectorAll('#grid input[type="text"]')
    const gridValues = Array.from(inputs).map(input => input.value.trim())

    const allFilled = gridValues.every(value => value)

    if (!allFilled) {
        winMessage.textContent = "Please fill in all cells before checking."
        modal.style.display = "block"
        return
    }

    const isCorrect = isValidSudoku(gridValues)

    if (solutionShown) {
        winMessage.textContent = "Cheater!"
        modal.style.display = "block"
        return
    }

    if (isCorrect) {
        winMessage.textContent = "Congratulations! You've solved the Sudoku correctly with " + numOfHints + " hints!"
        modal.style.display = "block"
    } else {
        winMessage.textContent = "Incorrect solution. Please try again."
        modal.style.display = "block"
    }
}

const validateSudoku = (gridValues) => {
    const flatSolution = solution.flat()
    return gridValues.every((value, index) => value == flatSolution[index])
}

const getHint = () => {
    const inputs = document.querySelectorAll('#grid input[type="text"]')
    const emptyCells = Array.from(inputs).filter(input => !input.value.trim())

    if (emptyCells.length === 0) {
        winMessage.textContent = "No empty cells left!"
        modal.style.display = "block"
        return
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    const cellIndex = Array.from(inputs).indexOf(randomCell)

    const flatSolution = solution.flat()
    randomCell.value = flatSolution[cellIndex]

    if (disable) {
        randomCell.disabled = true
        disable = false
    }

    numOfHints++
}

const isValidSudoku = (board_1D) => {
    const board = []
    for (let i = 0; i < 9; i++) {
      board[i] = []
      for (let j = 0; j < 9; j++) {
        const value = board_1D[i * 9 + j]
        board[i][j] = value === '' ? '.' : value
      }
    }

    if (!board || board.length !== 9 || board[0].length !== 9) {
      return false
    }

    for (let i = 0; i < 9; i++) {
      const rowSet = new Set()
      const colSet = new Set()

      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== '.') {
          if (rowSet.has(board[i][j])) {
            return false
          }
          rowSet.add(board[i][j])
        }

        if (board[j][i] !== '.') {
          if (colSet.has(board[j][i])) {
            return false
          }
          colSet.add(board[j][i])
        }
      }
    }

    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const gridSet = new Set()

        for (let i = row; i < row + 3; i++) {
          for (let j = col; j < col + 3; j++) {
            if (board[i][j] !== '.' && gridSet.has(board[i][j])) {
              return false
            }
            gridSet.add(board[i][j])
          }
        }
      }
  }

  return true
}


document.addEventListener('DOMContentLoaded', fillGrid)

document.querySelector('#reload').addEventListener('click', fillGrid)

document.querySelector('#solution').addEventListener('click', showSolution)

document.querySelector('#check').addEventListener('click', checkSudokuGrid)

document.querySelector('#hint').addEventListener('click', getHint)

document.querySelector('.close').addEventListener('click', () => {
  modal.style.display = "none"
})

window.addEventListener('click', (event) => {
  if (event.target == modal) {
      modal.style.display = "none"
    }
})
