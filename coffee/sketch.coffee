import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range,enterFullscreen} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {clickString,global} from '../js/globals.js'

SIZE = global.SIZE
released = true # prevention of touch bounce
arr = null

window.preload = =>
	for letter in "rnbqkp"
		global.pics[letter] = loadImage './images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage './images/w' + letter.toLowerCase() + '.png'

fullScreen = =>
	global.buttons = []
	enterFullscreen()

window.setup = =>

	createCanvas innerWidth,innerHeight

	global.SIZE = min innerWidth,innerHeight
	global.SIZE = round innerHeight/18
	console.log global.SIZE

	resize()

	global.buttons.push new Button width/2, height/2, 'Full Screen', fullScreen

	textAlign CENTER,CENTER
	rectMode CENTER
	imageMode CENTER

	global.board = new Board 0
	global.board2 = new Board 1
	global.chess = new Chess()

window.draw = =>
	background 'gray'
	textSize SIZE
	global.board.draw()
	global.board2.draw()
	for button in global.buttons
		button.draw()
	fill "black"
	textAlign CENTER,CENTER

window.onresize = -> resize()

resize = ->
	global.SIZE = round innerHeight/18
	console.log 'resize',global.SIZE
	resizeCanvas innerWidth, innerHeight
	global.mx = (innerWidth - 8 * global.SIZE)/2
	global.my = (innerHeight - 17 * global.SIZE)/2

window.mousePressed = =>
	help = ''
	if not released then return
	released = false

	for button in global.buttons.concat global.buttons
		if button.inside mouseX,mouseY
			button.onclick()
			return false
	for square in global.board.squares
		if square.inside mouseX,mouseY
			square.onclick()
			return false
	false

window.mouseReleased = =>
	released = true
	false