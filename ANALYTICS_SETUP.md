# 🛠️ Step-by-Step Tool Integration (No-Code)

Since I am installing the "Master" Google Tag Manager (GTM) code on your website, you can now link all your other tools **without writing any more code**. Follow these steps:

---

## 1. Google Analytics 4 (GA4) -> GTM
1.  In your GA4 account, go to **Admin > Data Streams** and copy your **Measurement ID** (e.g., `G-XXXXXX`).
2.  In **GTM**, click **New Tag**.
3.  Name it: `GA4 - Configuration`.
4.  Tag Type: **Google Tag**.
5.  Tag ID: Paste your `G-XXXXXX` ID.
6.  Triggering: **All Pages**.
7.  Click **Save**.

## 2. Hotjar -> GTM
1.  In your Hotjar account, copy your **Site ID**.
2.  In **GTM**, click **New Tag**.
3.  Search the list for **Hotjar Tracking Code**. (If not there, choose "Custom HTML" and paste the Hotjar code).
4.  Paste your Site ID.
5.  Triggering: **All Pages**.
6.  Click **Save**.

## 3. Tracking our Leads (Conversions)
I have already set up the website to send a "Signal" called `lead_conversion` every time a form is submitted.
To track this in GTM:
1.  **Trigger:** Create a new Trigger of type **Custom Event**.
2.  **Event Name:** `lead_conversion`.
3.  **Tag:** Create a new **GA4 Event** tag.
4.  **Event Name:** `form_submission`.
5.  **Trigger:** Select the `lead_conversion` trigger you just made.

---

## 4. Testing Your Work (The "Pro" Way)
1.  In GTM, click the blue **Preview** button in the top right.
2.  Enter your website URL (`https://your-site.vercel.app`).
3.  A new tab will open with your site. Go back to the GTM tab.
4.  You will see a "Timeline." Fill out a form on your site.
5.  If you see the `lead_conversion` event show up in the timeline, **CONGRATULATIONS!** You just set up professional event tracking.
