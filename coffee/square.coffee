import {global} from '../js/globals.js'
import {param} from '../js/utils.js'

pics = global.pics
width = global.width

export class Square
	constructor: (@nr,@i,@x,@y,@onclick) ->
		@ix = @i %% 8
		@iy = 7 - @i//8
		@w = global.SIZE
		@h = global.SIZE
		@col = 'white'

	draw : (piece,selected) =>
		if (@ix+@iy) % 2 == 1 then fill 'gray' else fill 'lightgray'
		if selected then fill 'green'
		[x,y] = [@ix+0.5, @iy+0.5]
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
		res =   @x-@w/2 < mx-global.SIZE/2 < @x+@w/2
		res and @y-@h/2 < my-global.SIZE/2 < @y+@h/2
