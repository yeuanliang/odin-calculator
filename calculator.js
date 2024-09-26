const supportKeys = ['0','1','2','3','4','5','6','7','8','9','-','=','+','/','*','.','Backspace','%']
const validOperands= ['0','1','2','3','4','5','6','7','8','9']
const validOperators= ['-','+','/','*']
const operatorButtons = document.querySelectorAll(".operator")
const operandButtons = document.querySelectorAll(".operand")
const clearButton = document.querySelector(".clear")
const backspaceButton = document.querySelector(".backspace")
const equalsButton = document.querySelector(".equals")
const signButton = document.querySelector(".sign")
const percentButton = document.querySelector(".percent")
const decimalButton = document.querySelector(".decimal")
const calculatorDisplay = document.querySelector('.calculation-current')
let firstOperand = ''
let calculatorOperator = ''
let secondOperand = ''
let calculationExpression = '0'
let tempAnswer = 0

clearButton.addEventListener('click',function(){
    calculatorDisplay.textContent='0'
    reset()
})

backspaceButton.addEventListener('click',function(){
    let content = calculatorDisplay.textContent
    calculatorDisplay.textContent = content.slice(0,-1)
    if(secondOperand){
        secondOperand = secondOperand.slice(0,-1)
    }else if(calculatorOperator){
        calculatorOperator=''
    }else{
        firstOperand = firstOperand.slice(0,-1)
    }
})

decimalButton.addEventListener('click',function(){
    if(calculatorOperator===''){
        if(firstOperand.includes('.')){
            return
        }else{
            firstOperand += '.'
            calculatorDisplay.textContent += '.'
        }
    }else{
        if(secondOperand.includes('.')){
            return
        }else{
            if(secondOperand!==''){
                secondOperand += '.'
                calculatorDisplay.textContent += '.'
            }else{
                secondOperand += '0.'
                calculatorDisplay.textContent += '0.'
            }
        }
    }
})

document.addEventListener(
    "keydown",
    (event)=>{
        let key = event.key
        if(supportKeys.includes(key)){
            console.log(key)
        }
    }
)

for(let i=0;i<operandButtons.length;i++){
    operandButtons[i].addEventListener('click', function(event){
        if(calculationExpression!==''){
            calculatorDisplay.textContent = ''
            calculationExpression=''
        }
        if(calculatorOperator===''){
            firstOperand += event.srcElement.value
        }else{
            secondOperand += event.srcElement.value
        }
        if(calculatorDisplay.textContent==='0'){
            calculatorDisplay.textContent = event.srcElement.value
        }else{
            calculatorDisplay.textContent += event.srcElement.value
        }
    })
}

for(let i=0;i<operatorButtons.length;i++){
    operatorButtons[i].addEventListener('click',function(event){
        if(firstOperand===''){
            firstOperand = tempAnswer
        }
        calculatorOperator = event.srcElement.value
        calculatorDisplay.textContent += event.srcElement.value
    })
}

equalsButton.addEventListener('click',function(){
    const result = operate(calculatorOperator, +firstOperand, +secondOperand)
    calculatorDisplay.textContent += `=${result}`
    calculationExpression = firstOperand+calculatorOperator+secondOperand+"="+result
    reset()
    tempAnswer = result
})

function reset(){
    firstOperand=''
    calculatorOperator = ''
    secondOperand=''
}

function add(a,b){
    console.log(a,b)
    return a+b
}

function subtract(a,b){
    return a-b
}

function multiply(a,b){
    return a*b
}

function divide (a,b){
    if(b!==0){
        let q = a/b
        let digits = 0
        if(q>0.1){
            digits=2
        }else{
            let string=''+q
            digits = string.search(/[1-9]/)+1
        }
        return q.toFixed(digits)
    }else{
        return 'error'
    }
}

function operate(operator,a,b){
    switch(operator){
        case "+":
            return add(a,b)
        case "-":
            return subtract(a,b)
        case "*":
            return multiply(a,b)
        case "/":
            return divide(a,b)
        default:
            return 0
    }
}


