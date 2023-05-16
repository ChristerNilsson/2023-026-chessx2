import _ from 'https://cdn.skypack.dev/lodash'
import {ass,lerp,param,range,hexToBase64,enterFullscreen} from '../js/utils.js'
import {Square} from '../js/square.js'
import {Button} from '../js/button.js'
import {coords,clickString,global,toObjectNotation,toUCI} from '../js/globals.js'
import {dumpState} from '../js/globals.js'

export class Board
	constructor: (@nr) ->
		@squares = []
		@clickedSquares = []
		@pieces = ""
		for i in range 64
			ix = i %% 8
			iy = 7 - i // 8
			x = global.mx + global.SIZE * ix
			y = global.my + global.SIZE * iy + @nr * global.SIZE* 9
			do (i,x,y) => @squares.push new Square @nr, i, x, y, => @click i

		@buttons = []

	click : (i) =>
		g = global
		col = i %% 8
		row = 7 - i // 8
		sq = g.chess.board()[row][col]
		color = "wb"[g.chess.history().length %% 2] # förväntad färg på pjäsen
		csl = @clickedSquares.length
		if csl == 0
			if sq != null and sq.color == color then @clickedSquares.push i
		else if csl == 1
			if i == @clickedSquares[0] # ångra om samma ruta
				@clickedSquares = []
			else # kontrollera draget
				@clickedSquares.push i
				uci = toUCI @clickedSquares
				# är detta ett korrekt drag? I så fall, utför det
				if g.chess.move {from:uci.slice(0,2), to:uci.slice(2,4)}
					# console.log g.chess.pgn()
					navigator.clipboard.writeText g.chess.pgn()
					@clickedSquares = []
				else
					@clickedSquares.pop()

	draw : =>

		for button in @buttons
			button.draw()

		fill 'white'
		textSize global.SIZE*0.3

		push()
		if @nr==0 then translate global.mx, global.my
		else translate global.mx, global.my + 9 * global.SIZE

		for i in range 8
			for j in range 8
				piece = global.chess.board()[7-i][j]
				sq = @squares[i*8+j]
				if @clickedSquares.length in [0,2]
					sq.draw piece, false
				if @clickedSquares.length in [1]
					sq.draw piece, i*8+j==@clickedSquares[0]
				else if @clickedSquares.length in [3,4]
					sq.draw piece, i*8+j==@clickedSquares[2]

		stroke 'black'
		if @nr==0 then fill 128,128,128,64 else noFill()
		rect global.SIZE*4,global.SIZE*4,global.SIZE*8,global.SIZE*8
		pop()
		#@littera()

	littera : =>
		noStroke()
		fill 'black'
		textSize global.SIZE*0.3
		letters = if false then "hgfedcba" else "abcdefgh"
		digits  = if false then "12345678" else "87654321"

		for i in range 8
			text letters[i],global.SIZE*(i+1),global.SIZE*8.8
			text digits[i],global.SIZE*0.15,global.SIZE*(i+1)
