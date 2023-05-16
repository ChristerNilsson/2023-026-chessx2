// Generated by CoffeeScript 2.5.1
var arr, fullScreen, released, resize;

import _ from 'https://cdn.skypack.dev/lodash';

import {
  ass,
  log,
  range,
  enterFullscreen,
  signal
} from '../js/utils.js';

import {
  Board
} from '../js/board.js';

import {
  Button
} from '../js/button.js';

import {
  global
} from '../js/globals.js';

released = true; // prevention of touch bounce

arr = null;

window.preload = () => {
  var i, j, len, len1, letter, ref, ref1, results;
  ref = "rnbqkp";
  for (i = 0, len = ref.length; i < len; i++) {
    letter = ref[i];
    global.pics[letter] = loadImage('./images/b' + letter + '.png');
  }
  ref1 = "RNBQKP";
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    letter = ref1[j];
    results.push(global.pics[letter] = loadImage('./images/w' + letter.toLowerCase() + '.png'));
  }
  return results;
};

fullScreen = () => {
  return enterFullscreen();
};

window.setup = () => {
  var button;
  createCanvas(innerWidth, innerHeight);
  [global.size, global.setSize] = signal(round(min(innerWidth, innerHeight) / 18));
  [global.mx, global.setMx] = signal(round((innerWidth - 8 * global.size()) / 2));
  [global.my, global.setMy] = signal(round((innerHeight - 17 * global.size()) / 2));
  resize();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  global.board0 = new Board(0);
  global.board1 = new Board(1);
  global.chess = new Chess();
  button = createButton('copy');
  button.position(0, 0);
  return button.mousePressed(() => {
    var input;
    input = document.getElementById("myInput");
    input.value = global.chess.pgn();
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
    return console.log(input.value);
  });
};

window.draw = () => {
  var button, i, len, ref;
  background('gray');
  textSize(global.size());
  global.board0.draw();
  global.board1.draw();
  ref = global.buttons;
  for (i = 0, len = ref.length; i < len; i++) {
    button = ref[i];
    button.draw();
  }
  fill("black");
  return textAlign(CENTER, CENTER);
};

window.onresize = function() {
  return resize();
};

resize = function() {
  global.setSize(round(innerHeight / 18));
  resizeCanvas(innerWidth, innerHeight);
  global.setMx(round((innerWidth - 8 * global.size()) / 2));
  console.log('size', global.size());
  global.setMy(round((innerHeight - 17 * global.size()) / 2));
  global.buttons = [];
  global.buttons.push(new Button(round(2 * width / 3), round(height / 2), 'Full Screen', fullScreen));
  return global.buttons.push(new Button(round(width / 3), round(height / 2), 'Copy', () => {
    return navigator.clipboard.writeText(global.chess.pgn());
  }));
};

window.mousePressed = () => {
  var button, i, j, len, len1, ref, ref1, square;
  console.log('mousePressed');
  if (!released) {
    return;
  }
  released = false;
  ref = global.buttons.concat(global.buttons);
  for (i = 0, len = ref.length; i < len; i++) {
    button = ref[i];
    if (button.inside(mouseX, mouseY)) {
      button.onclick();
      return false;
    }
  }
  ref1 = global.board0.squares.concat(global.board1.squares);
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    square = ref1[j];
    if (square.inside(mouseX, mouseY)) {
      console.log('square.inside', square.nr);
      square.onclick();
      return false;
    }
  }
  return false;
};

