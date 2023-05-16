import {global} from '../js/globals.js'
import {param} from '../js/utils.js'

#SIZE = global.SIZE
pics = global.pics
width = global.width

export class Square
	constructor: (@nr,@i,@onclick) ->
		param.Integer @i
		@x = @i%8
		@y = 7 - @i//8
		@w = global.SIZE
		@h = global.SIZE
		@col = 'white'

	draw : (piece,flipped,selected) =>
		#param.Test piece==null or piece.type in 'rnbqkp' and piece.color in 'bw'
		#param.Boolean flipped
		if (@x+@y) % 2 == 1 then fill 'gray' else fill 'lightgray'
		if selected then fill 'green'
		[x,y] = [@x,@y]
		[x,y] = [x+0.5,y+0.5]
		noStroke()
		rect global.SIZE*x, global.SIZE*y,global.SIZE,global.SIZE
		if not piece then return
		key = piece.type.toLowerCase()
		if piece.color == 'w' then key = key.toUpperCase()

		if @nr==0
			push()
			translate global.SIZE*x, global.SIZE*y
			scale -1,-1
			image pics[key],0, 0,global.SIZE,global.SIZE
			pop()
		else
			image pics[key], global.SIZE*x, global.SIZE*y,global.SIZE,global.SIZE

	inside : (mx,my) =>
		param.Number mx
		param.Number my
		x = (@x+1)*global.SIZE
		y = (@y+1)*global.SIZE
		res = x-@w/2 < mx < x+@w/2 and y-@h/2 < my < y+@h/2
		param.Boolean res
