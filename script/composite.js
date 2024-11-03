const { Expression, Equation} = algebra;

var fCompositeField = document.getElementById('fComposite');
var gCompositeField = document.getElementById('gComposite');
var resultField = document.getElementById("resultComposite");


var MQ = MathQuill.getInterface(2); 

var fCompositeField = MQ.MathField(fCompositeField, {
  spaceBehavesLikeTab: true, 
  handlers: {
    edit: function(){ }
  }
});
var gCompositeField = MQ.MathField(gCompositeField,{
    spaceBehavesLikeTab:true,
    Headers:{
    edit:function(){ }
    }
})

var resultField = MQ.StaticMath(resultField)

function calculate(){
    let f = fCompositeField.latex();
    let g = gCompositeField.latex();
    console.log(f);
    console.log(g);
    f = f.replaceAll('x', "("+g+")");
    console.log(f)
    let result = algebra.parse(f).toString();
    resultField.latex(result)
    // document.getElementById('result').textContent = result;
}
