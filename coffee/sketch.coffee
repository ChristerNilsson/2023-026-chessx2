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

window.setup = =>

	global.SIZE = min innerWidth,innerHeight
	global.SIZE = innerHeight/18
	console.log global.SIZE

	createCanvas innerWidth,innerHeight
	textAlign CENTER,CENTER
	rectMode CENTER
	imageMode CENTER

	global.board = new Board 0
	global.board2 = new Board 1
	global.chess = new Chess()

	xdraw()

xdraw = =>
	background 'gray'
	textSize SIZE
	global.board.draw()
	global.board2.draw()
	# for button in global.buttons
	# 	button.draw()
	fill "black"
	textAlign CENTER,CENTER

#window.onresize = -> resize()

# resize = ->
# 	console.log 'resize'
# 	global.SIZE = min(innerWidth,innerWidth*0.75)
# 	# W = H
# 	global.SIZE = global.SIZE/15
# 	#mx = (innerWidth - 8*S)/2
# 	#my = S/2
# 	resizeCanvas innerWidth, innerHeight
# 	#xdraw()

window.mousePressed = =>
	help = ''
	if not released then return
	released = false

	for button in global.buttons.concat global.board.buttons
		if button.inside mouseX,mouseY
			button.onclick()
			xdraw()
			return false
	for square in global.board.squares
		if square.inside mouseX,mouseY
			square.onclick()
			xdraw()
			return false

	enterFullscreen()
	false

window.mouseReleased = =>
	released = true
	false