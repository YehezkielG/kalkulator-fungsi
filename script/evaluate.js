function Tojs(str) {
  return str.replaceAll(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // Ubah pecahan
    .replaceAll(/\\sqrt{([^}]+)}/g, 'sqrt($1)')             // Ubah akar
    // .replaceAll(/\\left\(/g, '(')                           
    // .replaceAll(/\\right\)/g, ')')                          
    .replaceAll(/\\cdot/g, '*')
  // .replaceAll(/\^/g, '**');  
}

function calculate() {
  document.getElementById("finishing").innerHTML = "";
  
  if (calculateComposite) {
    if(fCompositeField.latex() == "" || gCompositeField.latex() == "") return
    let f = fCompositeField.latex();
    let g = gCompositeField.latex();
    f = Tojs(f); g = Tojs(g);
    let substitution;
    let equations = [];
    equations.push(`f(x)    = ${fCompositeField.latex()}`);
    equations.push(`g(x)    = ${gCompositeField.latex()}`);
    let evaluate = 0;
    if (Countfog) {
      substitution = f.replaceAll('x', "(" + g + ")");
      evaluate = algebra.parse(substitution).toTex().toString();
      equations.push(`subsitusi fungsi g(x) ke fungsi f(x)`);
      equations.push(`(f o g)(x) = f(g(x))`);
      equations.push(`(f o g)(x) = ${substitution}`);
      equations.push(`        = ${evaluate}`);
    } else {
      substitution = g.replaceAll('x', "(" + f + ")");
      evaluate = algebra.parse(substitution).toTex().toString();
      equations.push(`subsitusi fungsi f(x) ke fungsi g(x)`);
      equations.push(`(g o f)(x) = g(f(x))`);
      equations.push(`(g o f)(x) = ${substitution}`);
      equations.push(`        = ${evaluate}`);
    }
    resultField.latex(evaluate)
    equations.forEach((equation, index) => {
      let line = document.createElement('div');
      line.id = `line-${index}`;
      line.className = 'w-full';
      line.innerHTML = equation;
      if (index != 2) MQ.StaticMath(line);
      document.getElementById("finishing").appendChild(line);
    })
  }
  else {
    
    try {
      //buat variable steps lebih rinci dalam menjelaskan
      const input = fInverse.latex();
      const errorDiv = document.getElementById('error');
      const resultSection = document.getElementById('result-section');
      const stepsContainer = document.getElementById('steps-container');
      let result = '';
      let steps = [];

      // Clean the input
      let cleanInput = input.replace(/\\left|\\right/g, '')
        .replace(/\,/g, '')
        .replace(/\s+/g, '')
        .replace(/\\frac/g, 'frac');

      // General Function Handling
      if (cleanInput.includes('^')) {
        // Power Function: x^n
        const parts = cleanInput.split('^');
        const base = parseFloat(parts[0].replace('x', '') || 1);
        const power = parseFloat(parts[1]);

        steps = [
          `${base === 1 ? '' : base}x^{${power}}`,
          `x^{1/${power}}`,
          `\\frac{1}{${power}}`
        ];
        result = `${base === 1 ? '' : '\\frac{1}{' + base + '}'}x^{\\frac{1}{${power}}}`;

      } else if (cleanInput.includes('sqrt')) {
        // Square Root Function: sqrt(x)
        steps = [
          `\\sqrt{x}`,
          `x^2`
        ];
        result = 'x^2';

      } else if (cleanInput.includes('log') || cleanInput.includes('ln')) {
        // Logarithmic Function
        const base = cleanInput.includes('log') ? 'log' : 'ln';
        steps = [
          `${base}(x)`,
          `e^{x}`
        ];
        result = 'e^{x}';

      } else if (cleanInput.includes('e^')) {
        // Exponential Function: e^x
        steps = [
          `e^x`,
          `\\ln{x}`
        ];
        result = '\\ln{x}';

      } else if (cleanInput.includes('+') || cleanInput.includes('-')) {
        // Linear Function (ax + b)
        const isSubtraction = cleanInput.includes('-');
        const parts = cleanInput.split(isSubtraction ? '-' : '+');
        const a = parseFloat(parts[0].replace('x', '') || 1);
        const b = parseFloat(isSubtraction ? `-${parts[1]}` : parts[1]);
        
        steps = [
          `${a}x ${isSubtraction ? '-' : '+'} ${Math.abs(b)}`,
          `\\frac{x ${isSubtraction ? '-' : '+  '} ${Math.abs(b)}}{${a}}`
        ];

        result = `\\frac{x ${isSubtraction ? '-' : '+'} ${Math.abs(b)}}{${a}}`;
      } else {
        throw new Error('Format fungsi tidak didukung. Gunakan format seperti \"2x + 1\" atau \"x^2\"');
      }

      // Render result and steps
      if (result) {
        inverseResult.latex(result);
        steps.forEach((equation, index) => {
          let line = document.createElement('div');
          line.id = `line-${index}`;
          line.className = 'w-full';
          line.innerHTML = equation;
          MQ.StaticMath(line)
          document.getElementById("finishing").appendChild(line);
        })
      }

    } catch (err) {
      errorDiv.textContent = 'Format fungsi tidak didukung. Gunakan format seperti \"2x + 1\" atau \"x^2\"';
      errorDiv.style.display = 'block';
    }
  }
}
