// পপআপ ওপেন হওয়ার সাথে সাথেই টাইমার শুরু হবে
const okButton = document.getElementById('okButton');
let timeLeft = 10;

const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
        okButton.innerText = "OK (" + timeLeft + "s)";
    } else {
        clearInterval(timer);
        okButton.innerText = "OK";
        okButton.disabled = false; // 10 সেকেন্ড পর বাটনটি ক্লিক করার উপযোগী হবে
    }
}, 1000);

function enterSite() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}


// 🔑 পাসওয়ার্ড সেট করুন (এখানে '1234' দেওয়া আছে, আপনার ইচ্ছা মতো পরিবর্তন করুন)
const CORRECT_NAME = "zayden";
const CORRECT_PASSWORD = "7739";

// ১. টার্গেট তারিখ সেট করুন
const targetDate = new Date("2026-09-17T00:00:00").getTime();

// ২. সময় আপডেট করার ফাংশন
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // সময় হিসাব (দিন, ঘণ্টা, মিনিট, সেকেন্ড)
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // ৩. HTML-এ প্রদর্শন (০ যোগ করার লজিকসহ, যেমন: 05s)
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.innerHTML = `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
    }

    // ৪. সময় শেষ হলে
    if (distance < 0) {
        clearInterval(timerInterval);
        countdownElement.innerHTML = "Happy Birthday, Dear 🎉";
    }
}

// প্রতি সেকেন্ডে ফাংশনটি কল করা
const timerInterval = setInterval(updateCountdown, 1000);

// প্রথমবার পেজ লোড হওয়ার সাথে সাথে রান করার জন্য
updateCountdown();

// পান্ডা অ্যানিমেশনের জন্য রেফারেন্সসমূহ
let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEyeStyle = () => {
  eyeL.style.cssText = `left:0.6em; top: 0.6em;`;
  eyeR.style.cssText = `right:0.6em; top:0.6em;`;
};

let normalHandStyle = () => {
  handL.style.cssText = `height: 2.81em; top:8.4em; left:7.5em; transform: rotate(0deg);`;
  handR.style.cssText = `height: 2.81em; top: 8.4em; right: 7.5em; transform: rotate(0deg);`;
};

// ইউজারনেম ইনপুটে ক্লিক করলে চোখ নড়বে
usernameRef.addEventListener("focus", () => {
  eyeL.style.cssText = `left: 0.75em; top: 1.12em;`;
  eyeR.style.cssText = `right: 0.75em; top: 1.12em;`;
  normalHandStyle();
});

// পাসওয়ার্ড ইনপুটে ক্লিক করলে পান্ডা চোখ ঢাকবে
passwordRef.addEventListener("focus", () => {
  handL.style.cssText = `height: 6.56em; top: 3.87em; left: 11.75em; transform: rotate(-155deg);`;
  handR.style.cssText = `height: 6.56em; top: 3.87em; right: 11.75em; transform: rotate(155deg);`;
  normalEyeStyle();
});

// বাইরে ক্লিক করলে পান্ডা নরমাল হয়ে যাবে
document.addEventListener("click", (e) => {
  let clickedElem = e.target;
  if (clickedElem != usernameRef && clickedElem != passwordRef) {
    normalEyeStyle();
    normalHandStyle();
  }
});

// 🔓 লক খোলার মেইন ফাংশন (Login বাটনে ক্লিক করলে কাজ করবে)
function unlockWeb(event) {
    event.preventDefault(); // পেজ রিলোড হওয়া বন্ধ করবে
    
    const userInput = passwordRef.value;
    const lockScreen = document.getElementById("lock-screen");
    const mainContent = document.getElementById("main-content");
    const song = document.getElementById("bg-song");

    if (usernameRef.value === CORRECT_NAME && passwordRef.value === CORRECT_PASSWORD)
       {
        // পান্ডা স্ক্রিন স্লাইড হয়ে চলে যাবে
        lockScreen.style.transform = "translateY(-100%)";
        setTimeout(() => {
            lockScreen.style.display = "none";
            mainContent.style.display = "flex";
            
            // ব্যাকগ্রাউন্ড মিউজিক প্লে হবে
            song.play().catch(error => console.log("মিউজিক অটো-প্লে ব্লক হয়েছে।"));
        }, 600);
    } else {
        alert("Heyy, it's wrong. Ask me for the right PASS  ❌");
        passwordRef.value = "";
        normalHandStyle(); // ভুল হলে হাত নামিয়ে নিবে
    }
}


// 🎵 ব্যাকগ্রাউন্ড মিউজিক কন্ট্রোল ফাংশ
let isPlaying = false;

const music = document.getElementById("celebration-music");
const button = document.getElementById("music-toggle");

button.addEventListener("click", function () {
  if (isPlaying) {
    music.pause();
    button.innerHTML = "🔊";
    isPlaying = false;
  } else {
    music.play();
    button.innerHTML = "🔇";
    isPlaying = true;
  }
});