'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 5;

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

setHidden(document.querySelector('.setup'), false);

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
