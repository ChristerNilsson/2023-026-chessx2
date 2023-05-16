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
    var col, color, csl, g, row, sq, uci;
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
          // console.log g.chess.pgn()
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
    console.log(global.chess.history());
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksSUFBWjtFQUFpQixLQUFqQjtFQUF1QixLQUF2QjtFQUE2QixXQUE3QjtFQUF5QyxlQUF6QztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtFQUFlLE1BQWY7RUFBc0IsZ0JBQXRCO0VBQXVDLEtBQXZDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsU0FBUjtDQUFBLE1BQUE7O0FBRUEsT0FBQSxJQUFhLFFBQU4sTUFBQSxNQUFBO0VBQ04sV0FBYSxHQUFBLENBQUE7QUFDZCxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO1FBUUMsQ0FBQSxZQUFBLENBQUE7UUF3QkEsQ0FBQSxXQUFBLENBQUE7UUE4QkEsQ0FBQSxjQUFBLENBQUE7SUEvRGMsSUFBQyxDQUFBO0lBQ2QsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQUMsQ0FBQSxNQUFELEdBQVU7QUFDVjtJQUFBLEtBQUEscUNBQUE7O01BQ0ksQ0FBQSxDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxNQUFKLENBQVcsSUFBQyxDQUFBLEVBQVosRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBQSxDQUFBLEdBQUE7aUJBQUcsSUFBQyxDQUFBLEtBQUQsQ0FBTyxDQUFQO1FBQUgsQ0FBbkIsQ0FBZDtNQUFQLENBQUEsRUFBQztJQURMO0lBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVztFQVBDOztFQVNiLEtBQVEsQ0FBQyxDQUFELENBQUE7QUFDVCxRQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBO0lBQUUsQ0FBQSxHQUFJO0lBQ0osSUFBRyxJQUFDLENBQUEsRUFBRCxZQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBUixDQUFBLENBQWlCLENBQUMsUUFBVSxFQUF0QztBQUE2QyxhQUE3Qzs7SUFDQSxHQUFBLFVBQU0sR0FBSztJQUNYLEdBQUEsR0FBTSxDQUFBLGNBQUksSUFBSztJQUNmLEVBQUEsR0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQVIsQ0FBQSxDQUFlLENBQUMsR0FBRCxDQUFLLENBQUMsR0FBRDtJQUN6QixLQUFBLEdBQVEsSUFBSSxRQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBUixDQUFBLENBQWlCLENBQUMsUUFBVSxFQUE3QjtJQUNaLEdBQUEsR0FBTSxJQUFDLENBQUEsY0FBYyxDQUFDO0lBQ3RCLElBQUcsR0FBQSxLQUFPLENBQVY7TUFDQyxJQUFHLEVBQUEsS0FBTSxJQUFOLElBQWUsRUFBRSxDQUFDLEtBQUgsS0FBWSxLQUE5QjtlQUF5QyxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLENBQXJCLEVBQXpDO09BREQ7S0FBQSxNQUVLLElBQUcsR0FBQSxLQUFPLENBQVY7TUFDSixJQUFHLENBQUEsS0FBSyxJQUFDLENBQUEsY0FBYyxDQUFDLENBQUQsQ0FBdkI7ZUFDQyxJQUFDLENBQUEsY0FBRCxHQUFrQixHQURuQjtPQUFBLE1BQUE7UUFHQyxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLENBQXJCO1FBQ0EsR0FBQSxHQUFNLEtBQUEsQ0FBTSxJQUFDLENBQUEsY0FBUCxFQURWOztRQUdJLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQWE7VUFBQyxJQUFBLEVBQUssR0FBRyxDQUFDLEtBQUosQ0FBVSxDQUFWLEVBQVksQ0FBWixDQUFOO1VBQXNCLEVBQUEsRUFBRyxHQUFHLENBQUMsS0FBSixDQUFVLENBQVYsRUFBWSxDQUFaO1FBQXpCLENBQWIsQ0FBSDs7VUFFQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQXBCLENBQThCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBUixDQUFBLENBQTlCO2lCQUNBLElBQUMsQ0FBQSxjQUFELEdBQWtCLEdBSG5CO1NBQUEsTUFBQTtpQkFLQyxJQUFDLENBQUEsY0FBYyxDQUFDLEdBQWhCLENBQUEsRUFMRDtTQU5EO09BREk7O0VBVkU7O0VBd0JSLElBQU8sQ0FBQSxDQUFBO0FBRVIsUUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUU7SUFBQSxLQUFBLHFDQUFBOztNQUNDLE1BQU0sQ0FBQyxJQUFQLENBQUE7SUFERDtJQUdBLElBQUEsQ0FBSyxPQUFMO0lBQ0EsUUFBQSxDQUFTLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBQSxHQUFnQixHQUF6QjtJQUVBLElBQUEsQ0FBQTtJQUNBLElBQUcsSUFBQyxDQUFBLEVBQUQsS0FBSyxDQUFSO01BQWUsU0FBQSxDQUFVLE1BQU0sQ0FBQyxFQUFQLENBQUEsQ0FBVixFQUF1QixNQUFNLENBQUMsRUFBUCxDQUFBLENBQXZCLEVBQWY7S0FBQSxNQUFBO01BQ0ssU0FBQSxDQUFVLE1BQU0sQ0FBQyxFQUFQLENBQUEsQ0FBVixFQUF1QixNQUFNLENBQUMsRUFBUCxDQUFBLENBQUEsR0FBYyxDQUFBLEdBQUksTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUF6QyxFQURMOztBQUdBO0lBQUEsS0FBQSx3Q0FBQTs7QUFDQztNQUFBLEtBQUEsd0NBQUE7O1FBQ0MsS0FBQSxHQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBYixDQUFBLENBQW9CLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBSyxDQUFDLENBQUQ7UUFDakMsRUFBQSxHQUFLLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQSxHQUFFLENBQUYsR0FBSSxDQUFMO1FBQ2IsWUFBRyxJQUFDLENBQUEsY0FBYyxDQUFDLFlBQVcsS0FBM0IsU0FBNkIsQ0FBaEM7VUFDQyxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQVIsRUFBZSxLQUFmLEVBREQ7O1FBRUEsWUFBRyxJQUFDLENBQUEsY0FBYyxDQUFDLFlBQVcsQ0FBOUI7VUFDQyxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQVIsRUFBZSxDQUFBLEdBQUUsQ0FBRixHQUFJLENBQUosS0FBTyxJQUFDLENBQUEsY0FBYyxDQUFDLENBQUQsQ0FBckMsRUFERDtTQUFBLE1BRUssWUFBRyxJQUFDLENBQUEsY0FBYyxDQUFDLFlBQVcsS0FBM0IsU0FBNkIsQ0FBaEM7VUFDSixFQUFFLENBQUMsSUFBSCxDQUFRLEtBQVIsRUFBZSxDQUFBLEdBQUUsQ0FBRixHQUFJLENBQUosS0FBTyxJQUFDLENBQUEsY0FBYyxDQUFDLENBQUQsQ0FBckMsRUFESTs7TUFQTjtJQUREO0lBV0EsTUFBQSxDQUFPLE9BQVA7SUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBYixDQUFBLENBQVo7SUFDQSxJQUFHLElBQUMsQ0FBQSxFQUFELEtBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFiLENBQUEsQ0FBc0IsQ0FBQyxNQUF2QixHQUE4QixDQUF4QztNQUErQyxJQUFBLENBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWlCLEVBQWpCLEVBQS9DO0tBQUEsTUFBQTtNQUF3RSxNQUFBLENBQUEsRUFBeEU7O0lBQ0EsSUFBQSxHQUFPLE1BQU0sQ0FBQyxJQUFQLENBQUE7SUFDUCxJQUFBLENBQUssSUFBQSxHQUFLLENBQVYsRUFBWSxJQUFBLEdBQUssQ0FBakIsRUFBbUIsSUFBQSxHQUFLLENBQXhCLEVBQTBCLElBQUEsR0FBSyxDQUEvQjtXQUNBLEdBQUEsQ0FBQTtFQTVCTTs7RUE4QlAsT0FBVSxDQUFBLENBQUE7QUFDWCxRQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtJQUFFLElBQUEsR0FBTyxNQUFNLENBQUMsSUFBUCxDQUFBO0lBQ1AsUUFBQSxDQUFBO0lBQ0EsSUFBQSxDQUFLLE9BQUw7SUFDQSxRQUFBLENBQVMsSUFBQSxHQUFLLEdBQWQ7SUFDQSxPQUFBLEdBQWEsS0FBSCxHQUFjLFVBQWQsR0FBOEI7SUFDeEMsTUFBQSxHQUFhLEtBQUgsR0FBYyxVQUFkLEdBQThCO0FBRXhDO0FBQUE7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUEsQ0FBSyxPQUFPLENBQUMsQ0FBRCxDQUFaLEVBQWdCLElBQUEsR0FBSyxDQUFDLENBQUEsR0FBRSxDQUFILENBQXJCLEVBQTJCLElBQUEsR0FBSyxHQUFoQzttQkFDQSxJQUFBLENBQUssTUFBTSxDQUFDLENBQUQsQ0FBWCxFQUFlLElBQUEsR0FBSyxJQUFwQixFQUF5QixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUE5QjtJQUZELENBQUE7O0VBUlM7O0FBaEVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvbG9kYXNoJ1xyXG5pbXBvcnQge2FzcyxsZXJwLHBhcmFtLHJhbmdlLGhleFRvQmFzZTY0LGVudGVyRnVsbHNjcmVlbn0gZnJvbSAnLi4vanMvdXRpbHMuanMnXHJcbmltcG9ydCB7U3F1YXJlfSBmcm9tICcuLi9qcy9zcXVhcmUuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Y29vcmRzLGdsb2JhbCx0b09iamVjdE5vdGF0aW9uLHRvVUNJfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5pbXBvcnQge2R1bXBTdGF0ZX0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZFxyXG5cdGNvbnN0cnVjdG9yOiAoQG5yKSAtPlxyXG5cdFx0QHNxdWFyZXMgPSBbXVxyXG5cdFx0QGNsaWNrZWRTcXVhcmVzID0gW11cclxuXHRcdEBwaWVjZXMgPSBcIlwiXHJcblx0XHRmb3IgaSBpbiByYW5nZSA2NFxyXG5cdFx0XHRkbyAoaSkgPT4gQHNxdWFyZXMucHVzaCBuZXcgU3F1YXJlIEBuciwgaSwgPT4gQGNsaWNrIGlcclxuXHJcblx0XHRAYnV0dG9ucyA9IFtdXHJcblxyXG5cdGNsaWNrIDogKGkpID0+XHJcblx0XHRnID0gZ2xvYmFsXHJcblx0XHRpZiBAbnIgPT0gZy5jaGVzcy5oaXN0b3J5KCkubGVuZ3RoICUlIDIgdGhlbiByZXR1cm5cclxuXHRcdGNvbCA9IGkgJSUgOFxyXG5cdFx0cm93ID0gNyAtIGkgLy8gOFxyXG5cdFx0c3EgPSBnLmNoZXNzLmJvYXJkKClbcm93XVtjb2xdXHJcblx0XHRjb2xvciA9IFwid2JcIltnLmNoZXNzLmhpc3RvcnkoKS5sZW5ndGggJSUgMl0gIyBmw7ZydsOkbnRhZCBmw6RyZyBww6UgcGrDpHNlblxyXG5cdFx0Y3NsID0gQGNsaWNrZWRTcXVhcmVzLmxlbmd0aFxyXG5cdFx0aWYgY3NsID09IDBcclxuXHRcdFx0aWYgc3EgIT0gbnVsbCBhbmQgc3EuY29sb3IgPT0gY29sb3IgdGhlbiBAY2xpY2tlZFNxdWFyZXMucHVzaCBpXHJcblx0XHRlbHNlIGlmIGNzbCA9PSAxXHJcblx0XHRcdGlmIGkgPT0gQGNsaWNrZWRTcXVhcmVzWzBdICMgw6VuZ3JhIG9tIHNhbW1hIHJ1dGFcclxuXHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0XHRlbHNlICMga29udHJvbGxlcmEgZHJhZ2V0XHJcblx0XHRcdFx0QGNsaWNrZWRTcXVhcmVzLnB1c2ggaVxyXG5cdFx0XHRcdHVjaSA9IHRvVUNJIEBjbGlja2VkU3F1YXJlc1xyXG5cdFx0XHRcdCMgw6RyIGRldHRhIGV0dCBrb3JyZWt0IGRyYWc/IEkgc8OlIGZhbGwsIHV0ZsO2ciBkZXRcclxuXHRcdFx0XHRpZiBnLmNoZXNzLm1vdmUge2Zyb206dWNpLnNsaWNlKDAsMiksIHRvOnVjaS5zbGljZSgyLDQpfVxyXG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyBnLmNoZXNzLnBnbigpXHJcblx0XHRcdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCBnLmNoZXNzLnBnbigpXHJcblx0XHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdEBjbGlja2VkU3F1YXJlcy5wb3AoKVxyXG5cclxuXHRkcmF3IDogPT5cclxuXHJcblx0XHRmb3IgYnV0dG9uIGluIEBidXR0b25zXHJcblx0XHRcdGJ1dHRvbi5kcmF3KClcclxuXHJcblx0XHRmaWxsICd3aGl0ZSdcclxuXHRcdHRleHRTaXplIGdsb2JhbC5zaXplKCkgKiAwLjNcclxuXHJcblx0XHRwdXNoKClcclxuXHRcdGlmIEBucj09MCB0aGVuIHRyYW5zbGF0ZSBnbG9iYWwubXgoKSwgZ2xvYmFsLm15KClcclxuXHRcdGVsc2UgdHJhbnNsYXRlIGdsb2JhbC5teCgpLCBnbG9iYWwubXkoKSArIDkgKiBnbG9iYWwuc2l6ZSgpXHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHRmb3IgaiBpbiByYW5nZSA4XHJcblx0XHRcdFx0cGllY2UgPSBnbG9iYWwuY2hlc3MuYm9hcmQoKVs3LWldW2pdXHJcblx0XHRcdFx0c3EgPSBAc3F1YXJlc1tpKjgral1cclxuXHRcdFx0XHRpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFswLDJdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBmYWxzZVxyXG5cdFx0XHRcdGlmIEBjbGlja2VkU3F1YXJlcy5sZW5ndGggaW4gWzFdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzBdXHJcblx0XHRcdFx0ZWxzZSBpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFszLDRdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzJdXHJcblxyXG5cdFx0c3Ryb2tlICdibGFjaydcclxuXHRcdGNvbnNvbGUubG9nIGdsb2JhbC5jaGVzcy5oaXN0b3J5KClcclxuXHRcdGlmIEBuciA9PSBnbG9iYWwuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCUyIHRoZW4gZmlsbCAxMjgsMTI4LDEyOCw2NCBlbHNlIG5vRmlsbCgpXHJcblx0XHRTSVpFID0gZ2xvYmFsLnNpemUoKVxyXG5cdFx0cmVjdCBTSVpFKjQsU0laRSo0LFNJWkUqOCxTSVpFKjhcclxuXHRcdHBvcCgpXHJcblxyXG5cdGxpdHRlcmEgOiA9PlxyXG5cdFx0U0laRSA9IGdsb2JhbC5zaXplKClcclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0dGV4dFNpemUgU0laRSowLjNcclxuXHRcdGxldHRlcnMgPSBpZiBmYWxzZSB0aGVuIFwiaGdmZWRjYmFcIiBlbHNlIFwiYWJjZGVmZ2hcIlxyXG5cdFx0ZGlnaXRzICA9IGlmIGZhbHNlIHRoZW4gXCIxMjM0NTY3OFwiIGVsc2UgXCI4NzY1NDMyMVwiXHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHR0ZXh0IGxldHRlcnNbaV0sU0laRSooaSsxKSxTSVpFKjguOFxyXG5cdFx0XHR0ZXh0IGRpZ2l0c1tpXSxTSVpFKjAuMTUsU0laRSooaSsxKVxyXG4iXX0=
//# sourceURL=c:\github\2023-026-chessx2\coffee\board.coffee