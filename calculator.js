function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}
function reverseNumberSign(text){
    const array=[...text];
    if(text[0]==="-"){
        array.splice(0,1);
    }
    else{
        array.unshift("- ");
    }
    return array.join('');
}
const display= document.querySelector(".container-top-display");
const bottomContainer=document.querySelector(".container-bottom");
bottomContainer.addEventListener("click",(event)=>{
    event.stopPropagation();
    if(event.target.className !== "container-bottom"){
        const buttonString = event.target.innerText;
        if(Number.isInteger(Number(buttonString))){
            display.textContent='';
            display.textContent=`${buttonString}`;
        }
        else{
            switch(buttonString){
                case "+":
                    break; 
                case "-":
                    break;  
                case "AC":
                    display.textContent='0';
                    break;
                case "÷":
                    break;
                case "×":
                    break;
                case "%":
                    break;
                case "=":
                    break;
                case "-/+":
                    display.textContent=`${reverseNumberSign(display.textContent)}`
                    break;
                default:
                    break;
            }
        }
    }
    },false);
