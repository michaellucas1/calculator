let numberOne='';
let numberTwo='';
let numberSign='';
const operations=[
    {calculate:(a,b)=>{return a + b}, sign:'+'},
    {calculate:(a,b)=>{return a - b}, sign:'-'},
    {calculate:(a,b)=>{return a * b}, sign:'×'},
    {calculate:(a,b)=>{return a / b;}, sign:'÷'}];
function reverseNumberSign(text){
    const array=[...text];
    if(text[0]==="-"){
        array.splice(0,1);
    }
    else{
        array.unshift("-");
    }
    return array.join('');
}
function setDot(text){
    const array=[...text];
    if(checkDot(array)){
        array.push(".");
    }
    return array.join('');
}
function checkDot(text){
    let result=false;
    if(!(text.includes('.'))){
        result=true;
    }
    return result;
}
function appendNumber(numberOne, text){
    return numberOne+text;
}
function setArgument(text){
    
    if(numberOne===''){
        numberOne=text;
        if(!(numberSign==='')){
            numberSign='';
        }
    }  
    else if(!(numberOne==='') && numberSign==='')  {
        const array=[...text]
        if(checkDot(array)){
            numberOne+=text;
            console.log('hello');
        }
        else{
            numberOne=appendNumber(numberOne,text);
        }
        
    }
    else if(!(numberOne==='') && !(numberSign==='')){
        numberTwo=appendNumber(numberTwo,text);
    }
    
}
function resetCalculator(){
    numberOne='';
    numberTwo='';
    numberSign='';
}
function calculate(display){
    let result='';
    if(!(numberOne==='') && !(numberTwo==='')){
        for(let i =0;i<operations.length;i++){
            if(operations[i].sign===numberSign){
                result+=operations[i].calculate(Number(numberOne),Number(numberTwo));
                break;
            }
        }
        display.textContent=""+result;
        numberOne=result;
        numberTwo='';
        result=0;
    }
}
function operate(display,buttonString){
    let result='';
    switch(buttonString){
        case "+":
            
            calculate(display);
            numberSign=buttonString;
            break; 
        case "-":
            calculate(display);
            numberSign=buttonString;
            break;  
        case "AC":
            display.textContent='0';
            resetCalculator();
            console.log(numberOne);
            console.log(numberSign);
            console.log(numberTwo);
            break;
        case "÷":
            calculate(display);
            numberSign=buttonString;
            break;
        case "×":
            calculate(display);
            numberSign=buttonString;
            break;
        case ".":
            let text=buttonString;
            setArgument(text);
            display.textContent+=`${text}`;
            break;
        case "=":
            calculate(display);
            numberSign='';
            break;
        case "-/+":
            if(!(display.textContent==='0')){
                display.textContent=`${reverseNumberSign(display.textContent)}`
                numberOne=display.textContent;
            }
            break;
        default:
            break;
    }
}
const display= document.querySelector(".container-top-display");
const bottomContainer=document.querySelector(".container-bottom");
bottomContainer.addEventListener("click",(event)=>{
    event.stopPropagation();
    if(event.target.className !== "container-bottom"){
        const buttonString = event.target.innerText;
        if(Number.isInteger(Number(buttonString))){
            if(display.textContent==='0' || !(numberSign==='') && numberTwo===''){
                display.textContent='';
                display.textContent=`${buttonString}`;
            }
            else{
                display.textContent=`${display.textContent}${buttonString}`;
            }
            setArgument(buttonString);
        }
        else{
            operate(display,buttonString);
        }
    }
    },false);
