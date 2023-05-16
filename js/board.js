// Generated by CoffeeScript 2.5.1
var getNextQuestion,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  indexOf = [].indexOf;

import _ from 'https://cdn.skypack.dev/lodash';

import {
  ass,
  lerp,
  param,
  range,
  hexToBase64
} from '../js/utils.js';

import {
  Square
} from '../js/square.js';

import {
  Button
} from '../js/button.js';

import {
  coords,
  clickString,
  global,
  toObjectNotation,
  toUCI
} from '../js/globals.js';

import {
  dumpState
} from '../js/globals.js';

//SIZE = global.SIZE
getNextQuestion = () => {
  var g, i, k, l, len, len1, move, moves, qi, ref, sr;
  g = global;
  sr = g.spacedRepetition;
  if (sr.boxes[0].length === 0) {
    ref = range(5);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      if (sr.qindex < sr.questions.length - 1) {
        qi = sr.questions[sr.qindex];
        sr.add({
          p: g.tree.arr[qi][3],
          q: g.tree.getPath(qi),
          a: g.tree.getAnswers(qi, sr.stopp)
        });
        sr.qindex++;
      }
    }
  }
  sr.pick();
  g.chess.reset();
  moves = sr.current().q.split('.');
  for (l = 0, len1 = moves.length; l < len1; l++) {
    move = moves[l];
    g.chess.move({
      from: move.slice(0, 2),
      to: move.slice(2, 4)
    });
  }
  return g.board.flipped = moves.length % 2 === 1;
};

