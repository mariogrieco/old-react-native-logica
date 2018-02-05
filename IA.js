const utils = require('./utils')
const { Map, List, toJS, fromJS } = require('immutable')
let oneBoard = utils.getOneBoard()

function getMinMax () {

}

const blancas = 'B '
const negras = 'N '
const puedeMover = 'CM'

let canN = utils.validate(oneBoard, blancas, negras)
console.log('las blancas pueden en')
utils.printState(canN)

let canB = utils.validate(oneBoard, negras, blancas)
console.log('las blancas pueden en')
utils.printState(canB)

// para comer
// utils.eat(board, col, row, quien?) comiendo desde posible lugar! el turno de quien come...