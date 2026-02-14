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
  // --- First Chorus ---
  { text: "Did you take my love away from me?", delay: 13000 }, // long instrumental before chorus
  { text: "Me", delay: 4000 },

  // --- Verse 2 ---
  { text: "Saw your seat at the counter when I looked away", delay: 4600 },
  { text: "Saw you turn around, but it wasn't your face", delay: 4600 },
  { text: "Said, 'I need to be alone now, I'm takin' a break'", delay: 4600 },
  { text: "How come when I returned, you were gone away?", delay: 5800 },

  // --- Build-up Section ---
  { text: "I don't, I don't know why I called", delay: 4400 },
  { text: "I don't know you at all", delay: 4200 },
  { text: "I don't know you, not at all", delay: 4800 },
  { text: "I don't, I don't know why I called", delay: 4400 },
  { text: "I don't know you at all", delay: 4200 },
  { text: "I don't know you", delay: 21500 }, // synth swell

  // --- Second Chorus ---
  { text: "Did you take my love away from me?", delay: 11200 }, // drum re-entry
  { text: "Me", delay: 4000 },

  // --- Final Verse ---
  { text: "And that's when you found me", delay: 4400 },
  { text: "I was waitin' in the garden", delay: 4400 },
  { text: "Contemplatin', beg your pardon", delay: 4400 },
  { text: "But there's a part of me that recognizes you", delay: 4800 },
  { text: "Do you feel it too?", delay: 4400 },
  { text: "When you told me it was serious, were you serious?", delay: 4600 },
  { text: "They told me they were only curious", delay: 4200 },
  { text: "Now it's serious", delay: 5200 },

  // --- Outro ---
  { text: "Open up the door, can you open up the door?", delay: 4200 },
  { text: "I know you said before you can't cope with anymore", delay: 4200 },
  {
    text: "You told me it was war, said you'd show me what's in store",
    delay: 4200,
  },
  { text: "I hope it's not for sure, can you open up the door?", delay: 11800 },
  { text: "Wringing my hands in my lap", delay: 4600 },
  { text: "And you tell me it's all been a trap", delay: 4600 },
  { text: "And you don't know if you'll make it back", delay: 4600 },
  { text: 'I say, "No, don\'t say that"', delay: 4600 },
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
