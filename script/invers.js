function inverseFunction(y, a, b) {
    if (a === 0) {
      throw new Error("Nilai a tidak boleh 0");
    }
    return (y - b) / a;
  }
  
  const a = 2;  // Misalkan a = 2
  const b = 3;  // Misalkan b = 3
  const y = 7;  // Nilai y (f(x))
  // f(x) = 2x + 3
  const x = inverseFunction(y, a, b);
  console.log(`Invers dari f(${y}) adalah x = ${x}`);