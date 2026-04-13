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
      const max = [10, 50, 200, 1000, 5000, 10000, 50000, 100000][grade - 1] || 100;
      const a = rand(1, max), b = rand(1, max);
      const correct = a + b;
      return { q: `What is ${a.toLocaleString()} + ${b.toLocaleString()}?`, ...makeOptions(correct, Math.max(5, Math.floor(max * 0.1))), hint: 'Add the numbers step by step.', explanation: `${a.toLocaleString()} + ${b.toLocaleString()} = ${correct.toLocaleString()}`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'Generated' };
    },

    subtraction(grade) {
      const max = [10, 50, 200, 1000, 5000, 10000, 50000, 100000][grade - 1] || 100;
      let a = rand(1, max), b = rand(1, max);
      if (b > a) [a, b] = [b, a];
      const correct = a - b;
      return { q: `What is ${a.toLocaleString()} − ${b.toLocaleString()}?`, ...makeOptions(correct, Math.max(5, Math.floor(max * 0.05))), hint: 'Subtract carefully.', explanation: `${a.toLocaleString()} − ${b.toLocaleString()} = ${correct.toLocaleString()}`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'Generated' };
    },

    multiplication(grade) {
      const maxA = [5, 10, 12, 15, 20, 25, 50, 100][grade - 1] || 12;
      const maxB = [5, 10, 12, 12, 15, 20, 30, 50][grade - 1] || 12;
      const a = rand(2, maxA), b = rand(2, maxB);
      const correct = a * b;
      return { q: `What is ${a} × ${b}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.2))), hint: 'Use your times tables or break it into smaller parts.', explanation: `${a} × ${b} = ${correct}`, difficulty: grade <= 4 ? 'easy' : 'medium', source: 'Generated' };
    },

    division(grade) {
      const maxD = [5, 10, 12, 15, 20, 25, 50, 100][grade - 1] || 12;
      const divisor = rand(2, maxD);
      const quotient = rand(1, maxD);
      const dividend = divisor * quotient;
      return { q: `What is ${dividend} ÷ ${divisor}?`, ...makeOptions(quotient, Math.max(3, Math.floor(quotient * 0.3))), hint: 'Think about what times the divisor gives the dividend.', explanation: `${dividend} ÷ ${divisor} = ${quotient}`, difficulty: grade <= 4 ? 'easy' : 'medium', source: 'Generated' };
    },

    remainderDivision(grade) {
      const maxD = [0, 5, 10, 12, 15, 20, 25, 50][grade - 1] || 10;
      if (grade < 3) return Gen.division(grade);
      const divisor = rand(3, maxD);
      const quotient = rand(1, maxD);
      const remainder = rand(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      return { q: `What is the remainder when ${dividend} is divided by ${divisor}?`, ...makeOptions(remainder, divisor), hint: 'Divide and find what is left over.', explanation: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`, difficulty: 'medium', source: 'Generated' };
    },

    orderOfOperations(grade) {
      if (grade < 3) return Gen.addition(grade);
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
      if (grade < 3) return Gen.addition(grade);
      const d = pick([2, 3, 4, 5, 6, 8, 10]);
      const n1 = rand(1, d - 1), n2 = rand(1, d - 1);
      const sum = n1 + n2;
      const g = gcd(sum, d);
      const simpNum = sum / g, simpDen = d / g;
      const display = simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`;
      return { q: `What is ${n1}/${d} + ${n2}/${d}?`, ...makeStringOptions(display, [`${sum}/${d}`, `${n1 + n2 + 1}/${d}`, `${n1}/${d + n2}`, `${sum - 1}/${d}`].filter(x => x !== display)), hint: 'When denominators are the same, add the numerators.', explanation: `${n1}/${d} + ${n2}/${d} = ${sum}/${d} = ${display}`, difficulty: 'medium', source: 'Generated' };
    },

    fractionComparison(grade) {
      if (grade < 3) return Gen.addition(grade);
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
      if (grade < 4) return Gen.addition(grade);
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
      if (grade < 4) return Gen.multiplication(grade);
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
        const l = rand(3, 20 + grade * 5), w = rand(2, 15 + grade * 3);
        const correct = 2 * (l + w);
        return { q: `What is the perimeter of a rectangle with length ${l} and width ${w}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.15))), hint: 'Perimeter of rectangle = 2 × (length + width)', explanation: `P = 2 × (${l} + ${w}) = 2 × ${l + w} = ${correct}`, difficulty: 'easy', source: 'Generated' };
      } else if (shape === 'square') {
        const s = rand(3, 15 + grade * 3);
        const correct = 4 * s;
        return { q: `What is the perimeter of a square with side ${s}?`, ...makeOptions(correct, Math.max(4, Math.floor(correct * 0.15))), hint: 'Perimeter of square = 4 × side', explanation: `P = 4 × ${s} = ${correct}`, difficulty: 'easy', source: 'Generated' };
      } else {
        const a = rand(3, 15), b = rand(3, 15), c = rand(Math.abs(a - b) + 1, a + b - 1);
        const correct = a + b + c;
        return { q: `A triangle has sides ${a}, ${b}, and ${c}. What is its perimeter?`, ...makeOptions(correct, Math.max(4, 6)), hint: 'Add all three sides.', explanation: `P = ${a} + ${b} + ${c} = ${correct}`, difficulty: 'easy', source: 'Generated' };
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
      if (grade < 5) return Gen.area(grade);
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
      if (grade < 3) return Gen.perimeter(grade);
      const types = [
        () => { const a = rand(20, 160); return { q: `If one angle of a triangle is ${a}° and another is ${rand(10, 170 - a)}°, what is the third angle?`, ans: 180 - a - parseInt(arguments), hint: 'Angles in a triangle add up to 180°.' }; },
      ];
      const a1 = rand(20, 80), a2 = rand(20, 160 - a1);
      const a3 = 180 - a1 - a2;
      return { q: `A triangle has angles ${a1}° and ${a2}°. What is the third angle?`, ...makeOptions(a3, 15), hint: 'Angles in a triangle add up to 180°.', explanation: `180° − ${a1}° − ${a2}° = ${a3}°`, difficulty: 'medium', source: 'Competition Style' };
    },

    volume(grade) {
      if (grade < 5) return Gen.area(grade);
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
      const p = pick(grade <= 3 ? patterns.slice(0, 2) : patterns);
      const { seq, next, hint } = p();
      return { q: `What comes next: ${seq.join(', ')}, ?`, ...makeOptions(next, Math.max(5, Math.floor(next * 0.2))), hint, explanation: `The next number is ${next}.`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'Competition Style' };
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
      return { q: `What is the sum of the digits of ${n.toLocaleString()}?`, ...makeOptions(correct, Math.max(5, 8)), hint: 'Add each digit: ' + String(n).split('').join(' + '), explanation: `${String(n).split('').join(' + ')} = ${correct}`, difficulty: 'easy', source: 'Competition Style' };
    },

    divisibility(grade) {
      if (grade < 3) return Gen.addition(grade);
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
      if (grade < 4) return Gen.multiplication(grade);
      const base = rand(2, grade <= 5 ? 10 : 12);
      const exp = rand(2, grade <= 5 ? 3 : 4);
      const correct = Math.pow(base, exp);
      return { q: `What is ${base}${toSuperscript(exp)}?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.2))), hint: `Multiply ${base} by itself ${exp} times.`, explanation: `${base}${toSuperscript(exp)} = ${correct}`, difficulty: 'medium', source: 'Generated' };
    },

    squareRoots(grade) {
      if (grade < 4) return Gen.multiplication(grade);
      const root = rand(2, grade <= 5 ? 12 : 20);
      const correct = root;
      const square = root * root;
      return { q: `What is √${square}?`, ...makeOptions(correct, Math.max(3, Math.floor(correct * 0.3))), hint: 'What number multiplied by itself gives ' + square + '?', explanation: `√${square} = ${correct} because ${correct} × ${correct} = ${square}`, difficulty: 'medium', source: 'Generated' };
    },

    // ── NUMBER THEORY (Competition) ─────────────────────────
    primeCheck(grade) {
      if (grade < 3) return Gen.addition(grade);
      const candidates = [];
      for (let i = 10; i < 100 + grade * 20; i++) candidates.push(i);
      const primes = candidates.filter(isPrime);
      const composites = candidates.filter(n => !isPrime(n));
      const p = pick(primes);
      return { q: `Which of these is a prime number?`, ...makeStringOptions(String(p), [String(pick(composites)), String(pick(composites)), String(pick(composites))]), hint: 'A prime has exactly 2 factors: 1 and itself.', explanation: `${p} is prime — it can only be divided by 1 and ${p}.`, difficulty: 'medium', source: 'Competition Style' };
    },

    gcdLcm(grade) {
      if (grade < 4) return Gen.multiplication(grade);
      const a = rand(6, 30 + grade * 5), b = rand(6, 30 + grade * 5);
      const type = pick(['GCD', 'LCM']);
      const correct = type === 'GCD' ? gcd(a, b) : lcm(a, b);
      return { q: `What is the ${type === 'GCD' ? 'Greatest Common Divisor (GCD)' : 'Least Common Multiple (LCM)'} of ${a} and ${b}?`, ...makeOptions(correct, Math.max(5, Math.floor(correct * 0.3))), hint: type === 'GCD' ? 'Find the largest number that divides both.' : 'Find the smallest number both divide into.', explanation: `${type}(${a}, ${b}) = ${correct}`, difficulty: 'hard', source: 'Competition Style' };
    },

    factorCount(grade) {
      if (grade < 3) return Gen.multiplication(grade);
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

      const templates = [
        () => {
          const a = rand(5, 20 + grade * 5), b = rand(3, 15 + grade * 3);
          return { q: `${name} has ${a} ${item}. They get ${b} more. How many ${item} does ${name} have now?`, ans: a + b, hint: 'This is an addition problem.' };
        },
        () => {
          const a = rand(10, 30 + grade * 5), b = rand(2, a - 1);
          return { q: `${name} had ${a} ${item} and gave away ${b}. How many are left?`, ans: a - b, hint: 'This is a subtraction problem.' };
        },
        () => {
          const bags = rand(3, 8), perBag = rand(4, 12 + grade * 2);
          return { q: `${name} has ${bags} bags with ${perBag} ${item} in each. How many ${item} in total?`, ans: bags * perBag, hint: 'Multiply the number of bags by items per bag.' };
        },
        () => {
          const total = rand(2, 8) * rand(3, 8 + grade), friends = rand(2, 6);
          const each = Math.floor(total / friends);
          return { q: `${name} shares ${total} ${item} equally among ${friends} friends. How many does each friend get?`, ans: each, hint: 'Divide the total by the number of friends.' };
        },
        () => {
          const price = rand(2, 10) * (grade >= 4 ? pick([1, 0.5, 0.25]) : 1);
          const qty = rand(3, 10);
          const total = price * qty;
          return { q: `Each ${item.slice(0, -1)} costs $${price}. ${name} buys ${qty}. How much does ${name} spend?`, ans: total, hint: 'Multiply the price by the quantity.' };
        },
        () => {
          const speed = rand(3, grade <= 4 ? 10 : 60);
          const time = rand(2, grade <= 4 ? 5 : 8);
          const distance = speed * time;
          return { q: `${name} travels at ${speed} miles per hour for ${time} hours. How far does ${name} go?`, ans: distance, hint: 'Distance = Speed × Time' };
        },
      ];

      const t = pick(grade <= 2 ? templates.slice(0, 3) : templates)();
      const spread = Math.max(3, Math.floor(t.ans * 0.2));
      return { q: t.q, ...makeOptions(t.ans, spread), hint: t.hint, explanation: `The answer is ${t.ans}.`, difficulty: grade <= 3 ? 'easy' : 'medium', source: 'Word Problem' };
    },

    ageWordProblem(grade) {
      if (grade < 3) return Gen.wordProblem(grade);
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
      if (grade < 4) return Gen.missingNumber(grade);
      const a = rand(2, 8), b = rand(1, 15), c = rand(10, 50);
      const x = (c - b) / a;
      if (!Number.isInteger(x) || x < 0) return Gen.missingNumber(grade);
      return { q: `Solve for x: ${a}x + ${b} = ${c}`, ...makeOptions(x, Math.max(3, Math.floor(x * 0.3))), hint: `Subtract ${b} from both sides, then divide by ${a}.`, explanation: `${a}x + ${b} = ${c} → ${a}x = ${c - b} → x = ${x}`, difficulty: 'hard', source: 'Competition Style' };
    },

    inequality(grade) {
      if (grade < 5) return Gen.simpleEquation(grade);
      const a = rand(2, 6), b = rand(1, 10), c = rand(15, 40);
      const x = Math.floor((c - b) / a);
      return { q: `What is the largest whole number x such that ${a}x + ${b} ≤ ${c}?`, ...makeOptions(x, 3), hint: `Solve ${a}x + ${b} = ${c} and round down.`, explanation: `${a}x ≤ ${c - b} → x ≤ ${(c - b) / a}. Largest integer = ${x}`, difficulty: 'hard', source: 'Competition Style' };
    },

    // ── COMBINATORICS & PROBABILITY ─────────────────────────
    countingPrinciple(grade) {
      if (grade < 3) return Gen.wordProblem(grade);
      const a = rand(2, 6), b = rand(2, 6);
      const itemA = pick(['shirts', 'tops', 'hats']), itemB = pick(['pants', 'shorts', 'shoes']);
      const correct = a * b;
      return { q: `${pick(['Alex', 'Maya', 'Sam'])} has ${a} ${itemA} and ${b} ${itemB}. How many different outfits can be made?`, ...makeOptions(correct, Math.max(4, Math.floor(correct * 0.3))), hint: 'Multiply the choices together.', explanation: `${a} × ${b} = ${correct} outfits`, difficulty: 'medium', source: 'Competition Style' };
    },

    simpleProbability(grade) {
      if (grade < 4) return Gen.countingPrinciple(grade);
      const total = pick([6, 8, 10, 12, 20]);
      const favorable = rand(1, total - 1);
      const g = gcd(favorable, total);
      const simpNum = favorable / g, simpDen = total / g;
      const display = `${simpNum}/${simpDen}`;
      return { q: `A bag has ${total} balls. ${favorable} are red. What is the probability of picking a red ball?`, ...makeStringOptions(display, [`${favorable + 1}/${total}`, `${favorable}/${total + 1}`, `${total}/${favorable}`].filter(x => x !== display)), hint: 'Probability = favorable outcomes / total outcomes', explanation: `P(red) = ${favorable}/${total} = ${display}`, difficulty: 'medium', source: 'Generated' };
    },

    permutationCombo(grade) {
      if (grade < 5) return Gen.countingPrinciple(grade);
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
      if (grade < 3) return Gen.multiplication(grade);
      const a = rand(2, 8), b = rand(2, 8);
      const mult = rand(2, 6);
      const totalA = a * mult, totalB = b * mult;
      return { q: `The ratio of red to blue marbles is ${a}:${b}. If there are ${totalA} red marbles, how many blue marbles are there?`, ...makeOptions(totalB, Math.max(4, Math.floor(totalB * 0.3))), hint: `Find the multiplier: ${totalA} ÷ ${a} = ${mult}. Then multiply ${b} by that.`, explanation: `${totalA} ÷ ${a} = ${mult}, so blue = ${b} × ${mult} = ${totalB}`, difficulty: 'medium', source: 'Generated' };
    },

    proportion(grade) {
      if (grade < 4) return Gen.ratio(grade);
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
      return { q: `You have ${desc}. How many cents is that in total?`, ...makeOptions(correct, Math.max(10, Math.floor(correct * 0.15))), hint: 'Add up the value of each coin.', explanation: `Total = ${correct} cents`, difficulty: 'easy', source: 'Generated' };
    },

    timeProblem(grade) {
      const startH = rand(7, 11), startM = rand(0, 3) * 15;
      const durH = rand(1, 4), durM = pick([0, 15, 30, 45]);
      let endH = startH + durH, endM = startM + durM;
      if (endM >= 60) { endH++; endM -= 60; }
      const ampm = endH >= 12 ? 'PM' : 'AM';
      const displayEnd = `${endH > 12 ? endH - 12 : endH}:${String(endM).padStart(2, '0')} ${ampm}`;
      return { q: `A movie starts at ${startH}:${String(startM).padStart(2, '0')} AM and lasts ${durH} hour${durH > 1 ? 's' : ''} and ${durM} minutes. What time does it end?`, ...makeStringOptions(displayEnd, [`${endH > 12 ? endH - 12 : endH}:${String((endM + 15) % 60).padStart(2, '0')} ${ampm}`, `${(endH > 12 ? endH - 12 : endH) + 1}:${String(endM).padStart(2, '0')} ${ampm}`, `${endH > 12 ? endH - 12 : endH}:${String((endM + 30) % 60).padStart(2, '0')} ${ampm}`]), hint: 'Add the hours first, then the minutes.', explanation: `${startH}:${String(startM).padStart(2, '0')} + ${durH}h ${durM}m = ${displayEnd}`, difficulty: 'easy', source: 'Generated' };
    },

    // ── MEAN / MEDIAN / MODE ────────────────────────────────
    averageProblem(grade) {
      if (grade < 4) return Gen.wordProblem(grade);
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
      if (grade < 3) return Gen.missingNumber(grade);
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
      if (grade < 3) return Gen.missingNumber(grade);
      const puzzles = [
        () => { const n = rand(2, 5); const correct = n * (n + 1) / 2; return { q: `What is 1 + 2 + 3 + ... + ${n * 2}?`, ans: (n * 2) * (n * 2 + 1) / 2, hint: 'Use the formula: n(n+1)/2' }; },
        () => { const a = rand(10, 99); return { q: `How many two-digit numbers are there between 10 and ${a} (inclusive)?`, ans: a - 10 + 1, hint: 'Count: last - first + 1' }; },
        () => { const n = rand(3, 8); return { q: `A polygon has ${n} sides. How many diagonals does it have?`, ans: n * (n - 3) / 2, hint: 'Formula: n(n-3)/2' }; },
        () => { const people = rand(3, 6); return { q: `${people} people shake hands with each other once. How many handshakes total?`, ans: people * (people - 1) / 2, hint: 'Each pair shakes hands once. Count the pairs!' }; },
      ];
      const p = pick(grade <= 4 ? puzzles.slice(0, 2) : puzzles)();
      if (!Number.isInteger(p.ans) || p.ans < 0) return Gen.missingNumber(grade);
      return { q: p.q, ...makeOptions(p.ans, Math.max(4, Math.floor(p.ans * 0.25))), hint: p.hint, explanation: `The answer is ${p.ans}.`, difficulty: 'hard', source: 'Olympiad Style' };
    },

    // ── NEGATIVE NUMBERS ────────────────────────────────────
    negativeNumbers(grade) {
      if (grade < 5) return Gen.subtraction(grade);
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
      return { q: `What digit is in the ${places[placeIdx]} place of ${n.toLocaleString()}?`, ...makeOptions(correct, 4), hint: `Count from the right: ${places.slice(0, placeIdx + 1).join(', ')}`, explanation: `The ${places[placeIdx]} digit of ${n.toLocaleString()} is ${correct}.`, difficulty: 'easy', source: 'Generated' };
    },

    // ── ROUNDING ────────────────────────────────────────────
    rounding(grade) {
      const n = rand(100, 10000);
      const roundTo = pick([10, 100, 1000]);
      const correct = Math.round(n / roundTo) * roundTo;
      return { q: `Round ${n.toLocaleString()} to the nearest ${roundTo.toLocaleString()}.`, ...makeOptions(correct, roundTo * 2), hint: `Look at the digit to the right of the ${roundTo.toLocaleString()}s place.`, explanation: `${n.toLocaleString()} rounded to the nearest ${roundTo.toLocaleString()} is ${correct.toLocaleString()}.`, difficulty: 'easy', source: 'Generated' };
    },

    // ── COORDINATE GEOMETRY ─────────────────────────────────
    coordinateDistance(grade) {
      if (grade < 5) return Gen.area(grade);
      const x1 = rand(0, 10), y1 = rand(0, 10), x2 = rand(0, 10), y2 = rand(0, 10);
      const dx = x2 - x1, dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const roundDist = +dist.toFixed(1);
      if (dx === 0 && dy === 0) return Gen.area(grade);
      const { options, answer } = makeOptions(Math.round(roundDist * 10), Math.max(10, 20));
      return { q: `What is the distance between points (${x1}, ${y1}) and (${x2}, ${y2})? (Round to 1 decimal)`, options: options.map(v => (v / 10).toFixed(1)), answer, hint: 'Use the distance formula: √((x₂-x₁)² + (y₂-y₁)²)', explanation: `d = √((${x2}-${x1})² + (${y2}-${y1})²) = √(${dx * dx} + ${dy * dy}) ≈ ${roundDist}`, difficulty: 'hard', source: 'Competition Style' };
    },
  };

  // ─── Category → Generator Mapping ────────────────────────
  function getGenerators(grade, category) {
    const map = {
      arithmetic: ['addition', 'subtraction', 'multiplication', 'division', 'remainderDivision', 'orderOfOperations', 'negativeNumbers', 'exponents', 'squareRoots'],
      logic: ['numberPattern', 'missingNumber', 'digitSum', 'divisibility', 'primeCheck', 'gcdLcm', 'factorCount', 'logicPuzzle', 'magicSquare'],
      geometry: ['perimeter', 'area', 'circleGeometry', 'angles', 'volume', 'coordinateDistance'],
      olympiad: ['orderOfOperations', 'gcdLcm', 'factorCount', 'primeCheck', 'logicPuzzle', 'magicSquare', 'permutationCombo', 'simpleEquation', 'inequality', 'countingPrinciple'],
      word: ['wordProblem', 'ageWordProblem', 'moneyProblem', 'timeProblem', 'ratio', 'proportion', 'percentages', 'averageProblem', 'simpleProbability'],
      mixed: ['addition', 'subtraction', 'multiplication', 'division', 'numberPattern', 'perimeter', 'area', 'wordProblem', 'missingNumber', 'exponents', 'digitSum', 'placeValue', 'rounding', 'fractionAddition', 'decimalArithmetic'],
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

  // ─── Local question bank lookup ──────────────────────────
  function getLocalQuestions(grade, category, count) {
    if (typeof QUESTIONS === 'undefined') return [];
    const pool = [];
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

    return shuffle(pool).slice(0, count);
  }

  // ─── Main entry point ────────────────────────────────────
  async function getQuestions(grade, category, count) {
    grade = parseInt(grade) || 4;
    category = category || 'mixed';
    count = count || 10;

    let questions = [];

    // 1) Start with local curated bank (40% of count)
    const localCount = Math.ceil(count * 0.4);
    const localQs = getLocalQuestions(grade, category, localCount);
    questions.push(...localQs);

    // 2) Generate dynamic questions (40% of count)
    const genCount = Math.ceil(count * 0.4);
    const genQs = generateQuestions(grade, category, genCount);
    questions.push(...genQs);

    // 3) Try external APIs for remaining (20% of count)
    const apiCount = Math.max(2, count - questions.length);
    try {
      const diff = grade <= 3 ? 'easy' : grade <= 6 ? 'medium' : 'hard';
      const apiQs = await fetchOpenTDB(apiCount, diff);
      questions.push(...apiQs);
    } catch (e) { /* API failed, no problem */ }

    // 4) If still short, generate more
    while (questions.length < count) {
      const extra = generateQuestions(grade, category, count - questions.length);
      questions.push(...extra);
      if (extra.length === 0) break; // safety valve
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
