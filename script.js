// ฟังก์ชันสำหรับจำนวนเชิงซ้อน
function generateComplexNumber() {
    const real = Math.floor(Math.random() * 20) - 10;
    const imag = Math.floor(Math.random() * 20) - 10;
    return { real, imag };
}

function formatComplexNumber(num) {
    if (num.imag === 0) return `${num.real}`;
    if (num.real === 0) return num.imag === 1 ? 'i' : num.imag === -1 ? '-i' : `${num.imag}i`;
    return `${num.real} ${num.imag >= 0 ? '+' : '-'} ${Math.abs(num.imag) === 1 ? '' : Math.abs(num.imag)}i`;
}

// ฟังก์ชันสำหรับความน่าจะเป็น
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
}

// ฟังก์ชันสร้างโจทย์
function generateQuestion(topic) {
    if (topic === 'complex') {
        return generateComplexQuestion();
    } else {
        return generateProbabilityQuestion();
    }
}

function generateComplexQuestion() {
    const types = ['addition', 'multiplication', 'conjugate', 'modulus'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'addition':
            const z1 = generateComplexNumber();
            const z2 = generateComplexNumber();
            const result = { real: z1.real + z2.real, imag: z1.imag + z2.imag };
            return {
                question: `จงหาผลบวกของ z₁ = ${formatComplexNumber(z1)} และ z₂ = ${formatComplexNumber(z2)}`,
                answer: formatComplexNumber(result),
                solution: `วิธีทำ:
1. แยกส่วนจริงและส่วนจินตภาพของทั้งสองจำนวน
2. บวกส่วนจริงเข้าด้วยกัน และบวกส่วนจินตภาพเข้าด้วยกัน

z₁ = ${formatComplexNumber(z1)}
z₂ = ${formatComplexNumber(z2)}

ส่วนจริง: ${z1.real} + (${z2.real}) = ${result.real}
ส่วนจินตภาพ: ${z1.imag}i + (${z2.imag}i) = ${result.imag}i

ดังนั้น z₁ + z₂ = ${formatComplexNumber(result)}`
            };
        case 'multiplication':
            const m1 = generateComplexNumber();
            const m2 = generateComplexNumber();
            const mResult = {
                real: m1.real * m2.real - m1.imag * m2.imag,
                imag: m1.real * m2.imag + m1.imag * m2.real
            };
            return {
                question: `จงหาผลคูณของ z₁ = ${formatComplexNumber(m1)} และ z₂ = ${formatComplexNumber(m2)}`,
                answer: formatComplexNumber(mResult),
                solution: `วิธีทำ:
1. ใช้สูตร (a + bi)(c + di) = (ac - bd) + (ad + bc)i
2. แทนค่า a = ${m1.real}, b = ${m1.imag}, c = ${m2.real}, d = ${m2.imag}

z₁ = ${formatComplexNumber(m1)}
z₂ = ${formatComplexNumber(m2)}

ส่วนจริง: (${m1.real} × ${m2.real}) - (${m1.imag} × ${m2.imag}) = ${mResult.real}
ส่วนจินตภาพ: (${m1.real} × ${m2.imag}) + (${m1.imag} × ${m2.real}) = ${mResult.imag}

ดังนั้น z₁ × z₂ = ${formatComplexNumber(mResult)}`
            };
        case 'conjugate':
            const z = generateComplexNumber();
            const conjugate = { real: z.real, imag: -z.imag };
            return {
                question: `จงหาคอนจูเกตของ z = ${formatComplexNumber(z)}`,
                answer: formatComplexNumber(conjugate),
                solution: `วิธีทำ:
1. คอนจูเกตของจำนวนเชิงซ้อน a + bi คือ a - bi
2. เปลี่ยนเครื่องหมายของส่วนจินตภาพ

z = ${formatComplexNumber(z)}
คอนจูเกตของ z = ${z.real} ${z.imag >= 0 ? '-' : '+'} ${Math.abs(z.imag)}i

ดังนั้น คอนจูเกตของ z คือ ${formatComplexNumber(conjugate)}`
            };
        case 'modulus':
            const mod = generateComplexNumber();
            const modulus = Math.sqrt(mod.real * mod.real + mod.imag * mod.imag);
            return {
                question: `จงหามอดูลัสของ z = ${formatComplexNumber(mod)}`,
                answer: modulus.toFixed(2),
                solution: `วิธีทำ:
1. ใช้สูตร |a + bi| = √(a² + b²)
2. แทนค่า a = ${mod.real}, b = ${mod.imag}

z = ${formatComplexNumber(mod)}
|z| = √((${mod.real})² + (${mod.imag})²)
   = √(${mod.real * mod.real} + ${mod.imag * mod.imag})
   = √${mod.real * mod.real + mod.imag * mod.imag}
   = ${modulus.toFixed(2)}

ดังนั้น มอดูลัสของ z คือ ${modulus.toFixed(2)}`
            };
    }
}

