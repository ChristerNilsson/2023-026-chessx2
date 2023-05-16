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
  createCanvas(innerWidth, innerHeight);
  [global.size, global.setSize] = signal(round(min(innerWidth, innerHeight) / 18));
  //global.size = size
  //global.setSize = setSize
  [global.mx, global.setMx] = signal(round((innerWidth - 8 * global.size()) / 2));
  //global.mx = mx
  //global.setMx = setMx
  [global.my, global.setMy] = signal(round((innerHeight - 17 * global.size()) / 2));
  //global.my = my
  //global.setMy = setMy
  resize();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  global.board0 = new Board(0);
  global.board1 = new Board(1);
  return global.chess = new Chess();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEdBQVI7RUFBWSxHQUFaO0VBQWdCLEtBQWhCO0VBQXNCLGVBQXRCO0VBQXNDLE1BQXRDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFFQSxRQUFBLEdBQVcsS0FOWDs7QUFPQSxHQUFBLEdBQU07O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQztFQUFBLEtBQUEscUNBQUE7O0lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFELENBQVgsR0FBc0IsU0FBQSxDQUFVLFlBQUEsR0FBZSxNQUFmLEdBQXdCLE1BQWxDO0VBRHZCO0FBRUE7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FBQSxDQUFmLEdBQXNDLE1BQWhEO0VBRHZCLENBQUE7O0FBSGdCOztBQU1qQixVQUFBLEdBQWEsQ0FBQSxDQUFBLEdBQUE7U0FBRyxlQUFBLENBQUE7QUFBSDs7QUFFYixNQUFNLENBQUMsS0FBUCxHQUFlLENBQUEsQ0FBQSxHQUFBO0VBRWQsWUFBQSxDQUFhLFVBQWIsRUFBd0IsV0FBeEI7RUFFQSxDQUFDLE1BQU0sQ0FBQyxJQUFS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Q0EsUUFBQSxHQUFXO0FBRVg7RUFBQSxLQUFBLHFDQUFBOztJQUNDLElBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxNQUFkLEVBQXFCLE1BQXJCLENBQUg7TUFDQyxNQUFNLENBQUMsT0FBUCxDQUFBO0FBQ0EsYUFBTyxNQUZSOztFQUREO0FBSUE7RUFBQSxLQUFBLHdDQUFBOztJQUNDLElBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxNQUFkLEVBQXFCLE1BQXJCLENBQUg7TUFDQyxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVosRUFBNEIsTUFBTSxDQUFDLEVBQW5DO01BQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBQTtBQUNBLGFBQU8sTUFIUjs7RUFERDtTQUtBO0FBZHFCOztBQWdCdEIsTUFBTSxDQUFDLGFBQVAsR0FBdUIsQ0FBQSxDQUFBLEdBQUE7RUFDdEIsUUFBQSxHQUFXO1NBQ1g7QUFGc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxvZyxyYW5nZSxlbnRlckZ1bGxzY3JlZW4sc2lnbmFsfSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vanMvYm9hcmQuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxucmVsZWFzZWQgPSB0cnVlICMgcHJldmVudGlvbiBvZiB0b3VjaCBib3VuY2VcclxuYXJyID0gbnVsbFxyXG5cclxud2luZG93LnByZWxvYWQgPSA9PlxyXG5cdGZvciBsZXR0ZXIgaW4gXCJybmJxa3BcIlxyXG5cdFx0Z2xvYmFsLnBpY3NbbGV0dGVyXSA9IGxvYWRJbWFnZSAnLi9pbWFnZXMvYicgKyBsZXR0ZXIgKyAnLnBuZydcclxuXHRmb3IgbGV0dGVyIGluIFwiUk5CUUtQXCJcclxuXHRcdGdsb2JhbC5waWNzW2xldHRlcl0gPSBsb2FkSW1hZ2UgJy4vaW1hZ2VzL3cnICsgbGV0dGVyLnRvTG93ZXJDYXNlKCkgKyAnLnBuZydcclxuXHJcbmZ1bGxTY3JlZW4gPSA9PiBlbnRlckZ1bGxzY3JlZW4oKVxyXG5cclxud2luZG93LnNldHVwID0gPT5cclxuXHJcblx0Y3JlYXRlQ2FudmFzIGlubmVyV2lkdGgsaW5uZXJIZWlnaHRcclxuXHJcblx0W2dsb2JhbC5zaXplLCBnbG9iYWwuc2V0U2l6ZV0gPSBzaWduYWwgcm91bmQgbWluKGlubmVyV2lkdGgsaW5uZXJIZWlnaHQpLzE4XHJcblx0I2dsb2JhbC5zaXplID0gc2l6ZVxyXG5cdCNnbG9iYWwuc2V0U2l6ZSA9IHNldFNpemVcclxuXHRbZ2xvYmFsLm14LCBnbG9iYWwuc2V0TXhdID0gc2lnbmFsIHJvdW5kIChpbm5lcldpZHRoIC0gOCAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHQjZ2xvYmFsLm14ID0gbXhcclxuXHQjZ2xvYmFsLnNldE14ID0gc2V0TXhcclxuXHRbZ2xvYmFsLm15LCBnbG9iYWwuc2V0TXldID0gc2lnbmFsIHJvdW5kIChpbm5lckhlaWdodCAtIDE3ICogZ2xvYmFsLnNpemUoKSkvMlxyXG5cdCNnbG9iYWwubXkgPSBteVxyXG5cdCNnbG9iYWwuc2V0TXkgPSBzZXRNeVxyXG5cclxuXHRyZXNpemUoKVxyXG5cclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdGltYWdlTW9kZSBDRU5URVJcclxuXHJcblx0Z2xvYmFsLmJvYXJkMCA9IG5ldyBCb2FyZCAwXHJcblx0Z2xvYmFsLmJvYXJkMSA9IG5ldyBCb2FyZCAxXHJcblx0Z2xvYmFsLmNoZXNzID0gbmV3IENoZXNzKClcclxuXHJcbndpbmRvdy5kcmF3ID0gPT5cclxuXHRiYWNrZ3JvdW5kICdncmF5J1xyXG5cdHRleHRTaXplIGdsb2JhbC5zaXplKClcclxuXHRnbG9iYWwuYm9hcmQwLmRyYXcoKVxyXG5cdGdsb2JhbC5ib2FyZDEuZHJhdygpXHJcblx0Zm9yIGJ1dHRvbiBpbiBnbG9iYWwuYnV0dG9uc1xyXG5cdFx0YnV0dG9uLmRyYXcoKVxyXG5cdGZpbGwgXCJibGFja1wiXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IC0+IHJlc2l6ZSgpXHJcblxyXG5yZXNpemUgPSAtPlxyXG5cdGdsb2JhbC5zZXRTaXplIHJvdW5kIGlubmVySGVpZ2h0LzE4XHJcblx0cmVzaXplQ2FudmFzIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0XHJcblx0Z2xvYmFsLnNldE14IHJvdW5kIChpbm5lcldpZHRoIC0gOCAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRjb25zb2xlLmxvZyAnc2l6ZScsZ2xvYmFsLnNpemUoKVxyXG5cdGdsb2JhbC5zZXRNeSByb3VuZCAoaW5uZXJIZWlnaHQgLSAxNyAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRnbG9iYWwuYnV0dG9ucyA9IFtdXHJcblx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHJvdW5kKHdpZHRoLzIpLHJvdW5kKGhlaWdodC8yKSwgJ0Z1bGwgU2NyZWVuJywgZnVsbFNjcmVlblxyXG5cclxud2luZG93Lm1vdXNlUHJlc3NlZCA9ID0+XHJcblx0Y29uc29sZS5sb2cgJ21vdXNlUHJlc3NlZCdcclxuXHRpZiBub3QgcmVsZWFzZWQgdGhlbiByZXR1cm5cclxuXHRyZWxlYXNlZCA9IGZhbHNlXHJcblxyXG5cdGZvciBidXR0b24gaW4gZ2xvYmFsLmJ1dHRvbnMuY29uY2F0IGdsb2JhbC5idXR0b25zXHJcblx0XHRpZiBidXR0b24uaW5zaWRlIG1vdXNlWCxtb3VzZVlcclxuXHRcdFx0YnV0dG9uLm9uY2xpY2soKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRmb3Igc3F1YXJlIGluIGdsb2JhbC5ib2FyZDAuc3F1YXJlcy5jb25jYXQgZ2xvYmFsLmJvYXJkMS5zcXVhcmVzXHJcblx0XHRpZiBzcXVhcmUuaW5zaWRlIG1vdXNlWCxtb3VzZVlcclxuXHRcdFx0Y29uc29sZS5sb2cgJ3NxdWFyZS5pbnNpZGUnLHNxdWFyZS5uclxyXG5cdFx0XHRzcXVhcmUub25jbGljaygpXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdGZhbHNlXHJcblxyXG53aW5kb3cubW91c2VSZWxlYXNlZCA9ID0+XHJcblx0cmVsZWFzZWQgPSB0cnVlXHJcblx0ZmFsc2UiXX0=
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee