/**
 * SMG Jewellers - Live Metal Pricing Engine
 * Fetches spot prices for XAU (Gold), XAG (Silver), XPT (Platinum)
 * Calculates 22K/24K retail prices with boutique premiums.
 */

export default async function handler(req, res) {
  // Cache for 24 hours on Vercel Edge Cache
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  try {
    // 1. Fetch Metal Spot Prices (using currency-api for free reliability)
    const [goldRes, silverRes, platRes] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json'),
      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json'),
      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xpt.json')
    ]);

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();
    const platData = await platRes.json();

    const xauInr = goldData.xau.inr;
    const xagInr = silverData.xag.inr;
    const xptInr = platData.xpt.inr;

    const troyOunce = 31.1034768;

    // --- PRICING LOGIC ---
    // Spot Price per Gram
    const spot24k = xauInr / troyOunce;
    const spotSilver = xagInr / troyOunce;
    const spotPlat = xptInr / troyOunce;

    // SMG Boutique Premia (Aligned with Hyderabad Retail Standards)
    // Indian retail rates typically include custom duty + local premium
    const boutique24k = spot24k * 1.045; // 4.5% total premium for retail parity
    const boutique22k = boutique24k * 0.9167; // 22KT purity factor
    const boutique18k = boutique24k * 0.75; // 18KT purity factor
    const retailSilver = spotSilver * 1.06; // 6% premium for silver
    const retailPlat = spotPlat * 1.18; // 18% retail markup for platinum

    const formatINR = (val) => "₹" + Math.round(val).toLocaleString('en-IN');

    return res.status(200).json({
      success: true,
      rates: {
        gold24: { value: Math.round(boutique24k), formatted: formatINR(boutique24k) },
        gold22: { value: Math.round(boutique22k), formatted: formatINR(boutique22k) },
        gold18: { value: Math.round(boutique18k), formatted: formatINR(boutique18k) },
        silver: { value: Math.round(retailSilver), formatted: formatINR(retailSilver) },
        platinum: { value: Math.round(retailPlat), formatted: formatINR(retailPlat) }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Pricing API Error:", error);
    // Robust fallbacks for production stability
    return res.status(200).json({
      success: true,
      rates: {
        gold24: { value: 7450, formatted: "₹7,450" },
        gold22: { value: 6830, formatted: "₹6,830" },
        silver: { value: 96, formatted: "₹96" },
        platinum: { value: 3250, formatted: "₹3,250" }
      },
      timestamp: new Date().toISOString(),
      source: "fallback"
    });
  }
}
