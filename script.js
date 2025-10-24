// ====== CONFIG: Target time in IST (Asia/Kolkata) ======
// The user wanted timer to run till 12am on 18th Nov night, which is beginning of 19th Nov.
// That is 2025-11-19T00:00:00 at +05:30
const TARGET_ISO = '2025-11-19T00:00:00+05:30'; // exact target (IST offset included)
// const TARGET_ISO = new Date(Date.now() + 10000).toISOString(); // 1 minute test



// ====== Elements ======
const overlay = document.getElementById('lockOverlay');
const mainContent = document.getElementById('mainContent');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secsEl = document.getElementById('seconds');

// Parse target time into Date object
const targetDate = new Date(TARGET_ISO);

// Utility formatting
function pad(n){ return String(n).padStart(2,'0'); }

// Update countdown every second
function updateCountdown(){
  const now = new Date();
  // difference in ms
  const diff = targetDate - now;
  if(diff <= 0){
    // unlocked
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minsEl.textContent = '00';
    secsEl.textContent = '00';
    unlockPage();
    clearInterval(intervalId);
    return;
  }
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / (3600*24));
  const hours = Math.floor((s % (3600*24)) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minsEl.textContent = pad(mins);
  secsEl.textContent = pad(secs);
}

function unlockPage(){
  // hide overlay, show main
  overlay.style.display = 'none';
  mainContent.classList.remove('hidden');
  // optionally show a little unlock animation
  spawnHeartsBurst();
}

// Start interval
updateCountdown();
const intervalId = setInterval(updateCountdown, 1000);

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

// Optional: if page is opened AFTER target time (e.g., you visited after), remove overlay immediately
if (new Date() >= targetDate) {
  unlockPage();
}
