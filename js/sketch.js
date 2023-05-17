// Generated by CoffeeScript 2.5.1
var arr, fullScreen, released, resize, sendMail;

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

sendMail = function(subject, body) {
  var m, mail;
  m = "janchrister.nilsson@gmail.com";
  mail = document.getElementById("mail");
  mail.href = "mailto:" + m + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body); // encodeURI 
  console.log(mail.href);
  return mail.click();
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
// button.onclick = =>
// 	#sendMail new Date().toLocaleString(), global.pgn #chess.pgn()
// 	sendMail "adam",global.pgn
// 	#navigator.clipboard.writeText global.pgn
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
    return sendMail("Rubrik", global.chess.pgn());
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUSxHQUFSO0VBQVksR0FBWjtFQUFnQixLQUFoQjtFQUFzQixlQUF0QjtFQUFzQyxNQUF0QztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEtBQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsTUFBUjtDQUFBLE1BQUE7O0FBRUEsUUFBQSxHQUFXLEtBTlg7O0FBT0EsR0FBQSxHQUFNOztBQUVOLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLENBQUEsQ0FBQSxHQUFBO0FBQ2pCLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUM7RUFBQSxLQUFBLHFDQUFBOztJQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBRCxDQUFYLEdBQXNCLFNBQUEsQ0FBVSxZQUFBLEdBQWUsTUFBZixHQUF3QixNQUFsQztFQUR2QjtBQUVBO0FBQUE7RUFBQSxLQUFBLHdDQUFBOztpQkFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUQsQ0FBWCxHQUFzQixTQUFBLENBQVUsWUFBQSxHQUFlLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FBZixHQUFzQyxNQUFoRDtFQUR2QixDQUFBOztBQUhnQjs7QUFNakIsVUFBQSxHQUFhLENBQUEsQ0FBQSxHQUFBO1NBQUcsZUFBQSxDQUFBO0FBQUg7O0FBRWIsUUFBQSxHQUFXLFFBQUEsQ0FBQyxPQUFELEVBQVMsSUFBVCxDQUFBO0FBQ1gsTUFBQSxDQUFBLEVBQUE7RUFBQyxDQUFBLEdBQUk7RUFDSixJ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dUIsQ0FBQSxDQUFBLEdBQUE7RUFDdEIsUUFBQSxHQUFXO1NBQ1g7QUFGc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9sb2Rhc2gnXHJcbmltcG9ydCB7YXNzLGxvZyxyYW5nZSxlbnRlckZ1bGxzY3JlZW4sc2lnbmFsfSBmcm9tICcuLi9qcy91dGlscy5qcydcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vanMvYm9hcmQuanMnXHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi9qcy9idXR0b24uanMnXHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi9qcy9nbG9iYWxzLmpzJ1xyXG5cclxucmVsZWFzZWQgPSB0cnVlICMgcHJldmVudGlvbiBvZiB0b3VjaCBib3VuY2VcclxuYXJyID0gbnVsbFxyXG5cclxud2luZG93LnByZWxvYWQgPSA9PlxyXG5cdGZvciBsZXR0ZXIgaW4gXCJybmJxa3BcIlxyXG5cdFx0Z2xvYmFsLnBpY3NbbGV0dGVyXSA9IGxvYWRJbWFnZSAnLi9pbWFnZXMvYicgKyBsZXR0ZXIgKyAnLnBuZydcclxuXHRmb3IgbGV0dGVyIGluIFwiUk5CUUtQXCJcclxuXHRcdGdsb2JhbC5waWNzW2xldHRlcl0gPSBsb2FkSW1hZ2UgJy4vaW1hZ2VzL3cnICsgbGV0dGVyLnRvTG93ZXJDYXNlKCkgKyAnLnBuZydcclxuXHJcbmZ1bGxTY3JlZW4gPSA9PiBlbnRlckZ1bGxzY3JlZW4oKVxyXG5cclxuc2VuZE1haWwgPSAoc3ViamVjdCxib2R5KSAtPlxyXG5cdG0gPSBcImphbmNocmlzdGVyLm5pbHNzb25AZ21haWwuY29tXCJcclxuXHRtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJtYWlsXCJcclxuXHRtYWlsLmhyZWYgPSBcIm1haWx0bzpcIiArIG0gKyBcIj9zdWJqZWN0PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpICsgXCImYm9keT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChib2R5KSAjIGVuY29kZVVSSSBcclxuXHRjb25zb2xlLmxvZyBtYWlsLmhyZWZcclxuXHRtYWlsLmNsaWNrKClcclxuXHJcbndpbmRvdy5zZXR1cCA9ID0+XHJcblxyXG5cdGNyZWF0ZUNhbnZhcyBpbm5lcldpZHRoLGlubmVySGVpZ2h0XHJcblxyXG5cdFtnbG9iYWwuc2l6ZSwgZ2xvYmFsLnNldFNpemVdID0gc2lnbmFsIHJvdW5kIG1pbihpbm5lcldpZHRoLGlubmVySGVpZ2h0KS8xOFxyXG5cdFtnbG9iYWwubXgsIGdsb2JhbC5zZXRNeF0gPSBzaWduYWwgcm91bmQgKGlubmVyV2lkdGggLSA4ICogZ2xvYmFsLnNpemUoKSkvMlxyXG5cdFtnbG9iYWwubXksIGdsb2JhbC5zZXRNeV0gPSBzaWduYWwgcm91bmQgKGlubmVySGVpZ2h0IC0gMTcgKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblxyXG5cdHJlc2l6ZSgpXHJcblxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0cmVjdE1vZGUgQ0VOVEVSXHJcblx0aW1hZ2VNb2RlIENFTlRFUlxyXG5cclxuXHRnbG9iYWwuYm9hcmQwID0gbmV3IEJvYXJkIDBcclxuXHRnbG9iYWwuYm9hcmQxID0gbmV3IEJvYXJkIDFcclxuXHRnbG9iYWwuY2hlc3MgPSBuZXcgQ2hlc3MoKVxyXG5cclxuXHQjIGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibXlCdXR0b25cIlxyXG5cdCMgYnV0dG9uLm9uY2xpY2sgPSA9PlxyXG5cdCMgXHQjc2VuZE1haWwgbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpLCBnbG9iYWwucGduICNjaGVzcy5wZ24oKVxyXG5cdCMgXHRzZW5kTWFpbCBcImFkYW1cIixnbG9iYWwucGduXHJcblx0IyBcdCNuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCBnbG9iYWwucGduXHJcblxyXG53aW5kb3cuZHJhdyA9ID0+XHJcblx0YmFja2dyb3VuZCAnZ3JheSdcclxuXHR0ZXh0U2l6ZSBnbG9iYWwuc2l6ZSgpXHJcblx0Z2xvYmFsLmJvYXJkMC5kcmF3KClcclxuXHRnbG9iYWwuYm9hcmQxLmRyYXcoKVxyXG5cdGZvciBidXR0b24gaW4gZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGJ1dHRvbi5kcmF3KClcclxuXHRmaWxsIFwiYmxhY2tcIlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblxyXG53aW5kb3cub25yZXNpemUgPSAtPiByZXNpemUoKVxyXG5cclxucmVzaXplID0gLT5cclxuXHRnbG9iYWwuc2V0U2l6ZSByb3VuZCBpbm5lckhlaWdodC8xOFxyXG5cdHJlc2l6ZUNhbnZhcyBpbm5lcldpZHRoLCBpbm5lckhlaWdodFxyXG5cdGdsb2JhbC5zZXRNeCByb3VuZCAoaW5uZXJXaWR0aCAtIDggKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblx0Y29uc29sZS5sb2cgJ3NpemUnLGdsb2JhbC5zaXplKClcclxuXHRnbG9iYWwuc2V0TXkgcm91bmQgKGlubmVySGVpZ2h0IC0gMTcgKiBnbG9iYWwuc2l6ZSgpKS8yXHJcblx0Z2xvYmFsLmJ1dHRvbnMgPSBbXVxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiByb3VuZCgyKndpZHRoLzMpLHJvdW5kKGhlaWdodC8yKSwgJ0Z1bGwgU2NyZWVuJywgZnVsbFNjcmVlblxyXG5cdGdsb2JhbC5idXR0b25zLnB1c2ggbmV3IEJ1dHRvbiByb3VuZCh3aWR0aC8zKSxyb3VuZChoZWlnaHQvMiksICdDb3B5JywgKCkgPT4gc2VuZE1haWwgXCJSdWJyaWtcIiwgZ2xvYmFsLmNoZXNzLnBnbigpXHJcblxyXG53aW5kb3cubW91c2VQcmVzc2VkID0gPT5cclxuXHRjb25zb2xlLmxvZyAnbW91c2VQcmVzc2VkJ1xyXG5cdGlmIG5vdCByZWxlYXNlZCB0aGVuIHJldHVyblxyXG5cdHJlbGVhc2VkID0gZmFsc2VcclxuXHJcblx0Zm9yIGJ1dHRvbiBpbiBnbG9iYWwuYnV0dG9ucy5jb25jYXQgZ2xvYmFsLmJ1dHRvbnNcclxuXHRcdGlmIGJ1dHRvbi5pbnNpZGUgbW91c2VYLG1vdXNlWVxyXG5cdFx0XHRidXR0b24ub25jbGljaygpXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdGZvciBzcXVhcmUgaW4gZ2xvYmFsLmJvYXJkMC5zcXVhcmVzLmNvbmNhdCBnbG9iYWwuYm9hcmQxLnNxdWFyZXNcclxuXHRcdGlmIHNxdWFyZS5pbnNpZGUgbW91c2VYLG1vdXNlWVxyXG5cdFx0XHRjb25zb2xlLmxvZyAnc3F1YXJlLmluc2lkZScsc3F1YXJlLm5yXHJcblx0XHRcdHNxdWFyZS5vbmNsaWNrKClcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0ZmFsc2VcclxuXHJcbndpbmRvdy5tb3VzZVJlbGVhc2VkID0gPT5cclxuXHRyZWxlYXNlZCA9IHRydWVcclxuXHRmYWxzZVxyXG5cclxuIl19
//# sourceURL=c:\github\2023-026-chessx2\coffee\sketch.coffee