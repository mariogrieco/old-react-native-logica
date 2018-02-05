const { Map, toJS, fromJS } = require('immutable')
let Board = Map()

Board = Board.set('size', 8)
Board = Board.set('state', Map())

function initialize (Board) {
  let state = Board.get('state')
  let size = Board.get('size')
  
  for ( let row = 0; row < size; row++ ) {
      for ( let col = 0; col < size; col++ ) {
        state = state.setIn([row, col], '0 ')
      }
  }

  state = state.setIn([size/2, size/2], 'B ')
  state = state.setIn([(size/2)+1, size/2], 'B ')
  state = state.setIn([(size/2)-1, (size/2)-1], 'B ')
  state = state.setIn([(size/2)-2, (size/2)-1], 'B ')
  state = state.setIn([(size/2)-3, (size/2)-1], 'B ')
  state = state.setIn([(size/2), (size/2)-1], 'N ')
  state = state.setIn([(size/2)+1, (size/2)-1], 'N ')
  state = state.setIn([(size/2)+2, (size/2)-1], 'N ')
  state = state.setIn([(size/2)-1, (size/2)], 'N ')
  state = state.setIn([(size/2)-2, (size/2)], 'N ')
//   state = state.setIn([(size/2)-3, (size/2)], 'N ')

  // return an empty board state
  return Board.set('state', state)
}

function printState (Board) {
  let state = Board.get('state')
  let size = Board.get('size')
    let printBuffer = ''

  for ( let row = 0; row < size; row++ ) {
    for ( let col = 0; col < size; col++ ) {
      let cell = state.getIn([row, col])
      printBuffer += `${cell}  `
    }
    console.log(printBuffer, "\n")
    printBuffer = ''
  }
}

function validate (Board, chip_name_a = 'B ', chip_name_b = 'N ') {
  let size = Board.get('size')
  let state = Board.get('state')

  for ( let row = 0; row < size; row++ ) {
    for ( let col = 0; col < size; col++ ) {
      if (state.getIn([row, col]) === chip_name_a) {
        let indexCol = col
        let indexRow = row
        let band = false
        //OTRO
            //   while () vertical pa "bajo"
            indexRow++
            while (indexRow < size && state.getIn([indexRow, col]) === chip_name_b) {
            indexRow++;
            band = true
            }
            if (band && indexRow < size) {
            state = state.setIn([indexRow, col], 'CM')   
            }

            //   while () vertical pa ""rriba""
            indexCol = col
            indexRow = row
            band = false
            indexRow--
            while (indexRow >= 0 && state.getIn([indexRow, col]) === chip_name_b) {
            indexRow--;
            band = true
            }
            if (band && indexRow >= 0) {
            state = state.setIn([indexRow, col], 'CM')   
            }

        //OTRO
            //   while () horizontal pa TRA
            indexCol = col
            indexRow = row
            band = false
            indexCol--
            while (indexCol >= 0 && state.getIn([row, indexCol]) === chip_name_b) {
            indexCol--;
            band = true
            }
            if (band && indexCol >= 0) {
            state = state.setIn([row, indexCol], 'CM')   
            }

            //   while () horizontal pa lante
            indexCol = col
            indexRow = row
            band = false
            indexCol++
            while (indexCol < size && state.getIn([row, indexCol]) === chip_name_b) {
            indexCol++;
            band = true
            }
            if (band && indexCol < size) {
            state = state.setIn([row, indexCol], 'CM')   
            }
    
    // OTRO
    indexCol = col
    indexRow = row
    band = false
        //   while () diegonal dere abajo

    //   while () diegonal izq abajo
    //   while () diegonal dere arriba
    //   while () diegonal izq arriba
      }
    }
  }

  return Board.set('state', state)
}

Board = initialize(Board)
// Board = validate(Board, 'N ', 'B ')
// printState(Board)
// console.log('\n')
Board = validate(Board)
printState(Board)