const chai = require('chai')

const gameEngine = require('./game-engine')

const expect = chai.expect;
let emptyGameBoard = []
for (let i = 0; i < gameEngine.gridSize; i++) {
    emptyGameBoard[i] = []
    for (let j = 0; j < gameEngine.gridSize; j++) {
        emptyGameBoard[i][j] = 0
    }
}

function createGameBoardWithLiveCells(shape) {
    let newGameBoard = []
    for (let i = 0; i < gameEngine.gridSize; i++)
        newGameBoard[i] = emptyGameBoard[i].slice(0)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            newGameBoard[i+1][j+1] = shape[i][j]
        }
    }
    return newGameBoard
}

describe('game-engine',() => {
    context('when there are no live cells', () => {
        it('should do nothing', () => {
            const gameBoard = createGameBoardWithLiveCells([
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ])
            const actual = gameEngine.updateState(gameBoard)
            expect(actual).to.eql(emptyGameBoard)
        })
    })
    context('when there is one live cell', () => {
        it('should die', () => {
            const gameBoard = createGameBoardWithLiveCells([
                [0,0,0],
                [0,1,0],
                [0,0,0]
            ])
            const actual = gameEngine.updateState(gameBoard)
            expect(actual).to.eql(emptyGameBoard)
        })
    })
    context('when there are two adjacent live cells', () => {
        it('should kill both', () => {
            const gameBoard = createGameBoardWithLiveCells([
                [0,0,0],
                [0,1,1],
                [0,0,0]
            ])
            const actual = gameEngine.updateState(gameBoard)
            expect(actual).to.eql(emptyGameBoard)
        })
    })
    context('when a dead cell has three live neighbors', () => {
        it('should revive', () => {
            const gameBoard = createGameBoardWithLiveCells([
                [0,1,0],
                [0,1,1],
                [0,0,0]
            ])
            const actual = gameEngine.updateState(gameBoard)
            expect(actual).to.eql(createGameBoardWithLiveCells([
                [0,1,1],
                [0,1,1],
                [0,0,0]
            ]))
        })
    })
    context('when a live cell has three live neighbors', () => {
        it('should keep living', () => {
            const gameBoard = createGameBoardWithLiveCells([
                [0,1,1],
                [0,1,1],
                [0,0,0]
            ])
            const actual = gameEngine.updateState(gameBoard)
            expect(actual).to.eql(createGameBoardWithLiveCells([
                [0,1,1],
                [0,1,1],
                [0,0,0]
            ]))
        })
    })
    context('when a live cell has four live neighbors', () => {
        it('should die', () => {
            const gameBoard = createGameBoardWithLiveCells([
                [0,1,0],
                [1,1,1],
                [0,1,0]
            ])
            const actual = gameEngine.updateState(gameBoard)
            expect(actual).to.eql(createGameBoardWithLiveCells([
                [1,1,1],
                [1,0,1],
                [1,1,1]
            ]))
        })
    })
})