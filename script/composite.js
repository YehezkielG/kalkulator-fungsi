function Tojs(str) {
  return str.replaceAll(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // Ubah pecahan
    .replaceAll(/\\sqrt{([^}]+)}/g, 'sqrt($1)')             // Ubah akar
  // .replaceAll(/\\left\(/g, '(')                           
  // .replaceAll(/\\right\)/g, ')')                          
  // .replaceAll(/\\cdot/g, '*')                             
  // .replaceAll(/\^/g, '**');  
}

function calculate() {
  //get latex code
  let f = fCompositeField.latex();
  let g = gCompositeField.latex();
  f = Tojs(f); g = Tojs(g)
  //subtitution
  f = f.replaceAll('x', "(" + g + ")");
  //evaluate
  console.log(f);
  let evaluate = algebra.parse(f).toTex().toString();
  resultField.latex(evaluate)
}
