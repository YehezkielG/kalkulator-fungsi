var fCompositeField = document.getElementById('fComposite');
var latexSpan = document.getElementById('latex');

var MQ = MathQuill.getInterface(2); // for backcompat

var fCompositeField = MQ.MathField(fCompositeField, {
  spaceBehavesLikeTab: true, // configurable
  handlers: {
    edit: function() { }
  }
});

const compositionBtn = document.getElementById("comFunc")
const inverseBtn = document.getElementById("invFunc")

const  composition = document.getElementById("composition");
const  inverse = document.getElementById("inverse");

inverseBtn.addEventListener("click",function(){
    this.classList.remove("opacity-40");
    compositionBtn.classList.add("opacity-40");

    inverse.classList.remove("hidden");
    composition.classList.add("hidden");
})

compositionBtn.addEventListener("click",function(){
    this.classList.remove("opacity-40");
    inverseBtn.classList.add("opacity-40");

    inverse.classList.add("hidden");
    composition.classList.remove("hidden");
})

