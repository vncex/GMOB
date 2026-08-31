/* ================================================================
   FORGE TRAINING — SITE BEHAVIOR & EDITABLE CONTENT

   QUICK EDIT GUIDE:
   1. Change the business/contact details in SITE_CONFIG.business.
   2. Change session names, durations, and time slots below.
   3. Change video YouTube IDs and image URLs in highlights.
   4. Replace testimonials with real, permission-approved client quotes.

   This static site deliberately does not store form submissions or claim to
   reserve appointments. Connect a real form service when ready.
   ================================================================ */

const SITE_CONFIG = {
  business: {
    name: "Alex Morgan",
    brand: "Forge Training",
    phone: "(555) 123-4567",
    email: "hello@example.com",
    city: "Your City, State"
  },
  sessions: [
    { name: "Personal Training", duration: "60 min" },
    { name: "Strength and Conditioning Training", duration: "60 min" },
    { name: "Agility", duration: "45 min" },
    { name: "Group Training", duration: "60 min" },
    { name: "Custom Training", duration: "Let's talk" }
  ],
  times: ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "6:30 PM", "7:30 PM"],
  // Weekdays: 0 = Sunday, 1 = Monday, ... 6 = Saturday.
  unavailableByWeekday: {
    0: ["6:00 AM", "8:00 AM", "6:30 PM", "7:30 PM"],
    6: ["6:00 AM", "5:00 PM", "6:30 PM", "7:30 PM"]
  },
  highlights: [
    { title: "Strength foundations", subtitle: "Squat · Hinge · Carry", youtubeId: "ml6cT4AZdqI", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1300&q=82" },
    { title: "Conditioning day", subtitle: "Power · Pace · Control", youtubeId: "U0bhE67HuDY", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=82" },
    { title: "Move with purpose", subtitle: "Mobility · Stability · Skill", youtubeId: "IODxDxX7oi4", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=82" }
  ],
  testimonials: [
    { quote: "I’m stronger than I’ve ever been, but the biggest change is how capable I feel in everyday life.", name: "Maya R.", detail: "Training for 14 months" },
    { quote: "Every session has a clear purpose. I stopped guessing, started progressing, and actually enjoy showing up.", name: "Chris T.", detail: "Strength coaching client" },
    { quote: "The coaching meets me where I am while still asking me to grow. That balance changed everything.", name: "Jordan K.", detail: "Personal training client" }
  ]
};

const bookingState = { session: "", time: "" };
let testimonialIndex = 0;
const sessionOptions = document.querySelector("#session-options");
const timeOptions = document.querySelector("#time-options");
const dateInput = document.querySelector("#booking-date");
const bookingForm = document.querySelector("#booking-form");
const bookingMessage = document.querySelector("#booking-message");
const videoModal = document.querySelector("#video-modal");

/* Booking interface ------------------------------------------------ */
function renderSessions() {
  sessionOptions.innerHTML = SITE_CONFIG.sessions.map((session, index) => `
    <div class="choice">
      <input type="radio" id="session-${index}" name="session" value="${session.name}" ${index === 0 ? "required" : ""}>
      <label for="session-${index}">${session.name}<small>${session.duration}</small></label>
    </div>`).join("");
}

function renderTimes() {
  if (!dateInput.value) {
    timeOptions.innerHTML = "<p>Select a date to view times.</p>";
    return;
  }
  const weekday = new Date(`${dateInput.value}T12:00:00`).getDay();
  const unavailable = SITE_CONFIG.unavailableByWeekday[weekday] || [];
  timeOptions.innerHTML = SITE_CONFIG.times.map(time => `
    <button class="time-button" type="button" data-time="${time}" aria-pressed="false" ${unavailable.includes(time) ? `disabled aria-label="${time}, unavailable"` : ""}>${time}</button>`).join("");
  bookingState.time = "";
}

function setMinimumDate() {
  const today = new Date();
  dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

function showBookingMessage(title, body, isError = false) {
  bookingMessage.hidden = false;
  bookingMessage.classList.toggle("form-error", isError);
  bookingMessage.innerHTML = `<strong>${title}</strong>${body}`;
  bookingMessage.focus();
}

sessionOptions.addEventListener("change", event => { bookingState.session = event.target.value; });
dateInput.addEventListener("change", renderTimes);
timeOptions.addEventListener("click", event => {
  const button = event.target.closest(".time-button:not(:disabled)");
  if (!button) return;
  timeOptions.querySelectorAll(".time-button").forEach(item => item.setAttribute("aria-pressed", "false"));
  button.setAttribute("aria-pressed", "true");
  bookingState.time = button.dataset.time;
});

bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  bookingState.session = formData.get("session") || "";
  if (!bookingForm.checkValidity()) { bookingForm.reportValidity(); return; }
  if (!bookingState.time) {
    showBookingMessage("Choose a time", "Select one of the available time options before sending your request.", true);
    return;
  }
  const readableDate = new Date(`${formData.get("date")}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  showBookingMessage("Request prepared", `Thanks, ${formData.get("name")}. Your request is for <b>${bookingState.session}</b> on <b>${readableDate}</b> at <b>${bookingState.time}</b>. This demo does not send or save the request; connect the form service described in the README before publishing.`);
});

/* Mobile navigation ------------------------------------------------ */
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});
siteNav.addEventListener("click", event => {
  if (event.target.matches("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

/* Highlight videos ------------------------------------------------- */
function renderHighlights() {
  document.querySelector("#video-grid").innerHTML = SITE_CONFIG.highlights.map((item, index) => `
    <button class="video-card" type="button" data-video-index="${index}" style="background-image:url('${item.image}')" aria-label="Play ${item.title} video">
      <span class="video-card-content"><span aria-hidden="true">▶</span><h3>${item.title}</h3><p>${item.subtitle}</p></span>
    </button>`).join("");
}

document.querySelector("#video-grid").addEventListener("click", event => {
  const card = event.target.closest(".video-card");
  if (!card) return;
  const item = SITE_CONFIG.highlights[Number(card.dataset.videoIndex)];
  document.querySelector("#video-modal-title").textContent = item.title;
  document.querySelector("#video-frame").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0" title="${item.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  videoModal.showModal();
});

function closeVideo() {
  videoModal.close();
  document.querySelector("#video-frame").replaceChildren();
}
document.querySelector("#modal-close").addEventListener("click", closeVideo);
videoModal.addEventListener("click", event => { if (event.target === videoModal) closeVideo(); });
videoModal.addEventListener("close", () => document.querySelector("#video-frame").replaceChildren());

/* Testimonials ----------------------------------------------------- */
function renderTestimonial() {
  const item = SITE_CONFIG.testimonials[testimonialIndex];
  document.querySelector("#testimonial-card").innerHTML = `
    <div class="testimonial-mark" aria-hidden="true">“</div>
    <div><blockquote class="testimonial-quote">${item.quote}</blockquote>
    <p class="testimonial-person">${item.name} <span>— ${item.detail}</span></p>
    <p class="testimonial-count">${String(testimonialIndex + 1).padStart(2, "0")} / ${String(SITE_CONFIG.testimonials.length).padStart(2, "0")}</p></div>`;
}

document.querySelector("#testimonial-prev").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + SITE_CONFIG.testimonials.length) % SITE_CONFIG.testimonials.length;
  renderTestimonial();
});
document.querySelector("#testimonial-next").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % SITE_CONFIG.testimonials.length;
  renderTestimonial();
});

/* Contact details and email handoff -------------------------------- */
function renderContactDetails() {
  const { name, phone, email, city } = SITE_CONFIG.business;
  const phoneLink = phone.replace(/[^+\d]/g, "");
  document.querySelector("#contact-details").innerHTML = `
    <strong>${name}</strong><a href="tel:${phoneLink}">${phone}</a><a href="mailto:${email}">${email}</a><span>${city}</span>`;
}

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Training inquiry from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
  window.location.href = `mailto:${SITE_CONFIG.business.email}?subject=${subject}&body=${body}`;
});

/* Initial render --------------------------------------------------- */
renderSessions();
renderTimes();
renderHighlights();
renderTestimonial();
renderContactDetails();
setMinimumDate();
document.querySelector("#current-year").textContent = new Date().getFullYear();
