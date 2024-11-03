var fCompositeField = document.getElementById('fComposite');
var gCompositeField = document.getElementById('gComposite');
var resultField = document.getElementById("resultComposite");
var btn = document.querySelectorAll("btn");

var MQ = MathQuill.getInterface(2); 

var fCompositeField = MQ.MathField(fCompositeField, {
  spaceBehavesLikeTab: true, 
  handlers: {
    edit: function(){
      btn.forEach((btn,index)=>{
        btn.addEventListener("click",(value)=>{
          fCompositeField.latex(fCompositeField.latex()+btn.textContent);
        })
      });
    }
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
  //get latex code
  let f = fCompositeField.latex();
  let g = gCompositeField.latex();
  f = Tojs(f);g = Tojs(g)
  //subtitution
  f = f.replaceAll('x', "("+g+")");
  //evaluate
  console.log(f);
  let evaluate = algebra.parse(f).toTex().toString();
  resultField.latex(evaluate)
}

function Tojs(str){
  return str.replaceAll(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // Ubah pecahan
  .replaceAll(/\\sqrt{([^}]+)}/g, 'sqrt($1)')             // Ubah akar
  // .replaceAll(/\\left\(/g, '(')                           
  // .replaceAll(/\\right\)/g, ')')                          
  // .replaceAll(/\\cdot/g, '*')                             
  // .replaceAll(/\^/g, '**');  
}