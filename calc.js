let a = '';        // первое число или промежуточный результат
let b = '';        // второе число
let sign = '';     // знак операции
let finish = false;
let lastB = '';    // для повторного нажатия =
let lastSign = '';

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', 'x²', '√x'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    lastB = '';
    lastSign = '';
    out.textContent = '0';
}

function showError() {
    clearAll();
    out.textContent = 'Ошибка';
}

function calculate(num1, num2, operation) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operation) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case 'X': return n1 * n2;
        case '/': return n2 === 0 ? null : n1 / n2;
        default: return n1;
    }
}

// убирает погрешность вроде 0.1 + 0.2 = 0.30000000000000004
function format(num) {
    return parseFloat(num.toFixed(10)).toString();
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;

    // цифры и точка
    if (digit.includes(key)) {
        if (finish) {
            a = '';
            b = '';
            sign = '';
            lastB = '';
            lastSign = '';
            finish = false;
        }

        let current = sign === '' ? a : b;

        if (current === '0' && key === '0') return;
        if (key === '.' && current.includes('.')) return;

        if (current === '0' && key !== '.') {
            current = key;
        } else if (key === '.' && current === '') {
            current = '0.';
        } else {
            current += key;
        }

        if (sign === '') {
            a = current;
        } else {
            b = current;
        }
        out.textContent = current;
        return;
    }

    // операции
    if (action.includes(key)) {
        if (key === 'x²' || key === '√x') {
            if (a === '') return;

            const value = parseFloat(a);
            if (key === '√x' && value < 0) {
                showError();
                return;
            }

            a = format(key === 'x²' ? value * value : Math.sqrt(value));
            b = '';
            sign = '';
            finish = true;
            out.textContent = a;
            return;
        }

        // 4 + 5 + ... — промежуточный результат считается сразу
        if (a !== '' && b !== '' && sign !== '' && !finish) {
            const result = calculate(a, b, sign);
            if (result === null) {
                showError();
                return;
            }
            a = format(result);
            b = '';
            out.textContent = a;
        }

        if (a === '') a = '0';
        sign = key;
        finish = false;
        return;
    }

    // равно
    if (key === '=') {
        if (a === '') return;

        // повторное = повторяет последнюю операцию: 5 + 3 = 8, = 11
        if (b === '' && lastB !== '') {
            b = lastB;
            sign = lastSign;
        }

        if (b === '' || sign === '') {
            out.textContent = a;
            return;
        }

        const result = calculate(a, b, sign);
        if (result === null) {
            showError();
            return;
        }

        lastB = b;
        lastSign = sign;
        a = format(result);
        b = '';
        sign = '';
        finish = true;
        out.textContent = a;
    }
};
