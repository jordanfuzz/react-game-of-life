import React, {Component} from 'react'
import axios from 'axios'
import './GameBoard.css'

export default class GameBoard extends Component {
  constructor() {
    super()
    this.state = {
      data: "No data to display.",
      boardIsDisplayed: false,
      cellData: [],
      currentBoard: [],
      boardSize: 50
    }
  }
  componentWillMount() {
    this.generateEmptyBoard()
  }

  componentDidMount() {
    this.setState({
      currentBoard: this.displayBoard()
    })
  }

  getNewData(e) {
    e.preventDefault()
    axios.get('http://localhost:3001/api/data').then((response) => {
      console.log("I got this:", response.data)
      this.setState({data: response.data})})
  }

  toggleCellStatus(row, column) {
    let newCellData = this.state.cellData.slice(0)
    newCellData[row][column] = 1
    this.setState({
      cellData: newCellData
    })
  }

  generateEmptyBoard() {
    let emptyGameBoard = []
    for (let i = 0; i < this.state.boardSize; i++) {
      emptyGameBoard[i] = []
      for (let j = 0; j < this.state.boardSize; j++) {
        emptyGameBoard[i][j] = 0
      }
    }
    this.setState({
      cellData: emptyGameBoard
    })
  }

  displayBoard() {
    return this.state.cellData.map((row, i) => {
      return <div key={i} className="row" style={{width: this.state.boardSize * 10}}>{row.map((e, j) => {
        let cellColor
        if(this.state.cellData[i][j])
          cellColor = 'red'
        else
          cellColor = 'aqua'
        return <div key={j} className="cell" style={{backgroundColor: cellColor}} onClick={() => this.toggleCellStatus(i, j)}></div>
      })}</div>
    })
  }

  render() {
    return(
      <div>
        {this.state.data}
        <button onClick={(e) => this.getNewData(e)}>Get some data!</button>
        <p>Gameboard</p>
        <div className="game-board">
          {this.state.currentBoard}
        </div>
      </div>)
  }
}