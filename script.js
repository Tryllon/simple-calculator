const initCalculator = function () {

    let mainContainer = null
    let result = 0
    let choseOperator = ''
    let firstNumber = ''
    let lastOperator = ''
    let lastNumber = ''

    //helper functions
    const calculate = function (operator, a, b) {
        const number1 = parseFloat(a)
        const number2 = parseFloat(b)

        switch (operator) {
            case '+':
                return number1 + number2
            case '-':
                return number1 - number2
            case '*':
                return number1 * number2
            case '/':
                return number1 / number2

        }

    }

    const renderButton = function (label, className) {
        const container = document.createElement('button')
        container.className = className

        container.innerText = label
        container.value = container.innerText

        container.addEventListener('click', onClickButton)

        return container
    }


    //change functions
    const onClickClear = function () {
        result = 0
        choseOperator = ''
        firstNumber = ''
        lastOperator = ''
    }


    const onClickButton = function (e) {

        let value = e.target.value

        if ((lastOperator === '=') && (value === '+' || value === '-' || value === '*' || value === '/')) {
            result = result
            choseOperator = value
            lastOperator = ''
            firstNumber = ''

        } else {
            if (value === '+' || value === '-' || value === '*' || value === '/') {


                if (choseOperator && result && firstNumber) {
                    result = calculate(choseOperator, result, firstNumber)
                    firstNumber = ''
                    choseOperator = value

                } else {

                    choseOperator = value
                    if (firstNumber) {
                        result = parseFloat(firstNumber)
                    }
                    firstNumber = ''
                }

            } else if (value === 'C') {
                onClickClear()

            } else if (value === 'CE') {
                if (lastOperator === '=') {
                    onClickClear()
                } else {
                    firstNumber = '0'
                    lastOperator = 'CE'
                }
            }
            else if (value === '=') {
                if (choseOperator && result && firstNumber) {
                    result = calculate(choseOperator, result, firstNumber)
                    lastOperator = '='
                }
            }
            else if (value === '%') {
                if (lastOperator === '=') {
                    console.log(result)
                    result = ((result / 100) * result).toFixed(1)
                    console.log(result)
                } else {
                    result = ((result / 100) * firstNumber).toFixed(1)
                }
            }
            else {
                if (lastOperator === 'CE') {
                    firstNumber = ''
                    firstNumber += value
                    lastOperator = ''
                } else if (lastOperator === '=') {
                    onClickClear()
                }
                else {
                    firstNumber += value
                    lastNumber = firstNumber
                }


            }
        }



        update()
    }


    //render function

    const renderNewResult = function (result) {
        const container = document.createElement('div')
        container.className = 'container__result'

        container.innerText = result

        return container
    }
    const renderNewChoseOperator = function (choseOperator) {
        const container = document.createElement('div')
        container.className = 'container__operator'
        if (lastOperator === '=') {
            container.innerText = lastOperator
        } else {

            container.innerText = choseOperator
        }


        return container
    }
    const renderNewChoseNumber = function (choseNumber) {
        const container = document.createElement('div')
        container.className = 'container__number'
        container.innerText = choseNumber

        return container
    }


    const renderNewOperatorButtons = function () {

        const container = document.createElement('div')
        container.className = 'container__operatorButtons'

        const buttonPlus = renderButton('CE', 'button__operation button')
        const buttonMinus = renderButton('C', 'button__operation button')
        const buttonMultiply = renderButton('+', 'button__operation button')
        const buttonDivide = renderButton('-', 'button__operation button')
        const buttonModuls = renderButton('*', 'button__operation button')
        const buttonEqual = renderButton('/', 'button__operation button')
        const buttonClear = renderButton('%', 'button__operation button')
        const buttonBack = renderButton('=', 'button__operation button')

        container.appendChild(buttonPlus)
        container.appendChild(buttonMinus)
        container.appendChild(buttonMultiply)
        container.appendChild(buttonDivide)
        container.appendChild(buttonModuls)
        container.appendChild(buttonEqual)
        container.appendChild(buttonClear)
        container.appendChild(buttonBack)


        return container
    }
    const renderNewCalculatorButtons = function () {

        const container = document.createElement('div')
        container.className = 'container__numberButtons'

        const button0 = renderButton('1', 'button__number button')
        const button1 = renderButton('2', 'button__number button')
        const button2 = renderButton('3', 'button__number button')
        const button3 = renderButton('4', 'button__number button')
        const button4 = renderButton('5', 'button__number button')
        const button5 = renderButton('6', 'button__number button')
        const button6 = renderButton('7', 'button__number button')
        const button7 = renderButton('8', 'button__number button')
        const button8 = renderButton('9', 'button__number button')
        const button9 = renderButton('0', 'button__number button')

        container.appendChild(button0)
        container.appendChild(button1)
        container.appendChild(button2)
        container.appendChild(button3)
        container.appendChild(button4)
        container.appendChild(button5)
        container.appendChild(button6)
        container.appendChild(button7)
        container.appendChild(button8)
        container.appendChild(button9)

        return container
    }

    const render = function () {

        const cotnainer = document.createElement('div')
        const cotnainerDisplay = document.createElement('div')
        const cotnainerButtons = document.createElement('div')
        cotnainer.className = 'wrapper'
        cotnainerDisplay.className = 'container__display'
        cotnainerButtons.className = 'container__buttons'

        const renderResult = renderNewResult(result)
        const renderChoseOperator = renderNewChoseOperator(choseOperator)
        const renderChoseNumber = renderNewChoseNumber(firstNumber)
        const renderCalculatorButtons = renderNewCalculatorButtons()
        const renderOperatorButtons = renderNewOperatorButtons()

        cotnainer.appendChild(cotnainerDisplay)
        cotnainerDisplay.appendChild(renderResult)
        cotnainerDisplay.appendChild(renderChoseOperator)
        cotnainerDisplay.appendChild(renderChoseNumber)

        cotnainer.appendChild(cotnainerButtons)
        cotnainerButtons.appendChild(renderCalculatorButtons)
        cotnainerButtons.appendChild(renderOperatorButtons)

        return cotnainer

    }
    const update = function () {
        mainContainer.innerHTML = ''

        const app = render()

        mainContainer.appendChild(app)
    }

    const init = function (selector) {

        const container = document.querySelector(selector)

        if (!container) {
            console.error('Wrong container')
        }

        mainContainer = container

        const app = render()

        mainContainer.appendChild(app)

    }
    return init
}