'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var SETUP_URL = 'https://js.dump.academy/code-and-magick';

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateRandomData = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    var newWizard = {};
    newWizard.name = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES);
    newWizard.coatColor = getRandomElement(COAT_COLORS);
    newWizard.eyesColor = getRandomElement(EYES_COLORS);
    wizards.push(newWizard);
  }
  return wizards;
};

var addWizard = function (template, wizard) {
  var node = template.cloneNode(true);
  node.querySelector('.setup-similar-label').textContent = wizard.name;
  node.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  node.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return node;
};

var setHidden = function (element, hide) {
  if (!hide) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

var setup = document.querySelector('.setup');

var onSetupOpenClick = function () {
  setHidden(setup, false);
};

var onSetupCloseClick = function () {
  setHidden(setup, true);
};

var onSetupEscClick = function (evt) {
  if (evt.keyCode === 27 && setupWizard.querySelector('.setup-user-name') !== document.activeElement) {
    setHidden(setup, true);
  }
};

var onSetupEnterClick = function (evt) {
  if (evt.keyCode === 13) {
    setHidden(setup, false);
  }
};

var setupOpen = document.querySelector('.setup-open');
setupOpen.querySelector('.setup-open-icon').setAttribute('tabindex', '0');
setupOpen.addEventListener('keydown', onSetupEnterClick);
setupOpen.addEventListener('click', onSetupOpenClick);

var setupClose = document.querySelector('.setup-close');
setupClose.addEventListener('click', onSetupCloseClick);

var setupWizard = document.querySelector('.setup-wizard-form');
setupWizard.action = SETUP_URL;

var coat = setupWizard.querySelector('.setup-wizard .wizard-coat');
coat.addEventListener('click', function () {
  var coatColor = getRandomElement(COAT_COLORS);
  coat.style.fill = coatColor;
  setupWizard.querySelector('input[name="coat-color"').value = coatColor;
});

var eyes = setupWizard.querySelector('.setup-wizard .wizard-eyes');
eyes.addEventListener('click', function () {
  var eyesColor = getRandomElement(EYES_COLORS);
  eyes.style.fill = eyesColor;
  setupWizard.querySelector('input[name="eyes-color"').value = eyesColor;
});

var ball = setupWizard.querySelector('.setup-fireball-wrap');
ball.addEventListener('click', function () {
  var ballColor = getRandomElement(FIREBALL_COLORS);
  ball.style.background = ballColor;
  setupWizard.querySelector('input[name="fireball-color"').value = ballColor;
});

document.addEventListener('keydown', onSetupEscClick);

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = generateRandomData(WIZARDS_COUNT);

var fragment = document.createDocumentFragment();

wizards.forEach(function (wizard) {
  fragment.appendChild(addWizard(similarWizardTemplate, wizard));
});

similarListElement.appendChild(fragment);

setHidden(document.querySelector('.setup-similar'), false);
