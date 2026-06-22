// 🔑 পাসওয়ার্ড সেট করুন (এখানে '1234' দেওয়া আছে, আপনার ইচ্ছা মতো পরিবর্তন করুন)
const CORRECT_NAME = "1";
const CORRECT_PASSWORD = "1";

// 📅 জন্মদিনের তারিখ সেট করুন (Year-Month-Day Hour:Minute:Second)
const TARGET_DATE = new Date("Sep 17, 2026 00:00:00").getTime();

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

// 📅 কাউন্টডাউন টাইমার ফাংশন
const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (difference < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "শুভ জন্মদিন! 🎂🎉";
    }
}, 1000);

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