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
          g.pgn = g.chess.pgn();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksSUFBWjtFQUFpQixLQUFqQjtFQUF1QixLQUF2QjtFQUE2QixXQUE3QjtFQUF5QyxlQUF6QztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtFQUFlLE1BQWY7RUFBc0IsZ0JBQXRCO0VBQXVDLEtBQXZDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsU0FBUjtDQUFBLE1BQUE7O0FBRUEsT0FBQSxJQUFhLFFBQU4sTUFBQSxNQUFBO0VBQ04sV0FBYSxHQUFBLENBQUE7QUFDZCxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO1FBUUMsQ0FBQSxZQUFBLENBQUE7UUF3QkEsQ0FBQSxXQUFBLENBQUE7UUE2QkEsQ0FBQSxjQUFBLENBQUE7SUE5RGMsSUFBQyxDQUFBO0lBQ2QsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQUMsQ0FBQSxNQUFELEdBQVU7QUFDVjtJQUFBLEtBQUEscUNBQUE7O01BQ0ksQ0FBQSxDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxNQUFKLENBQVcsSUFBQyxDQUFBLEVBQVosRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBQSxDQUFBLEdBQUE7aUJBQUcsSUFBQyxDQUFBLEtBQUQsQ0FBTyxDQUFQO1FBQUgsQ0FBbkIsQ0FBZDtNQUFQLENBQUEsRUFBQztJQURMO0lBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVztFQVBDOztFQVNiLEtBQVEsQ0FBQyxDQUFE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QUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsSUFBQSxHQUFPLE1BQU0sQ0FBQyxJQUFQLENBQUE7SUFDUCxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssT0FBTDtJQUNBLFFBQUEsQ0FBUyxJQUFBLEdBQUssR0FBZDtJQUNBLE9BQUEsR0FBYSxLQUFILEdBQWMsVUFBZCxHQUE4QjtJQUN4QyxNQUFBLEdBQWEsS0FBSCxHQUFjLFVBQWQsR0FBOEI7QUFFeEM7QUFBQTtJQUFBLEtBQUEscUNBQUE7O01BQ0MsSUFBQSxDQUFLLE9BQU8sQ0FBQyxDQUFELENBQVosRUFBZ0IsSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBckIsRUFBMkIsSUFBQSxHQUFLLEdBQWhDO21CQUNBLElBQUEsQ0FBSyxNQUFNLENBQUMsQ0FBRCxDQUFYLEVBQWUsSUFBQSxHQUFLLElBQXBCLEVBQXlCLElBQUEsR0FBSyxDQUFDLENBQUEsR0FBRSxDQUFILENBQTlCO0lBRkQsQ0FBQTs7RUFSUzs7QUEvREoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxlcnAscGFyYW0scmFuZ2UsaGV4VG9CYXNlNjQsZW50ZXJGdWxsc2NyZWVufSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtTcXVhcmV9IGZyb20gJy4uL2pzL3NxdWFyZS5qcydcclxuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uL2pzL2J1dHRvbi5qcydcclxuaW1wb3J0IHtjb29yZHMsZ2xvYmFsLHRvT2JqZWN0Tm90YXRpb24sdG9VQ0l9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7ZHVtcFN0YXRlfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvYXJkXHJcblx0Y29uc3RydWN0b3I6IChAbnIpIC0+XHJcblx0XHRAc3F1YXJlcyA9IFtdXHJcblx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0QHBpZWNlcyA9IFwiXCJcclxuXHRcdGZvciBpIGluIHJhbmdlIDY0XHJcblx0XHRcdGRvIChpKSA9PiBAc3F1YXJlcy5wdXNoIG5ldyBTcXVhcmUgQG5yLCBpLCA9PiBAY2xpY2sgaVxyXG5cclxuXHRcdEBidXR0b25zID0gW11cclxuXHJcblx0Y2xpY2sgOiAoaSkgPT5cclxuXHRcdGcgPSBnbG9iYWxcclxuXHRcdGlmIEBuciA9PSBnLmNoZXNzLmhpc3RvcnkoKS5sZW5ndGggJSUgMiB0aGVuIHJldHVyblxyXG5cdFx0Y29sID0gaSAlJSA4XHJcblx0XHRyb3cgPSA3IC0gaSAvLyA4XHJcblx0XHRzcSA9IGcuY2hlc3MuYm9hcmQoKVtyb3ddW2NvbF1cclxuXHRcdGNvbG9yID0gXCJ3YlwiW2cuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCAlJSAyXSAjIGbDtnJ2w6RudGFkIGbDpHJnIHDDpSBwasOkc2VuXHJcblx0XHRjc2wgPSBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoXHJcblx0XHRpZiBjc2wgPT0gMFxyXG5cdFx0XHRpZiBzcSAhPSBudWxsIGFuZCBzcS5jb2xvciA9PSBjb2xvciB0aGVuIEBjbGlja2VkU3F1YXJlcy5wdXNoIGlcclxuXHRcdGVsc2UgaWYgY3NsID09IDFcclxuXHRcdFx0aWYgaSA9PSBAY2xpY2tlZFNxdWFyZXNbMF0gIyDDpW5ncmEgb20gc2FtbWEgcnV0YVxyXG5cdFx0XHRcdEBjbGlja2VkU3F1YXJlcyA9IFtdXHJcblx0XHRcdGVsc2UgIyBrb250cm9sbGVyYSBkcmFnZXRcclxuXHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMucHVzaCBpXHJcblx0XHRcdFx0dWNpID0gdG9VQ0kgQGNsaWNrZWRTcXVhcmVzXHJcblxyXG5cdFx0XHRcdCMgw6RyIGRldHRhIGV0dCBrb3JyZWt0IGRyYWc/IEkgc8OlIGZhbGwsIHV0ZsO2ciBkZXRcclxuXHRcdFx0XHRpZiBnLmNoZXNzLm1vdmUge2Zyb206dWNpLnNsaWNlKDAsMiksIHRvOnVjaS5zbGljZSgyLDQpfVxyXG5cdFx0XHRcdFx0Zy5wZ24gPSBnLmNoZXNzLnBnbigpXHJcblx0XHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdEBjbGlja2VkU3F1YXJlcy5wb3AoKVxyXG5cclxuXHRkcmF3IDogPT5cclxuXHJcblx0XHRmb3IgYnV0dG9uIGluIEBidXR0b25zXHJcblx0XHRcdGJ1dHRvbi5kcmF3KClcclxuXHJcblx0XHRmaWxsICd3aGl0ZSdcclxuXHRcdHRleHRTaXplIGdsb2JhbC5zaXplKCkgKiAwLjNcclxuXHJcblx0XHRwdXNoKClcclxuXHRcdGlmIEBucj09MCB0aGVuIHRyYW5zbGF0ZSBnbG9iYWwubXgoKSwgZ2xvYmFsLm15KClcclxuXHRcdGVsc2UgdHJhbnNsYXRlIGdsb2JhbC5teCgpLCBnbG9iYWwubXkoKSArIDkgKiBnbG9iYWwuc2l6ZSgpXHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHRmb3IgaiBpbiByYW5nZSA4XHJcblx0XHRcdFx0cGllY2UgPSBnbG9iYWwuY2hlc3MuYm9hcmQoKVs3LWldW2pdXHJcblx0XHRcdFx0c3EgPSBAc3F1YXJlc1tpKjgral1cclxuXHRcdFx0XHRpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFswLDJdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBmYWxzZVxyXG5cdFx0XHRcdGlmIEBjbGlja2VkU3F1YXJlcy5sZW5ndGggaW4gWzFdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzBdXHJcblx0XHRcdFx0ZWxzZSBpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFszLDRdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzJdXHJcblxyXG5cdFx0c3Ryb2tlICdibGFjaydcclxuXHRcdGlmIEBuciA9PSBnbG9iYWwuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCUyIHRoZW4gZmlsbCAxMjgsMTI4LDEyOCw2NCBlbHNlIG5vRmlsbCgpXHJcblx0XHRTSVpFID0gZ2xvYmFsLnNpemUoKVxyXG5cdFx0cmVjdCBTSVpFKjQsU0laRSo0LFNJWkUqOCxTSVpFKjhcclxuXHRcdHBvcCgpXHJcblxyXG5cdGxpdHRlcmEgOiA9PlxyXG5cdFx0U0laRSA9IGdsb2JhbC5zaXplKClcclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0dGV4dFNpemUgU0laRSowLjNcclxuXHRcdGxldHRlcnMgPSBpZiBmYWxzZSB0aGVuIFwiaGdmZWRjYmFcIiBlbHNlIFwiYWJjZGVmZ2hcIlxyXG5cdFx0ZGlnaXRzICA9IGlmIGZhbHNlIHRoZW4gXCIxMjM0NTY3OFwiIGVsc2UgXCI4NzY1NDMyMVwiXHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHR0ZXh0IGxldHRlcnNbaV0sU0laRSooaSsxKSxTSVpFKjguOFxyXG5cdFx0XHR0ZXh0IGRpZ2l0c1tpXSxTSVpFKjAuMTUsU0laRSooaSsxKVxyXG4iXX0=
//# sourceURL=c:\github\2023-026-chessx2\coffee\board.coffee