export var Board = class Board {
  constructor(nr) {
    var i, k, len, ref;
    //@buttons.push new Button x0*SIZE, 9.5*SIZE, 'correct', => clickString 'correct'
    this.click = this.click.bind(this);
    this.draw = this.draw.bind(this);
    //@littera()
    this.littera = this.littera.bind(this);
    this.flip = this.flip.bind(this);
    this.nr = nr;
    this.squares = [];
    this.clickedSquares = [];
    this.pieces = "";
    this.flipped = false;
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
    var col, color, csl, g, row, sq, sr, uci;
    g = global;
    sr = g.spacedRepetition;
    if (this.flipped) {
      i = 63 - i;
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
        if (indexOf.call(sr.answers, uci) >= 0) {
          sr.correct();
          getNextQuestion();
          return this.clickedSquares = [];
        }
      }
    } else if (csl === 2) {
      return this.clickedSquares.push(i);
    } else if (csl === 3) {
      this.clickedSquares.push(i);
      uci = toUCI(this.clickedSquares.slice(2, 4));
      if (indexOf.call(sr.answers, uci) >= 0) {
        sr.wrong();
        getNextQuestion();
        return this.clickedSquares = [];
      } else {
        return this.clickedSquares = this.clickedSquares.slice(0, 2);
      }
    }
  }

  draw() {
    var button, i, j, k, l, len, len1, len2, m, piece, ref, ref1, ref2, ref3, ref4, ref5, sq;
    ref = this.buttons;
    for (k = 0, len = ref.length; k < len; k++) {
      button = ref[k];
      button.draw();
    }
    fill('white');
    textSize(global.SIZE * 0.3);
    if (this.nr === 0) {
      push();
      translate(global.SIZE * 2.75, global.SIZE * 0.5);
    } else {
      push();
      translate(global.SIZE * 2.75, global.SIZE * 9.5);
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
          sq.draw(piece, this.flipped, false);
        }
        if ((ref4 = this.clickedSquares.length) === 1) {
          sq.draw(piece, this.flipped, i * 8 + j === this.clickedSquares[0]);
        } else if ((ref5 = this.clickedSquares.length) === 3 || ref5 === 4) {
          sq.draw(piece, this.flipped, i * 8 + j === this.clickedSquares[2]);
        }
      }
    }
    stroke('black');
    noFill();
    rect(global.SIZE * 4, global.SIZE * 4, global.SIZE * 8, global.SIZE * 8);
    return pop();
  }

  littera() {
    var digits, i, k, len, letters, ref, results;
    noStroke();
    fill('black');
    textSize(global.SIZE * 0.3);
    letters = this.flipped ? "hgfedcba" : "abcdefgh";
    digits = this.flipped ? "12345678" : "87654321";
    ref = range(8);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      text(letters[i], global.SIZE * (i + 1), global.SIZE * 8.8);
      results.push(text(digits[i], global.SIZE * 0.15, global.SIZE * (i + 1)));
    }
    return results;
  }

  flip() {
    return this.flipped = !this.flipped;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLGVBQUE7RUFBQTs7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEdBQVI7RUFBWSxJQUFaO0VBQWlCLEtBQWpCO0VBQXVCLEtBQXZCO0VBQTZCLFdBQTdCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0VBQWUsV0FBZjtFQUEyQixNQUEzQjtFQUFrQyxnQkFBbEM7RUFBbUQsS0FBbkQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxTQUFSO0NBQUEsTUFBQSxtQkFMQTs7O0FBU0EsZUFBQSxHQUFrQixDQUFBLENBQUEsR0FBQTtBQUNsQixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQTtFQUFDLENBQUEsR0FBSTtFQUNKLEVBQUEsR0FBSyxDQUFDLENBQUM7RUFDUCxJQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBRCxDQUFHLENBQUMsTUFBWixLQUFzQixDQUF6QjtBQUNDO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEVBQUUsQ0FBQyxNQUFILEdBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFiLEdBQW9CLENBQW5DO1FBQ0MsRUFBQSxHQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQUo7UUFDakIsRUFBRSxDQUFDLEdBQUgsQ0FBTztVQUFDLENBQUEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFELENBQUksQ0FBQyxDQUFELENBQWpCO1VBQXNCLENBQUEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQVAsQ0FBZSxFQUFmLENBQXhCO1VBQTRDLENBQUEsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVAsQ0FBa0IsRUFBbEIsRUFBcUIsRUFBRSxDQUFDLEtBQXhCO1FBQS9DLENBQVA7UUFDQSxFQUFFLENBQUMsTUFBSCxHQUhEOztJQURELENBREQ7O0VBTUEsRUFBRSxDQUFDLElBQUgsQ0FBQTtFQUNBLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBUixDQUFBO0VBQ0EsS0FBQSxHQUFRLEVBQUUsQ0FBQyxPQUFILENBQUEsQ0FBWSxDQUFDLENBQUMsQ0FBQyxLQUFmLENBQXFCLEdBQXJCO0VBQ1IsS0FBQSx5Q0FBQTs7SUFDQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FBYTtNQUFDLElBQUEsRUFBTSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFiLENBQVA7TUFBd0IsRUFBQSxFQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWI7SUFBM0IsQ0FBYjtFQUREO1NBRUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFSLEdBQWtCLEtBQUssQ0FBQyxNQUFOLEdBQWEsQ0FBYixLQUFrQjtBQWRuQjs7QUFnQmxCLE9BQUEsSUFBYSxRQUFOLE1BQUEsTUFBQTtFQUNOLFdBQWEsR0FBQSxDQUFBO0FBQ2QsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBOztRQVVDLENBQUEsWUFBQSxDQUFBO1FBaUNBLENBQUEsV0FBQSxDQUFBLGdCQTNDRDs7UUE4RUMsQ0FBQSxjQUFBLENBQUE7UUFXQSxDQUFBLFdBQUEsQ0FBQTtJQTFGYyxJQUFDLENBQUE7SUFDZCxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLGNBQUQsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxPQUFELEdBQVc7QUFDWDtJQUFBLEtBQUEscUNBQUE7O01BQ0ksQ0FBQSxDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxNQUFKLENBQVcsSUFBQyxDQUFBLEVBQVosRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBQSxDQUFBLEdBQUE7aUJBQUcsSUFBQyxDQUFBLEtBQUQsQ0FBTyxDQUFQO1FBQUgsQ0FBbkIsQ0FBZDtNQUFQLENBQUEsRUFBQztJQURMO0lBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVztFQVJDOztFQVdiLEtBQVEsQ0FBQyxDQUFELENBQUE7QUFDVCxRQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtJQUFFLENBQUEsR0FBSTtJQUNKLEVBQUEsR0FBSyxDQUFDLENBQUM7SUFDUCxJQUFHLElBQUMsQ0FBQSxPQUFKO01BQWlCLENBQUEsR0FBSSxFQUFBLEdBQUcsRUFBeEI7O0lBQ0EsR0FBQSxVQUFNLEdBQUs7SUFDWCxHQUFBLEdBQU0sQ0FBQSxjQUFFLElBQUs7SUFDYixFQUFBLEdBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFSLENBQUEsQ0FBZSxDQUFDLEdBQUQsQ0FBSyxDQUFDLEdBQUQ7SUFDekIsS0FBQSxHQUFRLElBQUksUUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsQ0FBQSxDQUFpQixDQUFDLFFBQVUsRUFBN0I7SUFDWixHQUFBLEdBQU0sSUFBQyxDQUFBLGNBQWMsQ0FBQztJQUN0QixJQUFHLEdBQUEsS0FBTyxDQUFWO01BQ0MsSUFBRyxFQUFBLEtBQU0sSUFBTixJQUFlLEVBQUUsQ0FBQyxLQUFILEtBQVksS0FBOUI7ZUFBeUMsSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQUFoQixDQUFxQixDQUFyQixFQUF6QztPQUREO0tBQUEsTUFFSyxJQUFHLEdBQUEsS0FBTyxDQUFWO01BQ0osSUFBRyxDQUFBLEtBQUssSUFBQyxDQUFBLGNBQWMsQ0FBQyxDQUFELENBQXZCO2VBQ0MsSUFBQyxDQUFBLGNBQUQsR0FBa0IsR0FEbkI7T0FBQSxNQUFBO1FBR0MsSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQUFoQixDQUFxQixDQUFyQjtRQUNBLEdBQUEsR0FBTSxLQUFBLENBQU0sSUFBQyxDQUFBLGNBQVA7UUFDTixpQkFBVSxFQUFFLENBQUMsU0FBVixTQUFIO1VBQ0MsRUFBRSxDQUFDLE9BQUgsQ0FBQTtVQUNBLGVBQUEsQ0FBQTtpQkFDQSxJQUFDLENBQUEsY0FBRCxHQUFrQixHQUhuQjtTQUxEO09BREk7S0FBQSxNQVVBLElBQUcsR0FBQSxLQUFPLENBQVY7YUFDSixJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLENBQXJCLEVBREk7S0FBQSxNQUVBLElBQUcsR0FBQSxLQUFPLENBQVY7TUFDSixJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLENBQXJCO01BQ0EsR0FBQSxHQUFNLEtBQUEsQ0FBTSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQXNCLENBQXRCLEVBQXdCLENBQXhCLENBQU47TUFDTixpQkFBVSxFQUFFLENBQUMsU0FBVixTQUFIO1FBQ0MsRUFBRSxDQUFDLEtBQUgsQ0FBQTtRQUNBLGVBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxjQUFELEdBQWtCLEdBSG5CO09BQUEsTUFBQTtlQUtDLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUMsQ0FBQSxjQUFjLENBQUMsS0FBaEIsQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFMbkI7T0FISTs7RUF2QkU7O0VBaUNSLElBQU8sQ0FBQSxDQUFBO0FBRVIsUUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFBRTtJQUFBLEtBQUEscUNBQUE7O01BQ0MsTUFBTSxDQUFDLElBQVAsQ0FBQTtJQUREO0lBR0EsSUFBQSxDQUFLLE9BQUw7SUFDQSxRQUFBLENBQVMsTUFBTSxDQUFDLElBQVAsR0FBWSxHQUFyQjtJQUVBLElBQUcsSUFBQyxDQUFBLEVBQUQsS0FBSyxDQUFSO01BQ0MsSUFBQSxDQUFBO01BQ0EsU0FBQSxDQUFVLE1BQU0sQ0FBQyxJQUFQLEdBQVksSUFBdEIsRUFBNEIsTUFBTSxDQUFDLElBQVAsR0FBWSxHQUF4QyxFQUZEO0tBQUEsTUFBQTtNQUlDLElBQUEsQ0FBQTtNQUNBLFNBQUEsQ0FBVSxNQUFNLENBQUMsSUFBUCxHQUFZLElBQXRCLEVBQTRCLE1BQU0sQ0FBQyxJQUFQLEdBQVksR0FBeEMsRUFMRDs7QUFPQTtJQUFBLEtBQUEsd0NBQUE7O0FBQ0M7TUFBQSxLQUFBLHdDQUFBOztRQUNDLEtBQUEsR0FBUSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQWIsQ0FBQSxDQUFvQixDQUFDLENBQUEsR0FBRSxDQUFILENBQUssQ0FBQyxDQUFEO1FBQ2pDLEVBQUEsR0FBSyxJQUFDLENBQUEsT0FBTyxDQUFDLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBTDtRQUNiLFlBQUcsSUFBQyxDQUFBLGNBQWMsQ0FBQyxZQUFXLEtBQTNCLFNBQTZCLENBQWhDO1VBQ0MsRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFSLEVBQWUsSUFBQyxDQUFBLE9BQWhCLEVBQXlCLEtBQXpCLEVBREQ7O1FBRUEsWUFBRyxJQUFDLENBQUEsY0FBYyxDQUFDLFlBQVcsQ0FBOUI7VUFDQyxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQVIsRUFBZSxJQUFDLENBQUEsT0FBaEIsRUFBeUIsQ0FBQSxHQUFFLENBQUYsR0FBSSxDQUFKLEtBQU8sSUFBQyxDQUFBLGNBQWMsQ0FBQyxDQUFELENBQS9DLEVBREQ7U0FBQSxNQUVLLFlBQUcsSUFBQyxDQUFBLGNBQWMsQ0FBQyxZQUFXLEtBQTNCLFNBQTZCLENBQWhDO1VBQ0osRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFSLEVBQWUsSUFBQyxDQUFBLE9BQWhCLEVBQXlCLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBSixLQUFPLElBQUMsQ0FBQSxjQUFjLENBQUMsQ0FBRCxDQUEvQyxFQURJOztNQVBOO0lBREQ7SUFXQSxNQUFBLENBQU8sT0FBUDtJQUNBLE1BQUEsQ0FBQTtJQUNBLElBQUEsQ0FBSyxNQUFNLENBQUMsSUFBUCxHQUFZLENBQWpCLEVBQW1CLE1BQU0sQ0FBQyxJQUFQLEdBQVksQ0FBL0IsRUFBaUMsTUFBTSxDQUFDLElBQVAsR0FBWSxDQUE3QyxFQUErQyxNQUFNLENBQUMsSUFBUCxHQUFZLENBQTNEO1dBRUEsR0FBQSxDQUFBO0VBOUJNOztFQW1DUCxPQUFVLENBQUEsQ0FBQTtBQUNYLFFBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7SUFBRSxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssT0FBTDtJQUNBLFFBQUEsQ0FBUyxNQUFNLENBQUMsSUFBUCxHQUFZLEdBQXJCO0lBQ0EsT0FBQSxHQUFhLElBQUMsQ0FBQSxPQUFKLEdBQWlCLFVBQWpCLEdBQWlDO0lBQzNDLE1BQUEsR0FBWSxJQUFDLENBQUEsT0FBSixHQUFrQixVQUFsQixHQUFrQztBQUUzQztBQUFBO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFBLENBQUssT0FBTyxDQUFDLENBQUQsQ0FBWixFQUFnQixNQUFNLENBQUMsSUFBUCxHQUFZLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBNUIsRUFBa0MsTUFBTSxDQUFDLElBQVAsR0FBWSxHQUE5QzttQkFDQSxJQUFBLENBQUssTUFBTSxDQUFDLENBQUQsQ0FBWCxFQUFlLE1BQU0sQ0FBQyxJQUFQLEdBQVksSUFBM0IsRUFBZ0MsTUFBTSxDQUFDLElBQVAsR0FBWSxDQUFDLENBQUEsR0FBRSxDQUFILENBQTVDO0lBRkQsQ0FBQTs7RUFQUzs7RUFXVixJQUFPLENBQUEsQ0FBQTtXQUFHLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBSSxJQUFDLENBQUE7RUFBbkI7O0FBM0ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvbG9kYXNoJ1xyXG5pbXBvcnQge2FzcyxsZXJwLHBhcmFtLHJhbmdlLGhleFRvQmFzZTY0fSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtTcXVhcmV9IGZyb20gJy4uL2pzL3NxdWFyZS5qcydcclxuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uL2pzL2J1dHRvbi5qcydcclxuaW1wb3J0IHtjb29yZHMsY2xpY2tTdHJpbmcsZ2xvYmFsLHRvT2JqZWN0Tm90YXRpb24sdG9VQ0l9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7ZHVtcFN0YXRlfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxuI1NJWkUgPSBnbG9iYWwuU0laRVxyXG5cclxuZ2V0TmV4dFF1ZXN0aW9uID0gPT5cclxuXHRnID0gZ2xvYmFsXHJcblx0c3IgPSBnLnNwYWNlZFJlcGV0aXRpb25cclxuXHRpZiBzci5ib3hlc1swXS5sZW5ndGggPT0gMFxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgNVxyXG5cdFx0XHRpZiBzci5xaW5kZXggPCBzci5xdWVzdGlvbnMubGVuZ3RoLTFcclxuXHRcdFx0XHRxaSA9IHNyLnF1ZXN0aW9uc1tzci5xaW5kZXhdXHJcblx0XHRcdFx0c3IuYWRkIHtwOmcudHJlZS5hcnJbcWldWzNdLCBxOmcudHJlZS5nZXRQYXRoKHFpKSwgYTogZy50cmVlLmdldEFuc3dlcnMocWksc3Iuc3RvcHApfVxyXG5cdFx0XHRcdHNyLnFpbmRleCsrXHJcblx0c3IucGljaygpXHJcblx0Zy5jaGVzcy5yZXNldCgpXHJcblx0bW92ZXMgPSBzci5jdXJyZW50KCkucS5zcGxpdCAnLidcclxuXHRmb3IgbW92ZSBpbiBtb3Zlc1xyXG5cdFx0Zy5jaGVzcy5tb3ZlIHtmcm9tOiBtb3ZlLnNsaWNlKDAsMiksIHRvOm1vdmUuc2xpY2UoMiw0KX1cclxuXHRnLmJvYXJkLmZsaXBwZWQgPSBtb3Zlcy5sZW5ndGglMiA9PSAxXHJcblxyXG5leHBvcnQgY2xhc3MgQm9hcmRcclxuXHRjb25zdHJ1Y3RvcjogKEBucikgLT5cclxuXHRcdEBzcXVhcmVzID0gW11cclxuXHRcdEBjbGlja2VkU3F1YXJlcyA9IFtdXHJcblx0XHRAcGllY2VzID0gXCJcIlxyXG5cdFx0QGZsaXBwZWQgPSBmYWxzZVxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgNjRcclxuXHRcdFx0ZG8gKGkpID0+IEBzcXVhcmVzLnB1c2ggbmV3IFNxdWFyZSBAbnIsIGksID0+IEBjbGljayBpXHJcblxyXG5cdFx0QGJ1dHRvbnMgPSBbXVxyXG5cdFx0I0BidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiB4MCpTSVpFLCA5LjUqU0laRSwgJ2NvcnJlY3QnLCA9PiBjbGlja1N0cmluZyAnY29ycmVjdCdcclxuXHJcblx0Y2xpY2sgOiAoaSkgPT5cclxuXHRcdGcgPSBnbG9iYWxcclxuXHRcdHNyID0gZy5zcGFjZWRSZXBldGl0aW9uXHJcblx0XHRpZiBAZmxpcHBlZCB0aGVuIGkgPSA2My1pXHJcblx0XHRjb2wgPSBpICUlIDhcclxuXHRcdHJvdyA9IDctaSAvLyA4XHJcblx0XHRzcSA9IGcuY2hlc3MuYm9hcmQoKVtyb3ddW2NvbF1cclxuXHRcdGNvbG9yID0gXCJ3YlwiW2cuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCAlJSAyXSAjIGbDtnJ2w6RudGFkIGbDpHJnIHDDpSBwasOkc2VuXHJcblx0XHRjc2wgPSBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoXHJcblx0XHRpZiBjc2wgPT0gMFxyXG5cdFx0XHRpZiBzcSAhPSBudWxsIGFuZCBzcS5jb2xvciA9PSBjb2xvciB0aGVuIEBjbGlja2VkU3F1YXJlcy5wdXNoIGlcclxuXHRcdGVsc2UgaWYgY3NsID09IDFcclxuXHRcdFx0aWYgaSA9PSBAY2xpY2tlZFNxdWFyZXNbMF0gIyDDpW5ncmEgb20gc2FtbWEgcnV0YVxyXG5cdFx0XHRcdEBjbGlja2VkU3F1YXJlcyA9IFtdXHJcblx0XHRcdGVsc2UgIyBrb250cm9sbGVyYSBkcmFnZXRcclxuXHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMucHVzaCBpXHJcblx0XHRcdFx0dWNpID0gdG9VQ0kgQGNsaWNrZWRTcXVhcmVzXHJcblx0XHRcdFx0aWYgdWNpIGluIHNyLmFuc3dlcnNcclxuXHRcdFx0XHRcdHNyLmNvcnJlY3QoKVxyXG5cdFx0XHRcdFx0Z2V0TmV4dFF1ZXN0aW9uKClcclxuXHRcdFx0XHRcdEBjbGlja2VkU3F1YXJlcyA9IFtdXHJcblx0XHRlbHNlIGlmIGNzbCA9PSAyXHJcblx0XHRcdEBjbGlja2VkU3F1YXJlcy5wdXNoIGlcclxuXHRcdGVsc2UgaWYgY3NsID09IDNcclxuXHRcdFx0QGNsaWNrZWRTcXVhcmVzLnB1c2ggaVxyXG5cdFx0XHR1Y2kgPSB0b1VDSSBAY2xpY2tlZFNxdWFyZXMuc2xpY2UgMiw0XHJcblx0XHRcdGlmIHVjaSBpbiBzci5hbnN3ZXJzXHJcblx0XHRcdFx0c3Iud3JvbmcoKVxyXG5cdFx0XHRcdGdldE5leHRRdWVzdGlvbigpXHJcblx0XHRcdFx0QGNsaWNrZWRTcXVhcmVzID0gW11cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdEBjbGlja2VkU3F1YXJlcyA9IEBjbGlja2VkU3F1YXJlcy5zbGljZSAwLDJcclxuXHJcblx0ZHJhdyA6ID0+XHJcblxyXG5cdFx0Zm9yIGJ1dHRvbiBpbiBAYnV0dG9uc1xyXG5cdFx0XHRidXR0b24uZHJhdygpXHJcblxyXG5cdFx0ZmlsbCAnd2hpdGUnXHJcblx0XHR0ZXh0U2l6ZSBnbG9iYWwuU0laRSowLjNcclxuXHJcblx0XHRpZiBAbnI9PTBcclxuXHRcdFx0cHVzaCgpXHJcblx0XHRcdHRyYW5zbGF0ZSBnbG9iYWwuU0laRSoyLjc1LCBnbG9iYWwuU0laRSowLjVcclxuXHRcdGVsc2UgXHJcblx0XHRcdHB1c2goKVxyXG5cdFx0XHR0cmFuc2xhdGUgZ2xvYmFsLlNJWkUqMi43NSwgZ2xvYmFsLlNJWkUqOS41XHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHRmb3IgaiBpbiByYW5nZSA4XHJcblx0XHRcdFx0cGllY2UgPSBnbG9iYWwuY2hlc3MuYm9hcmQoKVs3LWldW2pdXHJcblx0XHRcdFx0c3EgPSBAc3F1YXJlc1tpKjgral1cclxuXHRcdFx0XHRpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFswLDJdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBAZmxpcHBlZCwgZmFsc2VcclxuXHRcdFx0XHRpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFsxXVxyXG5cdFx0XHRcdFx0c3EuZHJhdyBwaWVjZSwgQGZsaXBwZWQsIGkqOCtqPT1AY2xpY2tlZFNxdWFyZXNbMF1cclxuXHRcdFx0XHRlbHNlIGlmIEBjbGlja2VkU3F1YXJlcy5sZW5ndGggaW4gWzMsNF1cclxuXHRcdFx0XHRcdHNxLmRyYXcgcGllY2UsIEBmbGlwcGVkLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzJdXHJcblxyXG5cdFx0c3Ryb2tlICdibGFjaydcclxuXHRcdG5vRmlsbCgpXHJcblx0XHRyZWN0IGdsb2JhbC5TSVpFKjQsZ2xvYmFsLlNJWkUqNCxnbG9iYWwuU0laRSo4LGdsb2JhbC5TSVpFKjhcclxuXHJcblx0XHRwb3AoKVxyXG5cclxuXHJcblx0XHQjQGxpdHRlcmEoKVxyXG5cclxuXHRsaXR0ZXJhIDogPT5cclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0dGV4dFNpemUgZ2xvYmFsLlNJWkUqMC4zXHJcblx0XHRsZXR0ZXJzID0gaWYgQGZsaXBwZWQgdGhlbiBcImhnZmVkY2JhXCIgZWxzZSBcImFiY2RlZmdoXCJcclxuXHRcdGRpZ2l0cyA9IGlmIEBmbGlwcGVkIHRoZW4gIFwiMTIzNDU2NzhcIiBlbHNlIFwiODc2NTQzMjFcIlxyXG5cclxuXHRcdGZvciBpIGluIHJhbmdlIDhcclxuXHRcdFx0dGV4dCBsZXR0ZXJzW2ldLGdsb2JhbC5TSVpFKihpKzEpLGdsb2JhbC5TSVpFKjguOFxyXG5cdFx0XHR0ZXh0IGRpZ2l0c1tpXSxnbG9iYWwuU0laRSowLjE1LGdsb2JhbC5TSVpFKihpKzEpXHJcblxyXG5cdGZsaXAgOiA9PiBAZmxpcHBlZCA9IG5vdCBAZmxpcHBlZFxyXG4iXX0=
//# sourceURL=c:\github\2023-026-chessx2\coffee\board.coffee