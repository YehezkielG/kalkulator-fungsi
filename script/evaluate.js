

function Tojs(str) {
  return str.replaceAll(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)')
    .replaceAll(/\\sqrt{([^}]+)}/g, 'sqrt($1)')
    .replaceAll(/\\left\(/g, '(')
    .replaceAll(/\\right\)/g, ')')
    .replaceAll(/\\cdot/g, '*')
    .replaceAll(/\^/g, '**');
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
    try {
      let cleanInput = input.replace(/\\left|\\right/g, '')
        .replace(/\{|\}/g, '')
        .replace(/\s+/g, '');

      let result = '';
      let steps = [];
      if (cleanInput.includes('+') || cleanInput.includes('-')) {
        const isSubtraction = cleanInput.includes('-');
        const parts = cleanInput.split(isSubtraction ? '-' : '+');
        if (parts.length === 2) {
          const a = parseFloat(parts[0].replace('x', '')) || 1;
          const b = parseFloat(isSubtraction ? `-${parts[1]}` : parts[1]);

          result = `\\frac{x ${isSubtraction ? '+' : '-'} ${Math.abs(b)}}{${a}}`;
        }
      }
      else if (cleanInput.includes('^')) {
        const parts = cleanInput.split('^');
        if (parts.length === 2) {
          const base = parts[0].replace('x', '') || '1';
          const power = parseFloat(parts[1]);

          result = `${base === '1' ? '' : `\\frac{1}{${base}}`}x^{\\frac{1}{${power}}}`;
        }
      }

      if (result) {
        inverseResult.latex(result);
      } else {
        throw new Error('Format fungsi tidak didukung');
      }

    } catch (err) {
      console.log(err);
    }
  }
  //get latex code

}
