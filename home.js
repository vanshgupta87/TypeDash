
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        const textDisplay = document.getElementById('display-text');
        const input = document.getElementById('hidden-input');
        const timerEl = document.getElementById('timer');
        const wpmEl = document.getElementById('wpm');
        const accEl = document.getElementById('accuracy');
        const modal = document.getElementById('results-modal');
        const zenBtn = document.getElementById('zen-btn');

        let duration = 30;
        let timeLeft = 30;
        let timer = null;
        let isStarted = false;
        let currentMode = 'easy';
        let zenMode = false;
        let totalCorrectChars = 0;
        let totalTypedChars = 0;
        // For changing sentences 
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
        let blobs = [];
        function initBg() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            blobs = [];
            for(let i=0; i<3; i++) {
                blobs.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    r: Math.random() * 300 + 300
                });
            }
        }

        function drawBg() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'blur(100px)';
            blobs.forEach(b => {
                b.x += b.vx; b.y += b.vy;
                if(b.x < -b.r) b.x = canvas.width + b.r; if(b.x > canvas.width + b.r) b.x = -b.r;
                if(b.y < -b.r) b.y = canvas.height + b.r; if(b.y > canvas.height + b.r) b.y = -b.r;
                const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                grad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
                grad.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
            });
            ctx.filter = 'none';
            requestAnimationFrame(drawBg);
        }
        function loadQuote() {
            const quotes = library[currentMode];
            const q = quotes[Math.floor(Math.random() * quotes.length)];
            textDisplay.innerHTML = q.split('').map((char, i) => 
                `<span class="char ${i===0?'current':''}" data-char="${char}">${char}</span>`
            ).join('');
        }

        input.addEventListener('input', () => {
            if(!isStarted && input.value.length > 0) startTest();
            if(zenMode && input.value.length > 0) {
                document.body.classList.add('is-typing');
            }

            const chars = textDisplay.querySelectorAll('.char');
            const val = input.value.split('');
            let currentCorrect = 0;

            chars.forEach((span, i) => {
                const char = val[i];
                span.classList.remove('current', 'correct', 'incorrect');
                if (char == null) {
                    if(i === val.length) span.classList.add('current');
                } else if (char === span.getAttribute('data-char')) {
                    span.classList.add('correct');
                    currentCorrect++;
                } else {
                    span.classList.add('incorrect');
                }
            });

            const elapsed = (duration - timeLeft) / 60;
            const wpm = elapsed > 0 ? Math.round(((totalCorrectChars + currentCorrect) / 5) / elapsed) : 0;
            wpmEl.innerText = wpm;
            
            const accuracy = (totalTypedChars + val.length) > 0 
                ? Math.round(((totalCorrectChars + currentCorrect) / (totalTypedChars + val.length)) * 100) 
                : 100;
            accEl.innerText = accuracy;

            document.getElementById('prof-wpm').innerText = wpm;
            document.getElementById('prof-acc').innerText = accuracy + "%";

            if(val.length >= chars.length) { 
                totalCorrectChars += currentCorrect;
                totalTypedChars += val.length;
                input.value = ''; 
                loadQuote(); 
            }
        });

        function startTest() {
            isStarted = true;
            timer = setInterval(() => {
                timeLeft--;
                timerEl.innerText = timeLeft;
                if(timeLeft <= 0) endTest();
            }, 1000);
        }

        function endTest() {
            clearInterval(timer);
            document.body.classList.remove('is-typing');
            document.getElementById('final-wpm').innerText = wpmEl.innerText + " WPM";
            document.getElementById('final-acc').innerText = "Accuracy: " + accEl.innerText + "%";
            modal.style.display = 'flex';
            input.blur();
        }

        function resetTest() {
            clearInterval(timer);
            isStarted = false;
            timeLeft = duration;
            totalCorrectChars = 0;
            totalTypedChars = 0;
            timerEl.innerText = timeLeft;
            wpmEl.innerText = '0';
            accEl.innerText = '100';
            input.value = '';
            modal.style.display = 'none';
            document.body.classList.remove('is-typing');
            loadQuote();
            input.focus();
        }

        function closeModal() { resetTest(); }

        function toggleProfile() {
            const overlay = document.getElementById('profile-overlay');
            overlay.style.display = (overlay.style.display === 'flex') ? 'none' : 'flex';
        }

        function updateName(val) {
            const initial = val.charAt(0).toUpperCase() || '?';
            document.getElementById('nav-username').innerText = val || 'Guest';
            document.getElementById('nav-avatar').innerText = initial;
            document.getElementById('card-avatar').innerText = initial;
        }
        document.getElementById('time-selector').addEventListener('click', (e) => {
            if(e.target.dataset.val) {
                duration = timeLeft = parseInt(e.target.dataset.val);
                document.querySelectorAll('#time-selector .btn-toggle').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active'); resetTest();
            }
        });

        document.getElementById('mode-selector').addEventListener('click', (e) => {
            if(e.target.dataset.mode) {
                currentMode = e.target.dataset.mode;
                document.querySelectorAll('#mode-selector .btn-toggle').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active'); resetTest();
            }
        });

        document.addEventListener('keydown', (e) => { 
            if(e.key === 'Enter') resetTest(); 
            if(e.key === 'Escape' && zenMode) toggleZen();
        });

        document.addEventListener('click', (e) => { 
            if(modal.style.display !== 'flex' && !document.getElementById('profile-overlay').contains(e.target) && !e.target.closest('.profile-trigger')) {
                input.focus();
            }
        });
        
        initBg(); drawBg(); loadQuote();