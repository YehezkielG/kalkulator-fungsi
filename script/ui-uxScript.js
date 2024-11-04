var fCompositeField = document.getElementById('fComposite');
var gCompositeField = document.getElementById('gComposite');
var resultField = document.getElementById("resultComposite");
var btn = document.querySelectorAll("#btn");
const compositionBtn = document.getElementById("comFunc")
const inverseBtn = document.getElementById("invFunc")
const  composition = document.getElementById("composition");
const  inverse = document.getElementById("inverse");

//change from composite fucntion to inverse function 
inverseBtn.addEventListener("click",function(){
    this.classList.remove("opacity-40");
    compositionBtn.classList.add("opacity-40");

    inverse.classList.remove("hidden");
    composition.classList.add("hidden");
})
//change from inverse function to composite funtion
compositionBtn.addEventListener("click",function(){
    this.classList.remove("opacity-40");
    inverseBtn.classList.add("opacity-40");

    inverse.classList.add("hidden");
    composition.classList.remove("hidden");
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

var resultField = MQ.StaticMath(resultField)


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
    })
});

MQ.StaticMath(document.querySelector('.xbtn'));
