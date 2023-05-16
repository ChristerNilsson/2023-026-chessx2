import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range,enterFullscreen,signal} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {global} from '../js/globals.js'

released = true # prevention of touch bounce
arr = null

window.fetcher = => navigator.clipboard.writeText global.chess.pgn()

window.preload = =>
	for letter in "rnbqkp"
		global.pics[letter] = loadImage './images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage './images/w' + letter.toLowerCase() + '.png'

fullScreen = => enterFullscreen()

window.setup = =>

	createCanvas innerWidth,innerHeight

	[global.size, global.setSize] = signal round min(innerWidth,innerHeight)/18
	[global.mx, global.setMx] = signal round (innerWidth - 8 * global.size())/2
	[global.my, global.setMy] = signal round (innerHeight - 17 * global.size())/2

	resize()

	textAlign CENTER,CENTER
	rectMode CENTER
	imageMode CENTER

	global.board0 = new Board 0
	global.board1 = new Board 1
	global.chess = new Chess()

	# button = document.getElementById "myButton"
	# button.onclick = () =>
	# 	s = "Hula Jönsson"
	# 	navigator.clipboard.writeText s

		# input = document.getElementById "myInput"
		# input.focus()
		# input.select()
		# input.setSelectionRange 0, 99999
		# navigator.clipboard.writeText input.value
		# console.log input.value

window.draw = =>
	background 'gray'
	textSize global.size()
	global.board0.draw()
	global.board1.draw()
	for button in global.buttons
		button.draw()
	fill "black"
	textAlign CENTER,CENTER

window.onresize = -> resize()

resize = ->
	global.setSize round innerHeight/18
	resizeCanvas innerWidth, innerHeight
	global.setMx round (innerWidth - 8 * global.size())/2
	console.log 'size',global.size()
	global.setMy round (innerHeight - 17 * global.size())/2
	global.buttons = []
	global.buttons.push new Button round(2*width/3),round(height/2), 'Full Screen', fullScreen
	global.buttons.push new Button round(width/3),round(height/2), 'Copy', () => navigator.clipboard.writeText global.chess.pgn()

window.mousePressed = =>
	console.log 'mousePressed'
	if not released then return
	released = false

	for button in global.buttons.concat global.buttons
		if button.inside mouseX,mouseY
			button.onclick()
			return false
	for square in global.board0.squares.concat global.board1.squares
		if square.inside mouseX,mouseY
			console.log 'square.inside',square.nr
			square.onclick()
			return false
	false

window.mouseReleased = =>
	released = true
	false