function generateProbabilityQuestion() {
    const total = Math.floor(Math.random() * 50) + 10;
    const favorable = Math.floor(Math.random() * total) + 1;
    const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(favorable, total);
    return {
        question: `ในกล่องใบหนึ่งมีลูกบอลทั้งหมด ${total} ลูก เป็นลูกบอลสีแดง ${favorable} ลูก ถ้าสุ่มหยิบลูกบอล 1 ลูก โอกาสที่จะได้ลูกบอลสีแดงเป็นเท่าไร?`,
        answer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        solution: `วิธีทำ:
1. จำนวนผลลัพธ์ทั้งหมดที่เป็นไปได้ = ${total}
2. จำนวนผลลัพธ์ที่เราสนใจ (ลูกบอลสีแดง) = ${favorable}
3. ความน่าจะเป็น = จำนวนผลลัพธ์ที่เราสนใจ / จำนวนผลลัพธ์ทั้งหมดที่เป็นไปได้
   = ${favorable} / ${total}
   = ${simplifiedNumerator}/${simplifiedDenominator} (ทำให้เศษส่วนอยู่ในรูปอย่างต่ำ)

ดังนั้น โอกาสที่จะได้ลูกบอลสีแดงคือ ${simplifiedNumerator}/${simplifiedDenominator}`
    };
}

// การทำงานของหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    const topicSelect = document.getElementById('topic-select');
    const questionElement = document.getElementById('question');
    const generateBtn = document.getElementById('generate-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');
    const answerSection = document.getElementById('answer-section');
    const answerElement = document.getElementById('answer');
    const solutionElement = document.getElementById('solution');

    let currentQuestion = null;

    function updateQuestion() {
        currentQuestion = generateQuestion(topicSelect.value);
        questionElement.textContent = currentQuestion.question;
        answerSection.style.display = 'none';
        showAnswerBtn.disabled = false;
    }

    generateBtn.addEventListener('click', updateQuestion);

    showAnswerBtn.addEventListener('click', () => {
        answerElement.textContent = `คำตอบ: ${currentQuestion.answer}`;
        solutionElement.textContent = currentQuestion.solution;
        answerSection.style.display = 'block';
        showAnswerBtn.disabled = true;
    });

    topicSelect.addEventListener('change', updateQuestion);

    // สร้างโจทย์แรกเมื่อโหลดหน้า
    updateQuestion();
});// เพิ่มต่อจาก JavaScript เดิม

document.addEventListener('DOMContentLoaded', () => {
    // ... (โค้ดเดิม)

    const difficultyButtons = document.querySelectorAll('.difficulty-btn');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // ตอนนี้เราไม่ได้ใช้ค่าความยาก แต่เราสามารถเพิ่มฟังก์ชันการทำงานในอนาคตได้
            // const difficulty = button.id.replace('-btn', '');
            // console.log('Selected difficulty:', difficulty);
        });
    });

    // ... (โค้ดเดิม)
});
// ตัวแปรสำหรับเก็บระดับความยาก
let currentDifficulty = 'easy';

