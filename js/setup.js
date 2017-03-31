'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция генерации случайных данных (имен и фамилий, цвета плаща и цвета глаз магов)
function rand(min, max) {
  min = parseInt(min, 10);
  max = parseInt(max, 10);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Создаем одного волшебника
function createWizard() {
  var wizard = {};
  wizard.name = WIZARD_NAMES[rand(0, 7)] + ' ' + WIZARD_SURNAMES[rand(0, 7)];
  wizard.coatColor = WIZARD_COATS[rand(0, 5)];
  wizard.eyesColor = WIZARD_EYES[rand(0, 4)];
  return wizard;
}
// Создаем пустой массив волшебников
var wizards = [];

// Заполняем массив данными из 4 сгенерированных JS-объектов
for (i = 0; i < 4; i++) {
  wizards.splice(i, 1, createWizard());
}

// Функция создания DOM-элемента на основе JS-объекта
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  return wizardElement;
};

// Заполнение блока DOM-элементами на основе JS-объектов
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
