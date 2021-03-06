'use strict';
(function () {
  var CODE_ENTER = 13;
  var CODE_ESC = 27;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;
  var SETUP_URL = 'https://js.dump.academy/code-and-magick';


  var getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  var getRandomArray = function (array, count) {
    var sourceArray = array.slice(0);
    var resultArray = [];
    if (!count) {
      count = getRandomNumber(1, array.length);
    }

    for (var i = 0; (i < count && sourceArray.length > 0); i++) {
      var index = getRandomNumber(0, sourceArray.length);
      resultArray.push(sourceArray[index]);
      sourceArray.splice(index, 1);
    }
    return resultArray;
  };

  var addWizard = function (template, wizard) {
    var node = template.cloneNode(true);
    node.querySelector('.setup-similar-label').textContent = wizard.name;
    node.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    node.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
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
  var setupDialogPositionInit = {
    x: setup.style.left,
    y: setup.style.top
  };

  var closeSetup = function () {
    setHidden(setup, true);
    setup.style.left = setupDialogPositionInit.x;
    setup.style.top = setupDialogPositionInit.y;
  };
  var openSetup = function () {
    setHidden(setup, false);
    setup.style.left = setupDialogPositionInit.x;
    setup.style.top = setupDialogPositionInit.y;
    loadWizards(WIZARDS_COUNT);
  };

  var onSetupOpenClick = openSetup;

  var onSetupCloseClick = closeSetup;

  var onSetupEsc = function (evt) {
    if (evt.keyCode === CODE_ESC && setupWizard.querySelector('.setup-user-name') !== document.activeElement) {
      closeSetup();
    }
  };

  var onSetupOpenEnter = function (evt) {
    if (evt.keyCode === CODE_ENTER) {
      openSetup();
    }
  };

  var onSetupCloseEnter = function (evt) {
    if (evt.keyCode === CODE_ENTER) {
      closeSetup();
      evt.preventDefault();
    }
  };

  var setupOpen = document.querySelector('.setup-open');
  setupOpen.querySelector('.setup-open-icon').setAttribute('tabindex', '0');
  setupOpen.addEventListener('keydown', onSetupOpenEnter);
  setupOpen.addEventListener('click', onSetupOpenClick);

  var setupClose = document.querySelector('.setup-close');
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.setAttribute('tabindex', '0');
  setupClose.addEventListener('keypress', onSetupCloseEnter);

  var setupWizard = document.querySelector('.setup-wizard-form');
  setupWizard.action = SETUP_URL;
  setupWizard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(setupWizard);
    var onSetupLoad = function () {
      closeSetup();
    };
    window.save(formData, onSetupLoad, onSetupError);
  });

  var coat = setupWizard.querySelector('.setup-wizard .wizard-coat');
  coat.addEventListener('click', function () {
    var colorCoat = getRandomElement(COAT_COLORS);
    coat.style.fill = colorCoat;
    setupWizard.querySelector('input[name="coat-color"').value = colorCoat;
  });

  var eyes = setupWizard.querySelector('.setup-wizard .wizard-eyes');
  eyes.addEventListener('click', function () {
    var colorEyes = getRandomElement(EYES_COLORS);
    eyes.style.fill = colorEyes;
    setupWizard.querySelector('input[name="eyes-color"').value = colorEyes;
  });

  var ball = setupWizard.querySelector('.setup-fireball-wrap');
  ball.addEventListener('click', function () {
    var ballColor = getRandomElement(FIREBALL_COLORS);
    ball.style.background = ballColor;
    setupWizard.querySelector('input[name="fireball-color"').value = ballColor;
  });

  var onSetupError = function (error) {
    var node = (setup.querySelector('.setup-error-message') === null) ? (function () {
      var el = document.createElement('div');
      el.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: #FA8072;';
      el.style.position = 'absolute';
      el.style.left = 0;
      el.style.right = 0;
      el.style.fontSize = '30px';
      el.classList.add('setup-error-message');
      return el;
    })() : setup.querySelector('.setup-error-message');
    node.textContent = error;
    setup.appendChild(node);
  };

  document.addEventListener('keydown', onSetupEsc);
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var loadWizards = function (count) {
    var wizards = [];
    var onLoad = function (data) {
      wizards = getRandomArray(data, count);
      similarListElement.querySelectorAll('.setup-similar-item').forEach(function (child) {
        similarListElement.removeChild(child);
      });

      var fragment = document.createDocumentFragment();
      wizards.forEach(function (wizard) {
        fragment.appendChild(addWizard(similarWizardTemplate, wizard));
      });
      similarListElement.appendChild(fragment);
      setHidden(document.querySelector('.setup-similar'), wizards.length <= 0);
    };
    window.load(onLoad, onSetupError);
  };

})();
