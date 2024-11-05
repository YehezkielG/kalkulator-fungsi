function Tojs(str) {
  return str.replaceAll(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // Ubah pecahan
    .replaceAll(/\\sqrt{([^}]+)}/g, 'sqrt($1)')             // Ubah akar
    // .replaceAll(/\\left\(/g, '(')                           
    // .replaceAll(/\\right\)/g, ')')                          
    .replaceAll(/\\cdot/g, '*')
  // .replaceAll(/\^/g, '**');  
}

function calculate() {
  if (calculateComposite) {
    let f = fCompositeField.latex();
    let g = gCompositeField.latex();
    // let x  = inputXfield.latex();
    f = Tojs(f); g = Tojs(g);
    let subtitution;
    //subtitution
    if (Countfog) {
      subtitution = f.replaceAll('x', "(" + g + ")");
    } else {
      subtitution = g.replaceAll('x', "(" + f + ")");
    }
    console.log(subtitution);
    let evaluate = algebra.parse(subtitution).toTex().toString();
    console.log(evaluate);
    resultField.latex(evaluate)
  }
  else {
    const input = fInverse.latex();
    const errorDiv = document.getElementById('error');
    const resultSection = document.getElementById('result-section');
    const stepsContainer = document.getElementById('steps-container');

    try {
      // Clean the input
      let cleanInput = input.replace(/\\left|\\right/g, '')
        .replace(/\{|\}/g, '')
        .replace(/\s+/g, '');

      let result = '';
      let steps = [];

      // Linear function (ax + b)
      if (cleanInput.includes('+') || cleanInput.includes('-')) {
        const isSubtraction = cleanInput.includes('-');
        const parts = cleanInput.split(isSubtraction ? '-' : '+');

        if (parts.length === 2) {
          const a = parseFloat(parts[0].replace('x', '')) || 1;
          const b = parseFloat(isSubtraction ? `-${parts[1]}` : parts[1]);

          steps = [
            `${a}x ${isSubtraction ? '-' : '+'} ${Math.abs(b)}`,
            `${a}x ${isSubtraction ? '+' : '-'} ${Math.abs(b)}`,
            `\\frac{x ${isSubtraction ? '+' : '-'} ${Math.abs(b)}}{${a}}`
          ];

          result = `\\frac{x ${isSubtraction ? '+' : '-'} ${Math.abs(b)}}{${a}}`;
        }
      }
      // Power function (x^n)
      else if (cleanInput.includes('^')) {
        const parts = cleanInput.split('^');
        if (parts.length === 2) {
          const base = parts[0].replace('x', '') || '1';
          const power = parseFloat(parts[1]);

          steps = [
            `${base === '1' ? '' : base}x^{${power}}`,
            `\\frac{y}{${base === '1' ? '1' : base}} = x^{${power}}`,
            `${base === '1' ? '' : `\\frac{1}{${base}}`}x^{\\frac{1}{${power}}}`
          ];

          result = `${base === '1' ? '' : `\\frac{1}{${base}}`}x^{\\frac{1}{${power}}}`;
        }
      }

      if (result) {
        inverseResult.latex(result);
      } else {
        throw new Error('Format fungsi tidak didukung');
      }

    } catch (err) {
      errorDiv.textContent = 'Format fungsi tidak didukung. Gunakan format seperti "2x + 1" atau "x^2"';
      errorDiv.style.display = 'block';
    }
  }
  //get latex code

}