// ฟังก์ชันสำหรับจำนวนเชิงซ้อน
function generateComplexNumber(difficulty) {
    let range;
    switch (difficulty) {
        case 'easy':
            range = 10;
            break;
        case 'medium':
            range = 20;
            break;
        case 'hard':
            range = 50;
            break;
    }
    const real = Math.floor(Math.random() * range * 2) - range;
    const imag = Math.floor(Math.random() * range * 2) - range;
    return { real, imag };
}

function formatComplexNumber(num) {
    if (num.imag === 0) return `${num.real}`;
    if (num.real === 0) return num.imag === 1 ? 'i' : num.imag === -1 ? '-i' : `${num.imag}i`;
    return `${num.real} ${num.imag >= 0 ? '+' : '-'} ${Math.abs(num.imag) === 1 ? '' : Math.abs(num.imag)}i`;
}

// ฟังก์ชันสำหรับความน่าจะเป็น
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / divisor, denominator / divisor];
}

// ฟังก์ชันสร้างโจทย์
function generateQuestion(topic, difficulty) {
    if (topic === 'complex') {
        return generateComplexQuestion(difficulty);
    } else {
        return generateProbabilityQuestion(difficulty);
    }
}

function generateComplexQuestion(difficulty) {
    const types = ['addition', 'multiplication', 'conjugate', 'modulus'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
        case 'addition':
            const z1 = generateComplexNumber(difficulty);
            const z2 = generateComplexNumber(difficulty);
            const result = { real: z1.real + z2.real, imag: z1.imag + z2.imag };
            return {
                question: `จงหาผลบวกของ z₁ = ${formatComplexNumber(z1)} และ z₂ = ${formatComplexNumber(z2)}`,
                answer: formatComplexNumber(result),
                solution: `วิธีทำ:
1. แยกส่วนจริงและส่วนจินตภาพของทั้งสองจำนวน
2. บวกส่วนจริงเข้าด้วยกัน และบวกส่วนจินตภาพเข้าด้วยกัน

z₁ = ${formatComplexNumber(z1)}
z₂ = ${formatComplexNumber(z2)}

ส่วนจริง: ${z1.real} + (${z2.real}) = ${result.real}
ส่วนจินตภาพ: ${z1.imag}i + (${z2.imag}i) = ${result.imag}i

ดังนั้น z₁ + z₂ = ${formatComplexNumber(result)}`
            };
        case 'multiplication':
            const m1 = generateComplexNumber(difficulty);
            const m2 = generateComplexNumber(difficulty);
            const mResult = {
                real: m1.real * m2.real - m1.imag * m2.imag,
                imag: m1.real * m2.imag + m1.imag * m2.real
            };
            return {
                question: `จงหาผลคูณของ z₁ = ${formatComplexNumber(m1)} และ z₂ = ${formatComplexNumber(m2)}`,
                answer: formatComplexNumber(mResult),
                solution: `วิธีทำ:
1. ใช้สูตร (a + bi)(c + di) = (ac - bd) + (ad + bc)i
2. แทนค่า a = ${m1.real}, b = ${m1.imag}, c = ${m2.real}, d = ${m2.imag}

z₁ = ${formatComplexNumber(m1)}
z₂ = ${formatComplexNumber(m2)}

ส่วนจริง: (${m1.real} × ${m2.real}) - (${m1.imag} × ${m2.imag}) = ${mResult.real}
ส่วนจินตภาพ: (${m1.real} × ${m2.imag}) + (${m1.imag} × ${m2.real}) = ${mResult.imag}

ดังนั้น z₁ × z₂ = ${formatComplexNumber(mResult)}`
            };
        case 'conjugate':
            const z = generateComplexNumber(difficulty);
            const conjugate = { real: z.real, imag: -z.imag };
            return {
                question: `จงหาคอนจูเกตของ z = ${formatComplexNumber(z)}`,
                answer: formatComplexNumber(conjugate),
                solution: `วิธีทำ:
1. คอนจูเกตของจำนวนเชิงซ้อน a + bi คือ a - bi
2. เปลี่ยนเครื่องหมายของส่วนจินตภาพ

z = ${formatComplexNumber(z)}
คอนจูเกตของ z = ${z.real} ${z.imag >= 0 ? '-' : '+'} ${Math.abs(z.imag)}i

ดังนั้น คอนจูเกตของ z คือ ${formatComplexNumber(conjugate)}`
            };
        case 'modulus':
            const mod = generateComplexNumber(difficulty);
            const modulus = Math.sqrt(mod.real * mod.real + mod.imag * mod.imag);
            return {
                question: `จงหามอดูลัสของ z = ${formatComplexNumber(mod)}`,
                answer: modulus.toFixed(2),
                solution: `วิธีทำ:
1. ใช้สูตร |a + bi| = √(a² + b²)
2. แทนค่า a = ${mod.real}, b = ${mod.imag}

z = ${formatComplexNumber(mod)}
|z| = √((${mod.real})² + (${mod.imag})²)
   = √(${mod.real * mod.real} + ${mod.imag * mod.imag})
   = √${mod.real * mod.real + mod.imag * mod.imag}
   = ${modulus.toFixed(2)}

ดังนั้น มอดูลัสของ z คือ ${modulus.toFixed(2)}`
            };
    }
}

