var fCompositeField = document.getElementById('fComposite');
var gCompositeField = document.getElementById('gComposite');
var resultField = document.getElementById("compositeResult");
var btn = document.querySelectorAll("#btn");
var fInverse = document.getElementById("fInverse");
const compositionBtn = document.getElementById("comFunc")
const inverseBtn = document.getElementById("invFunc")
const  composition = document.getElementById("composition");
const  inverse = document.getElementById("inverse");
var inputX = document.getElementById("inputX");
  
//Change counposite 
let Countfog = true;
document.getElementById("reverseComposite").addEventListener("click",()=>{
 if(Countfog){
    document.getElementById("compositeCount").innerHTML = `(g o f)`
    Countfog = false;
 }
 else{
    document.getElementById("compositeCount").innerHTML = `(f o g)`
    Countfog = true;
 }
})
let calculateComposite = true;
//change from composite fucntion to inverse function 
inverseBtn.addEventListener("click",function(){
    this.classList.remove("opacity-40");
    compositionBtn.classList.add("opacity-40");
    inverse.classList.remove("hidden");
    composition.classList.add("hidden");
    calculateComposite = false;
})
//change from inverse function to composite funtion
compositionBtn.addEventListener("click",function(){
    this.classList.remove("opacity-40");
    inverseBtn.classList.add("opacity-40");
    inverse.classList.add("hidden");
    composition.classList.remove("hidden");
    calculateComposite = true;
})


var MQ = MathQuill.getInterface(2);

var fCompositeField = MQ.MathField(fCompositeField, {
  spaceBehavesLikeTab: true,
  handlers: {
    edit: function () {}
  }
});
var gCompositeField = MQ.MathField(gCompositeField, {
  spaceBehavesLikeTab: true,
  Headers: {
    edit: function () {}
  }
})

var fInverse = MQ.MathField(fInverse, {
    spaceBehavesLikeTab:true,
    Headers:{edit : function(){}}
})

var resultField = MQ.StaticMath(resultField);
var inverseResult = MQ.StaticMath(document.getElementById("inverseResult"))

btn.forEach((btn, index) => {
    btn.addEventListener("mousedown", (value) => {
        event.preventDefault();
        if(document.getElementById('fComposite').classList.contains('mq-focused')){
            if(btn.value == 'backspace'){
                fCompositeField.keystroke('Backspace'); 
            }
            else{
                fCompositeField.write(btn.value);
            }
        }
        else if(document.getElementById('gComposite').classList.contains('mq-focused')){
            if(btn.value == 'backspace'){
                gCompositeField.keystroke('Backspace'); 
            }
            else{
                gCompositeField.write(btn.value);
            }
        }
        else if(document.getElementById('fInverse').classList.contains('mq-focused')){
            if(btn.value == 'backspace'){
                fInverse.keystroke('Backspace'); 
            }
            else{
                fInverse.write(btn.value);
            }
        }
    })
});
