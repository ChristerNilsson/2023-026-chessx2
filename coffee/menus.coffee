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

export menu0 = -> # Main Menu
	global.dialogue = new Dialogue()
	global.dialogue.add 'Full Screen', ->
		enterFullscreen()
		global.dialogues.clear()
	global.dialogue.add 'Send PGN', -> sendMail "", global.chess.pgn()
	global.dialogue.add 'Increment...', -> menu2()
	global.dialogue.add 'Analysis', ->
		console.log global.chess.pgn()
		window.open 'https://lichess.org/paste/'
		global.dialogues.clear()

#link = => 'https://lichess.org/analysis/' + global.chess.fen()

	global.dialogue.add 'Minutes...', -> menu1()
	global.dialogue.add 'New Game', ->
		# newGame()
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
	global.dialogues.clear()

export menu1 = -> # Minutes...
	global.dialogue = new Dialogue()
	global.dialogue.add '1', -> setMinutes 1
	global.dialogue.add '2', -> setMinutes 2
	global.dialogue.add '3', -> setMinutes 3
	global.dialogue.add '5', -> setMinutes 5
	global.dialogue.add '10', -> setMinutes 10
	global.dialogue.add '15', -> setMinutes 15
	global.dialogue.add '20', -> setMinutes 20
	global.dialogue.add '30', -> setMinutes 30
	global.dialogue.add '45', -> setMinutes 45
	global.dialogue.add '60', -> setMinutes 60
	global.dialogue.add '90', -> setMinutes 90
	global.dialogue.clock()
	# global.dialogue.textSize *= 1

setIncrement = (increment) ->
	global.increment = increment
	seconds = global.minutes*60 + global.increment
	global.clocks = [seconds,seconds]
	global.dialogues.clear()

export menu2 = -> # Increment...
	global.dialogue = new Dialogue()
	global.dialogue.add '0', -> setIncrement 0
	global.dialogue.add '1', -> setIncrement 1
	global.dialogue.add '2', -> setIncrement 2
	global.dialogue.add '3', -> setIncrement 3
	global.dialogue.add '5', -> setIncrement 5
	global.dialogue.add '10', -> setIncrement 10
	global.dialogue.add '15', -> setIncrement 15
	global.dialogue.add '20', -> setIncrement 20
	global.dialogue.add '30', -> setIncrement 30
	global.dialogue.add '40', -> setIncrement 40
	global.dialogue.add '50', -> setIncrement 50
	global.dialogue.clock()
	# global.dialogue.textSize *= 1
