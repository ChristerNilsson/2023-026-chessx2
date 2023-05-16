// Generated by CoffeeScript 2.5.1
var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

import _ from 'https://cdn.skypack.dev/lodash';

import {
  ass,
  lerp,
  param,
  range,
  hexToBase64,
  enterFullscreen
} from '../js/utils.js';

import {
  Square
} from '../js/square.js';

import {
  Button
} from '../js/button.js';

import {
  coords,
  global,
  toObjectNotation,
  toUCI
} from '../js/globals.js';

import {
  dumpState
} from '../js/globals.js';

export var Board = class Board {
  constructor(nr) {
    var i, k, len, ref;
    this.click = this.click.bind(this);
    this.draw = this.draw.bind(this);
    this.littera = this.littera.bind(this);
    this.nr = nr;
    this.squares = [];
    this.clickedSquares = [];
    this.pieces = "";
    ref = range(64);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      ((i) => {
        return this.squares.push(new Square(this.nr, i, () => {
          return this.click(i);
        }));
      })(i);
    }
    this.buttons = [];
  }

  click(i) {
    var col, color, csl, g, input, row, sq, uci;
    g = global;
    if (this.nr === modulo(g.chess.history().length, 2)) {
      return;
    }
    col = modulo(i, 8);
    row = 7 - Math.floor(i / 8);
    sq = g.chess.board()[row][col];
    color = "wb"[modulo(g.chess.history().length, 2)];
    csl = this.clickedSquares.length;
    if (csl === 0) {
      if (sq !== null && sq.color === color) {
        return this.clickedSquares.push(i);
      }
    } else if (csl === 1) {
      if (i === this.clickedSquares[0]) {
        return this.clickedSquares = []; // kontrollera draget
      } else {
        this.clickedSquares.push(i);
        uci = toUCI(this.clickedSquares);
        // är detta ett korrekt drag? I så fall, utför det
        if (g.chess.move({
          from: uci.slice(0, 2),
          to: uci.slice(2, 4)
        })) {
          input = document.getElementById("myInput");
          input.value = g.chess.pgn();
          navigator.clipboard.writeText(g.chess.pgn());
          return this.clickedSquares = [];
        } else {
          return this.clickedSquares.pop();
        }
      }
    }
  }

  draw() {
    var SIZE, button, i, j, k, l, len, len1, len2, m, piece, ref, ref1, ref2, ref3, ref4, ref5, sq;
    ref = this.buttons;
    for (k = 0, len = ref.length; k < len; k++) {
      button = ref[k];
      button.draw();
    }
    fill('white');
    textSize(global.size() * 0.3);
    push();
    if (this.nr === 0) {
      translate(global.mx(), global.my());
    } else {
      translate(global.mx(), global.my() + 9 * global.size());
    }
    ref1 = range(8);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      i = ref1[l];
      ref2 = range(8);
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        j = ref2[m];
        piece = global.chess.board()[7 - i][j];
        sq = this.squares[i * 8 + j];
        if ((ref3 = this.clickedSquares.length) === 0 || ref3 === 2) {
          sq.draw(piece, false);
        }
        if ((ref4 = this.clickedSquares.length) === 1) {
          sq.draw(piece, i * 8 + j === this.clickedSquares[0]);
        } else if ((ref5 = this.clickedSquares.length) === 3 || ref5 === 4) {
          sq.draw(piece, i * 8 + j === this.clickedSquares[2]);
        }
      }
    }
    stroke('black');
    if (this.nr === global.chess.history().length % 2) {
      fill(128, 128, 128, 64);
    } else {
      noFill();
    }
    SIZE = global.size();
    rect(SIZE * 4, SIZE * 4, SIZE * 8, SIZE * 8);
    return pop();
  }

  littera() {
    var SIZE, digits, i, k, len, letters, ref, results;
    SIZE = global.size();
    noStroke();
    fill('black');
    textSize(SIZE * 0.3);
    letters = false ? "hgfedcba" : "abcdefgh";
    digits = false ? "12345678" : "87654321";
    ref = range(8);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      text(letters[i], SIZE * (i + 1), SIZE * 8.8);
      results.push(text(digits[i], SIZE * 0.15, SIZE * (i + 1)));
    }
    return results;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksSUFBWjtFQUFpQixLQUFqQjtFQUF1QixLQUF2QjtFQUE2QixXQUE3QjtFQUF5QyxlQUF6QztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtFQUFlLE1BQWY7RUFBc0IsZ0JBQXRCO0VBQXVDLEtBQXZDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsU0FBUjtDQUFBLE1BQUE7O0FBRUEsT0FBQSxJQUFhLFFBQU4sTUFBQSxNQUFBO0VBQ04sV0FBYSxHQUFBLENBQUE7QUFDZCxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO1FBUUMsQ0FBQSxZQUFBLENBQUE7UUF5QkEsQ0FBQSxXQUFBLENBQUE7UUE2QkEsQ0FBQSxjQUFBLENBQUE7SUEvRGMsSUFBQyxDQUFBO0lBQ2QsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQUMsQ0FBQSxNQUFELEdBQVU7QUFDVjtJQUFBLEtBQUEscUNBQUE7O01BQ0ksQ0FBQSxDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxNQUFKLENBQVcsSUFBQyxDQUFBLEVBQVosRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBQSxDQUFBLEdBQUE7aUJBQUcsSUFBQyxDQUFBLEtBQUQsQ0FBTyxDQUFQO1FBQUgsQ0FBbkIsQ0FBZDtNQUFQLENBQUEsRUFBQztJQURMO0lBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVztFQVBDOztFQVNiLEtBQVEsQ0FBQyxDQUFE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SyxDQUF4QixFQUEwQixJQUFBLEdBQUssQ0FBL0I7V0FDQSxHQUFBLENBQUE7RUEzQk07O0VBNkJQLE9BQVUsQ0FBQSxDQUFBO0FBQ1gsUUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7SUFBRSxJQUFBLEdBQU8sTUFBTSxDQUFDLElBQVAsQ0FBQTtJQUNQLFFBQUEsQ0FBQTtJQUNBLElBQUEsQ0FBSyxPQUFMO0lBQ0EsUUFBQSxDQUFTLElBQUEsR0FBSyxHQUFkO0lBQ0EsT0FBQSxHQUFhLEtBQUgsR0FBYyxVQUFkLEdBQThCO0lBQ3hDLE1BQUEsR0FBYSxLQUFILEdBQWMsVUFBZCxHQUE4QjtBQUV4QztBQUFBO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFBLENBQUssT0FBTyxDQUFDLENBQUQsQ0FBWixFQUFnQixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFyQixFQUEyQixJQUFBLEdBQUssR0FBaEM7bUJBQ0EsSUFBQSxDQUFLLE1BQU0sQ0FBQyxDQUFELENBQVgsRUFBZSxJQUFBLEdBQUssSUFBcEIsRUFBeUIsSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBOUI7SUFGRCxDQUFBOztFQVJTOztBQWhFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2h0dHBzOi8vY2RuLnNreXBhY2suZGV2L2xvZGFzaCdcclxuaW1wb3J0IHthc3MsbGVycCxwYXJhbSxyYW5nZSxoZXhUb0Jhc2U2NCxlbnRlckZ1bGxzY3JlZW59IGZyb20gJy4uL2pzL3V0aWxzLmpzJ1xyXG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vanMvc3F1YXJlLmpzJ1xyXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vanMvYnV0dG9uLmpzJ1xyXG5pbXBvcnQge2Nvb3JkcyxnbG9iYWwsdG9PYmplY3ROb3RhdGlvbix0b1VDSX0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuaW1wb3J0IHtkdW1wU3RhdGV9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgQm9hcmRcclxuXHRjb25zdHJ1Y3RvcjogKEBucikgLT5cclxuXHRcdEBzcXVhcmVzID0gW11cclxuXHRcdEBjbGlja2VkU3F1YXJlcyA9IFtdXHJcblx0XHRAcGllY2VzID0gXCJcIlxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgNjRcclxuXHRcdFx0ZG8gKGkpID0+IEBzcXVhcmVzLnB1c2ggbmV3IFNxdWFyZSBAbnIsIGksID0+IEBjbGljayBpXHJcblxyXG5cdFx0QGJ1dHRvbnMgPSBbXVxyXG5cclxuXHRjbGljayA6IChpKSA9PlxyXG5cdFx0ZyA9IGdsb2JhbFxyXG5cdFx0aWYgQG5yID09IGcuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCAlJSAyIHRoZW4gcmV0dXJuXHJcblx0XHRjb2wgPSBpICUlIDhcclxuXHRcdHJvdyA9IDcgLSBpIC8vIDhcclxuXHRcdHNxID0gZy5jaGVzcy5ib2FyZCgpW3Jvd11bY29sXVxyXG5cdFx0Y29sb3IgPSBcIndiXCJbZy5jaGVzcy5oaXN0b3J5KCkubGVuZ3RoICUlIDJdICMgZsO2cnbDpG50YWQgZsOkcmcgcMOlIHBqw6RzZW5cclxuXHRcdGNzbCA9IEBjbGlja2VkU3F1YXJlcy5sZW5ndGhcclxuXHRcdGlmIGNzbCA9PSAwXHJcblx0XHRcdGlmIHNxICE9IG51bGwgYW5kIHNxLmNvbG9yID09IGNvbG9yIHRoZW4gQGNsaWNrZWRTcXVhcmVzLnB1c2ggaVxyXG5cdFx0ZWxzZSBpZiBjc2wgPT0gMVxyXG5cdFx0XHRpZiBpID09IEBjbGlja2VkU3F1YXJlc1swXSAjIMOlbmdyYSBvbSBzYW1tYSBydXRhXHJcblx0XHRcdFx0QGNsaWNrZWRTcXVhcmVzID0gW11cclxuXHRcdFx0ZWxzZSAjIGtvbnRyb2xsZXJhIGRyYWdldFxyXG5cdFx0XHRcdEBjbGlja2VkU3F1YXJlcy5wdXNoIGlcclxuXHRcdFx0XHR1Y2kgPSB0b1VDSSBAY2xpY2tlZFNxdWFyZXNcclxuXHRcdFx0XHQjIMOkciBkZXR0YSBldHQga29ycmVrdCBkcmFnPyBJIHPDpSBmYWxsLCB1dGbDtnIgZGV0XHJcblx0XHRcdFx0aWYgZy5jaGVzcy5tb3ZlIHtmcm9tOnVjaS5zbGljZSgwLDIpLCB0bzp1Y2kuc2xpY2UoMiw0KX1cclxuXHRcdFx0XHRcdGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJteUlucHV0XCJcclxuXHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZy5jaGVzcy5wZ24oKVxyXG5cdFx0XHRcdFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQgZy5jaGVzcy5wZ24oKVxyXG5cdFx0XHRcdFx0QGNsaWNrZWRTcXVhcmVzID0gW11cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMucG9wKClcclxuXHJcblx0ZHJhdyA6ID0+XHJcblxyXG5cdFx0Zm9yIGJ1dHRvbiBpbiBAYnV0dG9uc1xyXG5cdFx0XHRidXR0b24uZHJhdygpXHJcblxyXG5cdFx0ZmlsbCAnd2hpdGUnXHJcblx0XHR0ZXh0U2l6ZSBnbG9iYWwuc2l6ZSgpICogMC4zXHJcblxyXG5cdFx0cHVzaCgpXHJcblx0XHRpZiBAbnI9PTAgdGhlbiB0cmFuc2xhdGUgZ2xvYmFsLm14KCksIGdsb2JhbC5teSgpXHJcblx0XHRlbHNlIHRyYW5zbGF0ZSBnbG9iYWwubXgoKSwgZ2xvYmFsLm15KCkgKyA5ICogZ2xvYmFsLnNpemUoKVxyXG5cclxuXHRcdGZvciBpIGluIHJhbmdlIDhcclxuXHRcdFx0Zm9yIGogaW4gcmFuZ2UgOFxyXG5cdFx0XHRcdHBpZWNlID0gZ2xvYmFsLmNoZXNzLmJvYXJkKClbNy1pXVtqXVxyXG5cdFx0XHRcdHNxID0gQHNxdWFyZXNbaSo4K2pdXHJcblx0XHRcdFx0aWYgQGNsaWNrZWRTcXVhcmVzLmxlbmd0aCBpbiBbMCwyXVxyXG5cdFx0XHRcdFx0c3EuZHJhdyBwaWVjZSwgZmFsc2VcclxuXHRcdFx0XHRpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFsxXVxyXG5cdFx0XHRcdFx0c3EuZHJhdyBwaWVjZSwgaSo4K2o9PUBjbGlja2VkU3F1YXJlc1swXVxyXG5cdFx0XHRcdGVsc2UgaWYgQGNsaWNrZWRTcXVhcmVzLmxlbmd0aCBpbiBbMyw0XVxyXG5cdFx0XHRcdFx0c3EuZHJhdyBwaWVjZSwgaSo4K2o9PUBjbGlja2VkU3F1YXJlc1syXVxyXG5cclxuXHRcdHN0cm9rZSAnYmxhY2snXHJcblx0XHRpZiBAbnIgPT0gZ2xvYmFsLmNoZXNzLmhpc3RvcnkoKS5sZW5ndGglMiB0aGVuIGZpbGwgMTI4LDEyOCwxMjgsNjQgZWxzZSBub0ZpbGwoKVxyXG5cdFx0U0laRSA9IGdsb2JhbC5zaXplKClcclxuXHRcdHJlY3QgU0laRSo0LFNJWkUqNCxTSVpFKjgsU0laRSo4XHJcblx0XHRwb3AoKVxyXG5cclxuXHRsaXR0ZXJhIDogPT5cclxuXHRcdFNJWkUgPSBnbG9iYWwuc2l6ZSgpXHJcblx0XHRub1N0cm9rZSgpXHJcblx0XHRmaWxsICdibGFjaydcclxuXHRcdHRleHRTaXplIFNJWkUqMC4zXHJcblx0XHRsZXR0ZXJzID0gaWYgZmFsc2UgdGhlbiBcImhnZmVkY2JhXCIgZWxzZSBcImFiY2RlZmdoXCJcclxuXHRcdGRpZ2l0cyAgPSBpZiBmYWxzZSB0aGVuIFwiMTIzNDU2NzhcIiBlbHNlIFwiODc2NTQzMjFcIlxyXG5cclxuXHRcdGZvciBpIGluIHJhbmdlIDhcclxuXHRcdFx0dGV4dCBsZXR0ZXJzW2ldLFNJWkUqKGkrMSksU0laRSo4LjhcclxuXHRcdFx0dGV4dCBkaWdpdHNbaV0sU0laRSowLjE1LFNJWkUqKGkrMSlcclxuIl19
//# sourceURL=c:\github\2023-026-chessx2\coffee\board.coffee