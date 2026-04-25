# Google Ads Build-Out: Custom Jewellery Campaign
**SMG Jewellers — Ready to deploy after exams**

> This is a step-by-step, click-by-click guide to set up your Google Search campaign.
> **Landing Page URL:** `https://smg-jewellers-premium.vercel.app/custom-designs.html`

---

## Step 1: Create the Campaign

1. Go to [ads.google.com](https://ads.google.com) → Click **"+ New Campaign"**
2. **Goal:** Select **"Leads"**
3. **Campaign type:** Select **"Search"**
4. **Conversion action:** Select **"Website"** → Paste your landing page URL
5. **Campaign name:** `SMG - Custom Jewellery - Search`
6. Click **Continue**

---

## Step 2: Bidding

- **Bidding strategy:** Choose **"Maximize Conversions"**
  - *(If Google asks for a target CPA, skip it for now. Let it learn for 2 weeks first.)*
- Click **Continue**

---

## Step 3: Campaign Settings

| Setting | Value |
|---|---|
| **Networks** | ✅ Google Search · ❌ Uncheck "Search Partners" · ❌ Uncheck "Display Network" |
| **Locations** | Target: **Hyderabad, Telangana** → Click "Advanced" → Set radius **20 km** centered on Chanda Nagar |
| **Location options** | "People IN or regularly in your targeted locations" (NOT "interested in") |
| **Languages** | English, Hindi, Telugu |
| **Start date** | Day after your exams end |
| **Budget** | ₹500/day to start (₹15,000/month) |

---

## Step 4: Ad Group — Keywords

**Ad Group Name:** `Custom Design - High Intent`

Paste these keywords exactly (brackets and quotes matter):

```
[custom jewellery hyderabad]
[custom gold jewellery hyderabad]
[bespoke jewellery designers hyderabad]
[design your own jewellery hyderabad]
[custom made gold necklace hyderabad]
[personalized jewellery hyderabad]
"custom jewellery near me"
"handmade gold jewellery makers"
"custom bridal jewellery hyderabad"
"make jewellery from my design"
"gold jewellery custom order"
```

### Keyword Match Type Cheat Sheet
- `[exact match]` = Ad shows ONLY when someone types this exact phrase. Most precise, lowest waste.
- `"phrase match"` = Ad shows when the search CONTAINS this phrase. Slightly broader reach.

### Negative Keywords (Add immediately!)
Click **"Negative Keywords"** → Create a list called `SMG Negatives` → Add:

```
cheap
artificial
imitation
wholesale
jobs
course
how to
diy
silver plated
first copy
free
tutorial
training
institute
salary
```

---

## Step 5: Build the Responsive Search Ad (RSA)

Google will mix and match your headlines and descriptions automatically. Give it strong options:

### Final URL
```
https://smg-jewellers-premium.vercel.app/custom-designs.html
```

### Display Path
```
smg-jewellers-premium.vercel.app / Custom-Jewellery
```

### Headlines (provide all 15 — Google will test combinations)

| # | Headline (30 chars max) | Pin? |
|---|---|---|
| 1 | Design Your Dream Jewellery | Pin to Position 1 |
| 2 | Custom Gold Jewellery in Hyd | Pin to Position 2 |
| 3 | BIS Hallmarked Custom Gold | — |
| 4 | Handcrafted Bridal Jewellery | — |
| 5 | Your Design, Our Craftsmen | — |
| 6 | Send a Photo, Get a Quote | — |
| 7 | Bespoke Jewellery Artisans | — |
| 8 | 100% Purity Guaranteed | — |
| 9 | Zero Middleman Pricing | — |
| 10 | Master Artisans Since 1965 | — |
| 11 | Custom Necklaces & Bangles | — |
| 12 | WhatsApp Us Your Design | — |
| 13 | Trusted by 1000+ Families | — |
| 14 | Visit Chanda Nagar Showroom | — |
| 15 | Free Design Consultation | — |

### Descriptions (provide all 4)

| # | Description (90 chars max) |
|---|---|
| 1 | Turn your imagination into reality. Handcrafted custom jewellery by master artisans. |
| 2 | Direct from artisans in Hyderabad. No middleman, pure BIS Hallmarked gold & diamonds. |
| 3 | Send us a photo of any design. We'll craft it in 22K/24K gold. Visit our showroom today. |
| 4 | From engagement rings to bridal sets—get exactly what you want at SMG Jewellers. |

---

## Step 6: Ad Extensions (Sitelinks, Callouts, etc.)

### Sitelink Extensions (Add all 4)

| Sitelink Text | URL | Description |
|---|---|---|
| Today's Gold Rate | `/index.html` (homepage w/ rate modal) | Check live 22K and 24K gold prices updated daily |
| Browse Collections | `/gallery.html` | Explore our curated heritage jewellery gallery |
| Our Story | `/about.html` | A legacy of purity since 1965 in Hyderabad |
| WhatsApp Us | `https://wa.me/919014659444` | Chat instantly for a free design quote |

### Callout Extensions
- `100% BIS Hallmarked`
- `Zero Middleman`
- `Free Design Consultation`
- `Live Gold Rates`

### Call Extension
- Phone: `+91 90146 59444`
- Show during business hours: 10:00 AM – 9:30 PM IST

### Location Extension
- Link your Google Business Profile (SMG Jewellers, Chanda Nagar)

---

## Step 7: Conversion Tracking

> [!IMPORTANT]
> Without conversion tracking, Google has no idea what a "good click" looks like. You MUST set this up.

You already have **GTM (Google Tag Manager)** installed on the site with ID `GTM-N68W9R42`.

### What to track as a conversion:
1. **Form submission** on `custom-designs.html` (the "Send Us Your Idea" form)
2. **WhatsApp click** (the green "Send Us a Photo for an Instant Quote" button)

### How to set it up:
1. Go to **Google Ads → Tools → Conversions → + New conversion action**
2. Choose **Website**
3. Enter your URL → Google will detect your GTM
4. Create two conversion actions:
   - **Name:** `Custom Design Lead Form` / **Category:** Submit Lead Form / **Count:** One
   - **Name:** `WhatsApp Click` / **Category:** Submit Lead Form / **Count:** One
5. In **GTM**, create triggers:
   - Trigger 1: Form Submission on form ID `custom-lead-form`
   - Trigger 2: Click URL contains `wa.me`
6. Fire the Google Ads conversion tag on each trigger

---

## Step 8: Launch Checklist

- [ ] Campaign created with "Leads" goal
- [ ] Location set to Hyderabad 20km radius
- [ ] Keywords pasted (exact + phrase match)
- [ ] Negative keywords added
- [ ] All 15 headlines entered (H1 and H2 pinned)
- [ ] All 4 descriptions entered
- [ ] 4 sitelinks added
- [ ] Callout extensions added
- [ ] Call extension with store number
- [ ] Conversion tracking live in GTM
- [ ] Daily budget set to ₹500
- [ ] Start date confirmed

---

## Week 1 Optimization Playbook (After Launch)

| Day | Action |
|---|---|
| Day 1-3 | Don't touch anything. Let Google collect data. |
| Day 4 | Check **Search Terms Report** (Tools → Insights → Search Terms). Add any irrelevant terms to negative keywords. |
| Day 7 | Check which headlines Google is favoring. Pause any with <1% CTR. |
| Day 14 | If Cost Per Lead > ₹200, tighten location to 10km. If CPL < ₹100, increase budget to ₹800/day. |

---

## Expected Performance (Hyderabad Jewellery Vertical)

| Metric | Estimated Range |
|---|---|
| **CPC (Cost Per Click)** | ₹15 – ₹40 |
| **CTR (Click-Through Rate)** | 4% – 8% |
| **Conversion Rate** | 5% – 12% |
| **Cost Per Lead** | ₹80 – ₹250 |
| **Daily Leads (at ₹500/day)** | 2 – 6 leads |

> These are estimates based on the Hyderabad jewellery vertical. Actual numbers will vary during the first 2 weeks as Google's algorithm learns who converts best.
