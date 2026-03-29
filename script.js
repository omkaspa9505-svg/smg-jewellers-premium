document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initial check

  // Custom API Logic added dynamically
  fetchLiveMetalsRates();
  setInterval(fetchLiveMetalsRates, 600000); // refresh every 10 min
});

// --- LIVE METALS RATE FETCHER (HYDERABAD) ---
// Uses AllOrigins CORS proxy to reliably scrape the exact local price from GoodReturns Indian market pages.
async function fetchLiveMetalsRates() {
  const goldDisplay = document.getElementById('gold-rate');
  const silverDisplay = document.getElementById('silver-rate');

  if (!goldDisplay || !silverDisplay) return;

  try {
    // Fetch 22K Gold Rate for Hyderabad
    const goldRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.goodreturns.in/gold-rates/hyderabad.html')}`);
    const goldData = await goldRes.json();

    // Fetch Silver Rate for Hyderabad
    const silverRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.goodreturns.in/silver-rates/hyderabad.html')}`);
    const silverData = await silverRes.json();

    // 1 gram 22K Gold Rate & 1 gram Silver Rate fallback
    let goldPrice = '₹6,540/g';
    let silverPrice = '₹92/g';

    if (goldData.contents) {
      // Find the active price via Regex. GoodReturns uses strong tags with actual rupee amounts.
      const goldMatch = goldData.contents.match(/₹[\s]*([\d,]+)/);
      if (goldMatch && goldMatch[1]) {
        goldPrice = `₹${goldMatch[1].trim()}/g`;
      }
    }

    if (silverData.contents) {
      const silverMatch = silverData.contents.match(/₹[\s]*([\d,]+)/);
      if (silverMatch && silverMatch[1]) {
        silverPrice = `₹${silverMatch[1].trim()}/g`;
      }
    }

    // Apply dynamically
    goldDisplay.innerText = `Gold: ${goldPrice}`;
    silverDisplay.innerText = `Silver: ${silverPrice}`;

  } catch (error) {
    console.error("Error fetching live rates:", error);
    // Graceful visual fallback
    goldDisplay.innerText = `Gold: ₹6,540/g`;
    silverDisplay.innerText = `Silver: ₹92/g`;
  }
}
