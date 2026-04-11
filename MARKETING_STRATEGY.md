# 📢 Performance Marketing Strategy: SMG Jewellers

This document outlines the marketing logic behind the SMG Jewellers digital transition. This is designed to be shared with potential employers to showcase your understanding of **Performance Marketing**, **CRO**, and **Attribution**.

## 1. Campaign Objective
To transition a traditional, heritage-based wholesale jewelry business in Hyderabad into an online lead-generation powerhouse.
- **Goal:** Drive high-intent "Custom Design" and "Gold Savings Plan" leads.
- **Target Channel:** Google Search Ads (Intent-based) & Instagram Ads (Visual-based).

## 2. Landing Page Architecture (AIDA Model)
The `custom-designs.html` page is built using the **AIDA** framework:
- **Attention:** High-contrast, premium 18K/22K gold hero section with master craftsmanship messaging.
- **Interest:** Clear value proposition—Master artisans + Honest wholesale pricing + Send us a photo from Instagram/Pinterest.
- **Desire:** Showcasing the heritage of Chanda Nagar and the personal "White Glove" service.
- **Trust Engine:** Explicitly mapping out the **"3-Step Masterpiece Journey"** (Idea → Review → Crafting) to reduce user risk/friction.
- **Action:** Frictionless form with "Telegram" and "WhatsApp" fallbacks to ensure no lead is lost.

## 3. Advanced Attribution Methodology
To prove campaign ROI, the site implements a custom **UTM Capture Engine**:
- **Mechanism:** JavaScript `captureUTMs()` grabs parameters (`utm_source`, `utm_campaign`, etc.) from the URL on landing.
- **Persistence:** These parameters are stored in the user's `sessionStorage` and persist as they browse from the homepage to the custom design page.
- **Reporting:** When a form is submitted, the source data is merged with the lead data and sent instantly to the **Telegram Bot API**.
- **Portfolio Value:** This demonstrates the ability to solve the "Which ad worked?" problem without expensive specialized tools.

## 4. Measurement & Tracking
- **GA4/GTM Ready:** The site includes a pre-configured measurement layer in the `<head>`.
- **Conversion Events:** Form submissions trigger a script-level `lead_conversion` event in the `dataLayer`.
- **Tech Stack:** Vanilla JS + Serverless Node.js (Vercel) for maximum speed and SEO Performance (Core Web Vitals).

---

## 🚀 How to Demo This (Interview Tip)
1. Open your live Vercel URL with dummy parameters:
   `https://your-site.vercel.app/custom-designs.html?utm_source=google&utm_campaign=bridal_gold_2026`
2. Submit a test lead.
3. Show your interviewers the **Telegram notification** on your phone.
4. **Point out the "Campaign: bridal_gold_2026" section in the message.**
5. Explain: *"I didn't just build a site; I built an attribution-first marketing asset."*
