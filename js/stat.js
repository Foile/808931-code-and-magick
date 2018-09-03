'use strict';
var BAR_HEIGHT = 150;
var BAR_DELTA = 50;
var BAR_WIDTH = 40;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var _X = 100;
var _Y = 10;
var FONT_HEIGHT = 16;

var renderCloud = function (ctx, x, y, color) {
  var radius = 30;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + CLOUD_WIDTH - radius, y);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + radius);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - radius);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - radius, y + CLOUD_HEIGHT);
  ctx.lineTo(x + radius, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - radius);
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
  renderCloud(ctx, _X + 10, _Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, _X, _Y, '#fff');
  var graphWidth = (BAR_WIDTH * names.length) + BAR_DELTA * (names.length - 1);
  var tabX = (CLOUD_WIDTH - graphWidth) / 2;
  var tabY = _Y;
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  tabY += 1.5 * FONT_HEIGHT;
  ctx.fillText('Ура вы победили!', _X + tabX, tabY);
  tabY += FONT_HEIGHT;
  ctx.fillText('Список результатов:', _X + tabX, tabY);
  var maxTime = getMax(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
    }
    var currentBarHeight = BAR_HEIGHT * times[i] / maxTime;
    var currentBarX = _X + tabX + i * BAR_DELTA + i * BAR_WIDTH;
    var currentBarY = _Y + CLOUD_HEIGHT - currentBarHeight - tabY + FONT_HEIGHT;
    ctx.fillRect(currentBarX, currentBarY, BAR_WIDTH, currentBarHeight);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(names[i], currentBarX, CLOUD_HEIGHT);
    ctx.fillText(Math.round(times[i]), currentBarX, currentBarY - FONT_HEIGHT);
  }

};
