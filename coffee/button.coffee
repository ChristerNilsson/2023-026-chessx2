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
