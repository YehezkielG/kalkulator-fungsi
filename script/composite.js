const { Expression, Equation} = algebra;


function f(value){
    const expression = document.getElementById("Ffunction").value.replaceAll('x',`(${value})`);
    return expression;
}

function g(value){
    let expression = value.replace('x',`(${value})`);
    return value;
}

function calculate(){
    const gFunc = g(document.getElementById("Gfunction").value).replace('x', document.getElementById("input").value);
    let result = algebra.parse(f(gFunc)).toString();
    document.getElementById('result').textContent = result;
}
