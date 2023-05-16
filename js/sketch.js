// Generated by CoffeeScript 2.5.1
var SIZE, arr, fullScreen, released, resize;

import _ from 'https://cdn.skypack.dev/lodash';

import {
  ass,
  log,
  range,
  enterFullscreen
} from '../js/utils.js';

import {
  Board
} from '../js/board.js';

import {
  Button
} from '../js/button.js';

import {
  clickString,
  global
} from '../js/globals.js';

SIZE = global.SIZE;

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
  //global.buttons = []
  return enterFullscreen();
};

window.setup = () => {
  createCanvas(innerWidth, innerHeight);
  global.SIZE = min(innerWidth, innerHeight);
  global.SIZE = round(innerHeight / 18);
  resize();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  global.board = new Board(0);
  global.board2 = new Board(1);
  return global.chess = new Chess();
};

window.draw = () => {
  var button, i, len, ref;
  background('gray');
  textSize(SIZE);
  global.board.draw();
  global.board2.draw();
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
  global.SIZE = round(innerHeight / 18);
  resizeCanvas(innerWidth, innerHeight);
  global.mx = round((innerWidth - 8 * global.SIZE) / 2);
  global.my = round((innerHeight - 17 * global.SIZE) / 2);
  global.buttons = [];
  return global.buttons.push(new Button(round(width / 2), round(height / 2), 'Full Screen', fullScreen));
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
  ref1 = global.board.squares.concat(global.board2.squares);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxVQUFBLEVBQUEsUUFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksR0FBWjtFQUFnQixLQUFoQjtFQUFzQixlQUF0QjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEtBQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsV0FBUjtFQUFvQixNQUFwQjtDQUFBLE1BQUE7O0FBRUEsSUFBQSxHQUFPLE1BQU0sQ0FBQzs7QUFDZCxRQUFBLEdBQVcsS0FQWDs7QUFRQSxHQUFBLEdBQU07O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQztFQUFBLEtBQUEscUNBQUE7O0lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFELENBQVgsR0FBc0IsU0FBQSxDQUFVLFlBQUEsR0FBZSxNQUFmLEdBQXdCLE1BQWxDO0VBRHZCO0FBRUE7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FBQSxDQUFmLEdBQXNDLE1BQWhEO0VBRHZCLENBQUE7O0FBSGdCOztBQU1qQixVQUFBLEdBQWEsQ0FBQSxDQUFBLEdBQUEsRUFBQTs7U0FFWixlQUFBLENBQUE7QUFGWTs7QUFJYixNQUFNLENBQUMsS0FBUCxHQUFlLENBQUEsQ0FBQSxHQUFBO0VBRWQsWUFBQSxDQUFh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cHM6Ly9jZG4uc2t5cGFjay5kZXYvbG9kYXNoJ1xyXG5pbXBvcnQge2Fzcyxsb2cscmFuZ2UsZW50ZXJGdWxsc2NyZWVufSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vanMvYm9hcmQuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Y2xpY2tTdHJpbmcsZ2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxuU0laRSA9IGdsb2JhbC5TSVpFXHJcbnJlbGVhc2VkID0gdHJ1ZSAjIHByZXZlbnRpb24gb2YgdG91Y2ggYm91bmNlXHJcbmFyciA9IG51bGxcclxuXHJcbndpbmRvdy5wcmVsb2FkID0gPT5cclxuXHRmb3IgbGV0dGVyIGluIFwicm5icWtwXCJcclxuXHRcdGdsb2JhbC5waWNzW2xldHRlcl0gPSBsb2FkSW1hZ2UgJy4vaW1hZ2VzL2InICsgbGV0dGVyICsgJy5wbmcnXHJcblx0Zm9yIGxldHRlciBpbiBcIlJOQlFLUFwiXHJcblx0XHRnbG9iYWwucGljc1tsZXR0ZXJdID0gbG9hZEltYWdlICcuL2ltYWdlcy93JyArIGxldHRlci50b0xvd2VyQ2FzZSgpICsgJy5wbmcnXHJcblxyXG5mdWxsU2NyZWVuID0gPT5cclxuXHQjZ2xvYmFsLmJ1dHRvbnMgPSBbXVxyXG5cdGVudGVyRnVsbHNjcmVlbigpXHJcblxyXG53aW5kb3cuc2V0dXAgPSA9PlxyXG5cclxuXHRjcmVhdGVDYW52YXMgaW5uZXJXaWR0aCxpbm5lckhlaWdodFxyXG5cclxuXHRnbG9iYWwuU0laRSA9IG1pbiBpbm5lcldpZHRoLGlubmVySGVpZ2h0XHJcblx0Z2xvYmFsLlNJWkUgPSByb3VuZCBpbm5lckhlaWdodC8xOFxyXG5cclxuXHRyZXNpemUoKVxyXG5cclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdGltYWdlTW9kZSBDRU5URVJcclxuXHJcblx0Z2xvYmFsLmJvYXJkID0gbmV3IEJvYXJkIDBcclxuXHRnbG9iYWwuYm9hcmQyID0gbmV3IEJvYXJkIDFcclxuXHRnbG9iYWwuY2hlc3MgPSBuZXcgQ2hlc3MoKVxyXG5cclxud2luZG93LmRyYXcgPSA9PlxyXG5cdGJhY2tncm91bmQgJ2dyYXknXHJcblx0dGV4dFNpemUgU0laRVxyXG5cdGdsb2JhbC5ib2FyZC5kcmF3KClcclxuXHRnbG9iYWwuYm9hcmQyLmRyYXcoKVxyXG5cdGZvciBidXR0b24gaW4gZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGJ1dHRvbi5kcmF3KClcclxuXHRmaWxsIFwiYmxhY2tcIlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblxyXG53aW5kb3cub25yZXNpemUgPSAtPiByZXNpemUoKVxyXG5cclxucmVzaXplID0gLT5cclxuXHRnbG9iYWwuU0laRSA9IHJvdW5kIGlubmVySGVpZ2h0LzE4XHJcblx0cmVzaXplQ2FudmFzIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0XHJcblx0Z2xvYmFsLm14ID0gcm91bmQgKGlubmVyV2lkdGggLSA4ICogZ2xvYmFsLlNJWkUpLzJcclxuXHRnbG9iYWwubXkgPSByb3VuZCAoaW5uZXJIZWlnaHQgLSAxNyAqIGdsb2JhbC5TSVpFKS8yXHJcblx0Z2xvYmFsLmJ1dHRvbnMgPSBbXVxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiByb3VuZCh3aWR0aC8yKSxyb3VuZChoZWlnaHQvMiksICdGdWxsIFNjcmVlbicsIGZ1bGxTY3JlZW5cclxuXHJcbndpbmRvdy5tb3VzZVByZXNzZWQgPSA9PlxyXG5cdGNvbnNvbGUubG9nICdtb3VzZVByZXNzZWQnXHJcblx0aWYgbm90IHJlbGVhc2VkIHRoZW4gcmV0dXJuXHJcblx0cmVsZWFzZWQgPSBmYWxzZVxyXG5cclxuXHRmb3IgYnV0dG9uIGluIGdsb2JhbC5idXR0b25zLmNvbmNhdCBnbG9iYWwuYnV0dG9uc1xyXG5cdFx0aWYgYnV0dG9uLmluc2lkZSBtb3VzZVgsbW91c2VZXHJcblx0XHRcdGJ1dHRvbi5vbmNsaWNrKClcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0Zm9yIHNxdWFyZSBpbiBnbG9iYWwuYm9hcmQuc3F1YXJlcy5jb25jYXQgZ2xvYmFsLmJvYXJkMi5zcXVhcmVzXHJcblx0XHRpZiBzcXVhcmUuaW5zaWRlIG1vdXNlWCxtb3VzZVlcclxuXHRcdFx0Y29uc29sZS5sb2cgJ3NxdWFyZS5pbnNpZGUnLHNxdWFyZS5uclxyXG5cdFx0XHRzcXVhcmUub25jbGljaygpXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdGZhbHNlXHJcblxyXG53aW5kb3cubW91c2VSZWxlYXNlZCA9ID0+XHJcblx0cmVsZWFzZWQgPSB0cnVlXHJcblx0ZmFsc2UiXX0=
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee