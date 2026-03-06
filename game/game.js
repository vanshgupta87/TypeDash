const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        const textDisplay = document.getElementById('display-text');
        const input = document.getElementById('hidden-input');
        const timerEl = document.getElementById('timer');
        const wpmEl = document.getElementById('wpm');
        const accEl = document.getElementById('accuracy');

        let duration = 30, timeLeft = 30, timer = null, isStarted = false;
        let currentPlayer = 1, currentMode = 'easy';
        let names = { p1: "", p2: "" }, results = { p1: {}, p2: {} };
        let totalCorrect = 0, totalTyped = 0;

        const library = {
            easy: [
            "Typing in silence with calm focus and steady rhythm.",
            "Soft keys, smooth flow, and a peaceful typing pace.",      
            "Quiet mind, fast fingers, and clean typing lines.",
            "Smooth typing with calm energy and simple focus.",
            "A steady rhythm flowing through every key press.",
            "Fast fingers moving with quiet confidence.",
            "Simple words typed with smooth and gentle speed.",
            "Calm thoughts turning into quick lines of text.",  
            "A peaceful rhythm guiding every keystroke.",
            "Light hands typing with smooth effortless flow.",
            "Focused mind and fingers moving like soft waves.",
            "Clean typing with a calm and steady pace.",
            "Quiet productivity flowing through every sentence.",
            "Gentle focus creating smooth lines of text.",
            "Fast typing with calm energy and clear thoughts."
            ],
            medium: [
            "A calm mind creates smooth typing. Every word flows like a quiet rhythm on the keyboard.", 
            "Typing is a dance of fingers and thoughts, where focus leads to a seamless flow of words on the screen.", 
            "In the quiet moments of typing, a focused mind can achieve a rhythm that turns keystrokes into a symphony of productivity.",
            "The art of typing is not just speed, but the harmony of mind and fingers working together to create a steady flow of ideas.",
            "With each keystroke, a calm focus can transform the act of typing into a meditative rhythm that enhances both speed and accuracy.",
            "Typing is a journey of concentration and flow, where a quiet mind can lead to a seamless connection between thoughts and the keyboard.",
            "The rhythm of typing is a reflection of the mind's focus, where a calm and steady approach can turn words into a smooth and efficient stream of productivity.",
            "In the world of typing, a focused mind can create a rhythm that allows for both speed and precision, turning the act of typing into a harmonious dance of fingers and thoughts.",
            "The beauty of typing lies in the balance between speed and focus, where a calm mind can guide the fingers to create a rhythm that transforms keystrokes into a powerful tool for communication and creativity.",
            ],
            hard: [
            "Consistent typing practice develops precision, rhythm, and accuracy over time.Fast typists rely on muscle memory rather than conscious thinking.Every keystroke becomes a natural response to the flow of language.Patience and discipline quietly transform effort into effortless speed.",
             "Productive focus emerges when distractions slowly fade into silence.The keyboard becomes a medium where thoughts convert into structured words.With continuous repetition, coordination between mind and fingers strengthens.Eventually typing becomes an intuitive extension of clear thinking.",
             "Wisdom often grows from reflection rather than endless reaction.The patient thinker observes carefully before choosing meaningful action.Integrity becomes visible when choices align with quiet inner values.Character is built slowly through thousands of small, honest decisions.",
             "Growth begins when curiosity becomes stronger than the fear of failure.Every mistake contains a hidden lesson waiting for calm understanding.The resilient mind studies setbacks instead ofescaping from them.Through reflection and courage, limitations slowly evolve into strength."
             ]
        };

        function startDuel() {
            names.p1 = document.getElementById('p1-name').value || "Player 1";
            names.p2 = document.getElementById('p2-name').value || "Player 2";
            document.getElementById('setup-modal').style.display = 'none';
            resetRound();
        }

        function loadQuote() {
            const pool = library[currentMode];
            const q = pool[Math.floor(Math.random() * pool.length)];
            textDisplay.innerHTML = q.split('').map((c, i) => 
                `<span class="char ${i===0?'current':''}" data-char="${c}">${c}</span>`
            ).join('');
        }

        input.addEventListener('input', () => {
            if(!isStarted && input.value.length > 0) startTimer();
            const chars = textDisplay.querySelectorAll('.char');
            const val = input.value.split('');
            let currentCorrect = 0;
            chars.forEach((span, i) => {
                span.classList.remove('current', 'correct', 'incorrect');
                if (val[i] == null) {
                    if (i === val.length) span.classList.add('current');
                } else if (val[i] === span.getAttribute('data-char')) {
                    span.classList.add('correct');
                    currentCorrect++;
                } else {
                    span.classList.add('incorrect');
                }
            });
            const elapsed = (duration - timeLeft) / 60;
            const wpm = elapsed > 0 ? Math.round(((totalCorrect + currentCorrect) / 5) / elapsed) : 0;
            const acc = (totalTyped + val.length) > 0 ? Math.round(((totalCorrect + currentCorrect) / (totalTyped + val.length)) * 100) : 100;
            wpmEl.innerText = wpm;
            accEl.innerText = acc;
            if(val.length >= chars.length) {
                totalCorrect += currentCorrect;
                totalTyped += val.length;
                input.value = '';
                loadQuote();
            }
        });

        function startTimer() {
            isStarted = true;
            timer = setInterval(() => {
                timeLeft--;
                timerEl.innerText = timeLeft;
                if(timeLeft <= 0) endTurn();
            }, 1000);
        }

        function endTurn() {
            clearInterval(timer);
            isStarted = false;
            const wpm = parseInt(wpmEl.innerText);
            if(currentPlayer === 1) {
                results.p1 = { wpm };
                currentPlayer = 2;
                setTimeout(resetRound, 1000);
            } else {
                results.p2 = { wpm };
                showFinalResults();
            }
        }

        function resetRound() {
    totalCorrect = 0; 
    totalTyped = 0; 
    timeLeft = duration;
    timerEl.innerText = timeLeft;
    wpmEl.innerText = '0'; 
    accEl.innerText = '100';
    input.value = '';
    const isP1 = (currentPlayer === 1);
    const activeName = isP1 ? names.p1 : names.p2;
    document.body.className = isP1 ? 'p1-active' : 'p2-active';
    document.getElementById('turn-display').innerText = `${activeName.toUpperCase()} TURN`;
    
    loadQuote();
    input.focus();
}
        function showFinalResults() {
            document.getElementById('results-modal').style.display = 'flex';
            document.getElementById('res-name-p1').innerText = names.p1;
            document.getElementById('res-name-p2').innerText = names.p2;
            document.getElementById('res-wpm-p1').innerText = results.p1.wpm;
            document.getElementById('res-wpm-p2').innerText = results.p2.wpm;
            const winTxt = document.getElementById('winner-text');
            if(results.p1.wpm > results.p2.wpm) {
                winTxt.innerText = `${names.p1} Wins!`;
                confetti({ colors: ['#ff2d55', '#ffffff'] });
            } else if(results.p2.wpm > results.p1.wpm) {
                winTxt.innerText = `${names.p2} Wins!`;
                confetti({ colors: ['#00d2ff', '#ffffff'] });
            } else {
                winTxt.innerText = "It's a Draw!";
            }
        }

        let blobs = [];
        function initBg() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            blobs = [];
            for(let i=0; i<3; i++) {
                blobs.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
                    r: Math.random() * 300 + 300
                });
            }
        }
        function drawBg() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'blur(100px)';
            blobs.forEach(b => {
                b.x += b.vx; b.y += b.vy;
                const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                grad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
                grad.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(drawBg);
        }

        document.getElementById('time-selector').addEventListener('click', e => {
            if(e.target.dataset.val && !isStarted) {
                duration = timeLeft = parseInt(e.target.dataset.val);
                document.querySelectorAll('#time-selector .btn-toggle').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                timerEl.innerText = timeLeft;
            }
        });

        document.getElementById('mode-selector').addEventListener('click', e => {
            if(e.target.dataset.mode && !isStarted) {
                currentMode = e.target.dataset.mode;
                document.querySelectorAll('#mode-selector .btn-toggle').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                loadQuote();
            }
        });

        window.addEventListener('resize', initBg);
        document.addEventListener('click', () => {
            if(document.getElementById('setup-modal').style.display === 'none' && 
               document.getElementById('results-modal').style.display === 'none') {
                input.focus();
            }
        });

        initBg(); drawBg(); loadQuote();