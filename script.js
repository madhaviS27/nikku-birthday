// Countdown setup
const countdownDate = new Date("Nov 19, 2025 00:00:00").getTime();

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(countdownFunction);
    window.location.href = "main.html"; // redirect after countdown ends
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
