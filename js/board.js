// Generated by CoffeeScript 2.5.1
var copyToClipboard, iosCopyToClipboard,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

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

copyToClipboard = (string) => {
  var copyHotkey, err, isMac, result, sel, textarea, xrange;
  textarea = null;
  result = null;
  try {
    textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', true);
    textarea.setAttribute('contenteditable', true);
    textarea.style.position = 'fixed';
    textarea.value = string;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    xrange = document.createRange();
    xrange.selectNodeContents(textarea);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(xrange);
    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand('copy');
  } catch (error) {
    err = error;
    alert(err);
    result = null;
  } finally {
    document.body.removeChild(textarea);
  }
  if (!result) {
    isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    copyHotkey = isMac != null ? isMac : {
      '⌘C': 'CTRL+C'
    };
    result = prompt(`Press ${copyHotkey}`, string);
    if (!result) {
      return false;
    }
  }
  return true;
};

iosCopyToClipboard = (el) => {
  var oldContentEditable, oldReadOnly, s, xrange;
  oldContentEditable = el.contentEditable;
  oldReadOnly = el.readOnly;
  xrange = document.createRange();
  el.contentEditable = true;
  el.readOnly = false;
  xrange.selectNodeContents(el);
  s = window.getSelection();
  s.removeAllRanges();
  s.addRange(xrange);
  el.setSelectionRange(0, 999999);
  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;
  return document.execCommand('copy');
};

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
          //input = document.getElementById "myInput"
          //input.value = g.chess.pgn()
          //copyToClipboard g.chess.pgn()
          //navigator.clipboard.writeText g.chess.pgn()
          //input = document.getElementById "myInput"

          // copyText = document.querySelector "#myInput"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcYm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLGVBQUEsRUFBQSxrQkFBQTtFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksSUFBWjtFQUFpQixLQUFqQjtFQUF1QixLQUF2QjtFQUE2QixXQUE3QjtFQUF5QyxlQUF6QztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtFQUFlLE1BQWY7RUFBc0IsZ0JBQXRCO0VBQXVDLEtBQXZDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsU0FBUjtDQUFBLE1BQUE7O0FBRUEsZUFBQSxHQUFrQixDQUFDLE1BQUQsQ0FBQSxHQUFBO0FBQ2xCLE1BQUEsVUFBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUE7RUFBQyxRQUFBLEdBQVc7RUFDWCxNQUFBLEdBQVM7QUFFVDtJQUNDLFFBQUEsR0FBVyxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QjtJQUNYLFFBQVEsQ0FBQyxZQUFULENBQXNCLFVBQXRCLEVBQWtDLElBQWxDO0lBQ0EsUUFBUSxDQUFDLFlBQVQsQ0FBc0IsaUJBQXRCLEVBQXlDLElBQXpDO0lBQ0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFmLEdBQTBCO0lBQzFCLFFBQVEsQ0FBQyxLQUFULEdBQWlCO0lBRWpCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixRQUExQjtJQUVBLFFBQVEsQ0FBQyxLQUFULENBQUE7SUFDQSxRQUFRLENBQUMsTUFBVCxDQUFBO0lBRUEsTUFBQSxHQUFTLFFBQVEsQ0FBQyxXQUFULENBQUE7SUFDVCxNQUFNLENBQUMsa0JBQVAsQ0FBMEIs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QUE4QjtBQUV4QztBQUFBO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFBLENBQUssT0FBTyxDQUFDLENBQUQsQ0FBWixFQUFnQixJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFyQixFQUEyQixJQUFBLEdBQUssR0FBaEM7bUJBQ0EsSUFBQSxDQUFLLE1BQU0sQ0FBQyxDQUFELENBQVgsRUFBZSxJQUFBLEdBQUssSUFBcEIsRUFBeUIsSUFBQSxHQUFLLENBQUMsQ0FBQSxHQUFFLENBQUgsQ0FBOUI7SUFGRCxDQUFBOztFQVJTOztBQXRFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2h0dHBzOi8vY2RuLnNreXBhY2suZGV2L2xvZGFzaCdcclxuaW1wb3J0IHthc3MsbGVycCxwYXJhbSxyYW5nZSxoZXhUb0Jhc2U2NCxlbnRlckZ1bGxzY3JlZW59IGZyb20gJy4uL2pzL3V0aWxzLmpzJ1xyXG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vanMvc3F1YXJlLmpzJ1xyXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vanMvYnV0dG9uLmpzJ1xyXG5pbXBvcnQge2Nvb3JkcyxnbG9iYWwsdG9PYmplY3ROb3RhdGlvbix0b1VDSX0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuaW1wb3J0IHtkdW1wU3RhdGV9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcblxyXG5jb3B5VG9DbGlwYm9hcmQgPSAoc3RyaW5nKSA9PlxyXG5cdHRleHRhcmVhID0gbnVsbFxyXG5cdHJlc3VsdCA9IG51bGxcclxuXHJcblx0dHJ5IFxyXG5cdFx0dGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG5cdFx0dGV4dGFyZWEuc2V0QXR0cmlidXRlKCdyZWFkb25seScsIHRydWUpO1xyXG5cdFx0dGV4dGFyZWEuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCB0cnVlKTtcclxuXHRcdHRleHRhcmVhLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJzsgIyBwcmV2ZW50IHNjcm9sbCBmcm9tIGp1bXBpbmcgdG8gdGhlIGJvdHRvbSB3aGVuIGZvY3VzIGlzIHNldC5cclxuXHRcdHRleHRhcmVhLnZhbHVlID0gc3RyaW5nXHJcblxyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCB0ZXh0YXJlYVxyXG5cclxuXHRcdHRleHRhcmVhLmZvY3VzKClcclxuXHRcdHRleHRhcmVhLnNlbGVjdCgpXHJcblxyXG5cdFx0eHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxyXG5cdFx0eHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0YXJlYSlcclxuXHJcblx0XHRzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcclxuXHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxyXG5cdFx0c2VsLmFkZFJhbmdlIHhyYW5nZVxyXG5cclxuXHRcdHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlIDAsIHRleHRhcmVhLnZhbHVlLmxlbmd0aFxyXG5cdFx0cmVzdWx0ID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXHJcblx0Y2F0Y2ggZXJyXHJcblx0XHRhbGVydCBlcnJcclxuXHRcdHJlc3VsdCA9IG51bGxcclxuXHRmaW5hbGx5XHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkIHRleHRhcmVhXHJcblx0XHJcblxyXG5cdCNtYW51YWwgY29weSBmYWxsYmFjayB1c2luZyBwcm9tcHRcclxuXHRpZiAhcmVzdWx0IFxyXG5cdFx0aXNNYWMgPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9VcHBlckNhc2UoKS5pbmRleE9mKCdNQUMnKSA+PSAwXHJcblx0XHRjb3B5SG90a2V5ID0gaXNNYWMgPyAn4oyYQycgOiAnQ1RSTCtDJztcclxuXHRcdHJlc3VsdCA9IHByb21wdChcIlByZXNzICN7Y29weUhvdGtleX1cIiwgc3RyaW5nKTsgIyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XHJcblx0XHRpZiAoIXJlc3VsdCkgXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdHJldHVybiB0cnVlXHJcblxyXG5cclxuaW9zQ29weVRvQ2xpcGJvYXJkID0gKGVsKSA9PlxyXG5cdG9sZENvbnRlbnRFZGl0YWJsZSA9IGVsLmNvbnRlbnRFZGl0YWJsZVxyXG5cdG9sZFJlYWRPbmx5ID0gZWwucmVhZE9ubHlcclxuXHR4cmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpXHJcblxyXG5cdGVsLmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcclxuXHRlbC5yZWFkT25seSA9IGZhbHNlXHJcblx0eHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyBlbFxyXG5cclxuXHRzID0gd2luZG93LmdldFNlbGVjdGlvbigpXHJcblx0cy5yZW1vdmVBbGxSYW5nZXMoKVxyXG5cdHMuYWRkUmFuZ2UgeHJhbmdlXHJcblxyXG5cdGVsLnNldFNlbGVjdGlvblJhbmdlIDAsIDk5OTk5OSBcclxuXHJcblx0ZWwuY29udGVudEVkaXRhYmxlID0gb2xkQ29udGVudEVkaXRhYmxlXHJcblx0ZWwucmVhZE9ubHkgPSBvbGRSZWFkT25seVxyXG5cclxuXHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZFxyXG5cdGNvbnN0cnVjdG9yOiAoQG5yKSAtPlxyXG5cdFx0QHNxdWFyZXMgPSBbXVxyXG5cdFx0QGNsaWNrZWRTcXVhcmVzID0gW11cclxuXHRcdEBwaWVjZXMgPSBcIlwiXHJcblx0XHRmb3IgaSBpbiByYW5nZSA2NFxyXG5cdFx0XHRkbyAoaSkgPT4gQHNxdWFyZXMucHVzaCBuZXcgU3F1YXJlIEBuciwgaSwgPT4gQGNsaWNrIGlcclxuXHJcblx0XHRAYnV0dG9ucyA9IFtdXHJcblxyXG5cdGNsaWNrIDogKGkpID0+XHJcblx0XHRnID0gZ2xvYmFsXHJcblx0XHRpZiBAbnIgPT0gZy5jaGVzcy5oaXN0b3J5KCkubGVuZ3RoICUlIDIgdGhlbiByZXR1cm5cclxuXHRcdGNvbCA9IGkgJSUgOFxyXG5cdFx0cm93ID0gNyAtIGkgLy8gOFxyXG5cdFx0c3EgPSBnLmNoZXNzLmJvYXJkKClbcm93XVtjb2xdXHJcblx0XHRjb2xvciA9IFwid2JcIltnLmNoZXNzLmhpc3RvcnkoKS5sZW5ndGggJSUgMl0gIyBmw7ZydsOkbnRhZCBmw6RyZyBww6UgcGrDpHNlblxyXG5cdFx0Y3NsID0gQGNsaWNrZWRTcXVhcmVzLmxlbmd0aFxyXG5cdFx0aWYgY3NsID09IDBcclxuXHRcdFx0aWYgc3EgIT0gbnVsbCBhbmQgc3EuY29sb3IgPT0gY29sb3IgdGhlbiBAY2xpY2tlZFNxdWFyZXMucHVzaCBpXHJcblx0XHRlbHNlIGlmIGNzbCA9PSAxXHJcblx0XHRcdGlmIGkgPT0gQGNsaWNrZWRTcXVhcmVzWzBdICMgw6VuZ3JhIG9tIHNhbW1hIHJ1dGFcclxuXHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0XHRlbHNlICMga29udHJvbGxlcmEgZHJhZ2V0XHJcblx0XHRcdFx0QGNsaWNrZWRTcXVhcmVzLnB1c2ggaVxyXG5cdFx0XHRcdHVjaSA9IHRvVUNJIEBjbGlja2VkU3F1YXJlc1xyXG5cdFx0XHRcdCMgw6RyIGRldHRhIGV0dCBrb3JyZWt0IGRyYWc/IEkgc8OlIGZhbGwsIHV0ZsO2ciBkZXRcclxuXHRcdFx0XHRpZiBnLmNoZXNzLm1vdmUge2Zyb206dWNpLnNsaWNlKDAsMiksIHRvOnVjaS5zbGljZSgyLDQpfVxyXG5cdFx0XHRcdFx0I2lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJteUlucHV0XCJcclxuXHRcdFx0XHRcdCNpbnB1dC52YWx1ZSA9IGcuY2hlc3MucGduKClcclxuXHRcdFx0XHRcdCNjb3B5VG9DbGlwYm9hcmQgZy5jaGVzcy5wZ24oKVxyXG5cdFx0XHRcdFx0I25hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0IGcuY2hlc3MucGduKClcclxuXHRcdFx0XHRcdCNpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibXlJbnB1dFwiXHJcblxyXG5cdFx0XHRcdFx0IyBjb3B5VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXCIjbXlJbnB1dFwiXHJcblx0XHRcdFx0XHRnLnBnbiA9IGcuY2hlc3MucGduKClcclxuXHJcblx0XHRcdFx0XHRAY2xpY2tlZFNxdWFyZXMgPSBbXVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdEBjbGlja2VkU3F1YXJlcy5wb3AoKVxyXG5cclxuXHRkcmF3IDogPT5cclxuXHJcblx0XHRmb3IgYnV0dG9uIGluIEBidXR0b25zXHJcblx0XHRcdGJ1dHRvbi5kcmF3KClcclxuXHJcblx0XHRmaWxsICd3aGl0ZSdcclxuXHRcdHRleHRTaXplIGdsb2JhbC5zaXplKCkgKiAwLjNcclxuXHJcblx0XHRwdXNoKClcclxuXHRcdGlmIEBucj09MCB0aGVuIHRyYW5zbGF0ZSBnbG9iYWwubXgoKSwgZ2xvYmFsLm15KClcclxuXHRcdGVsc2UgdHJhbnNsYXRlIGdsb2JhbC5teCgpLCBnbG9iYWwubXkoKSArIDkgKiBnbG9iYWwuc2l6ZSgpXHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHRmb3IgaiBpbiByYW5nZSA4XHJcblx0XHRcdFx0cGllY2UgPSBnbG9iYWwuY2hlc3MuYm9hcmQoKVs3LWldW2pdXHJcblx0XHRcdFx0c3EgPSBAc3F1YXJlc1tpKjgral1cclxuXHRcdFx0XHRpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFswLDJdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBmYWxzZVxyXG5cdFx0XHRcdGlmIEBjbGlja2VkU3F1YXJlcy5sZW5ndGggaW4gWzFdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzBdXHJcblx0XHRcdFx0ZWxzZSBpZiBAY2xpY2tlZFNxdWFyZXMubGVuZ3RoIGluIFszLDRdXHJcblx0XHRcdFx0XHRzcS5kcmF3IHBpZWNlLCBpKjgraj09QGNsaWNrZWRTcXVhcmVzWzJdXHJcblxyXG5cdFx0c3Ryb2tlICdibGFjaydcclxuXHRcdGlmIEBuciA9PSBnbG9iYWwuY2hlc3MuaGlzdG9yeSgpLmxlbmd0aCUyIHRoZW4gZmlsbCAxMjgsMTI4LDEyOCw2NCBlbHNlIG5vRmlsbCgpXHJcblx0XHRTSVpFID0gZ2xvYmFsLnNpemUoKVxyXG5cdFx0cmVjdCBTSVpFKjQsU0laRSo0LFNJWkUqOCxTSVpFKjhcclxuXHRcdHBvcCgpXHJcblxyXG5cdGxpdHRlcmEgOiA9PlxyXG5cdFx0U0laRSA9IGdsb2JhbC5zaXplKClcclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0dGV4dFNpemUgU0laRSowLjNcclxuXHRcdGxldHRlcnMgPSBpZiBmYWxzZSB0aGVuIFwiaGdmZWRjYmFcIiBlbHNlIFwiYWJjZGVmZ2hcIlxyXG5cdFx0ZGlnaXRzICA9IGlmIGZhbHNlIHRoZW4gXCIxMjM0NTY3OFwiIGVsc2UgXCI4NzY1NDMyMVwiXHJcblxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgOFxyXG5cdFx0XHR0ZXh0IGxldHRlcnNbaV0sU0laRSooaSsxKSxTSVpFKjguOFxyXG5cdFx0XHR0ZXh0IGRpZ2l0c1tpXSxTSVpFKjAuMTUsU0laRSooaSsxKVxyXG4iXX0=
//# sourceURL=c:\github\2023-026-chessx2\coffee\board.coffee