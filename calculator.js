let numberOne='';
let numberTwo='';
let numberSign='';
const operations=[
    {calculate:(a,b)=>{return a + b}, sign:'+'},
    {calculate:(a,b)=>{return a - b}, sign:'-'},
    {calculate:(a,b)=>{return a * b}, sign:'×'},
    {calculate:(a,b)=>{
        if(b===0){
            return 'LOL';
        }
        return a / b}, sign:'÷'}
];
const symbols =[
    {start:(display,buttonString)=>{
        startOperation(display,buttonString)}, sign:'+'},
    {start:(display,buttonString)=>{
        startOperation(display,buttonString)}, sign:'-'},
    {start:(display,buttonString)=>{
        startOperation(display,buttonString)}, sign:'×'},
    {start:(display,buttonString)=>{
        startOperation(display,buttonString)}, sign:'÷'},
    {start:(display)=>{
        display.textContent='0'; 
        resetCalculator();}, sign:'AC'},
    {start:(display,buttonString)=>{
        setArgument(buttonString);
        display.textContent+=`${buttonString}`;}, sign:'.'},
    {start:()=>{
        if(!(display.textContent==='0')){
        display.textContent=`${reverseNumberSign(display.textContent)}`
        numberOne=display.textContent;}}, sign:'-/+'},
    {start:()=>{
        calculate(display);
        numberSign='';}, sign:'='},
];
const startOperation=(display,buttonString)=>{
    calculate(display);
    numberSign=buttonString;
}
const reverseNumberSign=(text)=>{
    const array=[...text];
    if(text[0]==="-"){
        array.splice(0,1);
    }
    else{
        array.unshift("-");
    }
    return array.join('');
}
const setDot=(text)=>{
    const array=[...text];
    if(checkDot(array)){
        array.push(".");
    }
    return array.join('');
}
const checkDot=(text)=>{

    return text.includes('.');
}
const appendNumber=(numberOne, text)=>{
    return numberOne+text;
}
const setArgument=(text)=>{
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
        }
        else{
            numberOne=appendNumber(numberOne,text);
        } 
    }
    else if(!(numberOne==='') && !(numberSign==='')){
        numberTwo=appendNumber(numberTwo,text);
    }
}
const resetCalculator=()=>{
    numberOne='';
    numberTwo='';
    numberSign='';
}
const calculate=(display)=>{
    let result='';
    if(!(numberOne==='') && !(numberTwo==='')){
        for(let i =0;i<operations.length;i++){
            if(operations[i].sign===numberSign){
                result+=operations[i].calculate(Number(numberOne),Number(numberTwo));
                Math.round((result) * 100)/100;
                break;
            }
        }
        if(String(result).length>=10){
            result=Number(result).toExponential(5);
        }
        display.textContent=""+result;
        if(result==='LOL'){
            numberOne='';
        }
        else{
            numberOne=result;
        }
        
        numberTwo='';
        result=0;
    }
}

const operate=(display,buttonString)=>{
    for(let i=0;i<symbols.length;i++){
        if(symbols[i].sign===buttonString){
            symbols[i].start(display,buttonString);
            break;
        } 
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
