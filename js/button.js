// Generated by CoffeeScript 2.5.1
import {
  global
} from '../js/globals.js';

import {
  param,
  range
} from '../js/utils.js';

export var Button = class Button {
  constructor(x1, y1, text1, onclick) {
    this.draw = this.draw.bind(this);
    this.inside = this.inside.bind(this);
    this.x = x1;
    this.y = y1;
    this.text = text1;
    this.onclick = onclick;
    param.Compact("NNSF", arguments);
    this.w = 2.2 * global.size();
    this.h = 1 * global.size();
    this.bg = 'lightgray';
    this.fg = 'black';
    this.align = CENTER;
  }

  draw() {
    var x;
    noStroke();
    fill(this.bg);
    rect(this.x, this.y, this.w, this.h * 0.65);
    if (this.align === LEFT) {
      x = this.x - 0.45 * this.w;
    } else {
      x = this.x;
    }
    fill(this.fg);
    push();
    textSize(0.4 * global.size());
    textAlign(this.align);
    noStroke();
    text(this.text, x, this.y + 0.05 * global.size());
    return pop();
  }

  inside(x, y) {
    param.Number(x);
    param.Number(y);
    return param.Boolean((this.x - this.w / 2 < x && x < this.x + this.w / 2) && (this.y - this.h / 2 < y && y < this.y + this.h / 2));
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXGJ1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQUE7RUFBUSxNQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsS0FBUjtFQUFjLEtBQWQ7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxTQUFOLE1BQUEsT0FBQTtFQUNOLFdBQWEsR0FBQSxJQUFBLE9BQUEsU0FBQSxDQUFBO1FBUWIsQ0FBQSxXQUFBLENBQUE7UUFjQSxDQUFBLGFBQUEsQ0FBQTtJQXRCYyxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBSyxJQUFDLENBQUE7SUFDMUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFkLEVBQXFCLFNBQXJCO0lBQ0EsSUFBQyxDQUFBLENBQUQsR0FBSyxHQUFBLEdBQU0sTUFBTSxDQUFDLElBQVAsQ0FBQTtJQUNYLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBQSxHQUFJLE1BQU0sQ0FBQyxJQUFQLENBQUE7SUFDVCxJQUFDLENBQUEsRUFBRCxHQUFNO0lBQ04sSUFBQyxDQUFBLEVBQUQsR0FBTTtJQUNOLElBQUMsQ0FBQSxLQUFELEdBQVM7RUFORzs7RUFRYixJQUFPLENBQUEsQ0FBQTtBQUNSLFFBQUE7SUFBRSxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLEVBQU47SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFDLENBQUEsQ0FBVCxFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFqQjtJQUVBLElBQUcsSUFBQyxDQUFBLEtBQUQsS0FBUSxJQUFYO01BQXFCLENBQUEsR0FBRSxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUEsR0FBSyxJQUFDLENBQUEsRUFBaEM7S0FBQSxNQUFBO01BQXVDLENBQUEsR0FBRSxJQUFDLENBQUEsRUFBMUM7O0lBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxFQUFOO0lBQ0EsSUFBQSxDQUFBO0lBQ0EsUUFBQSxDQUFTLEdBQUEsR0FBSSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQWI7SUFDQSxTQUFBLENBQVUsSUFBQyxDQUFBLEtBQVg7SUFDQSxRQUFBLENBQUE7SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLElBQU4sRUFBWSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFBLEdBQUssTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUF0QjtXQUNBLEdBQUEsQ0FBQTtFQVpNOztFQWNQLE1BQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFBO0lBQ1IsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiO0lBQ0EsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiO1dBQ0EsS0FBSyxDQUFDLE9BQU4sQ0FBYyxDQUFBLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFOLEdBQVUsQ0FBVixJQUFVLENBQVYsR0FBYyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBcEIsQ0FBQSxJQUEwQixDQUFBLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFOLEdBQVUsQ0FBVixJQUFVLENBQVYsR0FBYyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBcEIsQ0FBeEM7RUFIUTs7QUF2QkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vanMvZ2xvYmFscy5qcydcclxuaW1wb3J0IHtwYXJhbSxyYW5nZX0gZnJvbSAnLi4vanMvdXRpbHMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9uXHJcblx0Y29uc3RydWN0b3I6IChAeCxAeSxAdGV4dCxAb25jbGljaykgLT5cclxuXHRcdHBhcmFtLkNvbXBhY3QgXCJOTlNGXCIsYXJndW1lbnRzXHJcblx0XHRAdyA9IDIuMiAqIGdsb2JhbC5zaXplKClcclxuXHRcdEBoID0gMSAqIGdsb2JhbC5zaXplKClcclxuXHRcdEBiZyA9ICdsaWdodGdyYXknXHJcblx0XHRAZmcgPSAnYmxhY2snXHJcblx0XHRAYWxpZ24gPSBDRU5URVJcclxuXHJcblx0ZHJhdyA6ID0+XHJcblx0XHRub1N0cm9rZSgpXHJcblx0XHRmaWxsIEBiZ1xyXG5cdFx0cmVjdCBAeCxAeSxAdyxAaCowLjY1XHJcblxyXG5cdFx0aWYgQGFsaWduPT1MRUZUIHRoZW4geD1AeC0wLjQ1KkB3IGVsc2UgeD1AeFxyXG5cdFx0ZmlsbCBAZmdcclxuXHRcdHB1c2goKVxyXG5cdFx0dGV4dFNpemUgMC40Kmdsb2JhbC5zaXplKClcclxuXHRcdHRleHRBbGlnbiBAYWxpZ25cclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdHRleHQgQHRleHQsIHgsQHkrMC4wNSpnbG9iYWwuc2l6ZSgpXHJcblx0XHRwb3AoKVxyXG5cclxuXHRpbnNpZGUgOiAoeCx5KSA9PlxyXG5cdFx0cGFyYW0uTnVtYmVyIHhcclxuXHRcdHBhcmFtLk51bWJlciB5XHJcblx0XHRwYXJhbS5Cb29sZWFuIEB4LUB3LzIgPCB4IDwgQHgrQHcvMiBhbmQgQHktQGgvMiA8IHkgPCBAeStAaC8yXHJcbiJdfQ==
//# sourceURL=c:\github\2023-026-chessx2\coffee\button.coffee