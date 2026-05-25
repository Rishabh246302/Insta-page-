// =============================================================
// PREMIUM VIBE EXPERIENCE — Vanilla JavaScript only
// Keeps the same flow: index.html -> compliments.html -> instagram.html
// =============================================================

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');
    initParticles();
    initCursorGlow();
    initTiltCards();
    initHomePage();
    initComplimentsPage();
    initInstagramPage();
    initBackButtons();
  });

  function initParticles() {
    if (reducedMotion) return;
    var layer = document.getElementById('particleLayer');
    if (!layer) return;
    var count = window.innerWidth < 700 ? 28 : 58;
    layer.innerHTML = '';
    for (var i = 0; i < count; i++) {
      var p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.setProperty('--s', (Math.random() * 3.5 + 1.2) + 'px');
      p.style.setProperty('--o', (Math.random() * 0.48 + 0.16).toFixed(2));
      p.style.setProperty('--d', (Math.random() * 6 + 5) + 's');
      p.style.animationDelay = (Math.random() * 6) + 's';
      layer.appendChild(p);
    }
  }

  function initCursorGlow() {
    if (reducedMotion) return;
    var glow = document.getElementById('cursorGlow');
    if (!glow) return;
    document.addEventListener('pointermove', function (e) {
      glow.style.opacity = '1';
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  function initTiltCards() {
    if (reducedMotion) return;
    var cards = document.querySelectorAll('.tilt-card');
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var rotateY = ((x / rect.width) - 0.5) * 12;
        var rotateX = ((0.5 - y / rect.height)) * 12;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        card.style.transform = 'translateY(-12px) scale(1.025) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  function goWithTransition(url, color) {
    var transition = document.getElementById('pageTransition');
    if (!transition || reducedMotion) {
      window.location.href = url;
      return;
    }
    transition.style.setProperty('--transition-bg', color || '#080812');
    transition.classList.add('active');
    window.setTimeout(function () { window.location.href = url; }, 540);
  }

  function initHomePage() {
    var cards = document.querySelectorAll('[data-gender]');
    if (!cards.length) return;
    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        var gender = e.currentTarget.getAttribute('data-gender') || 'male';
        createBurst(e.clientX, e.clientY, gender === 'male' ? ['#38BDF8', '#C0C0C0', '#6D5DF5'] : ['#F9A8D4', '#C084FC', '#B76E79']);
        goWithTransition('compliments.html?gender=' + encodeURIComponent(gender), gender === 'male' ? '#050816' : '#FFF1F5');
      });
    });
  }

  var complimentData = {
    male: {
      bodyClass: 'male-theme',
      eyebrow: 'Bold luxury mode unlocked',
      greeting: 'Hey Handsome ✨',
      subtitle: 'Tap a card. Your confidence is about to get upgraded.',
      items: [
        { icon: '👑', text: 'You carry confidence like a crown.', pop: 'Royal energy detected 👑' },
        { icon: '⚡', text: 'Your calm power is louder than noise.', pop: 'Electric but classy ⚡' },
        { icon: '💎', text: 'You look like you make basic things feel premium.', pop: 'Diamond-level vibe 💎' },
        { icon: '🕶️', text: 'Your aura says: limited edition, no restock.', pop: 'Too rare to compare 😎' },
        { icon: '🔥', text: 'You enter the room and the room updates itself.', pop: 'Main character loading 🔥' },
        { icon: '🏆', text: 'Built different. Styled different. Winning quietly.', pop: 'Champion mode 🏆' }
      ]
    },
    female: {
      bodyClass: 'female-theme',
      eyebrow: 'Dreamy glow mode unlocked',
      greeting: 'Hey Beautiful ✨',
      subtitle: 'Tap a card. Your sparkle deserves a cinematic reveal.',
      items: [
        { icon: '✨', text: 'You shine with elegance that feels effortless.', pop: 'Glow level: unreal ✨' },
        { icon: '🦋', text: 'Soft, strong, unforgettable — that is your signature.', pop: 'Rare beauty energy 🦋' },
        { icon: '🌸', text: 'You make simple moments look Pinterest-worthy.', pop: 'Aesthetic queen 🌸' },
        { icon: '👑', text: 'Your grace is quiet, but your presence is iconic.', pop: 'Queen behavior 👑' },
        { icon: '💫', text: 'You light up spaces without even trying.', pop: 'Sparkle confirmed 💫' },
        { icon: '🌹', text: 'Rare, radiant, and impossible to ignore.', pop: 'Rose-gold aura 🌹' }
      ]
    }
  };

  function initComplimentsPage() {
    var list = document.getElementById('complimentsList');
    if (!list) return;

    var gender = new URLSearchParams(window.location.search).get('gender') || localStorage.getItem('selectedGender') || 'male';
    if (gender !== 'female') gender = 'male';
    localStorage.setItem('selectedGender', gender);

    var data = complimentData[gender];
    document.body.classList.add(data.bodyClass);
    document.title = data.greeting.replace('✨', '').trim();
    setText('themeEyebrow', data.eyebrow);
    setText('greetingMessage', data.greeting);
    setText('greetingSubtitle', data.subtitle);

    list.innerHTML = '';
    data.items.forEach(function (item, index) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'compliment-card';
      card.style.animationDelay = (0.12 + index * 0.08) + 's';
      card.innerHTML = '<span class="compliment-icon">' + item.icon + '</span>' +
        '<p class="compliment-text">' + item.text + '</p>' +
        '<p class="tap-hint">tap for sparkle burst</p>';
      card.addEventListener('click', function (e) {
        heartPop(e.clientX, e.clientY, item.icon, item.pop, gender);
      });
      list.appendChild(card);
    });

    var next = document.querySelector('[data-go-instagram]');
    if (next) {
      next.addEventListener('click', function (e) {
        createBurst(e.clientX, e.clientY, gender === 'male' ? ['#38BDF8', '#C0C0C0', '#6D5DF5'] : ['#F9A8D4', '#C084FC', '#B76E79']);
        goWithTransition('instagram.html', '#05050a');
      });
    }
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function heartPop(x, y, emoji, text, gender) {
  var emojis = gender === 'male'
    ? ['💙', '⚡', '💎', '👑', '✨', '🔥', '🏆']
    : ['💖', '💕', '✨', '🌸', '💫', '🦋', '🌷'];

  var colors = gender === 'male'
    ? ['#38BDF8', '#C0C0C0', '#6D5DF5', '#F8F7FF']
    : ['#F9A8D4', '#C084FC', '#B76E79', '#FFF1F5'];

  createRipple(x, y, gender);
  createEmojiBurst(x, y, emojis);
  createBurst(x, y, colors);

  var toast = document.createElement('div');
  toast.className = 'pop-toast ' + (gender === 'male' ? 'male-pop' : 'female-pop');

  var safeX = Math.min(Math.max(x, 150), window.innerWidth - 150);
  var safeY = Math.max(y - 35, 90);

  toast.style.setProperty('--tx', safeX + 'px');
  toast.style.setProperty('--ty', safeY + 'px');

  toast.innerHTML =
  '<div class="pop-toast-content">' +
    '<span class="pop-toast-emoji">' + emoji + '</span>' +
    '<span class="pop-toast-text">' + text + '</span>' +
    '<span class="pop-toast-sub">okay but this vibe is dangerous ✨</span>' +
    '<span class="pop-toast-close">Tap anywhere to close</span>' +
  '</div>';
  document.body.appendChild(toast);
  toast.addEventListener('click', function () {
  toast.remove();
});
  setTimeout(function () {
    toast.remove();
  }, 1800);
}

