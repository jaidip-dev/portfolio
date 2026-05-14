/* ================= HEADER================= */

// ===== UNDERLINE =====
const items = document.querySelectorAll(".menu a");
const line = document.getElementById("underline");

function move(el){
  line.style.width = el.offsetWidth + "px";
  line.style.left = el.offsetLeft + "px";
}

window.onload = () => move(document.querySelector(".active"));

items.forEach(i=>{
  i.addEventListener("mouseenter", ()=> move(i));

  i.addEventListener("click", ()=>{
    document.querySelector(".active").classList.remove("active");
    i.classList.add("active");
  });
});

document.getElementById("menu").addEventListener("mouseleave", ()=>{
  move(document.querySelector(".active"));
});

// ===== MOBILE MENU =====
document.getElementById("hamburger").onclick = ()=>{
  document.getElementById("menu").classList.toggle("show");
};

 // ================= HERO SLIDER =================

let slides = document.querySelectorAll(".slide");
let thumbsBox = document.querySelector(".thumbs");
let index = 0;

/* CREATE THUMBS */
slides.forEach((s, i) => {
  let t = document.createElement("div");
  t.className = "thumb";
  t.style.backgroundImage = s.style.backgroundImage;

  if (i === 0) t.classList.add("active");

  t.onclick = () => {
    index = i;
    updateHero();
    resetAuto(); 
  };

  thumbsBox.appendChild(t);
});

let thumbs = document.querySelectorAll(".thumb");

function updateHero() {
  slides.forEach(s => s.classList.remove("active"));
  thumbs.forEach(t => t.classList.remove("active"));

  slides[index].classList.add("active");
  thumbs[index].classList.add("active");

  //  ARROW 
  let arrows = document.querySelectorAll(".arrow");

  if (arrows.length >= 2) {
    arrows[0].style.display = index === 0 ? "none" : "block";
    arrows[1].style.display = index === slides.length - 1 ? "none" : "block";
  }
}

/* NAVIGATION (LOOP ENABLED) */
function next() {
  index = (index + 1) % slides.length;
  updateHero();
  resetAuto(); 
}

function prev() {
  index = (index - 1 + slides.length) % slides.length;
  updateHero();
  resetAuto(); 
}

/* AUTO SLIDER */
let autoSlide = setInterval(next, 5000);

function resetAuto() {
  clearInterval(autoSlide);
  autoSlide = setInterval(next, 5000);
}

/* WATCH BUTTON */
document.querySelectorAll(".watch").forEach(btn => {
  btn.addEventListener("click", openPlayer);
});

function openPlayer() {
  let videoList = ["3.mp4", "3.mp4", "3.mp4"];
  window.location.href = "player.html?video=" + videoList[index];
}

/* INIT */
updateHero();


/* ================= MAIN ================= */

let currentMovie = "";

