// Generated by CoffeeScript 2.5.1
var arr, fullScreen, released, resize, showDialogue;

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

import {
  menu0
} from '../js/menus.js';

import {
  MenuButton
} from '../js/dialogue.js';

released = true; // prevention of touch bounce

arr = null;

Array.prototype.clear = function() {
  return this.length = 0;
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

showDialogue = function() {
  if (global.dialogues.length > 0) {
    return (_.last(global.dialogues)).show();
  }
};

window.setup = () => {
  createCanvas(innerWidth, innerHeight);
  //global.a = createInput 'hallo!'# global.chess.pgn()
  // global.a.id = 'pgn'
  //global.a.position width+100, 100
  [global.size, global.setSize] = signal(round(min(innerWidth, innerHeight) / 18));
  [global.mx, global.setMx] = signal(round((innerWidth - 8 * global.size()) / 2));
  [global.my, global.setMy] = signal(round((innerHeight - 17 * global.size()) / 2));
  resize();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
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
  textAlign(CENTER, CENTER);
  return showDialogue();
};

window.onresize = function() {
  return resize();
};

// window.keyPressed = =>
// 	if global.dialogues.length == 0 then menu0() # else dialogues.clear()
resize = function() {
  var x0, x1, y0, y1, y2;
  global.setSize(round(innerHeight / 18));
  resizeCanvas(innerWidth, innerHeight);
  global.setMx(round((innerWidth - 8 * global.size()) / 2));
  global.setMy(round((innerHeight - 17 * global.size()) / 2));
  global.buttons = [];
  x0 = round(global.mx() / 2);
  x1 = width - x0;
  y0 = round(0.20 * height);
  y1 = round(0.50 * height);
  y2 = round(0.80 * height);
  global.buttons.push(new MenuButton(x1, y0, () => {
    if (global.paused && global.dialogues.length === 0) {
      return menu0();
    }
  }));
  global.buttons.push(new MenuButton(x0, y2, () => {
    if (global.paused && global.dialogues.length === 0) {
      return menu0();
    }
  }));
  global.buttons.push(new Button(x0, y1, "⏰", () => {
    if (global.buttons[2].text === "⏰") {
      return global.paused = !global.paused;
    }
  }));
  return global.buttons.push(new Button(x1, y1, "⏰", () => {
    if (global.buttons[3].text === "⏰") {
      return global.paused = !global.paused;
    }
  }));
};

window.mousePressed = () => {
  var button, i, j, len, len1, ref, ref1, square;
  if (!released) {
    return;
  }
  released = false;
  if (global.dialogues.length > 0) {
    (_.last(global.dialogues)).execute(mouseX, mouseY);
    return false;
  }
  ref = global.buttons;
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
      //console.log 'square.inside',square.nr
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksR0FBWjtFQUFnQixLQUFoQjtFQUFzQixlQUF0QjtFQUFzQyxNQUF0QztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEtBQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEtBQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxVQUFSO0NBQUEsTUFBQTs7QUFFQSxRQUFBLEdBQVcsS0FSWDs7QUFTQSxHQUFBLEdBQU07O0FBQ04sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFoQixHQUF3QixRQUFBLENBQUEsQ0FBQTtTQUFHLElBQUMsQ0FBQSxNQUFELEdBQVU7QUFBYjs7QUFFeEIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsQ0FBQSxDQUFBLEdBQUE7QUFDakIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQztFQUFBLEtBQUEscUNBQUE7O0lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFELENBQVgsR0FBc0IsU0FBQSxDQUFVLFlBQUEsR0FBZSxNQUFmLEdBQXdCLE1BQWxDO0VBRHZCO0FBRUE7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FBQSxDQUFmLEdBQXNDLE1BQWhEO0VBRHZCLENBQUE7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QUFpQixHQUFqQixFQUFzQixDQUFBLENBQUEsR0FBQTtJQUN6QyxJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBRCxDQUFHLENBQUMsSUFBbEIsS0FBMEIsR0FBN0I7YUFDQyxNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFJLE1BQU0sQ0FBQyxPQUQ1Qjs7RUFEeUMsQ0FBdEIsQ0FBcEI7QUF0QlE7O0FBMEJULE1BQU0sQ0FBQyxZQUFQLEdBQXNCLENBQUEsQ0FBQSxHQUFBO0FBQ3RCLE1BQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO0VBQUMsSUFBRyxDQUFJLFFBQVA7QUFBcUIsV0FBckI7O0VBQ0EsUUFBQSxHQUFXO0VBRVgsSUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWpCLEdBQTBCLENBQTdCO0lBQ0MsQ0FBQyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxTQUFkLENBQUQsQ0FBeUIsQ0FBQyxPQUExQixDQUFrQyxNQUFsQyxFQUF5QyxNQUF6QztBQUNBLFdBQU8sTUFGUjs7QUFJQTtFQUFBLEtBQUEscUNBQUE7O0lBQ0MsSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFjLE1BQWQsRUFBcUIsTUFBckIsQ0FBSDtNQUNDLE1BQU0sQ0FBQyxPQUFQLENBQUE7QUFDQSxhQUFPLE1BRlI7O0VBREQ7QUFLQTtFQUFBLEtBQUEsd0NBQUE7O0lBQ0MsSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFjLE1BQWQsRUFBcUIsTUFBckIsQ0FBSDs7TUFFQyxNQUFNLENBQUMsT0FBUCxDQUFBO0FBQ0EsYUFBTyxNQUhSOztFQUREO1NBS0E7QUFsQnFCOztBQW9CdEIsTUFBTSxDQUFDLGFBQVAsR0FBdUIsQ0FBQSxDQUFBLEdBQUE7RUFDdEIsUUFBQSxHQUFXO1NBQ1g7QUFGc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxvZyxyYW5nZSxlbnRlckZ1bGxzY3JlZW4sc2lnbmFsfSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vanMvYm9hcmQuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5pbXBvcnQge21lbnUwfSBmcm9tICcuLi9qcy9tZW51cy5qcydcclxuaW1wb3J0IHtNZW51QnV0dG9ufSBmcm9tICcuLi9qcy9kaWFsb2d1ZS5qcydcclxuXHJcbnJlbGVhc2VkID0gdHJ1ZSAjIHByZXZlbnRpb24gb2YgdG91Y2ggYm91bmNlXHJcbmFyciA9IG51bGxcclxuQXJyYXkucHJvdG90eXBlLmNsZWFyID0gLT4gQGxlbmd0aCA9IDBcclxuXHJcbndpbmRvdy5wcmVsb2FkID0gPT5cclxuXHRmb3IgbGV0dGVyIGluIFwicm5icWtwXCJcclxuXHRcdGdsb2JhbC5waWNzW2xldHRlcl0gPSBsb2FkSW1hZ2UgJy4vaW1hZ2VzL2InICsgbGV0dGVyICsgJy5wbmcnXHJcblx0Zm9yIGxldHRlciBpbiBcIlJOQlFLUFwiXHJcblx0XHRnbG9iYWwucGljc1tsZXR0ZXJdID0gbG9hZEltYWdlICcuL2ltYWdlcy93JyArIGxldHRlci50b0xvd2VyQ2FzZSgpICsgJy5wbmcnXHJcblxyXG5mdWxsU2NyZWVuID0gPT4gZW50ZXJGdWxsc2NyZWVuKClcclxuXHJcbnNob3dEaWFsb2d1ZSA9IC0+IGlmIGdsb2JhbC5kaWFsb2d1ZXMubGVuZ3RoID4gMCB0aGVuIChfLmxhc3QgZ2xvYmFsLmRpYWxvZ3Vlcykuc2hvdygpXHJcblxyXG53aW5kb3cuc2V0dXAgPSA9PlxyXG5cclxuXHRjcmVhdGVDYW52YXMgaW5uZXJXaWR0aCxpbm5lckhlaWdodFxyXG5cclxuXHQjZ2xvYmFsLmEgPSBjcmVhdGVJbnB1dCAnaGFsbG8hJyMgZ2xvYmFsLmNoZXNzLnBnbigpXHJcblx0IyBnbG9iYWwuYS5pZCA9ICdwZ24nXHJcblx0I2dsb2JhbC5hLnBvc2l0aW9uIHdpZHRoKzEwMCwgMTAwXHJcblxyXG5cdFtnbG9iYWwuc2l6ZSwgZ2xvYmFsLnNldFNpemVdID0gc2lnbmFsIHJvdW5kIG1pbihpbm5lcldpZHRoLGlubmVySGVpZ2h0KS8xOFxyXG5cdFtnbG9iYWwubXgsIGdsb2JhbC5zZXRNeF0gPSBzaWduYWwgcm91bmQgKGlubmVyV2lkdGggLSA4ICogZ2xvYmFsLnNpemUoKSkvMlxyXG5cdFtnbG9iYWwubXksIGdsb2JhbC5zZXRNeV0gPSBzaWduYWwgcm91bmQgKGlubmVySGVpZ2h0IC0gMTcgKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblxyXG5cdHJlc2l6ZSgpXHJcblxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0cmVjdE1vZGUgQ0VOVEVSXHJcblx0aW1hZ2VNb2RlIENFTlRFUlxyXG5cdGFuZ2xlTW9kZSBERUdSRUVTXHJcblxyXG5cdGdsb2JhbC5ib2FyZDAgPSBuZXcgQm9hcmQgMFxyXG5cdGdsb2JhbC5ib2FyZDEgPSBuZXcgQm9hcmQgMVxyXG5cdGdsb2JhbC5jaGVzcyA9IG5ldyBDaGVzcygpXHJcblxyXG53aW5kb3cuZHJhdyA9ID0+XHJcblx0YmFja2dyb3VuZCAnZ3JheSdcclxuXHR0ZXh0U2l6ZSBnbG9iYWwuc2l6ZSgpXHJcblx0Z2xvYmFsLmJvYXJkMC5kcmF3KClcclxuXHRnbG9iYWwuYm9hcmQxLmRyYXcoKVxyXG5cdGZvciBidXR0b24gaW4gZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGJ1dHRvbi5kcmF3KClcclxuXHRmaWxsIFwiYmxhY2tcIlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0c2hvd0RpYWxvZ3VlKClcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IC0+IHJlc2l6ZSgpXHJcblxyXG4jIHdpbmRvdy5rZXlQcmVzc2VkID0gPT5cclxuIyBcdGlmIGdsb2JhbC5kaWFsb2d1ZXMubGVuZ3RoID09IDAgdGhlbiBtZW51MCgpICMgZWxzZSBkaWFsb2d1ZXMuY2xlYXIoKVxyXG5cclxucmVzaXplID0gLT5cclxuXHRnbG9iYWwuc2V0U2l6ZSByb3VuZCBpbm5lckhlaWdodC8xOFxyXG5cdHJlc2l6ZUNhbnZhcyBpbm5lcldpZHRoLCBpbm5lckhlaWdodFxyXG5cdGdsb2JhbC5zZXRNeCByb3VuZCAoaW5uZXJXaWR0aCAtIDggKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblx0Z2xvYmFsLnNldE15IHJvdW5kIChpbm5lckhlaWdodCAtIDE3ICogZ2xvYmFsLnNpemUoKSkvMlxyXG5cclxuXHRnbG9iYWwuYnV0dG9ucyA9IFtdXHJcblx0eDAgPSByb3VuZCBnbG9iYWwubXgoKS8yXHJcblx0eDEgPSB3aWR0aC0geDBcclxuXHR5MCA9IHJvdW5kIDAuMjAqaGVpZ2h0XHJcblx0eTEgPSByb3VuZCAwLjUwKmhlaWdodFxyXG5cdHkyID0gcm91bmQgMC44MCpoZWlnaHRcclxuXHJcblx0Z2xvYmFsLmJ1dHRvbnMucHVzaCBuZXcgTWVudUJ1dHRvbiB4MSwgeTAsID0+XHJcblx0XHRpZiBnbG9iYWwucGF1c2VkIGFuZCBnbG9iYWwuZGlhbG9ndWVzLmxlbmd0aCA9PSAwIHRoZW4gbWVudTAoKVxyXG5cclxuXHRnbG9iYWwuYnV0dG9ucy5wdXNoIG5ldyBNZW51QnV0dG9uIHgwLCB5MiwgPT5cclxuXHRcdGlmIGdsb2JhbC5wYXVzZWQgYW5kIGdsb2JhbC5kaWFsb2d1ZXMubGVuZ3RoID09IDAgdGhlbiBtZW51MCgpXHJcblxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiB4MCx5MSxcIuKPsFwiLCA9PlxyXG5cdFx0aWYgZ2xvYmFsLmJ1dHRvbnNbMl0udGV4dCA9PSBcIuKPsFwiXHJcblx0XHRcdGdsb2JhbC5wYXVzZWQgPSBub3QgZ2xvYmFsLnBhdXNlZFxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiB4MSx5MSxcIuKPsFwiLCA9PiBcclxuXHRcdGlmIGdsb2JhbC5idXR0b25zWzNdLnRleHQgPT0gXCLij7BcIlxyXG5cdFx0XHRnbG9iYWwucGF1c2VkID0gbm90IGdsb2JhbC5wYXVzZWRcclxuXHJcbndpbmRvdy5tb3VzZVByZXNzZWQgPSA9PlxyXG5cdGlmIG5vdCByZWxlYXNlZCB0aGVuIHJldHVyblxyXG5cdHJlbGVhc2VkID0gZmFsc2VcclxuXHJcblx0aWYgZ2xvYmFsLmRpYWxvZ3Vlcy5sZW5ndGggPiAwXHJcblx0XHQoXy5sYXN0IGdsb2JhbC5kaWFsb2d1ZXMpLmV4ZWN1dGUgbW91c2VYLG1vdXNlWVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblxyXG5cdGZvciBidXR0b24gaW4gZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGlmIGJ1dHRvbi5pbnNpZGUgbW91c2VYLG1vdXNlWVxyXG5cdFx0XHRidXR0b24ub25jbGljaygpXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cclxuXHRmb3Igc3F1YXJlIGluIGdsb2JhbC5ib2FyZDAuc3F1YXJlcy5jb25jYXQgZ2xvYmFsLmJvYXJkMS5zcXVhcmVzXHJcblx0XHRpZiBzcXVhcmUuaW5zaWRlIG1vdXNlWCxtb3VzZVlcclxuXHRcdFx0I2NvbnNvbGUubG9nICdzcXVhcmUuaW5zaWRlJyxzcXVhcmUubnJcclxuXHRcdFx0c3F1YXJlLm9uY2xpY2soKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRmYWxzZVxyXG5cdFxyXG53aW5kb3cubW91c2VSZWxlYXNlZCA9ID0+XHJcblx0cmVsZWFzZWQgPSB0cnVlXHJcblx0ZmFsc2VcclxuIl19
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee