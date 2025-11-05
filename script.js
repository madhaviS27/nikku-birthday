// Countdown setup

// const countdownDate = new Date("Nov 19, 2025 00:00:00").getTime();  //actual birthday date

const countdownDate = new Date().getTime() + 5000; // 5 seconds test

// Countdown logic
const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(countdownFunction);

    // 💥 Trigger both confetti and fireworks
    triggerConfetti();
    triggerFireworks();

    // Wait for 5 seconds before redirecting to main page
    setTimeout(() => {
      window.location.href = "main.html";
    }, 5000);

  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

const container = document.querySelector(".floating-elements");


// 🎉 Confetti Function (this must be outside any other function)
function triggerConfetti() {
  for (let i = 0; i < 500; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDuration = (5 + Math.random() * 4) + "s";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 9000);
  }
}


// 🌈 Random color generator for confetti
function randomColor() {
  const colors = [
    // ✨ Sparkly whites & golds
    "#ffffff", // bright white sparkle
    "#fff8dc", // soft golden glow (cornsilk)
    "#ffe4b5", // light golden
    "#ffecb3", // pale warm gold
    "#fff5ba", // light gold shimmer

    // 💙 Dreamy blues
    "#a0c4ff", // sky blue
    "#89cff0", // baby blue
    "#5eb8ff", // radiant blue sparkle
    "#b3ecff", // frosty blue highlight
    "#afffff", // pale aqua

    // 💜 Romantic lavenders
    "#d5b3ff", // pastel lavender
    "#cdb4ff", // soft purple glow
    "#e0b0ff", // orchid sparkle
    "#bdb2ff", // lavender
    "#e7d9ff", // dreamy lilac

    // 💖 Warm dreamy pinks
    "#ffc6ff", // cotton candy
    "#ffadad", // rose blush
    "#ff9ecd", // pink flare
    "#ffadad", // soft pink
    "#ffc6ff", // blush pink
    "#f6baff",  // cotton candy pink

    // 💛 Magical warm tones
    "#FFDAB9", // classic peach
    "#FFE5B4", // soft peach
    "#ffcc70", // sunset gold
    "#fff5ba", // buttery shimmer

    // 💚 Soft minty glow
    "#caffbf", // mint green
    "#baf1a1"  // subtle emerald highlight
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}



// 🎆 Fireworks function
function triggerFireworks() {
  const fireworksContainer = document.createElement("div");
  fireworksContainer.classList.add("fireworks-container");
  document.body.appendChild(fireworksContainer);

  // Launch multiple bursts
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      createFireworkBurst(fireworksContainer);
    }, i * 600); // staggered launches
  }

  // Remove after the show ends
  setTimeout(() => fireworksContainer.remove(), 10000);
}

// Create one firework burst
function createFireworkBurst() {
  const container = document.querySelector(".fireworks-container");
  const rocket = document.createElement("div");
  rocket.classList.add("firework-rocket");

  // Randomize rocket color and horizontal position
  rocket.style.setProperty("--color", randomColor());
  rocket.style.left = `${Math.random() * 80 + 10}%`;
  container.appendChild(rocket);

  // Once rocket finishes launch animation → trigger burst
  rocket.addEventListener("animationend", () => {
    const burst = document.createElement("div");
    burst.classList.add("firework-burst");

    // Position burst at rocket’s end location
    const rocketRect = rocket.getBoundingClientRect();
    burst.style.left = `${rocketRect.left + rocketRect.width / 2}px`;
    burst.style.top = `${rocketRect.top}px`;

    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.classList.add("firework-particle");

      const angle = (i / numParticles) * 2 * Math.PI;
      const distance = 60 + Math.random() * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.setProperty("--x", `${x}px`);
      particle.style.setProperty("--y", `${y}px`);
      particle.style.setProperty("--color", randomColor());
      burst.appendChild(particle);
    }

    container.appendChild(burst);
    rocket.remove();

    // Cleanup burst after animation
    setTimeout(() => burst.remove(), 2000);
  });

  // Cleanup rocket after launch
  setTimeout(() => rocket.remove(), 1500);
}



// 🎈 Create floating balloons dynamically
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  const colors = ["#a8c9eb", "#d5b0ff", "#ffd1dc", "#c8e7f5"];
  balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.animationDuration = (10 + Math.random() * 5) + "s";

  container.appendChild(balloon);
  setTimeout(() => balloon.remove(), 15000);
}
setInterval(createBalloon, 1200);

// 🌟 Create softly twinkling stars
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  const size = Math.random() * 3 + 1 + "px";
  star.style.width = size;
  star.style.height = size;

  star.style.top = Math.random() * 100 + "vh";
  star.style.left = Math.random() * 100 + "vw";

  container.appendChild(star);
  setTimeout(() => star.remove(), 8000);
}
setInterval(createStar, 200);

// ✨ Create floating pastel sparkles (replaces hearts)
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  const colors = ["#ffd6e0", "#f2ccff", "#c8e7f5", "#fff5fa"];
  sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  const size = Math.random() * 10 + 5 + "px";
  sparkle.style.width = size;
  sparkle.style.height = size;
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = (10 + Math.random() * 5) + "s";

  container.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 15000);
}
setInterval(createSparkle, 700);



// ------------------- Hearts animation -------------------
const heartContainer = document.getElementById('heartContainer');

// spawn a single heart at random x near bottom and float up
function spawnHeart(opts = {}) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  const variants = ['pink','lilac','softBlue'];
  heart.classList.add(opts.variant || variants[Math.floor(Math.random()*variants.length)]);
  const size = opts.size || 16 + Math.random()*30;
  heart.style.width = size + 'px';
  heart.style.height = size + 'px';
  heart.style.left = (10 + Math.random()*80) + '%';
  heart.style.bottom = (opts.bottom || (10 + Math.random()*12)) + 'px';
  // random duration
  const dur = 6 + Math.random()*6;
  heart.style.animationDuration = dur + 's';
  heartContainer.appendChild(heart);
  // remove after animation finishes
  setTimeout(()=> heart.remove(), (dur + 0.5)*1000);
}

// small continuous hearts
setInterval(()=> spawnHeart({size: 12 + Math.random()*18}), 700);

// burst when unlock
function spawnHeartsBurst(count = 18){
  for(let i=0;i<count;i++){
    setTimeout(()=> spawnHeart({size: 14 + Math.random()*28, bottom: 30 + Math.random()*40}), i*60);
  }
}