function initSliders(){

let modal = document.getElementById('modal');
let modalVideo = document.getElementById('modalVideo');
let modalSoundBtn = document.getElementById('modalSoundBtn');

let isMuted = true;


/* ================= MODAL SOUND ================= */

if(modalSoundBtn){

modalSoundBtn.addEventListener("click",(e)=>{

e.stopPropagation();

if(modalVideo.muted){

modalVideo.muted = false;
modalVideo.volume = 1;
modalSoundBtn.classList.remove("muted");
isMuted = false;

}else{

modalVideo.muted = true;
modalSoundBtn.classList.add("muted");
isMuted = true;

}

});

}


/* ================= SLIDERS ================= */

document.querySelectorAll('.slider-wrapper').forEach(wrapper=>{

let slider = wrapper.querySelector('.slider');

let rightBtn = wrapper.querySelector('.card-right');
let leftBtn = wrapper.querySelector('.card-left');

/* arrows */
if(rightBtn){
rightBtn.addEventListener('click',()=> slider.scrollLeft += 600);
}

if(leftBtn){
leftBtn.addEventListener('click',()=> slider.scrollLeft -= 600);
}


/* ================= CARDS ================= */

wrapper.querySelectorAll('.card-item').forEach(card=>{

const video = card.querySelector('video.preview-video');
const btn = card.querySelector('.mute-btn');

let timer;


/* 🔥 HOVER PREVIEW (FIXED SMOOTH) */
card.addEventListener('mouseenter',()=>{

timer = setTimeout(()=>{

card.classList.add('show-video');

if(video){
video.currentTime = 0;
video.muted = true;
video.play().catch(()=>{});
}

},500);

});


card.addEventListener('mouseleave',()=>{

clearTimeout(timer);

card.classList.remove('show-video');

if(video){
video.pause();
video.currentTime = 0;
video.muted = true;
}

if(btn){
btn.classList.add("muted");
}

});


/* CARD SOUND BUTTON */
if(btn){

btn.addEventListener('click',(e)=>{

e.stopPropagation(); // 🔥 modal open fix

if(video){

if(video.muted){
video.muted = false;
video.volume = 1;
btn.classList.remove("muted");
}else{
video.muted = true;
btn.classList.add("muted");
}

}

});

}




/* ================= MODAL CLICK ================= */

card.addEventListener('click',()=>{

let previewSrc = card.dataset.preview;
currentMovie = card.dataset.full || previewSrc;

let title = card.querySelector('.title')?.innerText || 'Movie';
let meta = card.querySelector('.meta')?.innerHTML || '';
let desc = card.querySelector('.desc')?.innerText || '';

/* TITLE */
document.getElementById('mTitle').innerText = title;

/* META  */
let metaBox = document.getElementById('mMeta');
metaBox.innerHTML = "";
metaBox.className = "meta modal-tags";  
metaBox.innerHTML = meta;

/* DESC */
document.getElementById('mDesc').innerText = desc;

/* OPEN */
modal.classList.add('show');

/* VIDEO LOAD */
modalVideo.style.display = "block";
modalVideo.src = previewSrc;
modalVideo.currentTime = 0;
modalVideo.muted = false;
modalVideo.play().catch(()=>{});

/* sound state */
isMuted = false;
modalSoundBtn.classList.remove("muted");


});

});

});


/* ================= CLOSE MODAL ================= */

document.getElementById('modalCloseBtn')
?.addEventListener('click', closeModal);

modal?.addEventListener('click',(e)=>{

if(e.target===modal){
closeModal();
}

});

function closeModal(){

modal.classList.remove('show');

modalVideo.pause();
modalVideo.currentTime = 0;
modalVideo.removeAttribute('src');

document.getElementById('modalYT').src = "";

}
/* ================= WATCH BUTTON ================= */

document.querySelectorAll('.watch-btn').forEach(btn=>{

btn.addEventListener('click',(e)=>{

e.stopPropagation();
btn.closest('.card-item')?.click();

});

});

}


/* ================= FULL PLAYER ================= */

document.querySelector('.watch-now')
?.addEventListener('click',()=>{

if(currentMovie){
window.location.href =
"player.html?movie=" + encodeURIComponent(currentMovie);
}

});

/* ================= Flat slider ================= */

document.querySelectorAll('.flat-slider .watch-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    let card = btn.closest('.card-item');
    let movie = card.dataset.full || card.dataset.preview;

    window.location.href = "player.html?movie=" + encodeURIComponent(movie);
  });
});

// ===== AUTO RANK NUMBER =====
function autoRankSliders() {
  document.querySelectorAll(".ranked-slider").forEach(wrapper => {
    let cards = wrapper.querySelectorAll(".card-item");

    cards.forEach((card, index) => {
      card.setAttribute("data-rank", index + 1);
    });
  });
}

autoRankSliders();

// ===== VIEW ALL BTN =====

document.querySelectorAll(".view-all").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    window.location.href = "viewall.html";
  });
});


// ===== PROFILE POPUP =====

// profile icon
const profile = document.querySelector(".profile");

// profile popup
const popup = document.getElementById("popup");

// profile overlay
const overlay = document.getElementById("overlay");

// open profile popup
profile.onclick = () => {
  popup.style.display = "block";
  overlay.style.display = "block";

  setTimeout(() => {
    popup.classList.add("active");
  }, 10);
};

// close profile popup (only outside click)
overlay.onclick = (e) => {
  if (e.target === overlay) {
    popup.classList.remove("active");

    setTimeout(() => {
      popup.style.display = "none";
      overlay.style.display = "none";
    }, 200);
  }
};



