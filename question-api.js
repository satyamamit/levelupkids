/* ============================================================
   SUPERCHARGED Question Engine v2 — Unlimited Math Practice
   External APIs + 40 Generator Templates + Local Bank Fallback
   ============================================================ */

const QuestionAPI = (function () {

  // ─── Utility helpers ──────────────────────────────────────
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[rand(0, arr.length - 1)]; }
  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }
  function isPrime(n) { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
  function nthPrime(n) { let c = 0, k = 1; while (c < n) { k++; if (isPrime(k)) c++; } return k; }
  function factorial(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  function toSuperscript(n) { const m = '⁰¹²³⁴⁵⁶⁷⁸⁹'; return String(n).split('').map(d => m[+d]).join(''); }
  function decodeHTML(html) { const t = document.createElement('textarea'); t.innerHTML = html; return t.value; }

  function makeOptions(correct, spread, forceInt = true) {
    const opts = new Set();
    opts.add(correct);
    let tries = 0;
    while (opts.size < 4 && tries < 50) {
      let v = correct + rand(-spread, spread);
      if (forceInt) v = Math.round(v);
      if (v !== correct && v >= 0) opts.add(v);
      tries++;
    }
    while (opts.size < 4) opts.add(correct + opts.size);
    const arr = shuffle([...opts]);
    return { options: arr.map(String), answer: arr.indexOf(correct) };
  }

  function makeStringOptions(correct, distractors) {
    const pool = [correct, ...distractors.filter(d => d !== correct)];
    while (pool.length < 4) pool.push(correct + '?');
    const arr = shuffle(pool.slice(0, 4));
    return { options: arr, answer: arr.indexOf(correct) };
  }

  // ─── External API: Open Trivia DB ────────────────────────
  async function fetchOpenTDB(count, difficulty) {
    try {
      const diff = difficulty === 'easy' ? 'easy' : difficulty === 'hard' ? 'hard' : 'medium';
      const url = `https://opentdb.com/api.php?amount=${count}&category=19&difficulty=${diff}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.response_code !== 0 || !data.results) return [];
      return data.results.map(r => {
        const correct = decodeHTML(r.correct_answer);
        const incorrects = r.incorrect_answers.map(decodeHTML);
        const allOpts = shuffle([correct, ...incorrects]);
        return {
          q: decodeHTML(r.question),
          options: allOpts,
          answer: allOpts.indexOf(correct),
          hint: 'Think carefully about the numbers involved.',
          explanation: `The correct answer is ${correct}.`,
          difficulty: r.difficulty,
          source: 'OpenTDB'
        };
      });
    } catch (e) { console.warn('OpenTDB fetch error:', e); return []; }
  }

  // ─── External API: NumbersAPI (math trivia → true/false) ──
  async function fetchNumbersTrivia(count) {
    const questions = [];
    try {
      for (let i = 0; i < count; i++) {
        const n = rand(1, 200);
        const res = await fetch(`http://numbersapi.com/${n}/math?json`);
        const data = await res.json();
        if (data.text) {
          const isTrue = rand(0, 1) === 1;
          let q, correct;
          if (isTrue) {
            q = `True or False: ${data.text}`;
            correct = 'True';
          } else {
            const fakeNum = n + rand(1, 10) * pick([-1, 1]);
            q = `True or False: ${data.text.replace(String(n), String(fakeNum))}`;
            correct = 'False';
          }
          const { options, answer } = makeStringOptions(correct, ['True', 'False', 'Cannot tell', 'Sometimes']);
          questions.push({ q, options, answer, hint: 'Think about number properties.', explanation: data.text, difficulty: 'medium', source: 'NumbersAPI' });
        }
      }
    } catch (e) { console.warn('NumbersAPI error:', e); }
    return questions;
  }

  // ─── MEGA Dynamic Generator — 40+ Templates ──────────────

  const Gen = {

    // ── ARITHMETIC ──────────────────────────────────────────
    addition(grade) {
      const max = [20, 100, 500, 2000, 10000, 50000, 100000, 500000][grade - 1] || 200;
      const a = rand(Math.floor(max * 0.1), max), b = rand(Math.floor(max * 0.1), max);
      const correct = a + b;
      return { q: `What is ${a.toLocaleString()} + ${b.toLocaleString()}?`, ...makeOptions(correct, Math.max(5, Math.floor(max * 0.1))), hint: 'Add the numbers step by step.', explanation: `${a.toLocaleString()} + ${b.toLocaleString()} = ${correct.toLocaleString()}`, difficulty: grade <= 2 ? 'easy' : 'medium', source: 'Generated' };
    },

    subtraction(grade) {
      const max = [20, 100, 500, 2000, 10000, 50000, 100000, 500000][grade - 1] || 200;
      let a = rand(Math.floor(max * 0.2), max), b = rand(Math.floor(max * 0.1), max);
      if (b > a) [a, b] = [b, a];
      const correct = a - b;
      return { q: `What is ${a.toLocaleString()} − ${b.toLocaleString()}?`, ...makeOptions(correct, Math.max(5, Math.floor(max * 0.05))), hint: 'Subtract carefully.', explanation: `${a.toLocaleString()} − ${b.toLocaleString()} = ${correct.toLocaleString()}`, difficulty: grade <= 2 ? 'easy' : 'medium', source: 'Generated' };
    },

    multiplication(grade) {
      const maxA = [5, 12, 15, 20, 25, 50, 100, 200][grade - 1] || 15;
      const maxB = [5, 12, 15, 15, 20, 25, 50, 100][grade - 1] || 15;
      const a = rand(2, maxA), b = rand(2, maxB);
      const correct = a * b;
      return { q: `What is ${a} × ${b}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.2))), hint: 'Use your times tables or break it into smaller parts.', explanation: `${a} × ${b} = ${correct}`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'Generated' };
    },

    division(grade) {
      const maxD = [5, 12, 15, 20, 25, 50, 100, 150][grade - 1] || 15;
      const divisor = rand(2, maxD);
      const quotient = rand(2, maxD);
      const dividend = divisor * quotient;
      return { q: `What is ${dividend} ÷ ${divisor}?`, ...makeOptions(quotient, Math.max(3, Math.floor(quotient * 0.3))), hint: 'Think about what times the divisor gives the dividend.', explanation: `${dividend} ÷ ${divisor} = ${quotient}`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'Generated' };
    },

    remainderDivision(grade) {
      const maxD = [3, 8, 12, 15, 20, 25, 50, 80][grade - 1] || 12;
      if (grade < 2) return Gen.division(grade);
      const divisor = rand(3, maxD);
      const quotient = rand(1, maxD);
      const remainder = rand(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      return { q: `What is the remainder when ${dividend} is divided by ${divisor}?`, ...makeOptions(remainder, divisor), hint: 'Divide and find what is left over.', explanation: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`, difficulty: 'medium', source: 'Generated' };
    },

    orderOfOperations(grade) {
      if (grade < 2) return Gen.addition(grade);
      const a = rand(2, 10), b = rand(2, 10), c = rand(1, 10);
      const templates = [
        { q: `${a} + ${b} × ${c} = ?`, ans: a + b * c },
        { q: `${a} × ${b} + ${c} = ?`, ans: a * b + c },
        { q: `(${a} + ${b}) × ${c} = ?`, ans: (a + b) * c },
        { q: `${a} × (${b} + ${c}) = ?`, ans: a * (b + c) },
        { q: `${a * b} ÷ ${a} + ${c} = ?`, ans: b + c },
      ];
      const t = pick(templates);
      return { q: t.q, ...makeOptions(t.ans, Math.max(5, Math.floor(t.ans * 0.2))), hint: 'Remember PEMDAS/BODMAS: Parentheses first, then Multiply/Divide, then Add/Subtract.', explanation: `Using order of operations: ${t.q.replace('= ?', '')} = ${t.ans}`, difficulty: 'medium', source: 'Competition Style' };
    },

    // ── FRACTIONS & DECIMALS ────────────────────────────────
    fractionAddition(grade) {
      if (grade < 2) return Gen.addition(grade);
      const d = pick([2, 3, 4, 5, 6, 8, 10]);
      const n1 = rand(1, d - 1), n2 = rand(1, d - 1);
      const sum = n1 + n2;
      const g = gcd(sum, d);
      const simpNum = sum / g, simpDen = d / g;
      const display = simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`;
      return { q: `What is ${n1}/${d} + ${n2}/${d}?`, ...makeStringOptions(display, [`${sum}/${d}`, `${n1 + n2 + 1}/${d}`, `${n1}/${d + n2}`, `${sum - 1}/${d}`].filter(x => x !== display)), hint: 'When denominators are the same, add the numerators.', explanation: `${n1}/${d} + ${n2}/${d} = ${sum}/${d} = ${display}`, difficulty: 'medium', source: 'Generated' };
    },

    fractionComparison(grade) {
      if (grade < 2) return Gen.addition(grade);
      const d1 = pick([2, 3, 4, 5, 6, 8]);
      const d2 = pick([2, 3, 4, 5, 6, 8].filter(x => x !== d1));
      const n1 = rand(1, d1 - 1), n2 = rand(1, d2 - 1);
      const v1 = n1 / d1, v2 = n2 / d2;
      let correct;
      if (Math.abs(v1 - v2) < 0.001) correct = `They are equal`;
      else if (v1 > v2) correct = `${n1}/${d1}`;
      else correct = `${n2}/${d2}`;
      return { q: `Which is larger: ${n1}/${d1} or ${n2}/${d2}?`, ...makeStringOptions(correct, [`${n1}/${d1}`, `${n2}/${d2}`, 'They are equal', 'Cannot tell']), hint: 'Convert to a common denominator or to decimals.', explanation: `${n1}/${d1} = ${(v1).toFixed(4)}, ${n2}/${d2} = ${(v2).toFixed(4)}. So ${correct} is larger.`, difficulty: 'medium', source: 'Generated' };
    },

    decimalArithmetic(grade) {
      if (grade < 3) return Gen.addition(grade);
      const places = grade <= 5 ? 1 : 2;
      const mul = Math.pow(10, places);
      const a = rand(1, 50 * mul) / mul;
      const b = rand(1, 50 * mul) / mul;
      const op = pick(['+', '−']);
      let correct;
      if (op === '+') correct = +(a + b).toFixed(places);
      else { const [x, y] = a >= b ? [a, b] : [b, a]; correct = +(x - y).toFixed(places); return { q: `What is ${x.toFixed(places)} − ${y.toFixed(places)}?`, ...makeOptions(correct * mul, Math.max(3, mul)).options ? makeOptions(Math.round(correct * mul), Math.max(3, Math.floor(correct * mul * 0.2))) : makeOptions(Math.round(correct * mul), 5), hint: 'Line up the decimal points.', explanation: `${x.toFixed(places)} − ${y.toFixed(places)} = ${correct.toFixed(places)}`, difficulty: 'medium', source: 'Generated' }; }
      const { options, answer } = makeOptions(Math.round(correct * mul), Math.max(3, Math.floor(correct * mul * 0.15)));
      return { q: `What is ${a.toFixed(places)} + ${b.toFixed(places)}?`, options: options.map(v => (v / mul).toFixed(places)), answer, hint: 'Line up the decimal points.', explanation: `${a.toFixed(places)} + ${b.toFixed(places)} = ${correct.toFixed(places)}`, difficulty: 'medium', source: 'Generated' };
    },

    percentages(grade) {
      if (grade < 3) return Gen.multiplication(grade);
      const pct = pick([10, 15, 20, 25, 30, 40, 50, 75]);
      const base = pick([20, 40, 50, 60, 80, 100, 120, 200, 250, 500]);
      const correct = (pct / 100) * base;
      return { q: `What is ${pct}% of ${base}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.3))), hint: `${pct}% means ${pct}/100. Multiply by ${base}.`, explanation: `${pct}% of ${base} = ${pct}/100 × ${base} = ${correct}`, difficulty: 'medium', source: 'Generated' };
    },

    // ── GEOMETRY ─────────────────────────────────────────────
    perimeter(grade) {
      const shapes = ['rectangle', 'square', 'triangle'];
      const shape = pick(shapes);
      if (shape === 'rectangle') {
        const l = rand(5, 25 + grade * 8), w = rand(3, 20 + grade * 5);
        const correct = 2 * (l + w);
        return { q: `What is the perimeter of a rectangle with length ${l} and width ${w}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.15))), hint: 'Perimeter of rectangle = 2 × (length + width)', explanation: `P = 2 × (${l} + ${w}) = 2 × ${l + w} = ${correct}`, difficulty: 'medium', source: 'Generated' };
      } else if (shape === 'square') {
        const s = rand(4, 20 + grade * 5);
        const correct = 4 * s;
        return { q: `What is the perimeter of a square with side ${s}?`, ...makeOptions(correct, Math.max(4, Math.floor(correct * 0.15))), hint: 'Perimeter of square = 4 × side', explanation: `P = 4 × ${s} = ${correct}`, difficulty: 'medium', source: 'Generated' };
      } else {
        const a = rand(5, 20 + grade * 2), b = rand(5, 20 + grade * 2), c = rand(Math.abs(a - b) + 1, a + b - 1);
        const correct = a + b + c;
        return { q: `A triangle has sides ${a}, ${b}, and ${c}. What is its perimeter?`, ...makeOptions(correct, Math.max(4, 8)), hint: 'Add all three sides.', explanation: `P = ${a} + ${b} + ${c} = ${correct}`, difficulty: 'medium', source: 'Generated' };
      }
    },

    area(grade) {
      const shape = pick(['rectangle', 'square', 'triangle']);
      if (shape === 'rectangle') {
        const l = rand(3, 15 + grade * 2), w = rand(2, 10 + grade * 2);
        const correct = l * w;
        return { q: `What is the area of a rectangle with length ${l} and width ${w}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.15))), hint: 'Area of rectangle = length × width', explanation: `A = ${l} × ${w} = ${correct}`, difficulty: 'medium', source: 'Generated' };
      } else if (shape === 'square') {
        const s = rand(3, 12 + grade);
        const correct = s * s;
        return { q: `What is the area of a square with side ${s}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.15))), hint: 'Area of square = side × side', explanation: `A = ${s}² = ${correct}`, difficulty: 'medium', source: 'Generated' };
      } else {
        const b = rand(4, 16), h = rand(3, 12);
        const correct = (b * h) / 2;
        return { q: `What is the area of a triangle with base ${b} and height ${h}?`, ...makeOptions(correct, Math.max(3, Math.floor(correct * 0.2)), false), hint: 'Area of triangle = ½ × base × height', explanation: `A = ½ × ${b} × ${h} = ${correct}`, difficulty: 'medium', source: 'Generated' };
      }
    },

    circleGeometry(grade) {
      if (grade < 4) return Gen.area(grade);
      const r = rand(2, 15);
      const type = pick(['circumference', 'area']);
      if (type === 'circumference') {
        const correct = +(2 * Math.PI * r).toFixed(1);
        const { options, answer } = makeOptions(Math.round(correct * 10), Math.max(20, Math.floor(correct * 2)));
        return { q: `What is the circumference of a circle with radius ${r}? (Use π ≈ 3.14, round to 1 decimal)`, options: options.map(v => (v / 10).toFixed(1)), answer, hint: 'C = 2πr', explanation: `C = 2 × π × ${r} ≈ ${correct}`, difficulty: 'medium', source: 'Generated' };
      } else {
        const correct = +(Math.PI * r * r).toFixed(1);
        const { options, answer } = makeOptions(Math.round(correct * 10), Math.max(30, Math.floor(correct * 2)));
        return { q: `What is the area of a circle with radius ${r}? (Use π ≈ 3.14, round to 1 decimal)`, options: options.map(v => (v / 10).toFixed(1)), answer, hint: 'A = πr²', explanation: `A = π × ${r}² ≈ ${correct}`, difficulty: 'hard', source: 'Generated' };
      }
    },

    angles(grade) {
      if (grade < 2) return Gen.perimeter(grade);
      const types = [
        () => { const a = rand(20, 160); return { q: `If one angle of a triangle is ${a}° and another is ${rand(10, 170 - a)}°, what is the third angle?`, ans: 180 - a - parseInt(arguments), hint: 'Angles in a triangle add up to 180°.' }; },
      ];
      const a1 = rand(20, 80), a2 = rand(20, 160 - a1);
      const a3 = 180 - a1 - a2;
      return { q: `A triangle has angles ${a1}° and ${a2}°. What is the third angle?`, ...makeOptions(a3, 15), hint: 'Angles in a triangle add up to 180°.', explanation: `180° − ${a1}° − ${a2}° = ${a3}°`, difficulty: 'medium', source: 'Competition Style' };
    },

    volume(grade) {
      if (grade < 4) return Gen.area(grade);
      const shape = pick(['cube', 'rectangular prism']);
      if (shape === 'cube') {
        const s = rand(2, 10);
        const correct = s * s * s;
        return { q: `What is the volume of a cube with side length ${s}?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.2))), hint: 'Volume of cube = side³', explanation: `V = ${s}³ = ${correct}`, difficulty: 'medium', source: 'Generated' };
      } else {
        const l = rand(2, 10), w = rand(2, 8), h = rand(2, 8);
        const correct = l * w * h;
        return { q: `What is the volume of a rectangular prism with length ${l}, width ${w}, and height ${h}?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.2))), hint: 'Volume = length × width × height', explanation: `V = ${l} × ${w} × ${h} = ${correct}`, difficulty: 'medium', source: 'Generated' };
      }
    },

    // ── LOGIC & PATTERNS ────────────────────────────────────
    numberPattern(grade) {
      const patterns = [
        () => { const s = rand(1, 5), d = rand(2, 5 + grade); const seq = Array.from({ length: 5 }, (_, i) => s + d * i); return { seq, next: s + d * 5, hint: 'Look for a common difference.' }; },
        () => { const s = rand(1, 3), r = rand(2, 3); const seq = Array.from({ length: 5 }, (_, i) => s * Math.pow(r, i)); return { seq, next: s * Math.pow(r, 5), hint: 'Each term is multiplied by the same number.' }; },
        () => { const seq = [1, 1, 2, 3, 5]; return { seq, next: 8, hint: 'Each term is the sum of the two before it (Fibonacci).' }; },
        () => { const seq = [2, 3, 5, 7, 11]; return { seq, next: 13, hint: 'These are prime numbers.' }; },
        () => { const seq = [1, 4, 9, 16, 25]; return { seq, next: 36, hint: 'These are perfect squares.' }; },
        () => { const s = rand(1, 5); const seq = Array.from({ length: 5 }, (_, i) => s + i * (i + 1)); return { seq, next: s + 5 * 6, hint: 'Look at the differences between terms — they increase!' }; },
      ];
      const p = pick(grade <= 2 ? patterns.slice(0, 2) : grade <= 4 ? patterns.slice(0, 4) : patterns);
      const { seq, next, hint } = p();
      return { q: `What comes next: ${seq.join(', ')}, ?`, ...makeOptions(next, Math.max(5, Math.floor(next * 0.2))), hint, explanation: `The next number is ${next}.`, difficulty: grade <= 2 ? 'easy' : 'medium', source: 'Competition Style' };
    },

    missingNumber(grade) {
      const a = rand(2, 10 + grade * 2), b = rand(2, 10 + grade * 2);
      const op = pick(['+', '×']);
      if (op === '+') {
        const sum = a + b;
        return { q: `? + ${b} = ${sum}. What is ?`, ...makeOptions(a, Math.max(3, Math.floor(a * 0.3))), hint: `Subtract ${b} from ${sum}.`, explanation: `${sum} − ${b} = ${a}`, difficulty: 'easy', source: 'Generated' };
      } else {
        const product = a * b;
        return { q: `? × ${b} = ${product}. What is ?`, ...makeOptions(a, Math.max(3, Math.floor(a * 0.3))), hint: `Divide ${product} by ${b}.`, explanation: `${product} ÷ ${b} = ${a}`, difficulty: 'medium', source: 'Generated' };
      }
    },

    digitSum(grade) {
      const n = rand(100, 10000 + grade * 5000);
      const correct = String(n).split('').reduce((s, d) => s + +d, 0);
      return { q: `What is the sum of the digits of ${n.toLocaleString()}?`, ...makeOptions(correct, Math.max(5, 8)), hint: 'Add each digit: ' + String(n).split('').join(' + '), explanation: `${String(n).split('').join(' + ')} = ${correct}`, difficulty: 'medium', source: 'Competition Style' };
    },

    divisibility(grade) {
      if (grade < 2) return Gen.addition(grade);
      const divBy = pick([2, 3, 4, 5, 6, 8, 9, 10, 11]);
      const mult = rand(10, 100);
      const correct = divBy * mult;
      const wrong1 = correct + rand(1, divBy - 1);
      const wrong2 = correct - rand(1, divBy - 1);
      const wrong3 = correct + divBy + rand(1, divBy - 1);
      return { q: `Which number is divisible by ${divBy}?`, ...makeStringOptions(String(correct), [String(wrong1), String(wrong2), String(wrong3)]), hint: `A number is divisible by ${divBy} if...think about divisibility rules!`, explanation: `${correct} ÷ ${divBy} = ${mult} (exact division)`, difficulty: 'medium', source: 'Competition Style' };
    },

    // ── EXPONENTS & ROOTS ───────────────────────────────────
    exponents(grade) {
      if (grade < 3) return Gen.multiplication(grade);
      const base = rand(2, grade <= 4 ? 10 : 12);
      const exp = rand(2, grade <= 5 ? 3 : 4);
      const correct = Math.pow(base, exp);
      return { q: `What is ${base}${toSuperscript(exp)}?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.2))), hint: `Multiply ${base} by itself ${exp} times.`, explanation: `${base}${toSuperscript(exp)} = ${correct}`, difficulty: 'medium', source: 'Generated' };
    },

    squareRoots(grade) {
      if (grade < 3) return Gen.multiplication(grade);
      const root = rand(2, grade <= 4 ? 12 : 20);
      const correct = root;
      const square = root * root;
      return { q: `What is √${square}?`, ...makeOptions(correct, Math.max(3, Math.floor(correct * 0.3))), hint: 'What number multiplied by itself gives ' + square + '?', explanation: `√${square} = ${correct} because ${correct} × ${correct} = ${square}`, difficulty: 'medium', source: 'Generated' };
    },

    // ── NUMBER THEORY (Competition) ─────────────────────────
    primeCheck(grade) {
      if (grade < 2) return Gen.addition(grade);
      const candidates = [];
      for (let i = 10; i < 100 + grade * 20; i++) candidates.push(i);
      const primes = candidates.filter(isPrime);
      const composites = candidates.filter(n => !isPrime(n));
      const p = pick(primes);
      return { q: `Which of these is a prime number?`, ...makeStringOptions(String(p), [String(pick(composites)), String(pick(composites)), String(pick(composites))]), hint: 'A prime has exactly 2 factors: 1 and itself.', explanation: `${p} is prime — it can only be divided by 1 and ${p}.`, difficulty: 'medium', source: 'Competition Style' };
    },

    gcdLcm(grade) {
      if (grade < 3) return Gen.multiplication(grade);
      const a = rand(6, 30 + grade * 5), b = rand(6, 30 + grade * 5);
      const type = pick(['GCD', 'LCM']);
      const correct = type === 'GCD' ? gcd(a, b) : lcm(a, b);
      return { q: `What is the ${type === 'GCD' ? 'Greatest Common Divisor (GCD)' : 'Least Common Multiple (LCM)'} of ${a} and ${b}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.3))), hint: type === 'GCD' ? 'Find the largest number that divides both.' : 'Find the smallest number both divide into.', explanation: `${type}(${a}, ${b}) = ${correct}`, difficulty: 'hard', source: 'Competition Style' };
    },

    factorCount(grade) {
      if (grade < 2) return Gen.multiplication(grade);
      const n = pick([12, 18, 20, 24, 28, 30, 36, 42, 48, 56, 60, 72, 84, 96, 100, 120]);
      let count = 0;
      for (let i = 1; i <= n; i++) if (n % i === 0) count++;
      return { q: `How many factors does ${n} have?`, ...makeOptions(count, 4), hint: 'List all numbers that divide evenly into ' + n + '.', explanation: `The factors of ${n} are: ${Array.from({ length: n }, (_, i) => i + 1).filter(i => n % i === 0).join(', ')} — ${count} factors total.`, difficulty: 'hard', source: 'Competition Style' };
    },

    // ── WORD PROBLEMS ───────────────────────────────────────
    wordProblem(grade) {
      const names = ['Alex', 'Maya', 'Sam', 'Priya', 'Leo', 'Zara', 'Kai', 'Luna', 'Ravi', 'Emma'];
      const items = ['apples', 'stickers', 'marbles', 'books', 'cookies', 'pencils', 'candies', 'toys', 'cards', 'coins'];
      const name = pick(names), item = pick(items);

      // Grade-appropriate templates with increasing complexity
      const easyTemplates = [
        () => {
          const a = rand(5, 20 + grade * 5), b = rand(3, 15 + grade * 3);
          return { q: `${name} has ${a} ${item}. They get ${b} more. How many ${item} does ${name} have now?`, ans: a + b, hint: 'This is an addition problem.', diff: 'easy' };
        },
        () => {
          const a = rand(10, 30 + grade * 5), b = rand(2, a - 1);
          return { q: `${name} had ${a} ${item} and gave away ${b}. How many are left?`, ans: a - b, hint: 'This is a subtraction problem.', diff: 'easy' };
        },
      ];
      const mediumTemplates = [
        () => {
          const bags = rand(3, 8), perBag = rand(4, 12 + grade * 2);
          return { q: `${name} has ${bags} bags with ${perBag} ${item} in each. How many ${item} in total?`, ans: bags * perBag, hint: 'Multiply the number of bags by items per bag.', diff: 'medium' };
        },
        () => {
          const total = rand(2, 8) * rand(3, 8 + grade), friends = rand(2, 6);
          const each = Math.floor(total / friends);
          return { q: `${name} shares ${total} ${item} equally among ${friends} friends. How many does each friend get?`, ans: each, hint: 'Divide the total by the number of friends.', diff: 'medium' };
        },
        () => {
          const price = rand(2, 10) * (grade >= 4 ? pick([1, 0.5, 0.25]) : 1);
          const qty = rand(3, 10);
          const total = price * qty;
          return { q: `Each ${item.slice(0, -1)} costs $${price}. ${name} buys ${qty}. How much does ${name} spend?`, ans: total, hint: 'Multiply the price by the quantity.', diff: 'medium' };
        },
      ];
      const hardTemplates = [
        () => {
          // Two-step: buy and get change
          const price = rand(3, 15), qty = rand(2, 5), paid = price * qty + rand(5, 20);
          const change = paid - price * qty;
          return { q: `${name} buys ${qty} items at $${price} each and pays with $${paid}. How much change does ${name} get?`, ans: change, hint: 'Total cost = price × quantity, then subtract from amount paid.', diff: 'medium' };
        },
        () => {
          // Work backwards
          const final = rand(5, 20), gave = rand(3, 10), got = rand(2, 8);
          const start = final + gave - got;
          return { q: `${name} gave away ${gave} ${item}, then received ${got} more, and now has ${final}. How many did ${name} start with?`, ans: start, hint: 'Work backwards: add what was given away, subtract what was received.', diff: 'hard' };
        },
        () => {
          // Ratio/comparison
          const small = rand(3, 12), mult = rand(2, 4);
          const big = small * mult;
          const total = small + big;
          const n2 = pick(names.filter(n => n !== name));
          return { q: `${name} has ${mult} times as many ${item} as ${n2}. Together they have ${total}. How many does ${n2} have?`, ans: small, hint: `If ${n2} has x, then ${name} has ${mult}x. Total = ${mult + 1}x.`, diff: 'hard' };
        },
        () => {
          // Speed/distance
          const speed = rand(3, grade <= 4 ? 10 : 60);
          const time = rand(2, grade <= 4 ? 5 : 8);
          const distance = speed * time;
          return { q: `${name} travels at ${speed} miles per hour for ${time} hours. How far does ${name} go?`, ans: distance, hint: 'Distance = Speed × Time', diff: 'medium' };
        },
        () => {
          // Age problem
          const age = rand(5, 12), diff2 = rand(20, 30);
          const parentAge = age + diff2;
          const yearsLater = rand(3, 10);
          const sumLater = (age + yearsLater) + (parentAge + yearsLater);
          return { q: `${name} is ${age} years old and their parent is ${parentAge}. What will be the sum of their ages in ${yearsLater} years?`, ans: sumLater, hint: 'Add years to each age, then add them together.', diff: 'hard' };
        },
      ];

      // Middle school (6-8): competition-level multi-step problems
      const middleSchoolTemplates = [
        () => {
          // Work/Rate: Two workers with different rates
          const rateA = rand(4, 12), rateB = rand(4, 12);
          const lcm = (rateA * rateB) / gcd(rateA, rateB);
          const together = Math.round((rateA * rateB) / (rateA + rateB) * 10) / 10;
          if (!Number.isFinite(together) || together !== Math.floor(together)) {
            // Fallback to clean numbers
            const a = rand(2, 5) * 3, b = rand(2, 5) * 2;
            const ans = (a * b) / (a + b);
            if (ans !== Math.floor(ans)) return { q: `${name} can paint a room in ${a} hours. ${pick(['Maya','Sam','Leo','Zara'])} can paint it in ${b} hours. Working together, what fraction of the room do they paint in 1 hour? Express as a percentage (round to nearest whole).`, ans: Math.round((1/a + 1/b) * 100), hint: `Add rates: 1/${a} + 1/${b}`, diff: 'hard' };
            return { q: `${name} can finish a job in ${a} hours and another worker can do it in ${b} hours. How many hours to finish together?`, ans: ans, hint: `Combined rate = 1/${a} + 1/${b}`, diff: 'hard' };
          }
          return { q: `Machine A produces ${rateA} widgets/hour and Machine B produces ${rateB}/hour. They need ${rateA * rateB} widgets. How many hours working together?`, ans: together, hint: 'Combined rate, then divide total by rate.', diff: 'hard' };
        },
        () => {
          // Upstream/Downstream
          const boat = rand(10, 25), current = rand(2, 6);
          const dist = (boat + current) * rand(2, 5);
          const timeDown = dist / (boat + current), timeUp = dist / (boat - current);
          const totalTime = timeDown + timeUp;
          if (totalTime !== Math.floor(totalTime)) return { q: `A boat travels ${dist} km downstream (with current of ${current} km/h) at ${boat + current} km/h, then returns upstream. How many hours for the upstream trip?`, ans: timeUp, hint: 'Upstream speed = boat speed − current speed.', diff: 'hard' };
          return { q: `A boat goes ${dist} km downstream and back. Boat speed = ${boat} km/h, current = ${current} km/h. Total round trip time?`, ans: totalTime, hint: 'Downstream speed ≠ upstream speed.', diff: 'hard' };
        },
        () => {
          // Mixture problem
          const pureA = rand(10, 40), pureB = rand(50, 90);
          const qtyA = rand(2, 10), qtyB = rand(2, 10);
          const mixture = Math.round((pureA * qtyA + pureB * qtyB) / (qtyA + qtyB));
          return { q: `${name} mixes ${qtyA} liters of ${pureA}% salt solution with ${qtyB} liters of ${pureB}% salt solution. What is the concentration of the mixture (nearest whole %)?`, ans: mixture, hint: 'Total salt ÷ total volume × 100.', diff: 'hard' };
        },
        () => {
          // Profit/Loss chain
          const cost = rand(5, 20) * 10;
          const markup = pick([20, 25, 30, 40, 50]);
          const discount = pick([10, 15, 20, 25]);
          const marked = cost * (1 + markup / 100);
          const selling = Math.round(marked * (1 - discount / 100));
          const profitPct = Math.round((selling - cost) / cost * 100);
          return { q: `A shopkeeper buys an item for $${cost}, marks it up ${markup}%, then offers ${discount}% discount. What is the profit percentage?`, ans: profitPct, hint: 'Calculate marked price, then selling price, then profit %.', diff: 'hard' };
        },
        () => {
          // Meeting trains from opposite directions
          const dist = rand(10, 40) * 10;
          const speedA = rand(40, 80), speedB = rand(40, 80);
          const meetTime = dist / (speedA + speedB);
          const distA = Math.round(speedA * meetTime);
          return { q: `Two trains start ${dist} km apart heading toward each other at ${speedA} km/h and ${speedB} km/h. How far from the first train's station do they meet?`, ans: distA, hint: 'Find meeting time first, then distance = speed × time.', diff: 'hard' };
        },
        () => {
          // Investment/Partnership
          const investA = rand(2, 8) * 1000, investB = rand(2, 8) * 1000;
          const monthsA = rand(6, 12), monthsB = rand(4, 12);
          const totalProfit = rand(5, 20) * 100;
          const ratioA = investA * monthsA, ratioB = investB * monthsB;
          const shareA = Math.round(totalProfit * ratioA / (ratioA + ratioB));
          return { q: `${name} invests $${investA} for ${monthsA} months. A partner invests $${investB} for ${monthsB} months. They earn $${totalProfit} profit. What is ${name}'s share?`, ans: shareA, hint: 'Profit ratio = investment × time for each person.', diff: 'hard' };
        },
        () => {
          // Inclusion-Exclusion
          const total = rand(30, 60);
          const a = rand(Math.floor(total * 0.4), Math.floor(total * 0.8));
          const b = rand(Math.floor(total * 0.3), Math.floor(total * 0.7));
          const neither = rand(2, Math.floor(total * 0.15));
          const both = a + b - (total - neither);
          if (both < 1 || both > Math.min(a, b)) return { q: `In a class of 40 students, 25 play soccer, 20 play basketball, and 5 play neither. How many play both?`, ans: 10, hint: 'Use inclusion-exclusion: A + B − Both = Total − Neither.', diff: 'hard' };
          return { q: `In a group of ${total}, ${a} like pizza, ${b} like burgers, and ${neither} like neither. How many like both?`, ans: both, hint: 'A + B − Both = Total − Neither.', diff: 'hard' };
        },
        () => {
          // Consecutive numbers with product/sum constraint
          const start = rand(5, 20);
          const n = 3;
          const sum = start * n + n * (n - 1) / 2;
          const product = start * (start + 2);
          return { q: `Three consecutive integers sum to ${sum}. What is the product of the smallest and largest?`, ans: product, hint: 'Middle number = sum ÷ 3.', diff: 'hard' };
        },
        () => {
          // Compound percentage change
          const original = rand(5, 20) * 100;
          const inc = pick([10, 15, 20, 25]);
          const dec = pick([10, 15, 20, 25]);
          const final = Math.round(original * (1 + inc / 100) * (1 - dec / 100));
          const netChange = final - original;
          return { q: `A stock worth $${original} rises ${inc}% then falls ${dec}%. What is the net change in dollars?`, ans: netChange, hint: 'Apply increases/decreases sequentially, not by adding percentages.', diff: 'hard' };
        },
        () => {
          // Head start / catch up
          const slowSpeed = rand(30, 50), fastSpeed = slowSpeed + rand(10, 30);
          const headStart = rand(1, 3);
          const headDist = slowSpeed * headStart;
          const catchTime = headDist / (fastSpeed - slowSpeed);
          if (catchTime !== Math.floor(catchTime)) return { q: `Car A leaves at ${slowSpeed} mph. ${rand(1,3)} hours later, Car B follows at ${fastSpeed} mph. How far ahead is Car A when Car B starts?`, ans: headDist, hint: 'Distance = Speed × Time.', diff: 'medium' };
          return { q: `Car A leaves at ${slowSpeed} mph. ${headStart} hour(s) later, Car B leaves at ${fastSpeed} mph in the same direction. How many hours after Car B leaves does it catch Car A?`, ans: catchTime, hint: 'Car B must close the gap. Gap ÷ speed difference.', diff: 'hard' };
        },
        () => {
          // Weighted average
          const n1 = rand(15, 30), avg1 = rand(60, 85);
          const n2 = rand(10, 25), avg2 = rand(70, 95);
          const combined = Math.round((n1 * avg1 + n2 * avg2) / (n1 + n2));
          return { q: `Section A has ${n1} students averaging ${avg1} on a test. Section B has ${n2} students averaging ${avg2}. What is the combined average (rounded)?`, ans: combined, hint: 'Weighted average: (n₁×avg₁ + n₂×avg₂) ÷ (n₁+n₂).', diff: 'hard' };
        },
        () => {
          // Clock angle
          const hr = rand(1, 12), min = pick([0, 15, 30, 45]);
          const hourAngle = hr * 30 + min * 0.5;
          const minAngle = min * 6;
          let angle = Math.abs(hourAngle - minAngle);
          if (angle > 180) angle = 360 - angle;
          return { q: `What is the angle between the clock hands at ${hr}:${min < 10 ? '0' + min : min}?`, ans: angle, hint: 'Hour hand: 0.5°/min. Minute hand: 6°/min.', diff: 'hard' };
        },
      ];

      // Pick templates based on grade
      let templates;
      if (grade <= 2) {
        templates = [...easyTemplates, ...mediumTemplates.slice(0, 1)];
      } else if (grade <= 4) {
        templates = [...mediumTemplates, ...hardTemplates.slice(0, 3)];
      } else if (grade <= 5) {
        templates = [...hardTemplates, ...mediumTemplates.slice(0, 1)];
      } else {
        // Grades 6-8: competition-level only
        templates = middleSchoolTemplates;
      }

      const t = pick(templates)();
      const spread = Math.max(3, Math.floor(t.ans * 0.2));
      return { q: t.q, ...makeOptions(t.ans, spread), hint: t.hint, explanation: `The answer is ${t.ans}.`, difficulty: t.diff || 'medium', source: 'Word Problem' };
    },

    ageWordProblem(grade) {
      if (grade < 2) return Gen.wordProblem(grade);
      const names = ['Alex', 'Maya', 'Sam', 'Priya'];
      const n1 = pick(names), n2 = pick(names.filter(n => n !== n1));
      const age1 = rand(8, 15), diff = rand(2, 8);
      const age2 = age1 + diff;
      const yearsLater = rand(3, 10);
      const correct = age1 + age2 + 2 * yearsLater;
      return { q: `${n1} is ${age1} and ${n2} is ${age2}. What will be the sum of their ages in ${yearsLater} years?`, ...makeOptions(correct, 8), hint: 'Add the years to each person\'s age, then add them together.', explanation: `In ${yearsLater} years: ${n1} = ${age1 + yearsLater}, ${n2} = ${age2 + yearsLater}. Sum = ${correct}`, difficulty: 'medium', source: 'Competition Style' };
    },

    // ── ALGEBRA (Upper Grades) ──────────────────────────────
    simpleEquation(grade) {
      if (grade < 3) return Gen.missingNumber(grade);
      const a = rand(2, 8), b = rand(1, 15), c = rand(10, 50);
      const x = (c - b) / a;
      if (!Number.isInteger(x) || x < 0) return Gen.missingNumber(grade);
      return { q: `Solve for x: ${a}x + ${b} = ${c}`, ...makeOptions(x, Math.max(3, Math.floor(x * 0.3))), hint: `Subtract ${b} from both sides, then divide by ${a}.`, explanation: `${a}x + ${b} = ${c} → ${a}x = ${c - b} → x = ${x}`, difficulty: 'hard', source: 'Competition Style' };
    },

    inequality(grade) {
      if (grade < 4) return Gen.simpleEquation(grade);
      const a = rand(2, 6), b = rand(1, 10), c = rand(15, 40);
      const x = Math.floor((c - b) / a);
      return { q: `What is the largest whole number x such that ${a}x + ${b} ≤ ${c}?`, ...makeOptions(x, 3), hint: `Solve ${a}x + ${b} = ${c} and round down.`, explanation: `${a}x ≤ ${c - b} → x ≤ ${(c - b) / a}. Largest integer = ${x}`, difficulty: 'hard', source: 'Competition Style' };
    },

    // ── COMBINATORICS & PROBABILITY ─────────────────────────
    countingPrinciple(grade) {
      if (grade < 2) return Gen.wordProblem(grade);
      const a = rand(2, 6), b = rand(2, 6);
      const itemA = pick(['shirts', 'tops', 'hats']), itemB = pick(['pants', 'shorts', 'shoes']);
      const correct = a * b;
      return { q: `${pick(['Alex', 'Maya', 'Sam'])} has ${a} ${itemA} and ${b} ${itemB}. How many different outfits can be made?`, ...makeOptions(correct, Math.max(4, Math.floor(correct * 0.3))), hint: 'Multiply the choices together.', explanation: `${a} × ${b} = ${correct} outfits`, difficulty: 'medium', source: 'Competition Style' };
    },

    simpleProbability(grade) {
      if (grade < 3) return Gen.countingPrinciple(grade);
      const total = pick([6, 8, 10, 12, 20]);
      const favorable = rand(1, total - 1);
      const g = gcd(favorable, total);
      const simpNum = favorable / g, simpDen = total / g;
      const display = `${simpNum}/${simpDen}`;
      return { q: `A bag has ${total} balls. ${favorable} are red. What is the probability of picking a red ball?`, ...makeStringOptions(display, [`${favorable + 1}/${total}`, `${favorable}/${total + 1}`, `${total}/${favorable}`].filter(x => x !== display)), hint: 'Probability = favorable outcomes / total outcomes', explanation: `P(red) = ${favorable}/${total} = ${display}`, difficulty: 'medium', source: 'Generated' };
    },

    permutationCombo(grade) {
      if (grade < 4) return Gen.countingPrinciple(grade);
      const n = rand(4, 8), r = rand(2, Math.min(4, n));
      const type = pick(['arrangement', 'selection']);
      if (type === 'arrangement') {
        let correct = 1;
        for (let i = 0; i < r; i++) correct *= (n - i);
        return { q: `How many ways can you arrange ${r} items from ${n} different items?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.2))), hint: `For the first spot you have ${n} choices, then ${n - 1}, etc.`, explanation: `P(${n},${r}) = ${correct}`, difficulty: 'hard', source: 'Competition Style' };
      } else {
        const correct = factorial(n) / (factorial(r) * factorial(n - r));
        return { q: `How many ways can you choose ${r} items from ${n} items (order doesn't matter)?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.3))), hint: 'Use combinations: n! / (r! × (n-r)!)', explanation: `C(${n},${r}) = ${correct}`, difficulty: 'hard', source: 'Competition Style' };
      }
    },

    // ── RATIOS & PROPORTIONS ────────────────────────────────
    ratio(grade) {
      if (grade < 2) return Gen.multiplication(grade);
      const a = rand(2, 8), b = rand(2, 8);
      const mult = rand(2, 6);
      const totalA = a * mult, totalB = b * mult;
      return { q: `The ratio of red to blue marbles is ${a}:${b}. If there are ${totalA} red marbles, how many blue marbles are there?`, ...makeOptions(totalB, Math.max(4, Math.floor(totalB * 0.3))), hint: `Find the multiplier: ${totalA} ÷ ${a} = ${mult}. Then multiply ${b} by that.`, explanation: `${totalA} ÷ ${a} = ${mult}, so blue = ${b} × ${mult} = ${totalB}`, difficulty: 'medium', source: 'Generated' };
    },

    proportion(grade) {
      if (grade < 3) return Gen.ratio(grade);
      const a = rand(2, 10), b = rand(2, 10), c = rand(2, 10);
      const correct = (b * c) / a;
      if (!Number.isInteger(correct)) return Gen.ratio(grade);
      return { q: `If ${a} workers can paint a room in ${b} hours, how many hours will ${c} workers take? (Assume equal speed)`, ...makeOptions(Math.round(a * b / c), Math.max(3, 5)), hint: 'Total work = workers × hours. Keep total work the same.', explanation: `Total work = ${a} × ${b} = ${a * b} worker-hours. Time = ${a * b} ÷ ${c} = ${Math.round(a * b / c)} hours`, difficulty: 'hard', source: 'Competition Style' };
    },

    // ── MONEY & MEASUREMENT ─────────────────────────────────
    moneyProblem(grade) {
      const coins = [1, 5, 10, 25];
      const numCoins = rand(3, 6 + grade);
      const selected = Array.from({ length: numCoins }, () => pick(coins));
      const correct = selected.reduce((s, c) => s + c, 0);
      const coinNames = { 1: 'penny', 5: 'nickel', 10: 'dime', 25: 'quarter' };
      const counts = {};
      selected.forEach(c => { counts[coinNames[c]] = (counts[coinNames[c]] || 0) + 1; });
      const desc = Object.entries(counts).map(([name, ct]) => `${ct} ${ct > 1 ? name + (name === 'penny' ? '' : 's').replace('pennys', 'pennies') : name}`).join(', ');
      return { q: `You have ${desc}. How many cents is that in total?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.15))), hint: 'Add up the value of each coin.', explanation: `Total = ${correct} cents`, difficulty: 'medium', source: 'Generated' };
    },

    timeProblem(grade) {
      const startH = rand(7, 11), startM = rand(0, 3) * 15;
      const durH = rand(1, 4), durM = pick([0, 15, 30, 45]);
      let endH = startH + durH, endM = startM + durM;
      if (endM >= 60) { endH++; endM -= 60; }
      const ampm = endH >= 12 ? 'PM' : 'AM';
      const displayEnd = `${endH > 12 ? endH - 12 : endH}:${String(endM).padStart(2, '0')} ${ampm}`;
      return { q: `A movie starts at ${startH}:${String(startM).padStart(2, '0')} AM and lasts ${durH} hour${durH > 1 ? 's' : ''} and ${durM} minutes. What time does it end?`, ...makeStringOptions(displayEnd, [`${endH > 12 ? endH - 12 : endH}:${String((endM + 15) % 60).padStart(2, '0')} ${ampm}`, `${(endH > 12 ? endH - 12 : endH) + 1}:${String(endM).padStart(2, '0')} ${ampm}`, `${endH > 12 ? endH - 12 : endH}:${String((endM + 30) % 60).padStart(2, '0')} ${ampm}`]), hint: 'Add the hours first, then the minutes.', explanation: `${startH}:${String(startM).padStart(2, '0')} + ${durH}h ${durM}m = ${displayEnd}`, difficulty: 'medium', source: 'Generated' };
    },

    // ── MEAN / MEDIAN / MODE ────────────────────────────────
    averageProblem(grade) {
      if (grade < 3) return Gen.wordProblem(grade);
      const count = rand(4, 7);
      const nums = Array.from({ length: count }, () => rand(50, 100));
      const sum = nums.reduce((a, b) => a + b, 0);
      const correct = Math.round(sum / count);
      const type = pick(['mean', 'median']);
      if (type === 'median') {
        const sorted = [...nums].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 1 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
        return { q: `Find the median of: ${nums.join(', ')}`, ...makeOptions(median, 10), hint: 'Sort the numbers and find the middle value.', explanation: `Sorted: ${sorted.join(', ')}. Median = ${median}`, difficulty: 'medium', source: 'Generated' };
      }
      return { q: `What is the average (mean) of: ${nums.join(', ')}?`, ...makeOptions(correct, 8), hint: 'Add all numbers and divide by how many there are.', explanation: `(${nums.join(' + ')}) ÷ ${count} = ${sum} ÷ ${count} ≈ ${correct}`, difficulty: 'medium', source: 'Generated' };
    },

    // ── COMPETITION OLYMPIAD STYLE ──────────────────────────
    magicSquare(grade) {
      if (grade < 2) return Gen.missingNumber(grade);
      const base = rand(1, 5);
      const grid = [
        base + 2, base + 7, base + 6,
        base + 9, base + 5, base + 1,
        base + 4, base + 3, base + 8
      ];
      const magicSum = grid[0] + grid[1] + grid[2];
      const hideIdx = rand(0, 8);
      const hidden = grid[hideIdx];
      const row = Math.floor(hideIdx / 3);
      const rowNums = [grid[row * 3], grid[row * 3 + 1], grid[row * 3 + 2]].filter((_, i) => row * 3 + i !== hideIdx);
      return { q: `In a magic square where each row, column, and diagonal sums to ${magicSum}, find the missing number: Row contains ${rowNums[0]}, ?, ${rowNums[1]}`, ...makeOptions(hidden, 5), hint: `The row must add up to ${magicSum}.`, explanation: `${magicSum} − ${rowNums[0]} − ${rowNums[1]} = ${hidden}`, difficulty: 'hard', source: 'Olympiad Style' };
    },

    logicPuzzle(grade) {
      if (grade < 2) return Gen.missingNumber(grade);
      const puzzles = [
        () => { const n = rand(2, 5); const correct = n * (n + 1) / 2; return { q: `What is 1 + 2 + 3 + ... + ${n * 2}?`, ans: (n * 2) * (n * 2 + 1) / 2, hint: 'Use the formula: n(n+1)/2' }; },
        () => { const a = rand(10, 99); return { q: `How many two-digit numbers are there between 10 and ${a} (inclusive)?`, ans: a - 10 + 1, hint: 'Count: last - first + 1' }; },
        () => { const n = rand(3, 8); return { q: `A polygon has ${n} sides. How many diagonals does it have?`, ans: n * (n - 3) / 2, hint: 'Formula: n(n-3)/2' }; },
        () => { const people = rand(3, 6); return { q: `${people} people shake hands with each other once. How many handshakes total?`, ans: people * (people - 1) / 2, hint: 'Each pair shakes hands once. Count the pairs!' }; },
      ];
      const p = pick(grade <= 3 ? puzzles.slice(0, 2) : puzzles)();
      if (!Number.isInteger(p.ans) || p.ans < 0) return Gen.missingNumber(grade);
      return { q: p.q, ...makeOptions(p.ans, Math.max(4, Math.floor(p.ans * 0.25))), hint: p.hint, explanation: `The answer is ${p.ans}.`, difficulty: 'hard', source: 'Olympiad Style' };
    },

    // ── NEGATIVE NUMBERS ────────────────────────────────────
    negativeNumbers(grade) {
      if (grade < 4) return Gen.subtraction(grade);
      const a = rand(-20, 20), b = rand(-20, 20);
      const op = pick(['+', '−', '×']);
      let correct, qText;
      if (op === '+') { correct = a + b; qText = `(${a}) + (${b})`; }
      else if (op === '−') { correct = a - b; qText = `(${a}) − (${b})`; }
      else { correct = a * b; qText = `(${a}) × (${b})`; }
      return { q: `What is ${qText}?`, ...makeOptions(correct, Math.max(5, Math.abs(correct) + 5)), hint: 'Remember the rules for negative numbers!', explanation: `${qText} = ${correct}`, difficulty: 'medium', source: 'Generated' };
    },

    // ── PLACE VALUE ─────────────────────────────────────────
    placeValue(grade) {
      const digits = grade <= 3 ? 4 : grade <= 5 ? 6 : 8;
      const n = rand(Math.pow(10, digits - 1), Math.pow(10, digits) - 1);
      const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten-thousands', 'hundred-thousands', 'millions'];
      const placeIdx = rand(0, Math.min(digits - 1, places.length - 1));
      const correct = Math.floor(n / Math.pow(10, placeIdx)) % 10;
      return { q: `What digit is in the ${places[placeIdx]} place of ${n.toLocaleString()}?`, ...makeOptions(correct, 4), hint: `Count from the right: ${places.slice(0, placeIdx + 1).join(', ')}`, explanation: `The ${places[placeIdx]} digit of ${n.toLocaleString()} is ${correct}.`, difficulty: grade <= 2 ? 'easy' : 'medium', source: 'Generated' };
    },

    // ── ROUNDING ────────────────────────────────────────────
    rounding(grade) {
      const n = rand(100, 10000);
      const roundTo = pick([10, 100, 1000]);
      const correct = Math.round(n / roundTo) * roundTo;
      return { q: `Round ${n.toLocaleString()} to the nearest ${roundTo.toLocaleString()}.`, ...makeOptions(correct, roundTo * 2), hint: `Look at the digit to the right of the ${roundTo.toLocaleString()}s place.`, explanation: `${n.toLocaleString()} rounded to the nearest ${roundTo.toLocaleString()} is ${correct.toLocaleString()}.`, difficulty: 'medium', source: 'Generated' };
    },

    // ── COORDINATE GEOMETRY ─────────────────────────────────
    coordinateDistance(grade) {
      if (grade < 4) return Gen.area(grade);
      const x1 = rand(0, 10), y1 = rand(0, 10), x2 = rand(0, 10), y2 = rand(0, 10);
      const dx = x2 - x1, dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const roundDist = +dist.toFixed(1);
      if (dx === 0 && dy === 0) return Gen.area(grade);
      const { options, answer } = makeOptions(Math.round(roundDist * 10), Math.max(10, 20));
      return { q: `What is the distance between points (${x1}, ${y1}) and (${x2}, ${y2})? (Round to 1 decimal)`, options: options.map(v => (v / 10).toFixed(1)), answer, hint: 'Use the distance formula: √((x₂-x₁)² + (y₂-y₁)²)', explanation: `d = √((${x2}-${x1})² + (${y2}-${y1})²) = √(${dx * dx} + ${dy * dy}) ≈ ${roundDist}`, difficulty: 'hard', source: 'Competition Style' };
    },

    // ── UNIT CONVERSION (FastBridge) ────────────────────────
    unitConversion(grade) {
      const conversions = grade <= 3 ? [
        { from: 'feet', to: 'inches', factor: 12, unit: rand(1, 5) },
        { from: 'yards', to: 'feet', factor: 3, unit: rand(1, 8) },
        { from: 'hours', to: 'minutes', factor: 60, unit: rand(1, 5) },
        { from: 'minutes', to: 'seconds', factor: 60, unit: rand(1, 5) },
      ] : grade <= 5 ? [
        { from: 'feet', to: 'inches', factor: 12, unit: rand(2, 10) },
        { from: 'miles', to: 'feet', factor: 5280, unit: rand(1, 3) },
        { from: 'kg', to: 'grams', factor: 1000, unit: rand(1, 8) },
        { from: 'liters', to: 'mL', factor: 1000, unit: rand(1, 5) },
        { from: 'meters', to: 'cm', factor: 100, unit: rand(1, 10) },
        { from: 'km', to: 'meters', factor: 1000, unit: rand(1, 5) },
        { from: 'gallons', to: 'quarts', factor: 4, unit: rand(1, 8) },
        { from: 'pounds', to: 'ounces', factor: 16, unit: rand(1, 6) },
      ] : [
        { from: 'miles', to: 'feet', factor: 5280, unit: rand(1, 5) },
        { from: 'km', to: 'meters', factor: 1000, unit: rand(1, 10) },
        { from: 'kg', to: 'grams', factor: 1000, unit: rand(1, 15) },
        { from: 'liters', to: 'mL', factor: 1000, unit: rand(1, 8) },
        { from: 'tons', to: 'pounds', factor: 2000, unit: rand(1, 5) },
        { from: 'cups', to: 'fluid ounces', factor: 8, unit: rand(1, 10) },
      ];
      const c = pick(conversions);
      const correct = c.unit * c.factor;
      return { q: `How many ${c.to} are in ${c.unit} ${c.from}?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.3))), hint: `1 ${c.from.replace(/s$/, '')} = ${c.factor} ${c.to}`, explanation: `${c.unit} × ${c.factor} = ${correct.toLocaleString()} ${c.to}`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'FastBridge Prep' };
    },

    // ── ESTIMATION (FastBridge) ─────────────────────────────
    estimation(grade) {
      const types = grade <= 3 ? [
        () => { const a = rand(10, 99), b = rand(10, 99); const correct = Math.round(a / 10) * 10 + Math.round(b / 10) * 10; return { q: `Estimate ${a} + ${b} by rounding to the nearest 10.`, correct, hint: `Round each number to the nearest 10 first.`, spread: 20 }; },
        () => { const a = rand(100, 999), b = rand(100, 999); const correct = Math.round(a / 100) * 100 + Math.round(b / 100) * 100; return { q: `Estimate ${a} + ${b} by rounding to the nearest 100.`, correct, hint: `Round each to the nearest 100.`, spread: 200 }; },
      ] : grade <= 5 ? [
        () => { const a = rand(100, 999), b = rand(10, 99); const correct = Math.round(a / 100) * 100 * Math.round(b / 10) * 10; const better = Math.round(a * b / 1000) * 1000; return { q: `Estimate ${a} × ${b} by rounding.`, correct: better, hint: `Round ${a} to the nearest 100 and ${b} to the nearest 10.`, spread: Math.max(500, Math.floor(better * 0.3)) }; },
        () => { const a = rand(1000, 9999), b = rand(100, 999); const correct = Math.round((a + b) / 1000) * 1000; return { q: `Estimate ${a.toLocaleString()} + ${b} by rounding to the nearest 1,000.`, correct, hint: `Round both to the nearest 1,000.`, spread: 2000 }; },
        () => { const a = rand(2, 8), b = rand(2, 8); const n = a * a + rand(-3, 3); const correct = a; return { q: `Estimate √${n} to the nearest whole number.`, correct, hint: `${a}² = ${a*a}`, spread: 3 }; },
      ] : [
        () => { const a = rand(100, 500), b = rand(10, 50); const correct = Math.round(a * b / 1000) * 1000; return { q: `Which is the best estimate for ${a} × ${b}?`, correct, hint: 'Round each factor then multiply.', spread: Math.max(1000, Math.floor(correct * 0.4)) }; },
        () => { const n = rand(10, 99); const sq = n * n; const correct = n; return { q: `Estimate √${sq} without a calculator.`, correct, hint: `Think: what number × itself ≈ ${sq}?`, spread: 5 }; },
        () => { const nums = [rand(1,9), rand(1,9)]; const frac = `${nums[0]}/${nums[0]+nums[1]}`; const val = nums[0]/(nums[0]+nums[1]); const closest = val < 0.25 ? '0' : val < 0.75 ? '1/2' : '1'; return { q: `Is ${frac} closest to 0, 1/2, or 1?`, ...makeStringOptions(closest, ['0', '1/2', '1', '2']), hint: `${nums[0]} ÷ ${nums[0]+nums[1]} ≈ ${val.toFixed(2)}`, explanation: `${frac} ≈ ${val.toFixed(2)}, closest to ${closest}`, difficulty: 'medium', source: 'FastBridge Prep' }; },
      ];
      const gen = pick(types)();
      if (gen.options) return gen; // already formatted (like fraction estimation)
      return { q: gen.q, ...makeOptions(gen.correct, gen.spread), hint: gen.hint, explanation: `The answer is ${gen.correct.toLocaleString()}.`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'FastBridge Prep' };
    },

    // ── DATA / STATISTICS TABLE (FastBridge) ────────────────
    dataTable(grade) {
      const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'James', 'Sophia', 'Mason'];
      const subjects = ['Math', 'Science', 'Reading', 'History', 'Art'];
      const activities = ['soccer', 'basketball', 'swimming', 'baseball', 'tennis'];
      const items = ['apples', 'oranges', 'bananas', 'grapes', 'strawberries'];

      const types = [
        () => {
          const n = rand(3, 5);
          const picked = shuffle(names).slice(0, n);
          const values = picked.map(() => rand(2, grade <= 3 ? 15 : 30));
          const total = values.reduce((a, b) => a + b, 0);
          const desc = picked.map((p, i) => `${p}: ${values[i]}`).join(', ');
          const item = pick(items);
          return { q: `A table shows ${item} collected: ${desc}. What is the total?`, correct: total, hint: 'Add all the values.', explanation: `${values.join(' + ')} = ${total}` };
        },
        () => {
          const n = rand(3, 5);
          const picked = shuffle(names).slice(0, n);
          const values = picked.map(() => rand(5, grade <= 3 ? 20 : 50));
          const maxVal = Math.max(...values);
          const minVal = Math.min(...values);
          const diff = maxVal - minVal;
          const maxName = picked[values.indexOf(maxVal)];
          const minName = picked[values.indexOf(minVal)];
          const item = pick(['books read', 'points scored', 'stickers collected', 'laps completed']);
          const desc = picked.map((p, i) => `${p}: ${values[i]}`).join(', ');
          return { q: `${item}: ${desc}. How many more does ${maxName} have than ${minName}?`, correct: diff, hint: `Find the highest and lowest, then subtract.`, explanation: `${maxVal} − ${minVal} = ${diff}` };
        },
        () => {
          const n = rand(4, 6);
          const picked = shuffle(subjects).slice(0, Math.min(n, subjects.length));
          const values = picked.map(() => rand(3, 25));
          const total = values.reduce((a, b) => a + b, 0);
          const desc = picked.map((s, i) => `${s}: ${values[i]}`).join(', ');
          return { q: `Students' favorite subjects: ${desc}. How many students were surveyed?`, correct: total, hint: 'Add all students together.', explanation: `${values.join(' + ')} = ${total}` };
        },
      ];
      const gen = pick(types)();
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(3, Math.floor(gen.correct * 0.25))), hint: gen.hint, explanation: gen.explanation, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'FastBridge Prep' };
    },

    // ── MEAN / MEDIAN / MODE / RANGE (FastBridge) ───────────
    meanMedianModeRange(grade) {
      const n = grade <= 4 ? rand(3, 5) : rand(5, 7);
      const values = Array.from({ length: n }, () => rand(1, grade <= 3 ? 20 : grade <= 5 ? 50 : 100));
      // Occasionally add a repeated value for mode
      if (Math.random() > 0.5 && values.length >= 3) { values[values.length - 1] = values[0]; }
      const sorted = [...values].sort((a, b) => a - b);
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = +(sum / values.length).toFixed(1);
      const median = values.length % 2 === 1 ? sorted[Math.floor(values.length / 2)] : +((sorted[values.length / 2 - 1] + sorted[values.length / 2]) / 2).toFixed(1);
      const range = sorted[sorted.length - 1] - sorted[0];
      const freq = {};
      values.forEach(v => freq[v] = (freq[v] || 0) + 1);
      const maxFreq = Math.max(...Object.values(freq));
      const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);

      const type = pick(grade <= 3 ? ['range', 'median'] : ['mean', 'median', 'mode', 'range']);
      const vStr = values.join(', ');

      if (type === 'mean') {
        const correct = Number.isInteger(mean) ? mean : mean;
        return { q: `Find the mean (average) of: ${vStr}`, ...makeOptions(Math.round(mean), Math.max(5, Math.floor(mean * 0.3))), hint: `Add all numbers and divide by ${values.length}.`, explanation: `(${values.join(' + ')}) ÷ ${values.length} = ${mean}`, difficulty: 'medium', source: 'FastBridge Prep' };
      } else if (type === 'median') {
        return { q: `Find the median of: ${vStr}`, ...makeOptions(median, Math.max(3, Math.floor(median * 0.3))), hint: 'Sort the numbers, find the middle value.', explanation: `Sorted: ${sorted.join(', ')}. Median = ${median}`, difficulty: 'medium', source: 'FastBridge Prep' };
      } else if (type === 'mode') {
        if (maxFreq === 1) return Gen.meanMedianModeRange(grade); // retry if no mode
        return { q: `Find the mode of: ${vStr}`, ...makeOptions(modes[0], Math.max(3, 10)), hint: 'The mode is the number that appears most often.', explanation: `${modes[0]} appears ${maxFreq} times.`, difficulty: 'easy', source: 'FastBridge Prep' };
      } else {
        return { q: `Find the range of: ${vStr}`, ...makeOptions(range, Math.max(3, Math.floor(range * 0.3))), hint: 'Range = highest − lowest.', explanation: `${sorted[sorted.length - 1]} − ${sorted[0]} = ${range}`, difficulty: 'easy', source: 'FastBridge Prep' };
      }
    },

    // ── FRACTION MULTIPLY / DIVIDE (FastBridge) ─────────────
    fractionMultDiv(grade) {
      if (grade < 2) return Gen.fractionAddition(grade);
      const op = pick(['multiply', 'divide']);
      const a_n = rand(1, 6), a_d = rand(2, 8);
      let b_n = rand(1, 6), b_d = rand(2, 8);
      if (op === 'divide' && b_n === 0) b_n = 1;

      let res_n, res_d, qText;
      if (op === 'multiply') {
        res_n = a_n * b_n;
        res_d = a_d * b_d;
        qText = `${a_n}/${a_d} × ${b_n}/${b_d}`;
      } else {
        res_n = a_n * b_d;
        res_d = a_d * b_n;
        qText = `${a_n}/${a_d} ÷ ${b_n}/${b_d}`;
      }
      const g = gcd(res_n, res_d);
      const sn = res_n / g, sd = res_d / g;
      const correct = `${sn}/${sd}`;
      const distractors = [`${sn + 1}/${sd}`, `${sn}/${sd + 1}`, `${res_n}/${res_d}`, `${sd}/${sn}`].filter(d => d !== correct);
      return { q: `What is ${qText}? (Simplify)`, ...makeStringOptions(correct, distractors), hint: op === 'multiply' ? 'Multiply numerators, multiply denominators.' : 'Flip the second fraction and multiply.', explanation: `${qText} = ${res_n}/${res_d} = ${correct}`, difficulty: 'medium', source: 'FastBridge Prep' };
    },

    // ── PERCENT CHANGE (FastBridge) ─────────────────────────
    percentChange(grade) {
      if (grade < 3) return Gen.percentages(grade);
      const types = [
        () => { const orig = rand(20, 200) * 5; const pct = pick([10, 15, 20, 25, 30, 50]); const increase = orig * pct / 100; const newPrice = orig + increase; return { q: `A $${orig} item's price increased by ${pct}%. New price?`, correct: newPrice, hint: `Find ${pct}% of $${orig}, then add.`, explanation: `${pct}% of ${orig} = ${increase}. New: $${orig} + $${increase} = $${newPrice}` }; },
        () => { const orig = rand(20, 200) * 5; const pct = pick([10, 15, 20, 25, 30, 40, 50]); const discount = orig * pct / 100; const salePrice = orig - discount; return { q: `A $${orig} item is ${pct}% off. Sale price?`, correct: salePrice, hint: `Find ${pct}% of $${orig}, then subtract.`, explanation: `${pct}% of ${orig} = ${discount}. Sale: $${orig} − $${discount} = $${salePrice}` }; },
        () => { const bill = rand(20, 80) * 1; const tipPct = pick([15, 18, 20, 25]); const tip = +(bill * tipPct / 100).toFixed(0); return { q: `Tip of ${tipPct}% on a $${bill} bill?`, correct: tip, hint: `Multiply $${bill} by ${tipPct / 100}.`, explanation: `${tipPct}% of $${bill} = $${tip}` }; },
        () => { const orig = rand(40, 200); const newVal = orig + rand(10, 60); const change = newVal - orig; const pct = Math.round(change / orig * 100); return { q: `Price went from $${orig} to $${newVal}. Percent increase?`, correct: pct, hint: `Change ÷ original × 100`, explanation: `(${newVal} − ${orig}) ÷ ${orig} × 100 = ${pct}%` }; },
      ];
      const gen = pick(types)();
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(5, Math.floor(gen.correct * 0.2))), hint: gen.hint, explanation: gen.explanation, difficulty: 'medium', source: 'FastBridge Prep' };
    },

    // ── COORDINATE PLANE (FastBridge / HCP) ─────────────────
    coordinatePlane(grade) {
      if (grade < 3) return Gen.area(grade);
      const types = [
        () => {
          const x = rand(-10, 10), y = rand(-10, 10);
          let quadrant;
          if (x > 0 && y > 0) quadrant = 'I';
          else if (x < 0 && y > 0) quadrant = 'II';
          else if (x < 0 && y < 0) quadrant = 'III';
          else if (x > 0 && y < 0) quadrant = 'IV';
          else return Gen.coordinatePlane(grade); // on axis, retry
          return { q: `Which quadrant contains the point (${x}, ${y})?`, ...makeStringOptions(quadrant, ['I', 'II', 'III', 'IV']), hint: 'I: (+,+) II: (−,+) III: (−,−) IV: (+,−)', explanation: `(${x}, ${y}) → Quadrant ${quadrant}`, difficulty: 'medium', source: 'FastBridge Prep' };
        },
        () => {
          const x = rand(1, 8), y = rand(1, 8);
          const axis = pick(['x', 'y']);
          const rx = axis === 'x' ? x : -x;
          const ry = axis === 'x' ? -y : y;
          const correct = `(${rx}, ${ry})`;
          const distractors = [`(${-rx}, ${ry})`, `(${rx}, ${-ry})`, `(${-x}, ${-y})`];
          return { q: `Reflect (${x}, ${y}) over the ${axis}-axis.`, ...makeStringOptions(correct, distractors), hint: axis === 'x' ? 'Flip the y-coordinate sign.' : 'Flip the x-coordinate sign.', explanation: `Reflecting over ${axis}-axis: (${x}, ${y}) → ${correct}`, difficulty: 'medium', source: 'FastBridge Prep' };
        },
        () => {
          const x1 = rand(0, 8), y1 = rand(0, 8), x2 = rand(0, 8), y2 = rand(0, 8);
          if (x1 === x2) return Gen.coordinatePlane(grade);
          const mx = +((x1 + x2) / 2).toFixed(1), my = +((y1 + y2) / 2).toFixed(1);
          const correct = `(${mx}, ${my})`;
          const distractors = [`(${mx + 1}, ${my})`, `(${mx}, ${my + 1})`, `(${mx - 1}, ${my - 1})`];
          return { q: `What is the midpoint of (${x1}, ${y1}) and (${x2}, ${y2})?`, ...makeStringOptions(correct, distractors), hint: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)', explanation: `((${x1}+${x2})/2, (${y1}+${y2})/2) = ${correct}`, difficulty: 'hard', source: 'FastBridge Prep' };
        },
      ];
      return pick(types)();
    },

    // ── NUMBER ANALOGY (CogAT / HCP) ───────────────────────
    numberAnalogy(grade) {
      const types = [
        () => {
          const mult = rand(2, grade <= 4 ? 5 : 10);
          const a = rand(2, 10), b = a * mult, c = rand(2, 10);
          const correct = c * mult;
          return { q: `${a} → ${b}, ${c} → ?`, correct, hint: `What do you multiply ${a} by to get ${b}?`, explanation: `Rule: ×${mult}. ${c} × ${mult} = ${correct}` };
        },
        () => {
          const add = rand(3, grade <= 4 ? 15 : 30);
          const a = rand(2, 20), b = a + add, c = rand(2, 20);
          const correct = c + add;
          return { q: `[${a} : ${b}] = [${c} : ?]`, correct, hint: `What is added to ${a} to get ${b}?`, explanation: `Rule: +${add}. ${c} + ${add} = ${correct}` };
        },
        () => {
          const a = rand(2, grade <= 4 ? 8 : 12);
          const b = a * a;
          const c = rand(2, grade <= 4 ? 8 : 12);
          const correct = c * c;
          return { q: `${a} → ${b}, ${c} → ?`, correct, hint: `How is ${b} related to ${a}?`, explanation: `Rule: square it. ${c}² = ${correct}` };
        },
        () => {
          if (grade < 5) { const m = rand(2, 5); const a = rand(3, 10); const b = a * m + 1; const c = rand(3, 10); const correct = c * m + 1; return { q: `${a} → ${b}, ${c} → ?`, correct, hint: `Multiply then add 1.`, explanation: `Rule: ×${m} + 1. ${c}×${m}+1 = ${correct}` }; }
          const a = rand(2, 8); const b = a * a * a; const c = rand(2, 8); const correct = c * c * c;
          return { q: `${a} → ${b}, ${c} → ?`, correct, hint: `How is ${b} related to ${a}? Think powers.`, explanation: `Rule: cube it. ${c}³ = ${correct}` };
        },
      ];
      const gen = pick(types)();
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(5, Math.floor(gen.correct * 0.2))), hint: gen.hint, explanation: gen.explanation, difficulty: grade <= 4 ? 'medium' : 'hard', source: 'HCP / CogAT Prep' };
    },

    // ── MENTAL MATH / NUMBER SENSE (HCP) ────────────────────
    mentalMath(grade) {
      const types = grade <= 3 ? [
        () => { const a = rand(2, 9), b = 10 - a; return { q: `What number added to ${a} makes 10?`, correct: b, hint: 'Number bonds to 10.', explanation: `${a} + ${b} = 10` }; },
        () => { const n = rand(11, 49); const nearest10 = Math.round(n / 10) * 10; return { q: `What is ${n} rounded to the nearest 10?`, correct: nearest10, hint: 'Look at the ones digit.', explanation: `${n} ≈ ${nearest10}` }; },
      ] : grade <= 5 ? [
        () => { const a = rand(10, 99), b = 100 - a; return { q: `What number added to ${a} makes 100?`, correct: b, hint: 'Think complements to 100.', explanation: `${a} + ${b} = 100` }; },
        () => { const a = rand(2, 9), b = rand(10, 20); const c1 = a * b; const options = [a * (b - 1), a * b, a * (b + 1), (a + 1) * b]; return { q: `Without calculating exactly, which is ${a} × ${b}?`, correct: c1, hint: `${a} × ${Math.round(b / 10) * 10} = ${a * Math.round(b / 10) * 10}. Adjust.`, explanation: `${a} × ${b} = ${c1}` }; },
        () => { const n = rand(4, 12); const sq = n * n + rand(-5, 5); const correct = n; return { q: `√${n*n} = ?`, correct, hint: `What number times itself = ${n*n}?`, explanation: `${n} × ${n} = ${n*n}` }; },
      ] : [
        () => { const a = rand(11, 99); const correct = a * 11; return { q: `What is ${a} × 11? (Use the mental trick!)`, correct, hint: `${a} × 11: put the sum of digits in the middle.`, explanation: `${a} × 11 = ${correct}` }; },
        () => { const a = rand(10, 50) * 2; const half = a / 2; return { q: `What is 50% of ${a}?`, correct: half, hint: '50% = half.', explanation: `50% of ${a} = ${half}` }; },
        () => { const a = rand(2, 20), b = rand(2, 20); const c = rand(2, 20); const sum = a + b + c; return { q: `${a} + ${b} + ${c} = ? (Find quickly!)`, correct: sum, hint: 'Look for pairs that make 10 or 20.', explanation: `${a} + ${b} + ${c} = ${sum}` }; },
      ];
      const gen = pick(types)();
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(3, Math.floor(gen.correct * 0.2))), hint: gen.hint, explanation: gen.explanation, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'HCP / Number Sense' };
    },

    // ── AIME-STYLE PROBLEMS ─────────────────────────────────
    aimeNumberTheory(grade) {
      if (grade < 4) return Gen.gcdLcm(grade);
      const types = [
        () => {
          const a = rand(2, 9), b = rand(2, 9);
          const lcm = (a * b) / gcd(a, b);
          const limit = rand(50, 200);
          const count = Math.floor(limit / lcm);
          return { q: `How many positive integers less than or equal to ${limit} are divisible by both ${a} and ${b}?`, correct: count, hint: `Find the LCM of ${a} and ${b} first, then count multiples.`, explanation: `LCM(${a}, ${b}) = ${lcm}. Multiples ≤ ${limit}: ${limit} ÷ ${lcm} = ${count}` };
        },
        () => {
          const n = rand(2, 6);
          const factorial = [1, 1, 2, 6, 24, 120, 720][n];
          let zeros = 0, temp = factorial;
          while (temp % 10 === 0 && temp > 0) { zeros++; temp = Math.floor(temp / 10); }
          const bigN = rand(10, 30);
          let trailingZeros = 0;
          for (let p = 5; p <= bigN; p *= 5) trailingZeros += Math.floor(bigN / p);
          return { q: `How many trailing zeros does ${bigN}! (${bigN} factorial) have?`, correct: trailingZeros, hint: 'Count how many times 5 is a factor. Each pair of 2 and 5 makes a trailing zero.', explanation: `Count factors of 5: ${Array.from({length: Math.floor(Math.log(bigN)/Math.log(5))}, (_, i) => `⌊${bigN}/${Math.pow(5,i+1)}⌋=${Math.floor(bigN/Math.pow(5,i+1))}`).join(' + ')} = ${trailingZeros}` };
        },
        () => {
          const base = rand(2, 5);
          const exp = rand(2, 6);
          const result = Math.pow(base, exp);
          const unitDigit = result % 10;
          const bigExp = exp + rand(4, 20) * 4;
          return { q: `What is the units digit of ${base}^${bigExp}?`, correct: unitDigit, hint: `Units digits cycle in a pattern. Find the cycle of ${base}^n.`, explanation: `Powers of ${base} have units digits that cycle every 4. ${base}^${bigExp} has units digit ${unitDigit}.` };
        },
        () => {
          const a = rand(100, 500);
          const d = rand(2, 9);
          const digitSum = String(a).split('').reduce((s, c) => s + parseInt(c), 0);
          return { q: `What is the sum of the digits of ${a * d}?`, correct: String(a * d).split('').reduce((s, c) => s + parseInt(c), 0), hint: 'Multiply first, then add the digits.', explanation: `${a} × ${d} = ${a * d}. Digit sum = ${String(a * d).split('').reduce((s, c) => s + parseInt(c), 0)}` };
        },
      ];
      const gen = pick(types)();
      if (!Number.isInteger(gen.correct) || gen.correct < 0) return Gen.gcdLcm(grade);
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(2, Math.floor(gen.correct * 0.3))), hint: gen.hint, explanation: gen.explanation, difficulty: 'hard', source: 'AIME Style' };
    },

    aimeAlgebra(grade) {
      if (grade < 4) return Gen.simpleEquation(grade);
      const types = [
        () => {
          const a = rand(2, 8), b = rand(2, 8);
          const sumAB = a + b, prodAB = a * b;
          const sumSq = sumAB * sumAB - 2 * prodAB;
          return { q: `If x + y = ${sumAB} and xy = ${prodAB}, what is x² + y²?`, correct: sumSq, hint: 'Use the identity: x² + y² = (x+y)² − 2xy.', explanation: `x² + y² = ${sumAB}² − 2(${prodAB}) = ${sumAB * sumAB} − ${2 * prodAB} = ${sumSq}` };
        },
        () => {
          const n = rand(3, 8);
          const sumN = n * (n + 1) / 2;
          const sumSqN = n * (n + 1) * (2 * n + 1) / 6;
          return { q: `What is 1² + 2² + 3² + ... + ${n}²?`, correct: sumSqN, hint: 'Use the formula: n(n+1)(2n+1)/6.', explanation: `${n}(${n + 1})(${2 * n + 1})/6 = ${sumSqN}` };
        },
        () => {
          const r = rand(2, 5);
          const n = rand(3, 6);
          const firstTerm = rand(1, 4);
          const sum = firstTerm * (Math.pow(r, n) - 1) / (r - 1);
          return { q: `What is the sum of the geometric series: ${firstTerm} + ${firstTerm * r} + ${firstTerm * r * r} + ... (${n} terms)?`, correct: sum, hint: `Sum = a(rⁿ − 1)/(r − 1), where a=${firstTerm}, r=${r}, n=${n}.`, explanation: `${firstTerm}(${r}^${n} − 1)/(${r} − 1) = ${firstTerm}(${Math.pow(r, n)} − 1)/${r - 1} = ${sum}` };
        },
        () => {
          const a = rand(1, 10), b = rand(1, 10);
          const c = rand(1, 10), d = rand(1, 10);
          const x = a + b, y = c + d;
          return { q: `Solve: x + y = ${x + y} and x − y = ${x - y}. What is x?`, correct: x, hint: 'Add the two equations to eliminate y.', explanation: `Adding: 2x = ${x + y + x - y}, so x = ${x}` };
        },
        () => {
          const n = rand(5, 15);
          const an = 2 * n + 1;
          const sum = n * (3 + an) / 2;
          return { q: `In the arithmetic sequence 3, 5, 7, 9, ..., what is the sum of the first ${n} terms?`, correct: sum, hint: 'Sum = n(first + last)/2. Find the nth term first: aₙ = 3 + (n−1)×2.', explanation: `a${n} = 3 + ${n - 1}×2 = ${an}. Sum = ${n}(3 + ${an})/2 = ${sum}` };
        },
      ];
      const gen = pick(types)();
      if (!Number.isInteger(gen.correct) || gen.correct < 0) return Gen.simpleEquation(grade);
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(3, Math.floor(gen.correct * 0.15))), hint: gen.hint, explanation: gen.explanation, difficulty: 'hard', source: 'AIME Style' };
    },

    aimeCombinatorics(grade) {
      if (grade < 3) return Gen.countingPrinciple(grade);
      const types = [
        () => {
          const n = rand(4, 8);
          const r = rand(2, Math.min(n - 1, 4));
          const numer = Array.from({length: r}, (_, i) => n - i).reduce((a, b) => a * b, 1);
          const denom = Array.from({length: r}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
          const comb = numer / denom;
          return { q: `How many ways can you choose ${r} items from ${n} items? (C(${n},${r}))`, correct: comb, hint: `C(n,r) = n! / (r! × (n−r)!)`, explanation: `C(${n},${r}) = ${n}! / (${r}! × ${n - r}!) = ${comb}` };
        },
        () => {
          const letters = rand(3, 5);
          const word = ['MATH', 'BOAT', 'STAR', 'LAMP', 'CUBE', 'PLANE'][rand(0, 5)].slice(0, letters);
          const fact = [1, 1, 2, 6, 24, 120][letters];
          return { q: `How many different arrangements of the letters in "${word}" are possible?`, correct: fact, hint: `For ${letters} distinct letters, the answer is ${letters}!`, explanation: `${letters}! = ${fact}` };
        },
        () => {
          const n = rand(3, 6);
          const paths = Array.from({length: n}, (_, i) => n + i).reduce((a, b) => a * b, 1) / Array.from({length: n}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
          return { q: `How many paths from top-left to bottom-right of a ${n}×${n} grid (only moving right or down)?`, correct: paths, hint: `You need exactly ${n} rights and ${n} downs. Choose which ${n} of ${2 * n} steps are "right".`, explanation: `C(${2 * n},${n}) = ${paths}` };
        },
        () => {
          const n = rand(4, 7);
          const derangements = [0, 0, 1, 2, 9, 44, 265, 1854][n];
          if (derangements > 300) {
            const simpleN = rand(4, 5);
            const simpleD = [0, 0, 1, 2, 9, 44][simpleN];
            return { q: `${simpleN} students each wrote their name on a card. The cards are shuffled and handed back randomly. In how many ways does NO student get their own card?`, correct: simpleD, hint: 'This is a derangement problem. D(n) = n! × (1 − 1/1! + 1/2! − 1/3! + ...)', explanation: `D(${simpleN}) = ${simpleD}` };
          }
          return { q: `${n} students each wrote their name on a card. The cards are shuffled and handed back randomly. In how many ways does NO student get their own card?`, correct: derangements, hint: 'This is a derangement problem. D(n) = n! × (1 − 1/1! + 1/2! − 1/3! + ...)', explanation: `D(${n}) = ${derangements}` };
        },
      ];
      const gen = pick(types)();
      if (!Number.isInteger(gen.correct) || gen.correct < 0) return Gen.countingPrinciple(grade);
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(3, Math.floor(gen.correct * 0.2))), hint: gen.hint, explanation: gen.explanation, difficulty: 'hard', source: 'AIME Style' };
    },

    aimeGeometry(grade) {
      if (grade < 4) return Gen.area(grade);
      const types = [
        () => {
          const a = rand(3, 12), b = rand(3, 12);
          const diag = Math.round(Math.sqrt(a * a + b * b) * 10) / 10;
          const diagInt = Math.round(diag);
          if (Math.abs(diag - diagInt) > 0.01) {
            const pyths = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]];
            const [pa, pb, pc] = pick(pyths);
            return { q: `A rectangle has sides ${pa} and ${pb}. What is the length of its diagonal?`, correct: pc, hint: 'Use the Pythagorean theorem: d² = a² + b².', explanation: `d = √(${pa}² + ${pb}²) = √(${pa*pa} + ${pb*pb}) = √${pa*pa + pb*pb} = ${pc}` };
          }
          return { q: `A rectangle has sides ${a} and ${b}. What is the length of its diagonal?`, correct: diagInt, hint: 'Use the Pythagorean theorem: d² = a² + b².', explanation: `d = √(${a}² + ${b}²) = √${a * a + b * b} = ${diagInt}` };
        },
        () => {
          const s = rand(2, 10);
          const area = Math.round(s * s * Math.sqrt(3) / 4);
          const h = rand(3, 8);
          const triArea = Math.round(0.5 * s * h);
          return { q: `A triangle has base ${s} and height ${h}. What is its area?`, correct: triArea, hint: 'Area = ½ × base × height.', explanation: `Area = ½ × ${s} × ${h} = ${triArea}` };
        },
        () => {
          const r = rand(2, 10);
          const sector = rand(60, 180);
          const arcLength = Math.round(2 * Math.PI * r * sector / 360);
          const sectorArea = Math.round(Math.PI * r * r * sector / 360);
          return { q: `A circle has radius ${r}. What is the area of a sector with angle ${sector}°? (Round to nearest integer, use π ≈ 3.14)`, correct: Math.round(3.14 * r * r * sector / 360), hint: 'Sector area = (θ/360) × πr².', explanation: `(${sector}/360) × 3.14 × ${r}² = ${Math.round(3.14 * r * r * sector / 360)}` };
        },
        () => {
          const n = rand(5, 10);
          const diags = n * (n - 3) / 2;
          return { q: `A regular polygon has ${n} sides. How many diagonals does it have?`, correct: diags, hint: 'Formula: n(n−3)/2.', explanation: `${n}(${n}−3)/2 = ${n}×${n - 3}/2 = ${diags}` };
        },
        () => {
          const a = rand(3, 8), b = rand(3, 8), c = rand(Math.abs(a - b) + 1, a + b - 1);
          const s = (a + b + c) / 2;
          const area = Math.round(Math.sqrt(s * (s - a) * (s - b) * (s - c)));
          if (area <= 0 || !Number.isFinite(area)) return Gen.area(grade);
          return { q: `A triangle has sides ${a}, ${b}, and ${c}. What is its area? (Round to nearest integer)`, correct: area, hint: "Use Heron's formula: √(s(s−a)(s−b)(s−c)) where s = (a+b+c)/2.", explanation: `s = ${s}, Area = √(${s}×${s - a}×${s - b}×${s - c}) ≈ ${area}` };
        },
      ];
      const gen = pick(types)();
      if (!Number.isInteger(gen.correct) || gen.correct <= 0) return Gen.area(grade);
      return { q: gen.q, ...makeOptions(gen.correct, Math.max(2, Math.floor(gen.correct * 0.2))), hint: gen.hint, explanation: gen.explanation, difficulty: 'hard', source: 'AIME Style' };
    },
  };

  // ─── Category → Generator Mapping ────────────────────────
  function getGenerators(grade, category) {
    const isElem = grade <= 5; // Elementary vs Middle School
    const map = {
      // Core Math
      arithmetic: ['addition', 'subtraction', 'multiplication', 'division', 'remainderDivision', 'orderOfOperations', 'negativeNumbers', 'exponents', 'squareRoots', 'estimation', 'mentalMath'],
      logic: ['numberPattern', 'missingNumber', 'digitSum', 'divisibility', 'primeCheck', 'gcdLcm', 'factorCount', 'logicPuzzle', 'magicSquare', 'numberAnalogy'],
      geometry: ['perimeter', 'area', 'circleGeometry', 'angles', 'volume', 'coordinateDistance', 'coordinatePlane', 'unitConversion'],
      word: ['wordProblem', 'ageWordProblem', 'moneyProblem', 'timeProblem', 'ratio', 'proportion', 'percentages', 'averageProblem', 'simpleProbability', 'percentChange', 'dataTable', 'unitConversion'],
      mixed: ['addition', 'subtraction', 'multiplication', 'division', 'numberPattern', 'perimeter', 'area', 'wordProblem', 'missingNumber', 'exponents', 'digitSum', 'placeValue', 'rounding', 'fractionAddition', 'decimalArithmetic', 'estimation', 'meanMedianModeRange', 'unitConversion', 'dataTable', 'numberAnalogy', 'mentalMath', 'coordinatePlane', 'fractionMultDiv', 'percentChange'],
      // Competition Prep (uses olympiad-level generators as fallback; AI provides the real competition questions)
      olympiad: ['orderOfOperations', 'gcdLcm', 'factorCount', 'primeCheck', 'logicPuzzle', 'magicSquare', 'permutationCombo', 'simpleEquation', 'inequality', 'countingPrinciple', 'numberAnalogy', 'mentalMath'],
      moems: isElem
        ? ['numberPattern', 'logicPuzzle', 'missingNumber', 'digitSum', 'factorCount', 'wordProblem', 'mentalMath']
        : ['gcdLcm', 'factorCount', 'primeCheck', 'logicPuzzle', 'permutationCombo', 'countingPrinciple', 'simpleEquation'],
      noetic: isElem
        ? ['numberPattern', 'missingNumber', 'logicPuzzle', 'wordProblem', 'digitSum', 'mentalMath', 'estimation']
        : ['numberPattern', 'logicPuzzle', 'gcdLcm', 'simpleEquation', 'inequality', 'permutationCombo', 'countingPrinciple'],
      imc: isElem
        ? ['logicPuzzle', 'numberPattern', 'gcdLcm', 'factorCount', 'countingPrinciple', 'wordProblem', 'mentalMath', 'digitSum']
        : ['gcdLcm', 'factorCount', 'primeCheck', 'permutationCombo', 'countingPrinciple', 'simpleEquation', 'inequality', 'aimeNumberTheory', 'aimeAlgebra'],
      aime: ['aimeNumberTheory', 'aimeAlgebra', 'aimeCombinatorics', 'aimeGeometry', 'permutationCombo', 'countingPrinciple', 'gcdLcm', 'factorCount', 'simpleEquation', 'inequality'],
      // Test Prep (LWSD)
      fastbridge: ['estimation', 'rounding', 'mentalMath', 'meanMedianModeRange', 'dataTable', 'unitConversion', 'numberPattern', 'numberAnalogy', 'simpleProbability'],
      highcap: ['numberAnalogy', 'numberPattern', 'missingNumber', 'logicPuzzle', 'magicSquare', 'mentalMath', 'digitSum'],
      cogat: isElem
        ? ['numberAnalogy', 'numberPattern', 'missingNumber', 'logicPuzzle', 'digitSum', 'mentalMath', 'magicSquare']
        : ['numberAnalogy', 'numberPattern', 'logicPuzzle', 'missingNumber', 'simpleEquation', 'permutationCombo', 'magicSquare'],
      // Additional Math Competitions
      kangaroo: isElem
        ? ['logicPuzzle', 'numberPattern', 'missingNumber', 'wordProblem', 'perimeter', 'area', 'mentalMath']
        : ['logicPuzzle', 'numberPattern', 'permutationCombo', 'countingPrinciple', 'wordProblem', 'area', 'coordinatePlane'],
      mathcounts: ['gcdLcm', 'factorCount', 'primeCheck', 'simpleEquation', 'inequality', 'permutationCombo', 'countingPrinciple', 'percentages', 'simpleProbability', 'area'],
      math_challenge: isElem
        ? ['mentalMath', 'estimation', 'orderOfOperations', 'numberPattern', 'wordProblem', 'missingNumber', 'digitSum', 'fractionAddition']
        : ['orderOfOperations', 'simpleEquation', 'gcdLcm', 'percentages', 'wordProblem', 'area', 'fractionMultDiv', 'mentalMath'],
      math_is_cool: isElem
        ? ['mentalMath', 'estimation', 'logicPuzzle', 'numberPattern', 'wordProblem', 'missingNumber', 'rounding', 'placeValue']
        : ['mentalMath', 'estimation', 'simpleEquation', 'logicPuzzle', 'percentages', 'area', 'simpleProbability', 'gcdLcm'],
      singapore: isElem
        ? ['wordProblem', 'mentalMath', 'numberPattern', 'missingNumber', 'ratio', 'estimation', 'fractionAddition']
        : ['wordProblem', 'ratio', 'proportion', 'percentages', 'fractionMultDiv', 'simpleEquation', 'percentChange'],
      // English exam categories — served from ENGLISH_QUESTIONS bank + AI
      fb_reading: [],  // FastBridge aReading — mix of vocabulary, grammar, reading, spelling
      spelling_bee: [], // Scripps Spelling Bee style
      vocabulary: [],
      grammar: [],
      reading: [],
      spelling: [],
    };
    const gens = map[category] || map.mixed;
    return gens.filter(g => typeof Gen[g] === 'function');
  }

  function generateQuestions(grade, category, count) {
    const gens = getGenerators(grade, category);
    const questions = [];
    const maxTries = count * 3;
    let tries = 0;
    while (questions.length < count && tries < maxTries) {
      try {
        const genName = pick(gens);
        const q = Gen[genName](grade);
        if (q && q.q && q.options && q.options.length === 4 && typeof q.answer === 'number') {
          questions.push(q);
        }
      } catch (e) { /* skip bad generation */ }
      tries++;
    }
    return questions;
  }

  // ─── Helper: fill pool from all subcategories (grade-aware) ───
  // minDifficulty: 'easy' (any), 'medium' (medium+hard only), 'hard' (hard only)
  function _supplementFromAllSubcats(pool, grade, count, minDifficulty) {
    if (typeof QUESTIONS === 'undefined') return;
    const diffRank = { easy: 1, medium: 2, hard: 3 };
    const minRank = diffRank[minDifficulty] || 1;
    const existing = new Set(pool.map(q => q.q));
    const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
    for (const g of searchGrades) {
      if (pool.length >= count * 2) break; // enough to choose from
      const gData = QUESTIONS[g] || {};
      for (const arr of Object.values(gData)) {
        arr.forEach(q => {
          if (!existing.has(q.q)) {
            const qRank = diffRank[q.difficulty] || 2;
            if (qRank >= minRank) {
              pool.push(q); existing.add(q.q);
            }
          }
        });
      }
    }
  }

  // ─── Local question bank lookup ──────────────────────────
  const ENGLISH_CATS = ['vocabulary', 'grammar', 'reading', 'spelling'];
  const ENGLISH_EXAM_CATS = ['fb_reading', 'spelling_bee'];

  function getLocalQuestions(grade, category, count) {
    const pool = [];

    // fb_reading = FastBridge aReading → mix all English subcategories
    if (category === 'fb_reading') {
      if (typeof ENGLISH_QUESTIONS !== 'undefined') {
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = ENGLISH_QUESTIONS[g];
          if (gData) {
            for (const sub of ENGLISH_CATS) {
              if (gData[sub]) pool.push(...gData[sub]);
            }
          }
        }
      }
      return shuffle(pool).slice(0, count);
    }

    // spelling_bee = heavy on spelling, supplemented with vocabulary
    if (category === 'spelling_bee') {
      if (typeof ENGLISH_QUESTIONS !== 'undefined') {
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = ENGLISH_QUESTIONS[g];
          if (gData) {
            if (gData.spelling) pool.push(...gData.spelling);
            if (gData.vocabulary) pool.push(...gData.vocabulary);
          }
        }
      }
      return shuffle(pool).slice(0, count);
    }

    // English subcategories → use ENGLISH_QUESTIONS bank
    if (ENGLISH_CATS.includes(category)) {
      if (typeof ENGLISH_QUESTIONS !== 'undefined') {
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = ENGLISH_QUESTIONS[g];
          if (gData && gData[category]) {
            pool.push(...gData[category]);
          }
        }
      }
      return shuffle(pool).slice(0, count);
    }

    // Singapore Math → pull Singapore Math tagged questions
    if (category === 'singapore') {
      if (typeof QUESTIONS !== 'undefined') {
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = QUESTIONS[g] || {};
          for (const cat of Object.keys(gData)) {
            (gData[cat] || []).forEach(q => {
              if (q.source && q.source.includes('Singapore')) pool.push(q);
            });
          }
        }
      }
      return shuffle(pool).slice(0, count);
    }

    // Math Kangaroo → pull Kangaroo-tagged questions
    if (category === 'kangaroo') {
      if (typeof QUESTIONS !== 'undefined') {
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = QUESTIONS[g] || {};
          for (const cat of Object.keys(gData)) {
            (gData[cat] || []).forEach(q => {
              if (q.source && q.source.includes('Kangaroo')) pool.push(q);
            });
          }
        }
      }
      return shuffle(pool).slice(0, count);
    }

    // CogAT → pull CogAT and HCP tagged questions (number analogies, patterns, etc.)
    if (category === 'cogat') {
      if (typeof QUESTIONS !== 'undefined') {
        const cogCats = ['arithmetic', 'logic', 'geometry', 'word'];
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = QUESTIONS[g] || {};
          for (const cat of cogCats) {
            (gData[cat] || []).forEach(q => {
              if (q.source && (q.source.includes('CogAT') || q.source.includes('HCP'))) {
                pool.push(q);
              }
            });
          }
        }
      }
      return shuffle(pool).slice(0, count);
    }

    // FastBridge aMath → pull FastBridge/HCP/CogAT tagged questions + dedicated bank
    if (category === 'fastbridge') {
      if (typeof QUESTIONS !== 'undefined') {
        const fbCats = ['arithmetic', 'geometry', 'word', 'logic'];
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = QUESTIONS[g] || {};
          for (const cat of fbCats) {
            (gData[cat] || []).forEach(q => {
              if (q.source && (q.source.includes('FastBridge') || q.source.includes('HCP') || q.source.includes('CogAT'))) {
                pool.push(q);
              }
            });
          }
        }
      }
      // If source-tagged questions are sparse, supplement with general questions
      if (pool.length < count) {
        _supplementFromAllSubcats(pool, grade, count, 'easy');
      }
      return shuffle(pool).slice(0, count);
    }

    // ─── Source-tag based lookups for competition exams ──────
    // These exams don't have their own subcategory in QUESTIONS,
    // so we search ALL subcategories by source tag, then supplement
    // with general math questions to fill the count.
    const SOURCE_TAG_MAP = {
      'moems':          ['MOEMS'],
      'noetic':         ['Noetic'],
      'imc':            ['IMC'],
      'olympiad':       ['AMC', 'AOPS', 'Olympiad'],
      'math_challenge': ['RSM', 'CML', 'Continental'],
      'math_is_cool':   ['Math is Cool', 'Cool'],
      'highcap':        ['HCP', 'CogAT', 'Gifted', 'High Cap'],
      'mathcounts':     ['Mathcounts', 'MATHCOUNTS'],
      'aime':           ['AIME', 'AMC 10', 'AMC 12'],
    };

    // Competition exams = supplement with medium/hard only
    const COMPETITION_CATS = new Set(['moems','noetic','imc','olympiad','math_challenge','math_is_cool','mathcounts','aime']);

    if (SOURCE_TAG_MAP[category]) {
      const tags = SOURCE_TAG_MAP[category];
      if (typeof QUESTIONS !== 'undefined') {
        const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
        for (const g of searchGrades) {
          const gData = QUESTIONS[g] || {};
          for (const subcat of Object.keys(gData)) {
            (gData[subcat] || []).forEach(q => {
              if (q.source && tags.some(tag => q.source.includes(tag))) {
                pool.push(q);
              }
            });
          }
        }
      }
      // Supplement: competitions get medium/hard, school tests get any
      const minDiff = COMPETITION_CATS.has(category) ? 'medium' : 'easy';
      if (pool.length < count) {
        _supplementFromAllSubcats(pool, grade, count, minDiff);
      }
      return shuffle(pool).slice(0, count);
    }

    // Regular math categories → use QUESTIONS bank
    if (typeof QUESTIONS === 'undefined') return [];
    const gradeData = QUESTIONS[grade] || {};

    if (category === 'mixed') {
      Object.values(gradeData).forEach(arr => pool.push(...arr));
    } else if (gradeData[category]) {
      pool.push(...gradeData[category]);
    }

    // Supplement from adjacent grades
    [grade - 1, grade + 1].forEach(g => {
      const adj = QUESTIONS[g];
      if (!adj) return;
      if (category === 'mixed') {
        Object.values(adj).forEach(arr => pool.push(...arr));
      } else if (adj[category]) {
        pool.push(...adj[category]);
      }
    });

    // If still empty (unknown category), grab from all subcats as fallback
    if (pool.length === 0) {
      _supplementFromAllSubcats(pool, grade, count, 'easy');
    }

    return shuffle(pool).slice(0, count);
  }

  // ─── Main entry point ────────────────────────────────────
  async function getQuestions(grade, category, count) {
    grade = parseInt(grade) || 4;
    category = category || 'mixed';
    count = count || 10;

    let questions = [];

    // 1) Start with local curated bank (50% of count — competition-quality questions)
    const localCount = Math.ceil(count * 0.5);
    const localQs = getLocalQuestions(grade, category, localCount);
    questions.push(...localQs);

    // 1b) For FastBridge, also pull from dedicated FastBridge question engine
    if (category === 'fastbridge' && typeof getFastBridgeMathQuestions === 'function') {
      try {
        const fbQs = await getFastBridgeMathQuestions(grade, 'fb_math_mixed', localCount);
        if (fbQs && fbQs.length > 0) {
          const existing = new Set(questions.map(q => q.q));
          fbQs.forEach(q => { if (!existing.has(q.q)) questions.push(q); });
        }
      } catch (e) { /* non-critical */ }
    }

    // English categories don't have math generators or external APIs
    const isEnglish = ENGLISH_CATS.includes(category) || ENGLISH_EXAM_CATS.includes(category);

    if (!isEnglish) {
      // 2) Generate dynamic questions (30% of count — grade-pushed generators)
      const genCount = Math.ceil(count * 0.3);
      const genQs = generateQuestions(grade, category, genCount);
      questions.push(...genQs);

      // 3) Try external APIs for remaining (20% of count)
      const apiCount = Math.max(2, count - questions.length);
      try {
        const diff = grade <= 2 ? 'easy' : grade <= 5 ? 'medium' : 'hard';
        const apiQs = await fetchOpenTDB(apiCount, diff);
        questions.push(...apiQs);
      } catch (e) { /* API failed, no problem */ }

      // 4) If still short, generate more
      while (questions.length < count) {
        const extra = generateQuestions(grade, category, count - questions.length);
        questions.push(...extra);
        if (extra.length === 0) break; // safety valve
      }
    }

    // Shuffle final set and return exactly count
    return shuffle(questions).slice(0, count);
  }

  // ─── Public API ──────────────────────────────────────────
  return {
    getQuestions,
    getLocalQuestions,
    fetchOpenTDB,
    generateQuestions,
    Gen
  };

})();
