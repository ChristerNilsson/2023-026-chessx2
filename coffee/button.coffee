import {global} from '../js/globals.js'
import {param,range} from '../js/utils.js'

export class Button
	constructor: (@x,@y,@text,@onclick) ->
		@w = 3 * global.size()
		@h = 4 * global.size()
		@bg = 'lightgray'
		@fg = 'black'
		@align = CENTER

	draw : =>
		noStroke()
		#fill @bg
		#rect @x,@y,@w,@h*0.65

		if @align==LEFT then x=@x-0.45*@w else x=@x
		#fill @fg
		push()
		textSize 2*global.size() # 0.4
		textAlign @align
		noStroke()
		text @text, x,@y+0.05*global.size()
		pop()

	inside : (x,y) =>
		param.Number x
		param.Number y
		param.Boolean @x-@w/2 < x < @x+@w/2 and @y-@h/2 < y < @y+@h/2

export class ClockButton extends Button
	constructor: (x,y,@nr,onclick) ->
		super x,y,'',onclick
		@w = 2.6 * global.size()
		@h = 4 * global.size()
		@state = -1 # paused

	draw : =>
		noStroke()
		push()
		textSize 2*global.size()
		textAlign @align
		noStroke()
		@drawClock 0
		@drawClock 1
		pop()

	drawClock : (player) =>
		p = global.chess.history().length %% 2
		if global.clocks[player] < 60 then fill "red"
		noStroke()
		textSize global.size()
		t = global.clocks[player]
		if not global.paused and p!=player
			t -= 1/240
		global.clocks[player] = t
		t = round t
		sekunder = t %% 60
		t = t // 60
		if sekunder < 10 then sekunder = "0" + sekunder
		minuter = t %% 60
		if minuter < 10 then minuter = "0" + minuter
		timmar = t // 60
		if timmar > 0 then res = timmar + "h" + minuter
		else res = minuter + ":" + sekunder

		@bg = ['black','white'][player]
		@bg = 'gray' if p == player or global.paused

		push()
		x = if @nr == 0 then global.mx()/2 else width-global.mx()/2
		y = global.size() * [8,10][player]
		translate x, y
		if @nr==1 then scale -1,-1
		fill @bg
		rect 0,0,@w,@h*0.22
		fill ['white','black'][player]
		console.log global.windows
		if global.windows
			text res, 0,0.1*global.size()
		else
			text res, 0,0.0*global.size()
		pop()

		push()
		y = global.size() * 9
		translate x,y
		if @nr==1 then scale -1,-1
		fill 'white'
		textSize global.size()*0.5
		text global.material, 0,0 #[-global.size(),global.size()][player]
		pop()

