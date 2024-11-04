function Tojs(str) {
  return str.replaceAll(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // Ubah pecahan
    .replaceAll(/\\sqrt{([^}]+)}/g, 'sqrt($1)')             // Ubah akar
  // .replaceAll(/\\left\(/g, '(')                           
  // .replaceAll(/\\right\)/g, ')')                          
  .replaceAll(/\\cdot/g, '*')                             
  // .replaceAll(/\^/g, '**');  
}

function calculate() {
  //get latex code
  let f = fCompositeField.latex();
  let g = gCompositeField.latex();
  // let x  = inputXfield.latex();
  f = Tojs(f); g = Tojs(g);
  let subtitution;
  //subtitution
  if(Countfog){
    subtitution = f.replaceAll('x', "(" + g + ")");
  }else{
    subtitution = g.replaceAll('x', "(" + f + ")");
  }
  // subtitution = subtitution.replaceAll('x',x);
  
  //evaluate
  console.log(subtitution);
  let evaluate = algebra.parse(subtitution).toTex().toString();
  resultField.latex(evaluate)
}
