'use strict'

var gBoard
var gNums
var gCountNum
var gGameIsOn
var gGameLevel = { board: 5, num: 25 }
var gTimeInterval
var gRenderTimer
var gSecond
var gMinutes
var gLastElBtn = document.querySelector('.btn2')

function init() {
    gMinutes = 0
    gSecond = 0
    gCountNum = 0
    gGameIsOn = true
    gNums = createNums(gGameLevel.num)
    gBoard = createBoard(gGameLevel.board)
    renderBoard(gBoard)
    gNums = createNums(gGameLevel.num)
    renderGamePanel()
    gTimeInterval = setInterval(timerUpdate, 1000)
    gRenderTimer = setInterval(renderTimer, 1000)
}

function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            var num = drawNum()
            board[i][j] = num
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cellNum = board[i][j]
            var className = ''
            strHTML += `<td class="cell" data-num=${cellNum} data-i=${i} data-j=${j}
             onclick="cellClicked(this,${i},${j})">${cellNum}</td>`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}

function renderGamePanel() {
    if (!gGameIsOn) return
    var num = gCountNum + 1
    if (gCountNum === gBoard.length * gBoard[0].length) {
        playSound('win')
        num = '🤴'
    }
    var elNextNum = document.querySelector('.count-num')
    elNextNum.innerText = num
}
function timerUpdate() {
    gSecond++
    if (gSecond >= 60) {
        gSecond = 0
        gMinutes++
    }
}

function renderTimer() {
    var strSecond = ':0' + gSecond
    var strMinute = '00'
    if (gSecond > 9) {
        strSecond = ':' + gSecond
    }
    if (gMinutes >= 1) {
        strMinute = '0' + gMinutes
    }
    var time = strMinute + strSecond
    var elTimer = document.querySelector('.timer-count')
    elTimer.innerText = time
}

function cellClicked(elCell, clickedNum) {
    if (!gGameIsOn) return
    var num = +elCell.dataset.num
    if (gCountNum !== gBoard.length * gBoard[0].length) {
        if (num === gNums[gCountNum]) {
            gCountNum++
            renderGamePanel()
            elCell.classList.add('correct')
            playSound('correct')
        }
    } else gameover()
}
function playSound(sound) {
    var playSound = new Audio(`./sound/${sound}.wav`)
    playSound.play()
}




function gameover() {
    gGameIsOn = false
    clearInterval(gTimeInterval)
    clearInterval(gRenderTimer)
}

function choseLevel(length, num, elBtn) {
    gLastElBtn.classList.remove('chose')
    gLastElBtn = elBtn
    gLastElBtn.classList.add('chose')
    gameover()
    gGameLevel.board = length
    gGameLevel.num = num
    init()
}

function drawNum() {
    var randomIdx = getRandomInt(0, gNums.length)
    return +gNums.splice(randomIdx, 1)
}

function createNums(num) {
    var nums = []
    for (var i = 0; i < num; i++) {
        nums[i] = i + 1
    }
    return nums
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}