/*
let a = ''; //первое число
let b = ''; //второе число
let sign = ''; //знак операции
let finish = false;
let result = '0';
let lastB = ''; // FIX: сохраняем последнее b для повторного нажатия =
let lastSign = ''; // FIX: сохраняем последний знак для повторного нажатия = 

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', 'x²', '√x'];

//экран
const out = document.querySelector('.calc-screen p');

function clearAll () {
    a = '';
    b = '';
    sign = '';
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    // нажата кнопка ac
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    //получаю нажатую кнопку
    const key = event.target.textContent;

    //если нажата кнопка 0-9 или .
    if (digit.includes(key)) {
        let current = sign === '' ? a : b;
    // запрет второго нуля в начале
        if (current === '0' && key === '0') return;
    // заменяем 0 на цифру
        if (current === '0' && key !== '.') {
            current = key;
        }
    // запрет второй точки
        else if (key === '.' && current.includes('.')) {
         return;
        }
        else {
           current += key;
        }

        if (sign === '') {
            a = current;
            out.textContent = a;
        } else {
            b = current;
            out.textContent = b;
        }

        finish = false;
        console.log(a, b, sign);
        return;
    }
    //если нажат знак
    if (action.includes(key)) {

    //если унарная операция
    if (key === 'x²' || key === '√x') {

        if (a === '') return;

        let value = +a;

        if (key === 'x²') value = value * value;
        if (key === '√x') value = Math.sqrt(value);

        a = value.toString();
        b = '';
        sign = '';
        finish = true;

        out.textContent = a;
        console.log(a, b, sign);
        return;
    }

    // FIX: сначала делаем вычисление если есть a, b, sign (динамический счет)
    if(a !== '' && b !== '' && sign !== '' && !finish){
        switch (sign){
            case '+':
                result = (+a) + (+b);
                break;
            case '-':
                result = (+a) - (+b);
                break;
            case 'X':
                result = (+a) * (+b);
                break;
            case '/':
                if (b==='0'){
                    out.textContent = 'Ошибка'
                    a='';
                    b='';
                    sign='';
                    return
                }
                result = (+a) / (+b);
                break;
        }
        a = result.toString();
        b = '';
        out.textContent = a; // FIX: показываем результат, а не знак
        console.log(a, b, sign);
    }

    //бинарная операция - устанавливаем новый знак
    sign = key;
    finish = false; // FIX: сбрасываем finish чтобы можно было продолжить
    return;
    }
    //нажато =
    if(key === '='){
        // FIX: если повторное нажатие =, используем сохраненные значения
        if (b === '' && lastB !== '') {
            b = lastB;
            sign = lastSign;
        }
        if (b === '') b = a;
        
        // FIX: сохраняем b и sign перед очисткой для повторного нажатия =
        lastB = b;
        lastSign = sign;
        
        switch (sign){
            case '+':
                result = (+a) + (+b);
                break;
            case '-':
                result = (+a) - (+b);
                break;
            case 'X':
                result = (+a) * (+b);
                break;
            case '/':
                if (b==='0'){
                    out.textContent = 'Ошибка'
                    a='';
                    b='';
                    sign='';
                    return
                }
                result = (+a) / (+b);
                break;
        }
        a = result.toString();
        b = ''; // FIX: очищаем b, но он сохранен в lastB
        sign = '';
        finish = true;
        out.textContent = a;
        console.log(a, b, sign);
    }
}*/

/*
============================================================
УЛУЧШЕННАЯ ВЕРСИЯ С ВСЕМИ ИСПРАВЛЕНИЯМИ
============================================================
Если хочешь использовать эту версию, закомментируй код выше
и раскомментируй этот блок
============================================================
*/


// Переменные для хранения состояния калькулятора
let a = ''; // первое число или промежуточный результат
let b = ''; // второе число
let sign = ''; // текущий знак операции
let finish = false; // флаг завершения операции
let result = '0'; // результат вычисления
let lastB = ''; // последнее второе число (для повторного нажатия =)
let lastSign = ''; // последний знак (для повторного нажатия =)

// Массивы допустимых значений
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', 'x²', '√x'];

// Получаем элемент экрана калькулятора
const out = document.querySelector('.calc-screen p');

// Функция полной очистки калькулятора
function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    lastB = '';
    lastSign = '';
    out.textContent = '0';
}

// Обработчик кнопки AC (All Clear)
document.querySelector('.ac').onclick = clearAll;

// Функция для выполнения вычисления
function calculate(num1, num2, operation) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    switch (operation) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case 'X':
            return n1 * n2;
        case '/':
            // Проверка деления на ноль
            if (n2 === 0) {
                return 'error';
            }
            return n1 / n2;
        default:
            return n1;
    }
}