window.mouseReleased = () => {
  released = true;
  return false;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEdBQVI7RUFBWSxHQUFaO0VBQWdCLEtBQWhCO0VBQXNCLGVBQXRCO0VBQXNDLE1BQXRDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFFQSxRQUFBLEdBQVcsS0FOWDs7QUFPQSxHQUFBLEdBQU07O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQztFQUFBLEtBQUEscUNBQUE7O0lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFELENBQVgsR0FBc0IsU0FBQSxDQUFVLFlBQUEsR0FBZSxNQUFmLEdBQXdCLE1BQWxDO0VBRHZCO0FBRUE7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FBQSxDQUFmLEdBQXNDLE1BQWhEO0VBRHZCLENBQUE7O0FBSGdCOztBQU1qQixVQUFBLEdBQWEsQ0FBQSxDQUFBLEdBQUE7U0FBRyxlQUFBLENBQUE7QUFBSDs7QUFFYixNQUFNLENBQUMsS0FBUCxHQUFlLENBQUEsQ0FBQSxHQUFBO0FBRWYsTUFBQTtFQUFDLFlBQUEsQ0FBYSxVQUFiLEVBQXdCLFdBQXhCO0VBRUEsQ0FBQyxNQUFN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Q0EsTUFBTSxDQUFDLE9BQVAsQ0FBQTtBQUNBLGFBQU8sTUFIUjs7RUFERDtTQUtBO0FBZHFCOztBQWdCdEIsTUFBTSxDQUFDLGFBQVAsR0FBdUIsQ0FBQSxDQUFBLEdBQUE7RUFDdEIsUUFBQSxHQUFXO1NBQ1g7QUFGc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxvZyxyYW5nZSxlbnRlckZ1bGxzY3JlZW4sc2lnbmFsfSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vanMvYm9hcmQuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxucmVsZWFzZWQgPSB0cnVlICMgcHJldmVudGlvbiBvZiB0b3VjaCBib3VuY2VcclxuYXJyID0gbnVsbFxyXG5cclxud2luZG93LnByZWxvYWQgPSA9PlxyXG5cdGZvciBsZXR0ZXIgaW4gXCJybmJxa3BcIlxyXG5cdFx0Z2xvYmFsLnBpY3NbbGV0dGVyXSA9IGxvYWRJbWFnZSAnLi9pbWFnZXMvYicgKyBsZXR0ZXIgKyAnLnBuZydcclxuXHRmb3IgbGV0dGVyIGluIFwiUk5CUUtQXCJcclxuXHRcdGdsb2JhbC5waWNzW2xldHRlcl0gPSBsb2FkSW1hZ2UgJy4vaW1hZ2VzL3cnICsgbGV0dGVyLnRvTG93ZXJDYXNlKCkgKyAnLnBuZydcclxuXHJcbmZ1bGxTY3JlZW4gPSA9PiBlbnRlckZ1bGxzY3JlZW4oKVxyXG5cclxud2luZG93LnNldHVwID0gPT5cclxuXHJcblx0Y3JlYXRlQ2FudmFzIGlubmVyV2lkdGgsaW5uZXJIZWlnaHRcclxuXHJcblx0W2dsb2JhbC5zaXplLCBnbG9iYWwuc2V0U2l6ZV0gPSBzaWduYWwgcm91bmQgbWluKGlubmVyV2lkdGgsaW5uZXJIZWlnaHQpLzE4XHJcblx0W2dsb2JhbC5teCwgZ2xvYmFsLnNldE14XSA9IHNpZ25hbCByb3VuZCAoaW5uZXJXaWR0aCAtIDggKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblx0W2dsb2JhbC5teSwgZ2xvYmFsLnNldE15XSA9IHNpZ25hbCByb3VuZCAoaW5uZXJIZWlnaHQgLSAxNyAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHJcblx0cmVzaXplKClcclxuXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRyZWN0TW9kZSBDRU5URVJcclxuXHRpbWFnZU1vZGUgQ0VOVEVSXHJcblxyXG5cdGdsb2JhbC5ib2FyZDAgPSBuZXcgQm9hcmQgMFxyXG5cdGdsb2JhbC5ib2FyZDEgPSBuZXcgQm9hcmQgMVxyXG5cdGdsb2JhbC5jaGVzcyA9IG5ldyBDaGVzcygpXHJcblxyXG5cdGJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbiAnY29weSdcclxuXHRidXR0b24ucG9zaXRpb24gMCwgMFxyXG5cdGJ1dHRvbi5tb3VzZVByZXNzZWQgKCkgPT4gXHJcblx0XHRpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibXlJbnB1dFwiXHJcblx0XHRpbnB1dC52YWx1ZSA9IGdsb2JhbC5jaGVzcy5wZ24oKVxyXG5cdFx0aW5wdXQuc2VsZWN0KClcclxuXHRcdGlucHV0LnNldFNlbGVjdGlvblJhbmdlIDAsIDk5OTk5XHJcblx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCBpbnB1dC52YWx1ZVxyXG5cdFx0Y29uc29sZS5sb2cgaW5wdXQudmFsdWVcclxuXHJcbndpbmRvdy5kcmF3ID0gPT5cclxuXHRiYWNrZ3JvdW5kICdncmF5J1xyXG5cdHRleHRTaXplIGdsb2JhbC5zaXplKClcclxuXHRnbG9iYWwuYm9hcmQwLmRyYXcoKVxyXG5cdGdsb2JhbC5ib2FyZDEuZHJhdygpXHJcblx0Zm9yIGJ1dHRvbiBpbiBnbG9iYWwuYnV0dG9uc1xyXG5cdFx0YnV0dG9uLmRyYXcoKVxyXG5cdGZpbGwgXCJibGFja1wiXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IC0+IHJlc2l6ZSgpXHJcblxyXG5yZXNpemUgPSAtPlxyXG5cdGdsb2JhbC5zZXRTaXplIHJvdW5kIGlubmVySGVpZ2h0LzE4XHJcblx0cmVzaXplQ2FudmFzIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0XHJcblx0Z2xvYmFsLnNldE14IHJvdW5kIChpbm5lcldpZHRoIC0gOCAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRjb25zb2xlLmxvZyAnc2l6ZScsZ2xvYmFsLnNpemUoKVxyXG5cdGdsb2JhbC5zZXRNeSByb3VuZCAoaW5uZXJIZWlnaHQgLSAxNyAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRnbG9iYWwuYnV0dG9ucyA9IFtdXHJcblx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHJvdW5kKDIqd2lkdGgvMykscm91bmQoaGVpZ2h0LzIpLCAnRnVsbCBTY3JlZW4nLCBmdWxsU2NyZWVuXHJcblx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHJvdW5kKHdpZHRoLzMpLHJvdW5kKGhlaWdodC8yKSwgJ0NvcHknLCAoKSA9PiBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCBnbG9iYWwuY2hlc3MucGduKClcclxuXHJcbndpbmRvdy5tb3VzZVByZXNzZWQgPSA9PlxyXG5cdGNvbnNvbGUubG9nICdtb3VzZVByZXNzZWQnXHJcblx0aWYgbm90IHJlbGVhc2VkIHRoZW4gcmV0dXJuXHJcblx0cmVsZWFzZWQgPSBmYWxzZVxyXG5cclxuXHRmb3IgYnV0dG9uIGluIGdsb2JhbC5idXR0b25zLmNvbmNhdCBnbG9iYWwuYnV0dG9uc1xyXG5cdFx0aWYgYnV0dG9uLmluc2lkZSBtb3VzZVgsbW91c2VZXHJcblx0XHRcdGJ1dHRvbi5vbmNsaWNrKClcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0Zm9yIHNxdWFyZSBpbiBnbG9iYWwuYm9hcmQwLnNxdWFyZXMuY29uY2F0IGdsb2JhbC5ib2FyZDEuc3F1YXJlc1xyXG5cdFx0aWYgc3F1YXJlLmluc2lkZSBtb3VzZVgsbW91c2VZXHJcblx0XHRcdGNvbnNvbGUubG9nICdzcXVhcmUuaW5zaWRlJyxzcXVhcmUubnJcclxuXHRcdFx0c3F1YXJlLm9uY2xpY2soKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRmYWxzZVxyXG5cclxud2luZG93Lm1vdXNlUmVsZWFzZWQgPSA9PlxyXG5cdHJlbGVhc2VkID0gdHJ1ZVxyXG5cdGZhbHNlIl19
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee