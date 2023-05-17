import {global} from '../js/globals.js'
import {Dialogue} from '../js/dialogue.js'
import {enterFullscreen} from '../js/utils.js'

sendMail = (subject,body) ->
	body += "\n\n"
	if subject == ""
		d = new Date()
		subject = d.toLocaleString 'sv-SE'
	m = "janchrister.nilsson@gmail.com"
	mail = document.getElementById "mail"
	mail.href = "mailto:" + m + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body) # encodeURI 
	console.log mail.href
	mail.click()

newGame = =>
	global.chess.reset()
	seconds = global.minutes*60 + global.increment
	global.clocks = [seconds,seconds]

export menu0 = -> # Main Menu
	global.dialogue = new Dialogue()
	global.dialogue.add 'Full Screen', ->
		enterFullscreen()
		global.dialogues.clear()
	global.dialogue.add 'Flip', -> global.dialogues.clear()
	global.dialogue.add 'Increment...', -> menu2()
	global.dialogue.add 'Send PGN', -> sendMail "", global.chess.pgn()
	global.dialogue.add 'Minutes...', -> menu1()
	global.dialogue.add 'New Game', ->
		newGame()
		seconds = global.minutes*60 + global.increment
		global.clocks = [seconds, seconds]
		console.log 'newGame',global.minutes,global.increment
		global.dialogues.clear()

	global.dialogue.clock ' ',true
	global.dialogue.textSize *= 1.5

setMinutes= (minutes) ->
	global.minutes = minutes
	seconds = minutes*60 + global.increment
	global.clocks = [seconds,seconds]
	global.dialogues.pop()

export menu1 = -> # Minutes...
	global.dialogue = new Dialogue()
	for n in [1,2,3,5,10,15,20,30,45,60,90]
		do (n) -> global.dialogue.add n.toString(), -> setMinutes n
	global.dialogue.clock()
	global.dialogue.textSize *= 0.5

setIncrement = (increment) ->
	global.increment = increment
	seconds = global.minutes*60 + global.increment
	global.clocks = [seconds,seconds]
	global.dialogues.pop()

export menu2 = -> # Increment...
	global.dialogue = new Dialogue()
	for n in [0,1,2,3,5,10,15,20,30,40,50]
		do (n) -> global.dialogue.add n.toString(), -> setIncrement n
	global.dialogue.clock()
	global.dialogue.textSize *= 0.5
