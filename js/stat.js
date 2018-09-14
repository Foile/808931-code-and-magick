'use strict';
var BAR_HEIGHT = 150;
var BAR_DELTA = 50;
var BAR_WIDTH = 40;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var _X = 100;
var _Y = 10;
var FONT_HEIGHT = 16;
var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';

var renderRectSoft = function (ctx, x, y, w, h, color) {
  var radius = Math.ceil(w / 10);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
};

var getMax = function (arr) {
  var max = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

window.renderStatistics = function (ctx, names, times) {

  renderRectSoft(ctx, _X + 10, _Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRectSoft(ctx, _X, _Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
  var graphWidth = (BAR_WIDTH * names.length) + BAR_DELTA * (names.length - 1);
  var tabX = (CLOUD_WIDTH - graphWidth) / 2;
  var tabY = _Y;
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  tabY += 1.5 * FONT_HEIGHT;
  ctx.fillText('Ура вы победили!', _X + tabX, tabY);
  tabY += FONT_HEIGHT;
  ctx.fillText('Список результатов:', _X + tabX, tabY);
  var maxTime = getMax(times);

  for (var i = 0; i < names.length; i++) {
    var color = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + Math.random() * 100 + '% ,50%)';
    var currentBarHeight = BAR_HEIGHT * times[i] / maxTime;
    var currentBarX = _X + tabX + i * BAR_DELTA + i * BAR_WIDTH;
    var currentBarY = _Y + CLOUD_HEIGHT - currentBarHeight - tabY + FONT_HEIGHT;
    renderRectSoft(ctx, currentBarX, currentBarY, BAR_WIDTH, currentBarHeight, color);
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_FONT;
    ctx.fillText(names[i], currentBarX, CLOUD_HEIGHT);
    ctx.fillText(Math.round(times[i]), currentBarX, currentBarY - FONT_HEIGHT);
  }

};
