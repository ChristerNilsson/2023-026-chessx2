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
  button = document.getElementById("myButton");
  return button.onclick = () => {
    var s;
    s = "Hula Jönsson";
    return navigator.clipboard.writeText(s);
  };
};

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEdBQVI7RUFBWSxHQUFaO0VBQWdCLEtBQWhCO0VBQXNCLGVBQXRCO0VBQXNDLE1BQXRDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLE1BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFFQSxRQUFBLEdBQVcsS0FOWDs7QUFPQSxHQUFBLEdBQU07O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQztFQUFBLEtBQUEscUNBQUE7O0lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFELENBQVgsR0FBc0IsU0FBQSxDQUFVLFlBQUEsR0FBZSxNQUFmLEdBQXdCLE1BQWxDO0VBRHZCO0FBRUE7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FBQSxDQUFmLEdBQXNDLE1BQWhEO0VBRHZCLENBQUE7O0FBSGdCOztBQU1qQixVQUFBLEdBQWEsQ0FBQSxDQUFBLEdBQUE7U0FBRyxlQUFBLENBQUE7QUFBSDs7QUFFYixNQUFNLENBQUMsS0FBUCxHQUFlLENBQUEsQ0FBQSxHQUFBO0FBRWYsTUFBQTtFQUFDLFlBQUEsQ0FBYSxVQUFiLEVBQXdCLFdBQXhCO0VBRUEsQ0FBQyxNQUFNLENBQUMsSUFBUixFQUFjLE1BQU0sQ0FBQyxPQUFyQixDQUFBLEdBQWdDLE1BQUEsQ0FBTyxLQUFBLENBQU0sR0FBQSxDQUFJLFVBQUosRUFBZSxXQUFmLENBQUEsR0FBNEIsRUFBbEMsQ0FBUDtFQUNoQyxDQUFDLE1BQU0sQ0FBQyxFQUFSLEVBQVksTUFBTSxDQUFDLEtBQW5CLENBQUEsR0FBNEIsTUFBQSxDQUFPLEtBQUEsQ0FBTSxDQUFDLFVBQUEsR0FBYSxDQUFBLEdBQUksTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFsQixDQUFBLEdBQWlDLENBQXZDLENBQVA7RUFDNUIsQ0FBQyxNQUFNLENBQUMsRUFBUixFQUFZLE1BQU0sQ0FBQyxLQUFuQixDQUFBLEdBQTRCLE1BQUEsQ0FBTyxLQUFBLENBQU0sQ0FBQyxXQUFBLEdBQWMsRUFBQSxHQUFLLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBcEIsQ0FBQSxHQUFtQyxDQUF6QyxDQUFQO0VBRTVCLE1BQUEsQ0FBQTtFQUVBLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO0VBQ0EsUUFBQSxDQUFTLE1BQVQ7RUFDQSxTQUFBLENBQVUsTUFBVjtFQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLElBQUksS0FBSixDQUFVLENBQVY7RUFDaEIsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBSSxLQUFKLENBQVUsQ0FBVjtFQUNoQixNQUFNLENBQUMsS0FBUCxHQUFlLElBQUksS0FBSixDQUFBO0VBRWYsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCO1NBQ1QsTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDbEIsUUFBQTtJQUFFLENBQUEsR0FBSTtXQUNKLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBcEIsQ0FBOEIsQ0FBOUI7RUFGZ0I7QUFuQkgsRUFqQmY7Ozs7Ozs7O0FBK0NBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsQ0FBQSxDQUFBLEdBQUE7QUFDZCxNQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUMsVUFBQSxDQUFXLE1BQVg7RUFDQSxRQUFBLENBQVMsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFUO0VBQ0EsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFkLENBQUE7RUFDQSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQWQsQ0FBQTtBQUNBO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxNQUFNLENBQUMsSUFBUCxDQUFBO0VBREQ7RUFFQSxJQUFBLENBQUssT0FBTDtTQUNBLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO0FBUmE7O0FBVWQsTUFBTSxDQUFDLFFBQVAsR0FBa0IsUUFBQSxDQUFBLENBQUE7U0FBRyxNQUFBLENBQUE7QUFBSDs7QUFFbEIsTUFBQSxHQUFTLFFBQUEsQ0FBQSxDQUFBO0VBQ1IsTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFBLENBQU0sV0FBQSxHQUFZLEVBQWxCLENBQWY7RUFDQSxZQUFBLENBQWEsVUFBYixFQUF5QixXQUF6QjtFQUNBLE1BQU0sQ0FBQyxLQUFQLENBQWEsS0FBQSxDQUFNLENBQUMsVUFBQSxHQUFhLENBQUEsR0FBSSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQWxCLENBQUEsR0FBaUMsQ0FBdkMsQ0FBYjtFQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWixFQUFtQixNQUFNLENBQUMsSUFBUCxDQUFBLENBQW5CO0VBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBYSxLQUFBLENBQU0sQ0FBQyxXQUFBLEdBQWMsRUFBQSxHQUFLLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBcEIsQ0FBQSxHQUFtQyxDQUF6QyxDQUFiO0VBQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFmLENBQW9CLElBQUksTUFBSixDQUFXLEtBQUEsQ0FBTSxDQUFBLEdBQUUsS0FBRixHQUFRLENBQWQsQ0FBWCxFQUE0QixLQUFBLENBQU0sTUFBQSxHQUFPLENBQWIsQ0FBNUIsRUFBNkMsYUFBN0MsRUFBNEQsVUFBNUQsQ0FBcEI7U0FDQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQWYsQ0FBb0IsSUFBSSxNQUFKLENBQVcsS0FBQSxDQUFNLEtBQUEsR0FBTSxDQUFaLENBQVgsRUFBMEIsS0FBQSxDQUFNLE1BQUEsR0FBTyxDQUFiLENBQTFCLEVBQTJDLE1BQTNDLEVBQW1ELENBQUEsQ0FBQSxHQUFBO1dBQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFwQixDQUE4QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQWIsQ0FBQSxDQUE5QjtFQUFOLENBQW5ELENBQXBCO0FBUlE7O0FBVVQsTUFBTSxDQUFDLFlBQVAsR0FBc0IsQ0FBQSxDQUFBLEdBQUE7QUFDdEIsTUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7RUFBQyxPQUFPLENBQUMsR0FBUixDQUFZLGNBQVo7RUFDQSxJQUFHLENBQUksUUFBUDtBQUFxQixXQUFyQjs7RUFDQSxRQUFBLEdBQVc7QUFFWDtFQUFBLEtBQUEscUNBQUE7O0lBQ0MsSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFjLE1BQWQsRUFBcUIsTUFBckIsQ0FBSDtNQUNDLE1BQU0sQ0FBQyxPQUFQLENBQUE7QUFDQSxhQUFPLE1BRlI7O0VBREQ7QUFJQTtFQUFBLEtBQUEsd0NBQUE7O0lBQ0MsSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFjLE1BQWQsRUFBcUIsTUFBckIsQ0FBSDtNQUNDLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixFQUE0QixNQUFNLENBQUMsRUFBbkM7TUFDQSxNQUFNLENBQUMsT0FBUCxDQUFBO0FBQ0EsYUFBTyxNQUhSOztFQUREO1NBS0E7QUFkcUI7O0FBZ0J0QixNQUFNLENBQUMsYUFBUCxHQUF1QixDQUFBLENBQUEsR0FBQTtFQUN0QixRQUFBLEdBQVc7U0FDWDtBQUZzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2h0dHBzOi8vY2RuLnNreXBhY2suZGV2L2xvZGFzaCdcclxuaW1wb3J0IHthc3MsbG9nLHJhbmdlLGVudGVyRnVsbHNjcmVlbixzaWduYWx9IGZyb20gJy4uL2pzL3V0aWxzLmpzJ1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tICcuLi9qcy9ib2FyZC5qcydcclxuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uL2pzL2J1dHRvbi5qcydcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uL2pzL2dsb2JhbHMuanMnXHJcblxyXG5yZWxlYXNlZCA9IHRydWUgIyBwcmV2ZW50aW9uIG9mIHRvdWNoIGJvdW5jZVxyXG5hcnIgPSBudWxsXHJcblxyXG53aW5kb3cucHJlbG9hZCA9ID0+XHJcblx0Zm9yIGxldHRlciBpbiBcInJuYnFrcFwiXHJcblx0XHRnbG9iYWwucGljc1tsZXR0ZXJdID0gbG9hZEltYWdlICcuL2ltYWdlcy9iJyArIGxldHRlciArICcucG5nJ1xyXG5cdGZvciBsZXR0ZXIgaW4gXCJSTkJRS1BcIlxyXG5cdFx0Z2xvYmFsLnBpY3NbbGV0dGVyXSA9IGxvYWRJbWFnZSAnLi9pbWFnZXMvdycgKyBsZXR0ZXIudG9Mb3dlckNhc2UoKSArICcucG5nJ1xyXG5cclxuZnVsbFNjcmVlbiA9ID0+IGVudGVyRnVsbHNjcmVlbigpXHJcblxyXG53aW5kb3cuc2V0dXAgPSA9PlxyXG5cclxuXHRjcmVhdGVDYW52YXMgaW5uZXJXaWR0aCxpbm5lckhlaWdodFxyXG5cclxuXHRbZ2xvYmFsLnNpemUsIGdsb2JhbC5zZXRTaXplXSA9IHNpZ25hbCByb3VuZCBtaW4oaW5uZXJXaWR0aCxpbm5lckhlaWdodCkvMThcclxuXHRbZ2xvYmFsLm14LCBnbG9iYWwuc2V0TXhdID0gc2lnbmFsIHJvdW5kIChpbm5lcldpZHRoIC0gOCAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRbZ2xvYmFsLm15LCBnbG9iYWwuc2V0TXldID0gc2lnbmFsIHJvdW5kIChpbm5lckhlaWdodCAtIDE3ICogZ2xvYmFsLnNpemUoKSkvMlxyXG5cclxuXHRyZXNpemUoKVxyXG5cclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdGltYWdlTW9kZSBDRU5URVJcclxuXHJcblx0Z2xvYmFsLmJvYXJkMCA9IG5ldyBCb2FyZCAwXHJcblx0Z2xvYmFsLmJvYXJkMSA9IG5ldyBCb2FyZCAxXHJcblx0Z2xvYmFsLmNoZXNzID0gbmV3IENoZXNzKClcclxuXHJcblx0YnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJteUJ1dHRvblwiXHJcblx0YnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxyXG5cdFx0cyA9IFwiSHVsYSBKw7Zuc3NvblwiXHJcblx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCBzXHJcblxyXG5cdFx0IyBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibXlJbnB1dFwiXHJcblx0XHQjIGlucHV0LmZvY3VzKClcclxuXHRcdCMgaW5wdXQuc2VsZWN0KClcclxuXHRcdCMgaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UgMCwgOTk5OTlcclxuXHRcdCMgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQgaW5wdXQudmFsdWVcclxuXHRcdCMgY29uc29sZS5sb2cgaW5wdXQudmFsdWVcclxuXHJcbndpbmRvdy5kcmF3ID0gPT5cclxuXHRiYWNrZ3JvdW5kICdncmF5J1xyXG5cdHRleHRTaXplIGdsb2JhbC5zaXplKClcclxuXHRnbG9iYWwuYm9hcmQwLmRyYXcoKVxyXG5cdGdsb2JhbC5ib2FyZDEuZHJhdygpXHJcblx0Zm9yIGJ1dHRvbiBpbiBnbG9iYWwuYnV0dG9uc1xyXG5cdFx0YnV0dG9uLmRyYXcoKVxyXG5cdGZpbGwgXCJibGFja1wiXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IC0+IHJlc2l6ZSgpXHJcblxyXG5yZXNpemUgPSAtPlxyXG5cdGdsb2JhbC5zZXRTaXplIHJvdW5kIGlubmVySGVpZ2h0LzE4XHJcblx0cmVzaXplQ2FudmFzIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0XHJcblx0Z2xvYmFsLnNldE14IHJvdW5kIChpbm5lcldpZHRoIC0gOCAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRjb25zb2xlLmxvZyAnc2l6ZScsZ2xvYmFsLnNpemUoKVxyXG5cdGdsb2JhbC5zZXRNeSByb3VuZCAoaW5uZXJIZWlnaHQgLSAxNyAqIGdsb2JhbC5zaXplKCkpLzJcclxuXHRnbG9iYWwuYnV0dG9ucyA9IFtdXHJcblx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHJvdW5kKDIqd2lkdGgvMykscm91bmQoaGVpZ2h0LzIpLCAnRnVsbCBTY3JlZW4nLCBmdWxsU2NyZWVuXHJcblx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIHJvdW5kKHdpZHRoLzMpLHJvdW5kKGhlaWdodC8yKSwgJ0NvcHknLCAoKSA9PiBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCBnbG9iYWwuY2hlc3MucGduKClcclxuXHJcbndpbmRvdy5tb3VzZVByZXNzZWQgPSA9PlxyXG5cdGNvbnNvbGUubG9nICdtb3VzZVByZXNzZWQnXHJcblx0aWYgbm90IHJlbGVhc2VkIHRoZW4gcmV0dXJuXHJcblx0cmVsZWFzZWQgPSBmYWxzZVxyXG5cclxuXHRmb3IgYnV0dG9uIGluIGdsb2JhbC5idXR0b25zLmNvbmNhdCBnbG9iYWwuYnV0dG9uc1xyXG5cdFx0aWYgYnV0dG9uLmluc2lkZSBtb3VzZVgsbW91c2VZXHJcblx0XHRcdGJ1dHRvbi5vbmNsaWNrKClcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0Zm9yIHNxdWFyZSBpbiBnbG9iYWwuYm9hcmQwLnNxdWFyZXMuY29uY2F0IGdsb2JhbC5ib2FyZDEuc3F1YXJlc1xyXG5cdFx0aWYgc3F1YXJlLmluc2lkZSBtb3VzZVgsbW91c2VZXHJcblx0XHRcdGNvbnNvbGUubG9nICdzcXVhcmUuaW5zaWRlJyxzcXVhcmUubnJcclxuXHRcdFx0c3F1YXJlLm9uY2xpY2soKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRmYWxzZVxyXG5cclxud2luZG93Lm1vdXNlUmVsZWFzZWQgPSA9PlxyXG5cdHJlbGVhc2VkID0gdHJ1ZVxyXG5cdGZhbHNlIl19
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee