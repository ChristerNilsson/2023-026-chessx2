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

window.fetcher = () => {
  var s;
  s = global.chess.pgn();
  alert(s);
  return navigator.clipboard.writeText(s);
};

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
  [global.mx, global.setMx] = signal(round((innerWidth - 8 * global.size()) / 2));
  [global.my, global.setMy] = signal(round((innerHeight - 17 * global.size()) / 2));
  resize();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  global.board0 = new Board(0);
  global.board1 = new Board(1);
  return global.chess = new Chess();
};

// button = document.getElementById "myButton"
// button.onclick = () =>
// 	s = "Hula Jönsson"
// 	navigator.clipboard.writeText s

// input = document.getElementById "myInput"
// input.focus()
// input.select()
// input.setSelectionRange 0, 99999
// navigator.clipboard.writeText input.value
// console.log input.value
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEdBQVI7RUFBWSxHQUFaO0VBQWdCLEtBQWhCO0VBQXNCLGVBQXRCO0VBQXNDLE1BQXRDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFFQSxRQUFBLEdBQVcsS0FOWDs7QUFPQSxHQUFBLEdBQU07O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQTtFQUFDLENBQUEsR0FBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQWIsQ0FBQTtFQUNKLEtBQUEsQ0FBTSxDQUFOO1NBQ0EsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFwQixDQUE4QixDQUE5QjtBQUhnQjs7QUFLakIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQztFQUFBLEtBQUEscUNBQUE7O0lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFELENBQVgsR0FBc0IsU0FBQSxDQUFVLFlBQUEsR0FBZSxNQUFmLEdBQXdCLE1BQWxDO0VBRHZCO0FBRUE7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FBQSxDQUFmLEdBQXNDLE1BQWhEO0VBRHZCLENBQUE7O0FBSGdCOztBQU1qQixVQUFBLEdBQWEsQ0FBQSxDQUFBLEdBQUE7U0FBRyxlQUFBLENBQUE7QUFBSDs7QUFFYixNQUFNLENBQUMsS0FBUCxHQUFlLENBQUEsQ0FBQSxHQUFBO0VBRWQsWUFBQSxDQUFhLFVBQWIsRUFBd0IsV0FBeEI7RUFFQSxDQUFDLE1BQU0sQ0FBQyxJQUFSLEVBQWMsTUFBTSxDQUFDLE9BQXJCLENBQUEsR0FBZ0MsTUFBQSxDQUFPLEtBQUEsQ0FBTSxHQUFBLENBQUksVUFBSixFQUFlLFdBQWYsQ0FBQSxHQUE0QixFQUFsQyxDQUFQO0VBQ2hDLENBQUMsTUFBTSxDQUFDLEVBQVIsRUFBWSxNQUFNLENBQUMsS0FBbkIsQ0FBQSxHQUE0QixNQUFBLENBQU8sS0FBQSxDQUFNLENBQUMsVUFBQSxHQUFhLENBQUEsR0FBSSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQWxCLENBQUEsR0FBaUMsQ0FBdkMsQ0FBUDtFQUM1QixDQUFDLE1BQU0sQ0FBQyxFQUFSLEVBQVksTUFBTSxDQUFDLEtBQW5CLENBQUEsR0FBNEIsTUFBQSxDQUFPLEtBQUEsQ0FBTSxDQUFDLFdBQUEsR0FBYyxFQUFBLEdBQUssTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFwQixDQUFBLEdBQW1DLENBQXpDLENBQVA7RUFFNUIsTUFBQSxDQUFBO0VBRUEsU0FBQSxDQUFVLE1BQVYsRUFBaUIsTUFBakI7RUFDQSxRQUFBLENBQVMsTUFBVDtFQUNBLFNBQUEsQ0FBVSxNQUFWO0VBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBSSxLQUFKLENBQVUsQ0FBVjtFQUNoQixNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFJLEtBQUosQ0FBVSxDQUFWO1NBQ2hCLE1BQU0sQ0FBQyxLQUFQLEdBQWUsSUFBSSxLQUFKLENBQUE7QUFoQkQsRUF0QmY7Ozs7Ozs7Ozs7Ozs7QUFvREEsTUFBTSxDQUFDLElBQVAsR0FBYyxDQUFBLENBQUEsR0FBQTtBQUNkLE1BQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7RUFBQyxVQUFBLENBQVcsTUFBWDtFQUNBLFFBQUEsQ0FBUyxNQUFNLENBQUMsSUFBUCxDQUFBLENBQVQ7RUFDQSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQWQsQ0FBQTtFQUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBZCxDQUFBO0FBQ0E7RUFBQSxLQUFBLHFDQUFBOztJQUNDLE1BQU0sQ0FBQyxJQUFQLENBQUE7RUFERDtFQUVBLElBQUEsQ0FBSyxPQUFMO1NBQ0EsU0FBQSxDQUFVLE1BQVYsRUFBaUIsTUFBakI7QUFSYTs7QUFVZCxNQUFNLENBQUMsUUFBUCxHQUFrQixRQUFBLENBQUEsQ0FBQTtTQUFHLE1BQUEsQ0FBQTtBQUFIOztBQUVsQixNQUFBLEdBQVMsUUFBQSxDQUFBLENBQUE7RUFDUixNQUFNLENBQUMsT0FBUCxDQUFlLEtBQUEsQ0FBTSxXQUFBLEdBQVksRUFBbEIsQ0FBZjtFQUNBLFlBQUEsQ0FBYSxVQUFiLEVBQXlCLFdBQXpCO0VBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBYSxLQUFBLENBQU0sQ0FBQyxVQUFBLEdBQWEsQ0FBQSxHQUFJLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBbEIsQ0FBQSxHQUFpQyxDQUF2QyxDQUFiO0VBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaLEVBQW1CLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBbkI7RUFDQSxNQUFNLENBQUMsS0FBUCxDQUFhLEtBQUEsQ0FBTSxDQUFDLFdBQUEsR0FBYyxFQUFBLEdBQUssTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFwQixDQUFBLEdBQW1DLENBQXpDLENBQWI7RUFDQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQWYsQ0FBb0IsSUFBSSxNQUFKLENBQVcsS0FBQSxDQUFNLENBQUEsR0FBRSxLQUFGLEdBQVEsQ0FBZCxDQUFYLEVBQTRCLEtBQUEsQ0FBTSxNQUFBLEdBQU8sQ0FBYixDQUE1QixFQUE2QyxhQUE3QyxFQUE0RCxVQUE1RCxDQUFwQjtTQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBZixDQUFvQixJQUFJLE1BQUosQ0FBVyxLQUFBLENBQU0sS0FBQSxHQUFNLENBQVosQ0FBWCxFQUEwQixLQUFBLENBQU0sTUFBQSxHQUFPLENBQWIsQ0FBMUIsRUFBMkMsTUFBM0MsRUFBbUQsQ0FBQSxDQUFBLEdBQUE7V0FBTSxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQXBCLENBQThCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBYixDQUFBLENBQTlCO0VBQU4sQ0FBbkQsQ0FBcEI7QUFSUTs7QUFVVCxNQUFNLENBQUMsWUFBUCxHQUFzQixDQUFBLENBQUEsR0FBQTtBQUN0QixNQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtFQUFDLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWjtFQUNBLElBQUcsQ0FBSSxRQUFQO0FBQXFCLFdBQXJCOztFQUNBLFFBQUEsR0FBVztBQUVYO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxJQUFHLE1BQU0sQ0FBQyxNQUFQLENBQWMsTUFBZCxFQUFxQixNQUFyQixDQUFIO01BQ0MsTUFBTSxDQUFDLE9BQVAsQ0FBQTtBQUNBLGFBQU8sTUFGUjs7RUFERDtBQUlBO0VBQUEsS0FBQSx3Q0FBQTs7SUFDQyxJQUFHLE1BQU0sQ0FBQyxNQUFQLENBQWMsTUFBZCxFQUFxQixNQUFyQixDQUFIO01BQ0MsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCLE1BQU0sQ0FBQyxFQUFuQztNQUNBLE1BQU0sQ0FBQyxPQUFQLENBQUE7QUFDQSxhQUFPLE1BSFI7O0VBREQ7U0FLQTtBQWRxQjs7QUFnQnRCLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLENBQUEsQ0FBQSxHQUFBO0VBQ3RCLFFBQUEsR0FBVztTQUNYO0FBRnNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvbG9kYXNoJ1xyXG5pbXBvcnQge2Fzcyxsb2cscmFuZ2UsZW50ZXJGdWxsc2NyZWVuLHNpZ25hbH0gZnJvbSAnLi4vanMvdXRpbHMuanMnXHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uL2pzL2JvYXJkLmpzJ1xyXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vanMvYnV0dG9uLmpzJ1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuXHJcbnJlbGVhc2VkID0gdHJ1ZSAjIHByZXZlbnRpb24gb2YgdG91Y2ggYm91bmNlXHJcbmFyciA9IG51bGxcclxuXHJcbndpbmRvdy5mZXRjaGVyID0gPT5cclxuXHRzID0gZ2xvYmFsLmNoZXNzLnBnbigpXHJcblx0YWxlcnQgc1xyXG5cdG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0IHNcclxuXHJcbndpbmRvdy5wcmVsb2FkID0gPT5cclxuXHRmb3IgbGV0dGVyIGluIFwicm5icWtwXCJcclxuXHRcdGdsb2JhbC5waWNzW2xldHRlcl0gPSBsb2FkSW1hZ2UgJy4vaW1hZ2VzL2InICsgbGV0dGVyICsgJy5wbmcnXHJcblx0Zm9yIGxldHRlciBpbiBcIlJOQlFLUFwiXHJcblx0XHRnbG9iYWwucGljc1tsZXR0ZXJdID0gbG9hZEltYWdlICcuL2ltYWdlcy93JyArIGxldHRlci50b0xvd2VyQ2FzZSgpICsgJy5wbmcnXHJcblxyXG5mdWxsU2NyZWVuID0gPT4gZW50ZXJGdWxsc2NyZWVuKClcclxuXHJcbndpbmRvdy5zZXR1cCA9ID0+XHJcblxyXG5cdGNyZWF0ZUNhbnZhcyBpbm5lcldpZHRoLGlubmVySGVpZ2h0XHJcblxyXG5cdFtnbG9iYWwuc2l6ZSwgZ2xvYmFsLnNldFNpemVdID0gc2lnbmFsIHJvdW5kIG1pbihpbm5lcldpZHRoLGlubmVySGVpZ2h0KS8xOFxyXG5cdFtnbG9iYWwubXgsIGdsb2JhbC5zZXRNeF0gPSBzaWduYWwgcm91bmQgKGlubmVyV2lkdGggLSA4ICogZ2xvYmFsLnNpemUoKSkvMlxyXG5cdFtnbG9iYWwubXksIGdsb2JhbC5zZXRNeV0gPSBzaWduYWwgcm91bmQgKGlubmVySGVpZ2h0IC0gMTcgKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblxyXG5cdHJlc2l6ZSgpXHJcblxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0cmVjdE1vZGUgQ0VOVEVSXHJcblx0aW1hZ2VNb2RlIENFTlRFUlxyXG5cclxuXHRnbG9iYWwuYm9hcmQwID0gbmV3IEJvYXJkIDBcclxuXHRnbG9iYWwuYm9hcmQxID0gbmV3IEJvYXJkIDFcclxuXHRnbG9iYWwuY2hlc3MgPSBuZXcgQ2hlc3MoKVxyXG5cclxuXHQjIGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibXlCdXR0b25cIlxyXG5cdCMgYnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxyXG5cdCMgXHRzID0gXCJIdWxhIErDtm5zc29uXCJcclxuXHQjIFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQgc1xyXG5cclxuXHRcdCMgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm15SW5wdXRcIlxyXG5cdFx0IyBpbnB1dC5mb2N1cygpXHJcblx0XHQjIGlucHV0LnNlbGVjdCgpXHJcblx0XHQjIGlucHV0LnNldFNlbGVjdGlvblJhbmdlIDAsIDk5OTk5XHJcblx0XHQjIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0IGlucHV0LnZhbHVlXHJcblx0XHQjIGNvbnNvbGUubG9nIGlucHV0LnZhbHVlXHJcblxyXG53aW5kb3cuZHJhdyA9ID0+XHJcblx0YmFja2dyb3VuZCAnZ3JheSdcclxuXHR0ZXh0U2l6ZSBnbG9iYWwuc2l6ZSgpXHJcblx0Z2xvYmFsLmJvYXJkMC5kcmF3KClcclxuXHRnbG9iYWwuYm9hcmQxLmRyYXcoKVxyXG5cdGZvciBidXR0b24gaW4gZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGJ1dHRvbi5kcmF3KClcclxuXHRmaWxsIFwiYmxhY2tcIlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblxyXG53aW5kb3cub25yZXNpemUgPSAtPiByZXNpemUoKVxyXG5cclxucmVzaXplID0gLT5cclxuXHRnbG9iYWwuc2V0U2l6ZSByb3VuZCBpbm5lckhlaWdodC8xOFxyXG5cdHJlc2l6ZUNhbnZhcyBpbm5lcldpZHRoLCBpbm5lckhlaWdodFxyXG5cdGdsb2JhbC5zZXRNeCByb3VuZCAoaW5uZXJXaWR0aCAtIDggKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblx0Y29uc29sZS5sb2cgJ3NpemUnLGdsb2JhbC5zaXplKClcclxuXHRnbG9iYWwuc2V0TXkgcm91bmQgKGlubmVySGVpZ2h0IC0gMTcgKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblx0Z2xvYmFsLmJ1dHRvbnMgPSBbXVxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiByb3VuZCgyKndpZHRoLzMpLHJvdW5kKGhlaWdodC8yKSwgJ0Z1bGwgU2NyZWVuJywgZnVsbFNjcmVlblxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiByb3VuZCh3aWR0aC8zKSxyb3VuZChoZWlnaHQvMiksICdDb3B5JywgKCkgPT4gbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQgZ2xvYmFsLmNoZXNzLnBnbigpXHJcblxyXG53aW5kb3cubW91c2VQcmVzc2VkID0gPT5cclxuXHRjb25zb2xlLmxvZyAnbW91c2VQcmVzc2VkJ1xyXG5cdGlmIG5vdCByZWxlYXNlZCB0aGVuIHJldHVyblxyXG5cdHJlbGVhc2VkID0gZmFsc2VcclxuXHJcblx0Zm9yIGJ1dHRvbiBpbiBnbG9iYWwuYnV0dG9ucy5jb25jYXQgZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGlmIGJ1dHRvbi5pbnNpZGUgbW91c2VYLG1vdXNlWVxyXG5cdFx0XHRidXR0b24ub25jbGljaygpXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdGZvciBzcXVhcmUgaW4gZ2xvYmFsLmJvYXJkMC5zcXVhcmVzLmNvbmNhdCBnbG9iYWwuYm9hcmQxLnNxdWFyZXNcclxuXHRcdGlmIHNxdWFyZS5pbnNpZGUgbW91c2VYLG1vdXNlWVxyXG5cdFx0XHRjb25zb2xlLmxvZyAnc3F1YXJlLmluc2lkZScsc3F1YXJlLm5yXHJcblx0XHRcdHNxdWFyZS5vbmNsaWNrKClcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0ZmFsc2VcclxuXHJcbndpbmRvdy5tb3VzZVJlbGVhc2VkID0gPT5cclxuXHRyZWxlYXNlZCA9IHRydWVcclxuXHRmYWxzZVxyXG5cclxuIl19
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee