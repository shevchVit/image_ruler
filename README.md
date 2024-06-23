## Установка
1) Лучше создать виртуальное окружение (python3 -m venv venv).
2) Чтобы его активировать source venv/bin/activate
3) Нужно установить модули pip3 install -r requirements.txt
4) Запустить python3 main.py
5) Работает по адресу http://127.0.0.1:8080

## Изменение перспективы
1) В разделе "Перспектива" нажимаем "Задать"
2) Задаем 4 точки, чтобы определить центр вращения четырехугольника
3) Выравниваем перспективу изображения с помощью кнопок сверху или горячими клавишами (они подписаны на кнопках)
4) Стараемся выровнять максимально ровно, чтобы минимизировать погрешность
5) Чтобы более точно поворачивать изображение, можно изменить шаг изменения угла

## Установка известного отрезка
1) В разделе "Известный отрезок" нажимаем "Задать"
2) Задаем 2 точки отрезка
3) Указываем длину этого отрезка

## Установка неизвестного отрезка
1) В разделе "Неизвестный отрезок" нажимаем "Задать"
2) Задаем 2 точки отрезка
3) Если задан известный отрезок и его длина, то получаем результат

## Горячие клавиши
'Q', 'W', 'E', 'A', 'D', 'Z', 'X', 'C' - поворот изображения вокруг осей X и Y  
'\[', '\]' - поворот изображения вокруг оси Z
'Esc' - свернуть/развернуть панель
