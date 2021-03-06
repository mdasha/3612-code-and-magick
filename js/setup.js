'use strict';
var userDialog = document.querySelector('.setup');
var avatar = document.querySelector('.setup-open');
var setupSubmit = userDialog.querySelector('.setup-submit');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var wizardSelector = document.querySelector('.wizard');
var wizardCoat = wizardSelector.querySelector('.wizard-coat');
var wizardEyes = wizardSelector.querySelector('.wizard-eyes');
var wizardFireballWrap = document.querySelector('.setup-fireball-wrap');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_WRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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

// Открываем и закрываем с клавиатуры диалог пользователя (закрытие через esc
var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      userDialog.classList.add('hidden');
    }
  });
};
// Проверяем валидность заполнения поля с именем. Если длина поля меньше двух или больше 50 символов, то выводим предупреждение об ошибке и не даем закрыть форму.
var j = 0;
var closePopup = function () {
  if (setupUserName.value.length > 1 && setupUserName.value.length < 51) {
    userDialog.classList.add('hidden');
  } else {
    if (j === 0) {
      var warning = userDialog.querySelector('.setup-user');
      var newElement = document.createElement('p');
      newElement.innerHTML = 'Введите имя персонажа от 2 до 50 символов!';
      newElement.style.color = 'red';
      newElement.style.marginTop = '10px';
      newElement.style.marginBottom = 0;
      fragment.appendChild(newElement);
      warning.appendChild(fragment);
      j = j + 1;
    }
  }
};


avatar.addEventListener('click', function () {
  openPopup();
});
avatar.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

// Закрываем диалог пользователя при клике на крестик
setupClose.addEventListener('click', function () {
  closePopup();
});
// Закрываем диалог пользователя при клике на кнопке сохранить
setupSubmit.addEventListener('click', function () {
  closePopup();
});
// цвет плаща меняется перебором массива по порядку при нажатии на него
i = 1;
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = WIZARD_COATS[i];
  i = (i < WIZARD_COATS.length) ? (i + 1) : 0;
});

// цвет глаз меняется рандомно при нажатии на них
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = WIZARD_EYES[rand(0, 4)];
});
// цвет фона файербола меняется рандомно при нажатии на него
wizardFireballWrap.addEventListener('click', function () {
  wizardFireballWrap.style.background = WIZARD_FIREBALL_WRAP[rand(0, 4)];
});
