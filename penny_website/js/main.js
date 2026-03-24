"use strict";

// Run setup code after the HTML has loaded
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();          // light / dark mode toggle
  updateYear();          // footer year
  initIntroSequence();   // cinematic intro logic
  initScrollReveal();    // scroll reveal system
  setupHeroParallax();   // hero image parallax
  setupShoeSection();    // dynamic shoe gallery
  setupTimeline();       // career timeline
  startGuessGame();      // guessing game
  setupContactForm();    // contact form validation
});


/* -----------------------------------
   THEME TOGGLE (LIGHT / DARK MODE)
----------------------------------- */

function setupTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("pennyTheme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("pennyTheme", isDark ? "dark" : "light");
  });
}

/* -----------------------------------
   FOOTER YEAR
----------------------------------- */

function updateYear() {
  const yearSpan = document.getElementById("yearSpan");
  if (yearSpan) {
    const now = new Date();
    yearSpan.textContent = now.getFullYear();
  }
}

/* -----------------------------------
   SOUND MANAGER
----------------------------------- */

class SoundManager {
  constructor() {
    this.sounds = {
      dribble: new Audio('https://assets.mixkit.co/active_storage/sfx/1000/1000-preview.mp3'), // Placeholder dribble
      slamDunk: new Audio('https://assets.mixkit.co/active_storage/sfx/2048/2048-preview.mp3'), // Placeholder slam
      crowd: new Audio('https://assets.mixkit.co/active_storage/sfx/2047/2047-preview.mp3') // Placeholder crowd
    };

    // Preload with error handling
    Object.entries(this.sounds).forEach(([name, sound]) => {
      try {
        sound.load();
        sound.volume = 0.5;
      } catch (e) {
        console.warn(`Failed to load sound: ${name}`, e);
        delete this.sounds[name];
      }
    });
  }

  play(name, loop = false) {
    if (this.sounds[name]) {
      try {
        this.sounds[name].currentTime = 0;
        this.sounds[name].loop = loop;
        // Don't await the play promise; let it fail silently if blocked
        this.sounds[name].play().catch(e => {
          console.warn(`Audio play blocked for ${name}:`, e.message);
        });
      } catch (e) {
        console.error(`Error playing sound ${name}:`, e);
      }
    }
  }