function generateProbabilityQuestion(difficulty) {
    let total, favorable;
    switch (difficulty) {
        case 'easy':
            total = Math.floor(Math.random() * 20) + 10;
            break;
        case 'medium':
            total = Math.floor(Math.random() * 50) + 20;
            break;
        case 'hard':
            total = Math.floor(Math.random() * 100) + 50;
            break;
    }
    favorable = Math.floor(Math.random() * total) + 1;
    const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(favorable, total);
    return {
        question: `ในกล่องใบหนึ่งมีลูกบอลทั้งหมด ${total} ลูก เป็นลูกบอลสีแดง ${favorable} ลูก ถ้าสุ่มหยิบลูกบอล 1 ลูก โอกาสที่จะได้ลูกบอลสีแดงเป็นเท่าไร?`,
        answer: `${simplifiedNumerator}/${simplifiedDenominator}`,
        solution: `วิธีทำ:
1. จำนวนผลลัพธ์ทั้งหมดที่เป็นไปได้ = ${total}
2. จำนวนผลลัพธ์ที่เราสนใจ (ลูกบอลสีแดง) = ${favorable}
3. ความน่าจะเป็น = จำนวนผลลัพธ์ที่เราสนใจ / จำนวนผลลัพธ์ทั้งหมดที่เป็นไปได้
   = ${favorable} / ${total}
   = ${simplifiedNumerator}/${simplifiedDenominator} (ทำให้เศษส่วนอยู่ในรูปอย่างต่ำ)

ดังนั้น โอกาสที่จะได้ลูกบอลสีแดงคือ ${simplifiedNumerator}/${simplifiedDenominator}`
    };
}

// การทำงานของหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    const topicSelect = document.getElementById('topic-select');
    const questionElement = document.getElementById('question');
    const generateBtn = document.getElementById('generate-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');
    const answerSection = document.getElementById('answer-section');
    const answerElement = document.getElementById('answer');
    const solutionElement = document.getElementById('solution');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');

    let currentQuestion = null;

    function updateQuestion() {
        currentQuestion = generateQuestion(topicSelect.value, currentDifficulty);
        questionElement.textContent = currentQuestion.question;
        answerSection.style.display = 'none';
        showAnswerBtn.disabled = false;
    }

    generateBtn.addEventListener('click', updateQuestion);

    showAnswerBtn.addEventListener('click', () => {
        answerElement.textContent = `คำตอบ: ${currentQuestion.answer}`;
        solutionElement.textContent = currentQuestion.solution;
        answerSection.style.display = 'block';
        showAnswerBtn.disabled = true;
    });

    topicSelect.addEventListener('change', updateQuestion);

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentDifficulty = button.id.replace('-btn', '');
            updateQuestion();
        });
    });

    // สร้างโจทย์แรกเมื่อโหลดหน้า
    updateQuestion();
});
// ฟังก์ชันสุ่มตัวเลขในช่วงที่กำหนด
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ฟังก์ชันสร้างโจทย์จำนวนเชิงซ้อน
function generateComplexQuestion(difficulty) {
    const types = ['addition', 'multiplication', 'conjugate', 'modulus', 'equation'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let range, z1, z2, result;
    switch (difficulty) {
        case 'easy': range = 10; break;
        case 'medium': range = 20; break;
        case 'hard': range = 50; break;
    }

    function generateComplex() {
        return {
            real: randomInt(-range, range),
            imag: randomInt(-range, range)
        };
    }

    switch (type) {
        case 'addition':
            z1 = generateComplex();
            z2 = generateComplex();
            result = { real: z1.real + z2.real, imag: z1.imag + z2.imag };
            return {
                question: `จงหาผลบวกของ z₁ = ${formatComplex(z1)} และ z₂ = ${formatComplex(z2)}`,
                answer: formatComplex(result),
                solution: `z₁ + z₂ = (${z1.real} + ${z1.imag}i) + (${z2.real} + ${z2.imag}i) = ${result.real} + ${result.imag}i`
            };
        case 'multiplication':
            z1 = generateComplex();
            z2 = generateComplex();
            result = {
                real: z1.real * z2.real - z1.imag * z2.imag,
                imag: z1.real * z2.imag + z1.imag * z2.real
            };
            return {
                question: `จงหาผลคูณของ z₁ = ${formatComplex(z1)} และ z₂ = ${formatComplex(z2)}`,
                answer: formatComplex(result),
                solution: `z₁ × z₂ = (${z1.real} + ${z1.imag}i)(${z2.real} + ${z2.imag}i) = ${result.real} + ${result.imag}i`
            };
        case 'conjugate':
            z1 = generateComplex();
            result = { real: z1.real, imag: -z1.imag };
            return {
                question: `จงหาคอนจูเกตของ z = ${formatComplex(z1)}`,
                answer: formatComplex(result),
                solution: `คอนจูเกตของ ${formatComplex(z1)} คือ ${formatComplex(result)}`
            };
        case 'modulus':
            z1 = generateComplex();
            result = Math.sqrt(z1.real * z1.real + z1.imag * z1.imag);
            return {
                question: `จงหามอดูลัสของ z = ${formatComplex(z1)}`,
                answer: result.toFixed(2),
                solution: `|z| = √(${z1.real}² + ${z1.imag}²) = ${result.toFixed(2)}`
            };
        case 'equation':
            const a = randomInt(1, 5);
            const b = randomInt(-10, 10);
            const c = randomInt(-10, 10);
            return {
                question: `จงหาค่า z ที่ทำให้สมการ ${a}z² + ${b}z + ${c} = 0 เป็นจริง`,
                answer: "คำตอบขึ้นอยู่กับการคำนวณ",
                solution: `ใช้สูตร z = [-b ± √(b² - 4ac)] / (2a)\nแทนค่า a=${a}, b=${b}, c=${c}\nคำนวณและหาคำตอบ`
            };
    }
}

// ฟังก์ชันสร้างโจทย์ความน่าจะเป็น
function generateProbabilityQuestion(difficulty) {
    const types = ['simple', 'conditional', 'bayes', 'binomial'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let total, favorable, eventA, eventB;
    switch (difficulty) {
        case 'easy': 
            total = randomInt(10, 30);
            favorable = randomInt(1, total);
            break;
        case 'medium': 
            total = randomInt(30, 100);
            favorable = randomInt(1, total);
            break;
        case 'hard': 
            total = randomInt(100, 1000);
            favorable = randomInt(1, total);
            break;
    }

    switch (type) {
        case 'simple':
            return {
                question: `ในกล่องมีลูกบอล ${total} ลูก เป็นสีแดง ${favorable} ลูก ถ้าสุ่มหยิบ 1 ลูก โอกาสที่จะได้ลูกบอลสีแดงเป็นเท่าไร?`,
                answer: `${favorable}/${total}`,
                solution: `P(สีแดง) = จำนวนลูกบอลสีแดง / จำนวนลูกบอลทั้งหมด = ${favorable}/${total}`
            };
        case 'conditional':
            eventA = randomInt(1, total);
            eventB = randomInt(1, eventA);
            return {
                question: `ในการทดลองหนึ่ง โอกาสที่จะเกิดเหตุการณ์ A คือ ${eventA}/${total} และโอกาสที่จะเกิดทั้งเหตุการณ์ A และ B คือ ${eventB}/${total} จงหาความน่าจะเป็นที่จะเกิดเหตุการณ์ B เมื่อเกิดเหตุการณ์ A แล้ว`,
                answer: `${eventB}/${eventA}`,
                solution: `P(B|A) = P(A และ B) / P(A) = (${eventB}/${total}) / (${eventA}/${total}) = ${eventB}/${eventA}`
            };
        case 'bayes':
            const pA = randomInt(1, 10) / 10;
            const pBA = randomInt(1, 10) / 10;
            const pBnotA = randomInt(1, 10) / 10;
            return {
                question: `ให้ P(A) = ${pA.toFixed(1)}, P(B|A) = ${pBA.toFixed(1)}, และ P(B|not A) = ${pBnotA.toFixed(1)} จงหา P(A|B) โดยใช้ทฤษฎีบทของเบย์`,
                answer: "คำตอบขึ้นอยู่กับการคำนวณ",
                solution: `ใช้สูตร P(A|B) = [P(B|A) * P(A)] / [P(B|A) * P(A) + P(B|not A) * P(not A)]\nแทนค่าและคำนวณ`
            };
        case 'binomial':
            const n = randomInt(5, 20);
            const p = randomInt(1, 9) / 10;
            const k = randomInt(0, n);
            return {
                question: `ในการโยนเหรียญที่มีความน่าจะเป็นที่จะออกหัว ${p.toFixed(1)} จำนวน ${n} ครั้ง จงหาความน่าจะเป็นที่จะได้หัวพอดี ${k} ครั้ง`,
                answer: "คำตอบขึ้นอยู่กับการคำนวณ",
                solution: `ใช้สูตรการแจกแจงแบบทวินาม: P(X = k) = C(n,k) * p^k * (1-p)^(n-k)\nแทนค่า n=${n}, k=${k}, p=${p.toFixed(1)}\nคำนวณและหาคำตอบ`
            };
    }
}

// ฟังก์ชันหลักในการสร้างโจทย์
function generateQuestion(topic, difficulty) {
    switch (topic) {
        case 'complex':
            return generateComplexQuestion(difficulty);
        case 'probability':
            return generateProbabilityQuestion(difficulty);
        default:
            return { question: "เกิดข้อผิดพลาด", answer: "", solution: "" };
    }
}

// ฟังก์ชันช่วยในการ format จำนวนเชิงซ้อน
function formatComplex(z) {
    if (z.imag === 0) return `${z.real}`;
    if (z.real === 0) return z.imag === 1 ? 'i' : z.imag === -1 ? '-i' : `${z.imag}i`;
    return `${z.real} ${z.imag >= 0 ? '+' : '-'} ${Math.abs(z.imag) === 1 ? '' : Math.abs(z.imag)}i`;
}

// ส่วนของการทำงานของหน้าเว็บ (ใช้โค้ดเดิม)
document.addEventListener('DOMContentLoaded', () => {
    // ... (โค้ดเดิม)
});