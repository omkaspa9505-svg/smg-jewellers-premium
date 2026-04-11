/**
 * SMG Jewellers - Lead Capture API
 * Sends instant Telegram notifications on form submission
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, source, design, timestamp, attribution, imageData } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Build the notification message
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  let message = `🔔 <b>New Lead — SMG Jewellers</b>\n\n`;
  message += `👤 <b>Name:</b> ${name}\n`;
  message += `📞 <b>Phone:</b> ${phone}\n`;
  message += `📍 <b>Context:</b> ${source || 'Website'}\n`;

  if (design) {
    message += `💎 <b>Design Idea:</b> ${design}\n`;
  }

  // Marketing Attribution section
  if (attribution && Object.keys(attribution).length > 0) {
    message += `\n🎯 <b>Campaign Data:</b>\n`;
    if (attribution.utm_source) message += `▫️ Source: ${attribution.utm_source}\n`;
    if (attribution.utm_medium) message += `▫️ Medium: ${attribution.utm_medium}\n`;
    if (attribution.utm_campaign) message += `▫️ Campaign: ${attribution.utm_campaign}\n`;
    if (attribution.gclid) message += `▫️ Google Click ID: Found\n`;
  }

  message += `\n🕐 <i>${now}</i>`;

  // If Telegram credentials are missing, log and return success
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram credentials missing.');
    return res.status(200).json({
      success: true,
      message: 'Lead captured (configure credentials in Vercel for live alerts)'
    });
  }

  try {
    let endpoint = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    let body;
    let headers = {};

    if (imageData && imageData.startsWith('data:image')) {
      // Use sendPhoto for submissions with images
      endpoint = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
      
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('caption', message);
      formData.append('parse_mode', 'HTML');
      
      // Convert base64 to Blob
      const base64Data = imageData.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const blob = new Blob([buffer], { type: 'image/jpeg' });
      formData.append('photo', blob, 'design_reference.jpg');
      
      body = formData;
      // Fetch will automatically set the correct multipart boundary
    } else {
      // Fallback to standard sendMessage
      headers = { 'Content-Type': 'application/json' };
      body = JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body
    });

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true, message: 'Lead sent!' });
    } else {
      console.error('Telegram API error:', data);
      return res.status(500).json({ success: false, message: 'Notification failed' });
    }
  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