  stop(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}

/* -----------------------------------
   INTRO SEQUENCE
----------------------------------- */

function initIntroSequence() {
  const overlay = document.getElementById("introOverlay");
  const startBtn = document.getElementById("startIntroBtn");
  const flashImg = document.getElementById("introFlashContent");
  const statEl = document.getElementById("introStat");
  
  if (!overlay || !startBtn || !flashImg || !statEl) return;

  const introData = [
    { photo: 'penny-photos/bf84ec05b1e9d6bac4024209c12fe63b.jpg', stat: 'MAGIC LEGEND', pos: 'center 30%' },
    { photo: 'penny-photos/a8e53ba8722943344eebfda79a2c0db1.jpg', stat: 'PURE SKILL', pos: 'center 20%' },
    { photo: 'penny-photos/76ef507e5ecb6c454bdcb1db8e37d7e3.jpg', stat: 'NIGHTMARE MATCHUP', pos: 'right 60%' },
    { photo: 'penny-photos/41a492a76e68138ac586a2ccba5230bd.jpg', stat: 'Career High: 42 Points', pos: 'center 20%' },
    { photo: 'penny-photos/4db0c06ffe9e6246811c99c4226052da.jpg', stat: 'Playoff High: 31 Points', pos: 'center 20%' },
    { photo: 'penny-photos/80bfd8407a9c52fc02baca4ebee1e233.jpg', stat: '2X ALL-NBA FIRST TEAM', pos: 'center top' },
    { photo: 'penny-photos/bf84ec05b1e9d6bac4024209c12fe63b.jpg', stat: '96 OLYMPIC GOLD', pos: 'center 30%' },
    { photo: 'penny-photos/a8e53ba8722943344eebfda79a2c0db1.jpg', stat: 'PENNY', pos: 'center 20%' }
  ];

  let soundMgr;

  startBtn.addEventListener("click", () => {
    soundMgr = new SoundManager();
    startBtn.style.display = "none";
    overlay.querySelector("h2").style.display = "none";

    runSequence();
  });

  const skipBtn = document.getElementById("failsafeSkip");
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      overlay.classList.add("hidden");
      if (soundMgr) soundMgr.stopAll();
    });
  }

  async function runSequence() {
    try {
      // 1. Rhythmic Flashes with Stats
      for (let i = 0; i < introData.length; i++) {
          const data = introData[i];
          if (soundMgr) soundMgr.play('dribble');
          
          flashImg.style.objectPosition = data.pos || 'center';
          flashImg.src = data.photo;
          statEl.textContent = data.stat;
          overlay.classList.add("flash-active");
          
          await new Promise(r => setTimeout(r, 180));
          overlay.classList.remove("flash-active");
          
          await new Promise(r => setTimeout(r, 320));
      }

      // 2. Final Slam Dunk Reveal
      if (soundMgr) {
        soundMgr.play('slamDunk');
        soundMgr.play('crowd');
      }
      
      document.body.classList.add("slam-dunk-impact");
      flashImg.src = introData[2].photo;
      statEl.textContent = "NBA LEGEND";
      overlay.classList.add("flash-active");

      await new Promise(r => setTimeout(r, 1200));
      
      // Reveal main site
      overlay.classList.add("hidden");
      document.body.classList.remove("slam-dunk-impact");
      
      if (soundMgr) soundMgr.stopAll();
    } catch (err) {
      console.error("Sequence error:", err);
      // Failsafe: Hide overlay if everything breaks
      overlay.classList.add("hidden");
    }
  }
}

/* -----------------------------------
   SCROLL REVEAL SYSTEM
----------------------------------- */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        // Once revealed, we can stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/* -----------------------------------
   HERO PARALLAX
----------------------------------- */

function setupHeroParallax() {
  const heroImage = document.querySelector(".hero-image img");
  const heroSection = document.querySelector(".hero");
  
  if (!heroImage || !heroSection) return;

  heroSection.addEventListener("mousemove", (e) => {
    const { width, height } = heroSection.getBoundingClientRect();
    const { clientX, clientY } = e;
    
    const xPos = (clientX / width - 0.5) * 20; // max 10px shift
    const yPos = (clientY / height - 0.5) * 20;
    
    heroImage.style.transform = `rotate(-2deg) translate(${xPos}px, ${yPos}px) scale(1.02)`;
  });

  heroSection.addEventListener("mouseleave", () => {
    heroImage.style.transform = `rotate(-2deg) translate(0, 0) scale(1)`;
  });
}

/* -----------------------------------
   SIGNATURE SHOES (DYNAMIC ENGINE)
----------------------------------- */

const shoes = [
  {
    id: "foamposite",
    name: "Air Foamposite One",
    year: "1997",
    colorway: "Royal Blue",
    image: "penny-photos/foamposite_royal.jpeg",
    description: "The Nike Air Foamposite One 'Royal', originally released in 1997 for $180, revolutionized basketball footwear with its molded polyurethane shell, designed by Eric Avar. Famously adopted by Penny Hardaway, this 'Dark Neon Royal' shoe was known for its futuristic, beetle-shell look, full-length Zoom Air cushioning, and carbon fiber shanks."
  },
  {
    id: "airpenny1",
    name: "Nike Air Penny 1",
    year: "1995",
    colorway: "Magic Away",
    image: "penny-photos/nike-air-penny1.jpeg",
    description: "Released in late 1995, the Nike Air Max Penny 1 was Anfernee 'Penny' Hardaway's first official signature shoe, designed by Eric Avar for the Orlando Magic star. It revolutionized basketball footwear with a large, jeweled lateral Swoosh, Phylon midsole, and Max Air cushioning, cementing its place as a 90s classic. The shoe debuted the iconic '1 Cent' logo and was famously marketed alongside his puppet alter ego, Lil' Penny."
  },
  {
    id: "airpenny2",
    name: "Nike Air Penny 2",
    year: "1996",
    colorway: "Atlantic Blue",
    image: "penny-photos/penny2.avif",
    description: "Released in late 1996 for the 1996-97 NBA season, the Nike Air Penny 2 was Penny Hardaway’s second signature shoe, designed by Eric Avar. It famously combined, for the first time in the line, a heel Max Air unit with forefoot Zoom Air for superior cushioning, along with a distinct carbon fiber shank and nubuck mudguards."
  },
  {
    id: "foampositepro",
    name: "Air Foamposite One Pro",
    year: "1997",
    colorway: "Pearl",
    image: "penny-photos/air-penny-pro.webp",
    description: "Released in 1997 shortly after the Foamposite One, the Nike Air Foamposite Pro distinguished itself with a prominent jewel Swoosh, no '1 Cent' branding, and a slightly lower collar. Designed by Eric Avar, it utilized revolutionary molded liquid polyurethane, offering a futuristic, durable, and anatomical fit that transitioned from court to street culture."
  }
];

