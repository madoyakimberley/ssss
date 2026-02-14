// -------- MAP SETUP --------
const map = L.map("map").setView([-1.2921, 36.8219], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);
let marker;

// -------- AUDIO & LYRICS --------
const audio = document.getElementById("chihiro");
const lyricsBox = document.getElementById("lyrics-box");
const lyricsContent = document.getElementById("lyrics-content");

// Full lyrics with delays
const chihiroLyrics = [
  { text: "To take my love away", delay: 4200 },
  { text: "When I come back around, will I know what to say?", delay: 4500 },
  { text: "Said you won't forget my name", delay: 3800 },
  { text: "Not today, not tomorrow", delay: 3800 },
  { text: "Kinda strange, feelin' sorrow", delay: 3800 },
  { text: "I got change (yup), you could borrow (borrow)", delay: 4200 },
  { text: "When I come back around, will I know what to say?", delay: 4800 },
  { text: "Not today, maybe tomorrow", delay: 4500 },
  { text: "Open up the door, can you open up the door?", delay: 4000 },
  { text: "I know you said before you can't cope with anymore", delay: 4000 },
  {
    text: "You told me it was war, said you'd show me what's in store",
    delay: 4000,
  },
  { text: "I hope it's not for sure, can you open up the door?", delay: 5000 },
  { text: "Did you take", delay: 1800 },
  { text: "My love away", delay: 1800 },
  { text: "From me?", delay: 2000 },
  { text: "Me", delay: 2000 },
  { text: "Me", delay: 12500 },
  { text: "Saw your seat at the counter when I looked away", delay: 4500 },
  { text: "Saw you turn around, but it wasn't your face", delay: 4500 },
  { text: "Said, \"I need to be alone now, I'm takin' a break\"", delay: 4500 },
  { text: "How come when I returned, you were gone away?", delay: 6500 },
  { text: "I don't, I don't know why I called", delay: 4200 },
  { text: "I don't know you at all", delay: 4200 },
  { text: "I don't know you", delay: 4200 },
  { text: "Not at all", delay: 4200 },
  { text: "I don't, I don't know why I called", delay: 4200 },
  { text: "I don't know you at all", delay: 4200 },
  { text: "I don't know you", delay: 20000 },
  { text: "Did you take", delay: 1800 },
  { text: "My love away", delay: 1800 },
  { text: "From me?", delay: 2000 },
  { text: "Me", delay: 10500 },
  { text: "And that's when you found me", delay: 4500 },
  { text: "I was waitin' in the garden", delay: 4500 },
  { text: "Contemplatin', beg your pardon", delay: 4500 },
  { text: "But there's a part of me that recognizes you", delay: 4500 },
  { text: "Do you feel it too?", delay: 4500 },
  { text: "When you told me it was serious", delay: 4200 },
  { text: "Were you serious? Mm", delay: 4200 },
  { text: "They told me they were only curious", delay: 4200 },
  { text: "Now it's serious, mm", delay: 5000 },
  { text: "Open up the door, can you open up the door?", delay: 4000 },
  { text: "I know you said before you can't cope with anymore", delay: 4000 },
  {
    text: "You told me it was war, said you'd show me what's in store",
    delay: 4000,
  },
  { text: "I hope it's not for sure, can you open up the door?", delay: 11000 },
  { text: "Wringing my hands in my lap", delay: 4500 },
  { text: "And you tell me it's all been a trap", delay: 4500 },
  { text: "And you don't know if you'll make it back", delay: 4500 },
  { text: 'I say, "No, don\'t say that"', delay: 4500 },
  { text: "Hm-hm", delay: 5000 },
];

// Show lyrics line by line
async function showLyrics() {
  lyricsBox.classList.remove("hidden");
  for (const line of chihiroLyrics) {
    lyricsContent.style.opacity = 0;
    setTimeout(() => {
      lyricsContent.innerText = line.text;
      lyricsContent.style.opacity = 1;
    }, 200);
    await new Promise((resolve) => setTimeout(resolve, line.delay));
  }
}

// -------- DATE LOGIC --------
const today = new Date();

const dates = [
  {
    id: "date1",
    unlock: new Date("2026-02-14"),
    details: `
      <h2>🍦 Ice Cream & Animal Orphanage Walk</h2>
      <p>
        Ice cream first — because comfort matters.<br>
        Then a gentle walk through the Nairobi Animal Orphanage (KWS)<br>
        We’ll see rescued animals.<br>
        Location: Lang'ata<br>
        Special event: Ofc me who else <br>
        Place: Nairobi Orphanage
      </p>
      
      <button id="closeCard">Close</button>
    `,
    location: {
      lat: -1.3508,
      lng: 36.829,
      label: "🍦 Ice Cream at Nairobi Animal Orphanage",
    },
  },
  {
    id: "date2",
    unlock: new Date("2026-02-25"),
    details: `<h2>🌙 Date Two</h2><p>Not ready yet. Patience…</p>`,
  },
  {
    id: "date3",
    unlock: new Date("2026-03-01"),
    details: `<h2>🌅 Date Three</h2><p>Still dreaming…</p>`,
  },
];

// Unlock cards and handle clicks
dates.forEach((d) => {
  const card = document.getElementById(d.id);
  if (today >= d.unlock) {
    card.classList.remove("locked");
    card.addEventListener("click", () => {
      if (d.id === "date1") {
        let available = confirm(
          "Hey… are you available on 13th March? yes for okay.... and cancel for no",
        );
        if (!available) {
          const reallySure = confirm(
            "Are you sure? I want to spend infinity with you… because we are infinity. Yes I am busy(okay).... and no not at all(okay)💖",
          );
          if (!reallySure) available = true;
        }
        if (available) {
          alert("Put your headphones on or AirPods… and enjoy ❤️");
          audio.play();
          showLyrics();
        } else return;
      }

      const details = document.getElementById("details");
      details.innerHTML = d.details;
      details.classList.remove("hidden");
      details.classList.add("fade-slide-in");

      if (d.location) {
        map.flyTo([d.location.lat, d.location.lng], 16);
        if (marker) map.removeLayer(marker);
        marker = L.marker([d.location.lat, d.location.lng])
          .addTo(map)
          .bindPopup(d.location.label)
          .openPopup();
        const mapSection = document.getElementById("map-section");
        mapSection.classList.remove("hidden");
        mapSection.classList.add("fade-slide-in");
      }

      // Chat button listener
      const chatBtn = document.getElementById("chatWithMadisonBtn");
      if (chatBtn) {
        chatBtn.addEventListener("click", openChat);
      }

      // Close details card
      const closeBtn = document.getElementById("closeCard");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          details.classList.add("hidden");
          const mapSection = document.getElementById("map-section");
          mapSection.classList.add("hidden");
          lyricsBox.classList.add("hidden");
          audio.pause();
          audio.currentTime = 0;
          alert("Please stay tuned… 💖");
        });
      }
    });
  }
});
