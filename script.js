/**
 * SMG Jewellers - Premium Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations using Intersection Observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Modal Logic
    const rateBtn = document.getElementById('open-rates-btn');
    const rateModal = document.getElementById('rate-modal');
    const closeRateModal = document.getElementById('close-rate-modal');

    if (rateBtn && rateModal) {
        rateBtn.addEventListener('click', () => {
            rateModal.classList.add('active');
            fetchLiveMetalsRates();
        });
    }

    if (closeRateModal && rateModal) {
        closeRateModal.addEventListener('click', () => {
            rateModal.classList.remove('active');
        });
    }

    if (rateModal) {
        rateModal.addEventListener('click', (e) => {
            if (e.target === rateModal) {
                rateModal.classList.remove('active');
            }
        });
    }

    // Lead Capture — Savings Form (Homepage)
    const savingsForm = document.getElementById('savings-form');
    if (savingsForm) {
        savingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (savingsForm.querySelector('#savings-name') || savingsForm.querySelector('input[name="name"]'))?.value.trim() || 'Savings Lead';
            const phone = (savingsForm.querySelector('#savings-phone') || savingsForm.querySelector('input[name="phone"]'))?.value.trim() || '';
            if (!phone) { showNotification('Please enter your phone number.', 'error'); return; }
            submitLead({ name, phone, source: 'Gold Savings Plan' }, savingsForm);
        });
    }

    // Lead Capture — Custom Design Form (Landing Page)
    const customForm = document.getElementById('custom-lead-form');
    if (customForm) {
        customForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = customForm.querySelector('input[name="name"]')?.value.trim() || 'Customer';
            const phone = customForm.querySelector('input[name="phone"]')?.value.trim() || '';
            const design = customForm.querySelector('textarea')?.value.trim() || '';
            if (!phone) { showNotification('Please enter your phone number.', 'error'); return; }
            submitLead({ name, phone, source: 'Custom Design Inquiry', design }, customForm);
        });

        // Image Selection Helper
        const imageInput = document.getElementById('image-upload');
        const removeBtn = document.getElementById('remove-image-btn');

        if (imageInput && removeBtn) {
            imageInput.addEventListener('change', () => {
                if (imageInput.files && imageInput.files.length > 0) {
                    removeBtn.style.display = 'block';
                } else {
                    removeBtn.style.display = 'none';
                }
            });

            removeBtn.addEventListener('click', () => {
                imageInput.value = '';
                removeBtn.style.display = 'none';
            });
        }
    }

    // Initialize Rates
    fetchLiveMetalsRates();
    setInterval(fetchLiveMetalsRates, 300000); // refresh every 5 min

    // Gold Rate Modal - Tracking Insight
    const goldRateBtn = document.getElementById('open-rates-btn');
    if (goldRateBtn) {
        goldRateBtn.addEventListener('click', () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'micro_conversion',
                'action': 'check_gold_rate',
                'category': 'engagement'
            });
        });
    }

    // --- Performance Marketing: Attribution Capture ---
    captureUTMs();
});

/**
 * Capture UTM parameters from URL and store in Session Storage
 */
function captureUTMs() {
    const params = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    const attribution = JSON.parse(sessionStorage.getItem('smg_attribution') || '{}');

    utms.forEach(param => {
        if (params.has(param)) {
            attribution[param] = params.get(param);
        }
    });

    if (Object.keys(attribution).length > 0) {
        sessionStorage.setItem('smg_attribution', JSON.stringify(attribution));
        console.log('Marketing Attribution Captured:', attribution);
    }
}

/**
 * Fetch metal rates from the serverless API
 */
async function fetchLiveMetalsRates() {
    try {
        const response = await fetch('/api/metal-rates');
        const data = await response.json();

        if (data.success) {
            updateRatesUI(data.rates);
        }
    } catch (error) {
        console.warn("API unavailable. Using display fallbacks.");
        // Fallback for demo/local dev
        const mockRates = {
            gold24: { formatted: '₹14,250' },
            gold22: { formatted: '₹13,550' },
            gold18: { formatted: '₹10,163' },
            silver: { formatted: '₹225' },
            platinum: { formatted: '₹7,277' }
        };
        updateRatesUI(mockRates);
    }
}

/**
 * Update all rate displays in the UI
 * @param {Object} rates 
 */
function updateRatesUI(rates) {
    const gold24 = rates.gold24.formatted + '/g';
    const gold22 = rates.gold22.formatted + '/g';
    const gold18 = rates.gold18 ? rates.gold18.formatted + '/g' : '₹10,163/g';
    const silver = rates.silver.formatted + '/g';
    const platinum = rates.platinum.formatted + '/g';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update Modal
    const modalGold24 = document.getElementById('modal-gold24');
    const modalGold22 = document.getElementById('modal-gold22');
    const modalGold18 = document.getElementById('modal-gold18');
    const modalSilver = document.getElementById('modal-silver');
    const modalPlatinum = document.getElementById('modal-platinum');
    const modalTime = document.getElementById('rate-timestamp');

    if (modalGold24) modalGold24.textContent = gold24;
    if (modalGold22) modalGold22.textContent = gold22;
    if (modalGold18) modalGold18.textContent = gold18;
    if (modalSilver) modalSilver.textContent = silver;
    if (modalPlatinum) modalPlatinum.textContent = platinum;
    if (modalTime) modalTime.textContent = `Last updated: Today, ${timestamp}`;
}

/**
 * Submit lead to Telegram via serverless API
 */
async function submitLead(data, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    }

    // Merge Attribution Data
    const attribution = JSON.parse(sessionStorage.getItem('smg_attribution') || '{}');
    const payload = { 
        ...data, 
        attribution,
        timestamp: new Date().toISOString() 
    };

    try {
        const response = await fetch('/api/submit-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
            // Push Conversion to DataLayer for Google Ads/GA4
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'lead_conversion',
                'lead_type': data.source,
                'marketing_source': attribution.utm_source || 'direct'
            });

            showNotification('Thank you! Our team will contact you shortly.', 'success');
            form.reset();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Lead submission error:', error);
        showNotification('Submitting... Opening WhatsApp for quick contact.', 'success');
        
        // Fallback: open WhatsApp if API fails
        const utmString = attribution.utm_source ? ` [Source: ${attribution.utm_source}]` : '';
        const msg = encodeURIComponent(`Hi SMG Jewellers! My name is ${data.name}. Phone: ${data.phone}. ${data.design ? 'Design idea: ' + data.design : data.source}${utmString}`);
        window.open(`https://wa.me/919014659444?text=${msg}`, '_blank');
    } finally {
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

/**
 * Show a modern, animated notification toast
 */
function showNotification(message, type = 'success') {
    let container = document.querySelector('.smg-notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'smg-notification-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `smg-toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    // Remove toast after animation finishes
    setTimeout(() => {
        toast.remove();
        if (container.childNodes.length === 0) {
            container.remove();
        }
    }, 5000);
}
