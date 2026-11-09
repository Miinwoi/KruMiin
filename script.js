'use strict';

const questions = [
  {q:'ข้อใดเป็นเงื่อนไขของฐาน a ในฟังก์ชัน f(x) = aˣ',o:['a > 0 และ a ≠ 1','a < 0 และ a ≠ 1','a เป็นจำนวนจริงใด ๆ','a = 1 เท่านั้น'],a:0,e:'ฐานของฟังก์ชันเอกซ์โพเนนเชียลต้องเป็นจำนวนจริงบวกและไม่เท่ากับ 1'},
  {q:'ถ้า f(x) = 3ˣ แล้ว f(0) มีค่าเท่าใด',o:['0','1','3','−1'],a:1,e:'3⁰ = 1 ดังนั้น f(0) = 1'},
  {q:'ฟังก์ชัน y = (1/2)ˣ มีลักษณะกราฟอย่างไร',o:['เป็นฟังก์ชันเพิ่ม','เป็นฟังก์ชันลด','เป็นเส้นตรง','ไม่มีกราฟ'],a:1,e:'เมื่อฐานอยู่ระหว่าง 0 กับ 1 ฟังก์ชันเอกซ์โพเนนเชียลจะเป็นฟังก์ชันลด'},
  {q:'เรนจ์ของฟังก์ชัน f(x) = 5ˣ คือข้อใด',o:['จำนวนจริงทั้งหมด','y ≥ 0','y > 0','y ≠ 0'],a:2,e:'ค่า aˣ เป็นบวกเสมอเมื่อ a > 0 จึงมีเรนจ์เป็นจำนวนจริงบวก'},
  {q:'ถ้า 2³ = 8 เขียนในรูปลอการิทึมได้อย่างไร',o:['log₃ 8 = 2','log₂ 8 = 3','log₈ 2 = 3','log₂ 3 = 8'],a:1,e:'จาก aʸ = x เขียนได้เป็น logₐ x = y ดังนั้น log₂ 8 = 3'},
  {q:'ค่าของ log₅ 1 เท่ากับเท่าใด',o:['0','1','5','−1'],a:0,e:'เพราะ 5⁰ = 1 ดังนั้น log₅ 1 = 0'},
  {q:'ค่าของ log₇ 7 เท่ากับเท่าใด',o:['0','1','7','49'],a:1,e:'เพราะ 7¹ = 7 ดังนั้น log₇ 7 = 1'},
  {q:'ค่าของ log₂ 4 + log₂ 8 เท่ากับเท่าใด',o:['3','4','5','6'],a:2,e:'log₂ 4 = 2 และ log₂ 8 = 3 ดังนั้นผลรวมเท่ากับ 5'},
  {q:'ข้อใดเป็นเงื่อนไขของจำนวน x ใน log₃ x',o:['x < 0','x ≥ 0','x > 0','x เป็นจำนวนจริงใด ๆ'],a:2,e:'จำนวนภายในลอการิทึมต้องเป็นจำนวนจริงบวก จึงต้องมี x > 0'},
  {q:'ฟังก์ชันเอกซ์โพเนนเชียลและฟังก์ชันลอการิทึมมีความสัมพันธ์กันอย่างไร',o:['เป็นฟังก์ชันเดียวกัน','เป็นฟังก์ชันผกผันกัน','ไม่มีความสัมพันธ์กัน','เป็นฟังก์ชันคงตัว'],a:1,e:'ลอการิทึมเป็นฟังก์ชันผกผันของเอกซ์โพเนนเชียล โดย bˣ = y ก็ต่อเมื่อ logᵦ y = x'}
];

const state = { current: 0, answers: Array(questions.length).fill(null), submitted: false };
const $ = (id) => document.getElementById(id);

function renderQuestion() {
  const q = questions[state.current];
  $('progressText').textContent = `ข้อ ${state.current + 1} จาก ${questions.length}`;
  $('answeredText').textContent = `ตอบแล้ว ${state.answers.filter(v => v !== null).length}/${questions.length}`;
  $('progressFill').style.width = `${((state.current + 1) / questions.length) * 100}%`;
  $('quizContent').innerHTML = `
    <div class="question-count">QUESTION ${String(state.current + 1).padStart(2, '0')}</div>
    <h3 class="question-text">${q.q}</h3>
    <div class="answers">${q.o.map((option, i) => `
      <label class="answer-option ${state.answers[state.current] === i ? 'selected' : ''}">
        <input type="radio" name="answer" value="${i}" ${state.answers[state.current] === i ? 'checked' : ''}>
        <span>${String.fromCharCode(65 + i)}.</span><span>${option}</span>
      </label>`).join('')}
    </div>`;
  $('quizContent').querySelectorAll('input[name="answer"]').forEach(input => {
    input.addEventListener('change', event => {
      state.answers[state.current] = Number(event.target.value);
      renderQuestion();
    });
  });
  $('prevBtn').disabled = state.current === 0;
  $('nextBtn').hidden = state.current === questions.length - 1;
  $('submitBtn').hidden = state.current !== questions.length - 1;
  $('quizResult').hidden = true;
}

function submitQuiz() {
  if (state.answers.some(answer => answer === null)) {
    const firstMissing = state.answers.findIndex(answer => answer === null);
    state.current = firstMissing;
    renderQuestion();
    $('quizContent').insertAdjacentHTML('afterbegin', '<p class="validation-message" style="color:#bd6b50;font-size:11px">กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ</p>');
    return;
  }
  state.submitted = true;
  const score = state.answers.reduce((total, answer, i) => total + (answer === questions[i].a ? 1 : 0), 0);
  const details = questions.map((q, i) => {
    const correct = state.answers[i] === q.a;
    return `<div class="review-item ${correct ? 'correct' : 'incorrect'}"><b>${correct ? '✓ ถูกต้อง' : '✕ ยังไม่ถูกต้อง'} — ข้อ ${i + 1}</b>คำตอบที่ถูก: ${String.fromCharCode(65 + q.a)}. ${q.o[q.a]}<br>${q.e}</div>`;
  }).join('');
  $('quizResult').innerHTML = `<div class="result-score">${score} / ${questions.length} คะแนน</div><p>${score >= 8 ? 'ยอดเยี่ยม! คุณเข้าใจเนื้อหาได้ดี' : score >= 5 ? 'ทำได้ดี ลองทบทวนข้อที่ผิดเพื่อเพิ่มความแม่นยำ' : 'ลองกลับไปทบทวนบทเรียน แล้วทำแบบทดสอบอีกครั้งนะ'}</p><button class="btn btn-primary" id="retryBtn" type="button">ทำแบบทดสอบอีกครั้ง ↻</button><div class="review-list">${details}</div>`;
  $('quizResult').hidden = false;
  $('submitBtn').hidden = true;
  $('nextBtn').hidden = true;
  $('prevBtn').disabled = true;
  $('quizResult').scrollIntoView({behavior:'smooth', block:'start'});
  $('retryBtn').addEventListener('click', resetQuiz);
}

function resetQuiz() {
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  state.submitted = false;
  $('quizResult').hidden = true;
  renderQuestion();
}

$('prevBtn').addEventListener('click', () => {
  if (state.current > 0) { state.current--; renderQuestion(); }
});
$('nextBtn').addEventListener('click', () => {
  if (state.current < questions.length - 1) { state.current++; renderQuestion(); }
});
$('submitBtn').addEventListener('click', submitQuiz);

const menuToggle = $('menuToggle');
const mainNav = $('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
});
document.querySelectorAll('.nav-link, .main-nav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const backToTop = $('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 400), {passive:true});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

renderQuestion();
