import _ from 'https://cdn.skypack.dev/lodash'
import {ass,lerp,param,range,hexToBase64,enterFullscreen} from '../js/utils.js'
import {Square} from '../js/square.js'
import {Button} from '../js/button.js'
import {coords,global,toObjectNotation,toUCI} from '../js/globals.js'
import {dumpState} from '../js/globals.js'

export class Board
	constructor: (@nr) ->
		@squares = []
		@clickedSquares = []
		@pieces = ""
		for i in range 64
			do (i) => @squares.push new Square @nr, i, => @click i

		@buttons = []

	click : (i) =>
		g = global
		if @nr == g.chess.history().length %% 2 then return
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
					# navigator.clipboard.writeText g.chess.pgn()
					input = document.getElementById "myInput"
					input.value = global.chess.pgn()
					@clickedSquares = []
				else
					@clickedSquares.pop()

	draw : =>

		for button in @buttons
			button.draw()

		fill 'white'
		textSize global.size() * 0.3

		push()
		if @nr==0 then translate global.mx(), global.my()
		else translate global.mx(), global.my() + 9 * global.size()

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
		if @nr == global.chess.history().length%2 then fill 128,128,128,64 else noFill()
		SIZE = global.size()
		rect SIZE*4,SIZE*4,SIZE*8,SIZE*8
		pop()

	littera : =>
		SIZE = global.size()
		noStroke()
		fill 'black'
		textSize SIZE*0.3
		letters = if false then "hgfedcba" else "abcdefgh"
		digits  = if false then "12345678" else "87654321"

		for i in range 8
			text letters[i],SIZE*(i+1),SIZE*8.8
			text digits[i],SIZE*0.15,SIZE*(i+1)