function createRipple(x, y, gender) {
  var ripple = document.createElement('span');
  ripple.className = 'pop-ripple';
  ripple.style.setProperty('--rx', x + 'px');
  ripple.style.setProperty('--ry', y + 'px');
  ripple.style.setProperty(
    '--ripple-color',
    gender === 'male' ? 'rgba(56,189,248,.65)' : 'rgba(249,168,212,.75)'
  );

  document.body.appendChild(ripple);

  setTimeout(function () {
    ripple.remove();
  }, 900);
}

function createEmojiBurst(x, y, emojis) {
  for (var i = 0; i < 28; i++) {
    var el = document.createElement('span');
    var angle = (Math.PI * 2 * i) / 28;
    var dist = Math.random() * 120 + 55;

    el.className = 'heart-pop';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--size', (Math.random() * 14 + 18) + 'px');
    el.style.setProperty('--x', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--y', Math.sin(angle) * dist + 'px');
    el.style.setProperty('--dur', (Math.random() * 550 + 900) + 'ms');

    document.body.appendChild(el);

    setTimeout((function (node) {
      return function () {
        node.remove();
      };
    })(el), 1500);
  }
}

  function createBurst(x, y, colors) {
    if (reducedMotion) return;
    colors = colors || ['#fff'];
    for (var i = 0; i < 36; i++) {
      var spark = document.createElement('span');
      var angle = (Math.PI * 2 * i) / 24;
      var dist = Math.random() * 90 + 45;
      spark.className = 'spark';
      spark.style.left = x + 'px';
      spark.style.top = y + 'px';
      spark.style.setProperty('--spark-color', colors[i % colors.length]);
      spark.style.setProperty('--x', Math.cos(angle) * dist + 'px');
      spark.style.setProperty('--y', Math.sin(angle) * dist + 'px');
      spark.style.setProperty('--dur', (Math.random() * 500 + 550) + 'ms');
      document.body.appendChild(spark);
      setTimeout((function (node) { return function () { node.remove(); }; })(spark), 1100);
    }
  }

  function initInstagramPage() {
    if (!document.getElementById('starCanvas')) return;
    initStarCanvas();
    initFloatingEmojis();
    var follow = document.querySelector('[data-confetti]');
    if (follow) {
      follow.addEventListener('click', function (e) {
        confetti(e.clientX, e.clientY);
      });
    }
  }

  function initStarCanvas() {
    if (reducedMotion) return;
    var canvas = document.getElementById('starCanvas');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var count = window.innerWidth < 700 ? 90 : 180;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + .35, a: Math.random(), s: Math.random() * .018 + .004 });
      }
    }
    resize();
    window.addEventListener('resize', debounce(resize, 150));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(function (star) {
        star.a += star.s;
        if (star.a > 1 || star.a < .1) star.s *= -1;
        ctx.globalAlpha = star.a;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#a855f7';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  function initFloatingEmojis() {
    if (reducedMotion) return;
    var layer = document.getElementById('emojiLayer');
    if (!layer) return;
    var emojis = ['✨', '👀', '😎', '⭐', '🔮', '💫'];
    var count = window.innerWidth < 700 ? 12 : 22;
    for (var i = 0; i < count; i++) {
      var span = document.createElement('span');
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.setProperty('--s', (Math.random() * 13 + 15) + 'px');
      span.style.setProperty('--d', (Math.random() * 11 + 12) + 's');
      span.style.animationDelay = -(Math.random() * 14) + 's';
      layer.appendChild(span);
    }
  }

  function confetti(x, y) {
    if (reducedMotion) return;
    var colors = ['#A855F7', '#EC4899', '#22D3EE', '#F59E0B', '#FFFFFF'];
    for (var i = 0; i < 48; i++) {
      var el = document.createElement('span');
      var angle = Math.PI * 2 * Math.random();
      var dist = Math.random() * 190 + 55;
      el.className = 'confetti';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.setProperty('--x', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--y', Math.sin(angle) * dist + 'px');
      el.style.setProperty('--c', colors[i % colors.length]);
      document.body.appendChild(el);
      setTimeout((function (node) { return function () { node.remove(); }; })(el), 1300);
    }
  }

  function initBackButtons() {
    var homeBack = document.querySelector('[data-back-home]');
    if (homeBack) homeBack.addEventListener('click', function () { goWithTransition('index.html', '#0B0B12'); });

    var complimentBack = document.querySelector('[data-back-compliments]');
    if (complimentBack) {
      complimentBack.addEventListener('click', function () {
        var gender = localStorage.getItem('selectedGender') || 'male';
        goWithTransition('compliments.html?gender=' + encodeURIComponent(gender), gender === 'female' ? '#FFF1F5' : '#050816');
      });
    }
  }

  function debounce(fn, wait) {
    var timeout;
    return function () {
      clearTimeout(timeout);
      var args = arguments;
      var context = this;
      timeout = setTimeout(function () { fn.apply(context, args); }, wait);
    };
  }
})();
