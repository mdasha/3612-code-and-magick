	'use strict';
window.renderStatistics = function (ctx, names, times) {  
//Рисуем полупрозрачную тень черного цвета под белым облаком. Тень смещена на 10px вниз и вправо, относительно облака 
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.strokeRect(110,20,420,270);
  ctx.fillRect(110,20,420,270);
  
//Рисуем белое облако
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

//На облаке выводим текст с заданными параметрами
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  
//Рисуем гистрограмму времен участников  
  
  var max = -1;
  var maxIndex = -1;
  
  for (var i = 0; i < times.length; i++) {
	var time = times[i];
	if (time>max) {
		max = Math.ceil(time);
		maxIndex = i;
	}
  }
  
  var histogramHeight = 150;              // px;   - высота гистограммы
  var step = histogramHeight / (max - 0); // px;
  
  
  var barWidth = 40; // px;  - ширина колонки
  var FiguresHeight = 20; // px; - высота строки с временем прохождения игры разными игроками
  var indent = 90;    // px; - расстояние между колонками плюс ширина колонки (50px + barWidth = 50px + 40px = 90px)
  var initialX = 140; // px; - координата X первой строки первой колонки
  var initialY = 80;  // px; - координата Y первой строки первой колонки

  
  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла
  
  for(var i = 0; i < times.length; i++) {
    var a = Math.random( ); // Прозрачность гистограмм, кроме игрока с именем "Вы",  задаем рандомно 
	var otstup = histogramHeight  - times[i] * step; // Отступ для расчета координаты Y первой и второй строки (для выравнивания гистограмм по нижнему краю)
	
	ctx.fillText(Math.ceil(times[i]), initialX + indent*i, initialY + otstup );  // Время прохождения игры разными игроками, округлено до целого кверху
	
	if (names[i] === 'Вы') {
		ctx.fillStyle = 'rgba(255,0,0,1)'; // Задаем заливку красным цветом гистограммы для игрока с именем "Вы"
	}
	else {
		ctx.fillStyle = 'rgba(51,17,220,' + a + ')';  // Задаем заливку гистограммы для других игроков синим цветом с разным уровнем прозрачности
	}
	
	ctx.fillRect(initialX  + indent*i, initialY + FiguresHeight + otstup, barWidth, times[i] * step);	// Рисуем гистрограмму для разных игроков
	ctx.fillStyle = '#000';  // Меняем снова заливку на черный
	ctx.fillText(names[i], initialX + indent*i, initialY + histogramHeight + FiguresHeight);	// Подписываем имена игроков под гистограммой
  }
   
};