function setupShoeSection() {
  const buttons = document.querySelectorAll(".product-btn");
  const imgEl = document.getElementById("shoeImage");
  const nameEl = document.getElementById("shoeDisplayName");
  const descEl = document.getElementById("shoeDisplayDesc");
  
  if (!buttons.length || !imgEl || !nameEl || !descEl) return;

  function updateDisplay(shoeId) {
    const shoe = shoes.find((s) => s.id === shoeId);
    if (!shoe) return;

    // Immediate update
    imgEl.src = shoe.image;
    imgEl.alt = shoe.name;
    nameEl.textContent = shoe.name;
    descEl.textContent = shoe.description;
    
    // Update active state for buttons
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.shoe === shoeId);
    });
  }

  // Initial state
  updateDisplay(shoes[0].id);

  buttons.forEach((btn) => {
    const shoeId = btn.dataset.shoe;

    // Click to select
    btn.addEventListener("click", () => {
      updateDisplay(shoeId);
      
      // Feedback animation
      imgEl.style.transform = "scale(1.05)";
      setTimeout(() => imgEl.style.transform = "scale(1)", 200);
    });
  });
}


/* -----------------------------------
   CAREER TIMELINE (DATA-DRIVEN)
----------------------------------- */

const careerMilestones = [
  {
    year: "1993",
    title: "NBA Draft",
    description: "Penny is selected 3rd overall by the Golden State Warriors and immediately traded to the Orlando Magic for Chris Webber, a move that would change the franchise forever.",
    tags: ["Draft", "Orlando"]
  },
  {
    year: "1994-1995",
    title: "The Finals Run",
    description: "Penny and Shaq lead the Magic to the NBA Finals in just their second season together, defeating Michael Jordan's Bulls along the way.",
    tags: ["All-Star", "Bulls"]
  },
  {
    year: "1996",
    title: "Olympic Gold",
    description: "A key member of 'Dream Team II', Penny helps Team USA secure the Gold Medal at the Atlanta Summer Olympics.",
    tags: ["Team USA", "Gold"]
  },
  {
    year: "1999-2004",
    title: "The Phoenix Era",
    description: "Penny joins the Phoenix Suns, forming the 'Backcourt 2000' with Jason Kidd and continuing to showcase his elite playmaking skills.",
    tags: ["Playmaker", "Suns"]
  },
  {
    year: "2018-Present",
    title: "Coach Hardaway",
    description: "Returning to his alma mater, Penny becomes the head coach of the Memphis Tigers, leading them back to national prominence.",
    tags: ["Coach", "Memphis"]
  }
];

function setupTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container) return;

  // Clear existing skeleton content
  container.innerHTML = "";

  const timelineList = document.createElement("div");
  timelineList.className = "timeline-list";

  careerMilestones.forEach((milestone, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item card glass reveal reveal-stagger";
    item.style.setProperty("--stagger-index", index % 2 === 0 ? index : index + 1); // Grouping items for staggered reveal

    item.innerHTML = `
      <div class="timeline-year">${milestone.year}</div>
      <h3>${milestone.title}</h3>
      <p>${milestone.description}</p>
      <div class="timeline-tags">
        ${milestone.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;

    timelineList.appendChild(item);
  });

  container.appendChild(timelineList);
  
  // Re-initialize reveal for new elements
  initScrollReveal();
  
  // Timeline scroll sync
  window.addEventListener("scroll", () => {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
      const scaleY = Math.min(Math.max(progress * 1.5, 0), 1);
      container.style.setProperty("--timeline-scale", scaleY);
    }
  });
}

/* -----------------------------------
   GUESSING GAME
----------------------------------- */

function startGuessGame() {
  const gameForm = document.getElementById("gameForm");
  const resultEl = document.getElementById("gameResult");

  if (!gameForm || !resultEl) return;

  gameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const guessInput = document.getElementById("userGuess");
    const guess = parseInt(guessInput.value, 10);

    if (Number.isNaN(guess) || guess < 1 || guess > 10) {
      resultEl.textContent = "Please enter a whole number from 1 to 10.";
      return;
    }

    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (guess === randomNumber) {
      resultEl.textContent = `You guessed ${guess} and the number was ${randomNumber}. You win!`;
    } else {
      resultEl.textContent =
        "You guessed " + guess + " but the number was " + randomNumber + ". Try again.";
    }

    guessInput.value = "";
  });
}


/* -----------------------------------
   CONTACT FORM VALIDATION
----------------------------------- */

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fullNameInput = document.getElementById("fullName");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const commentsInput = document.getElementById("comments");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");
  const contactChoiceError = document.getElementById("contactChoiceError");
  const commentsError = document.getElementById("commentsError");
  const thankYouMessage = document.getElementById("thankYouMessage");

  const emailPattern = /\S+@\S+\.\S+/;
  const phonePattern = /^\d{10}$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    contactChoiceError.textContent = "";
    commentsError.textContent = "";

    thankYouMessage.style.display = "none";
    thankYouMessage.textContent = "";

    let hasError = false;

    const fullName = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const comments = commentsInput.value.trim();
    const preferredContact = document.querySelector(
      'input[name="preferredContact"]:checked'
    );

    if (fullName === "") {
      nameError.textContent = "Name is required.";
      hasError = true;
    }

    if (comments === "") {
      commentsError.textContent = "Please add a comment.";
      hasError = true;
    }

    if (!preferredContact) {
      contactChoiceError.textContent = "Pick how you want to be contacted.";
      hasError = true;
    } else if (preferredContact.value === "phone") {
      if (phone === "") {
        phoneError.textContent = "Phone is required.";
        hasError = true;
      } else if (!phonePattern.test(phone)) {
        phoneError.textContent = "Use 10 digits.";
        hasError = true;
      }

      if (email !== "" && !emailPattern.test(email)) {
        emailError.textContent = "Email format looks off.";
        hasError = true;
      }
    } else if (preferredContact.value === "email") {
      if (email === "") {
        emailError.textContent = "Email is required.";
        hasError = true;
      } else if (!emailPattern.test(email)) {
        emailError.textContent = "Email format looks off.";
        hasError = true;
      }

      if (phone !== "" && !phonePattern.test(phone)) {
        phoneError.textContent = "Use 10 digits.";
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    const customer = {
      name: fullName,
      phone: phone || "Not provided",
      email: email || "Not provided",
      comments: comments,
      preferredContact: preferredContact ? preferredContact.value : "none"
    };

    thankYouMessage.style.display = "block";
    thankYouMessage.innerHTML =
      "<strong>Thank you, " + customer.name + "!</strong><br>" +
      "We’ll reach out by <strong>" + customer.preferredContact + "</strong>.<br>" +
      "Phone: " + customer.phone + "<br>" +
      "Email: " + customer.email + "<br>" +
      "Your message: \"" + customer.comments + "\"";

    form.reset();
  });
}