// Главный обработчик всех кнопок калькулятора
document.querySelector('.buttons').onclick = (event) => {
    // Проверяем что нажата именно кнопка
    if (!event.target.classList.contains('btn')) return;
    // Пропускаем обработку AC (у неё свой обработчик)
    if (event.target.classList.contains('ac')) return;

    // Получаем текст нажатой кнопки
    const key = event.target.textContent;

    // ========================================
    // БЛОК 1: ОБРАБОТКА ЦИФР И ТОЧКИ (0-9, .)
    // ========================================
    if (digit.includes(key)) {
        // Если была завершена операция (нажимали =), начинаем новый расчет
        if (finish) {
            a = '';
            b = '';
            sign = '';
            lastB = '';
            lastSign = '';
            finish = false;
        }

        // Определяем в какую переменную добавляем цифру
        // Если знак не установлен - добавляем в a, иначе в b
        let current = sign === '' ? a : b;

        // Запрет повторного ввода нуля в начале числа
        if (current === '0' && key === '0') return;

        // Заменяем начальный ноль на введенную цифру
        if (current === '0' && key !== '.') {
            current = key;
        }
        // Запрет ввода второй точки в числе
        else if (key === '.' && current.includes('.')) {
            return;
        }
        // Добавляем цифру или точку к текущему числу
        else {
            current += key;
        }

        // Сохраняем результат в нужную переменную
        if (sign === '') {
            a = current;
            out.textContent = a;
        } else {
            b = current;
            out.textContent = b;
        }

        console.log('Текущее состояние:', { a, b, sign });
        return;
    }

    // ========================================
    // БЛОК 2: ОБРАБОТКА ОПЕРАЦИЙ (+, -, X, /, x², √x)
    // ========================================
    if (action.includes(key)) {
        
        // --- Унарные операции (x², √x) ---
        if (key === 'x²' || key === '√x') {
            // Нужно хотя бы одно число
            if (a === '') return;

            let value = parseFloat(a);

            if (key === 'x²') {
                value = value * value;
            }
            if (key === '√x') {
                value = Math.sqrt(value);
            }

            // Сохраняем результат и завершаем операцию
            a = value.toString();
            b = '';
            sign = '';
            finish = true;
            out.textContent = a;
            console.log('Унарная операция:', { a, b, sign });
            return;
        }

        // --- Бинарные операции (+, -, X, /) ---
        
        // Если уже есть два числа и знак, выполняем вычисление (динамический счет)
        // Например: 4 + 5 + 8 -> после ввода второго + сразу вычисляем 4+5=9
        if (a !== '' && b !== '' && sign !== '' && !finish) {
            result = calculate(a, b, sign);
            
            // Обработка ошибки (деление на ноль)
            if (result === 'error') {
                out.textContent = 'Ошибка';
                clearAll();
                return;
            }

            // Сохраняем промежуточный результат в a
            a = result.toString();
            b = '';
            // Показываем промежуточный результат на экране
            out.textContent = a;
            console.log('Промежуточный результат:', { a, b, sign: key });
        }

        // Устанавливаем новый знак операции
        sign = key;
        finish = false;
        
        // Если еще нет первого числа, устанавливаем 0
        if (a === '') {
            a = '0';
        }
        
        return;
    }

    // ========================================
    // БЛОК 3: ОБРАБОТКА ЗНАКА РАВНО (=)
    // ========================================
    if (key === '=') {
        // Если нет первого числа, ничего не делаем
        if (a === '') return;

        // Если повторное нажатие = (для повторения последней операции)
        // Например: 5 + 3 = 8, потом еще = -> 8 + 3 = 11
        if (b === '' && lastB !== '') {
            b = lastB;
            sign = lastSign;
        }

        // Если знак не установлен или нет второго числа, используем первое число
        // Например: 5 = -> 5
        if (b === '' || sign === '') {
            out.textContent = a;
            return;
        }

        // Выполняем вычисление
        result = calculate(a, b, sign);

        // Обработка ошибки (деление на ноль)
        if (result === 'error') {
            out.textContent = 'Ошибка';
            clearAll();
            return;
        }

        // Сохраняем b и sign для возможности повторного нажатия =
        lastB = b;
        lastSign = sign;

        // Сохраняем результат и очищаем временные переменные
        a = result.toString();
        b = '';
        sign = '';
        finish = true;

        // Выводим результат на экран
        out.textContent = a;
        console.log('Результат:', { a, lastB, lastSign });
        return;
    }
};
document.querySelector('.del')?.addEventListener('click', () => {
    if (sign === '') {
    // Удаляем последний символ из a
    a = a.slice(0, -1);
    out.textContent = a || '0';
    } else if (b !== '') {
    // Удаляем последний символ из b
    b = b.slice(0, -1);
    out.textContent = b || sign;
    }
});