// ===== LOGIN POPUP =====

// login button 
const openLoginBtn = document.getElementById("openLogin");

// login popup
const loginPopup = document.getElementById("loginPopup");

// login overlay
const loginOverlay = document.getElementById("loginOverlay");

// close button
const closeLogin = document.getElementById("closeLogin");


// LOGIN BUTTON CLICK
openLoginBtn.onclick = (e) => {

  e.stopPropagation(); 

  // 1 profile popup band
  popup.style.display = "none";
  overlay.style.display = "none";

  // 2️ login popup open
  loginPopup.style.display = "block";
  loginOverlay.style.display = "block";

  setTimeout(() => {
    loginPopup.classList.add("active");
  }, 10);
};


// close login popup function
function closeLoginPopup() {
  loginPopup.classList.remove("active");

  setTimeout(() => {
    loginPopup.style.display = "none";
    loginOverlay.style.display = "none";
  }, 200);
}

// close button click
closeLogin.onclick = closeLoginPopup;

// background click
loginOverlay.onclick = closeLoginPopup;


// ===== OPT BUTTON =====

const input = document.getElementById("phoneInput");
const btn = document.getElementById("otpBtn");

input.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value.length === 10) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

// ===== FOOTER =====

 // Prevent empty links + smooth scroll top
  document.querySelectorAll(".footer a").forEach(link => {
    link.addEventListener("click", function(e) {
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  });


// ===== OTP FLOW =====

const otpBtn = document.getElementById("otpBtn");
const otpScreen = document.getElementById("otpScreen");
const formSide = document.querySelector(".form-side");
const otpInputs = document.querySelectorAll(".otp");
const statusText = document.getElementById("status");
const backBtn = document.getElementById("backBtn");

const continueBtn = document.getElementById("continueBtn");
const userNumber = document.getElementById("userNumber");
const countEl = document.getElementById("count");

const successPopup = document.getElementById("successPopup");

let generatedOTP = "";

//  GET OTP CLICK
otpBtn.addEventListener("click", () => {

  const phone = input.value;

  if (phone.length < 10) return;

  // show number
  userNumber.innerText = "+91 " + phone;

  // switch screen
  formSide.style.display = "none";
  otpScreen.style.display = "block";

  // fake OTP
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  console.log("Fake OTP:", generatedOTP);

  // auto fill
  setTimeout(() => {
    otpInputs.forEach((box, i) => {
      box.value = generatedOTP[i];
    });

    checkOTP();
  }, 800);

  // timer
  let time = 30;
  countEl.innerText = time;

  let interval = setInterval(() => {
    time--;
    countEl.innerText = time;

    if (time <= 0) clearInterval(interval);
  }, 1000);
});


//  BACK BUTTON
backBtn.addEventListener("click", () => {
  otpScreen.style.display = "none";
  formSide.style.display = "flex";
});


// ENABLE CONTINUE BUTTON
function checkOTP() {
  let value = "";
  otpInputs.forEach(i => value += i.value);

  if (value.length === 4) {
    continueBtn.classList.add("active");
  }
}


// INPUT AUTO MOVE + CHECK
otpInputs.forEach((inputBox, index) => {
  inputBox.addEventListener("input", () => {

    if (inputBox.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }

    checkOTP();
  });
});


//  CONTINUE CLICK
continueBtn.addEventListener("click", () => {

  if (!continueBtn.classList.contains("active")) return;

  statusText.innerText = "Login Successful ✅";
  statusText.style.color = "lime";

  // login popup band
  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("loginOverlay").style.display = "none";

  // success popup show
  successPopup.style.display = "flex";

  setTimeout(() => {
    successPopup.classList.add("active");
  }, 10);

  // auto close
  setTimeout(() => {
    successPopup.classList.remove("active");

    setTimeout(() => {
      successPopup.style.display = "none";
    }, 300);
  }, 2000);
});

//  + BUTTON

document.querySelectorAll(".icon-btn.add").forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    e.stopPropagation(); // 🔥 modal open nahi hoga

    btn.classList.toggle("added");
    btn.textContent = btn.classList.contains("added") ? "✓" : "+";
  });
});

initSliders();