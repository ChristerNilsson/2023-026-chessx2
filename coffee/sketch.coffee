import _ from 'https://cdn.skypack.dev/lodash'
import {ass,log,range,enterFullscreen,signal} from '../js/utils.js'
import {Board} from '../js/board.js'
import {Button} from '../js/button.js'
import {global} from '../js/globals.js'
import {menu0} from '../js/menus.js'
import {MenuButton} from '../js/dialogue.js'

released = true # prevention of touch bounce
arr = null
Array.prototype.clear = -> @length = 0

window.preload = =>
	for letter in "rnbqkp"
		global.pics[letter] = loadImage './images/b' + letter + '.png'
	for letter in "RNBQKP"
		global.pics[letter] = loadImage './images/w' + letter.toLowerCase() + '.png'

fullScreen = => enterFullscreen()

showDialogue = -> if global.dialogues.length > 0 then (_.last global.dialogues).show()

window.setup = =>

	createCanvas innerWidth,innerHeight

	[global.size, global.setSize] = signal round min(innerWidth,innerHeight)/18
	[global.mx, global.setMx] = signal round (innerWidth - 8 * global.size())/2
	[global.my, global.setMy] = signal round (innerHeight - 17 * global.size())/2

	resize()

	textAlign CENTER,CENTER
	rectMode CENTER
	imageMode CENTER
	angleMode DEGREES

	global.board0 = new Board 0
	global.board1 = new Board 1
	global.chess = new Chess()

window.draw = =>
	background 'gray'
	textSize global.size()
	global.board0.draw()
	global.board1.draw()
	for button in global.buttons
		button.draw()
	fill "black"
	textAlign CENTER,CENTER
	showDialogue()

window.onresize = -> resize()

# window.keyPressed = =>
# 	if global.dialogues.length == 0 then menu0() # else dialogues.clear()

resize = ->
	global.setSize round innerHeight/18
	resizeCanvas innerWidth, innerHeight
	global.setMx round (innerWidth - 8 * global.size())/2
	#console.log 'size',global.size()
	global.setMy round (innerHeight - 17 * global.size())/2
	global.buttons = []
	global.buttons.push new MenuButton round(      global.mx()/2), round(0.80*height)
	global.buttons.push new MenuButton round(width-global.mx()/2), round(0.20*height)

window.mousePressed = =>
	if not released then return
	released = false

	if global.dialogues.length == 0
		#console.log 'mousePressed'
		for button in global.buttons #.concat global.buttons
			if button.inside mouseX,mouseY
				button.onclick()
				return false
		for square in global.board0.squares.concat global.board1.squares
			if square.inside mouseX,mouseY
				#console.log 'square.inside',square.nr
				square.onclick()
				return false
		false
	else
		(_.last global.dialogues).execute mouseX,mouseY
		false

window.mouseReleased = =>
	released = true
	false
