// Firebase CDN - No npm needed
const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");

const firebaseConfig = {
  apiKey: "AIzaSyB93-AOcHZMz7_dYP_yRaDFGXi9iQ6Wxis",
  authDomain: "f88-ai-signals.firebaseapp.com",
  projectId: "f88-ai-signals",
  storageBucket: "f88-ai-signals.firebasestorage.app",
  messagingSenderId: "345283236517",
  appId: "1:345283236517:web:a5d4d7b8f98ba99b2ef34c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const signals = [
  { pair: "🟢 BUY - BTC/USD", entry: 106250, sl: 105900, tp1: 106600, tp2: 106900, tp3: 107300, confidence: "92%", trend: "Bullish" },
  { pair: "🔴 SELL - XAU/USD", entry: 3320, sl: 3335, tp1: 3305, tp2: 3290, tp3: 3270, confidence: "87%", trend: "Bearish" },
  { pair: "🟢 BUY - EUR/USD", entry: 1.0850, sl: 1.0800, tp1: 1.0900, tp2: 1.0950, tp3: 1.1000, confidence: "78%", trend: "Bullish" },
];

let current = 0;

function showSignal(s) {
  document.getElementById("pair").innerHTML = s.pair;
  document.getElementById("entry").innerHTML = `<b>💰 Entry:</b> ${s.entry}`;
  document.getElementById("sl").innerHTML = `<b>🛑 Stop Loss:</b> ${s.sl}`;
  document.getElementById("tp1").innerHTML = `<b>🎯 TP1:</b> ${s.tp1}`;
  document.getElementById("tp2").innerHTML = `<b>🎯 TP2:</b> ${s.tp2}`;
  document.getElementById("tp3").innerHTML = `<b>🚀 TP3:</b> ${s.tp3}`;
  document.getElementById("confidence").innerHTML = `🤖 AI Confidence : <b>${s.confidence}</b>`;
  document.getElementById("trend").innerHTML = `📈 Trend : ${s.trend}`;
}

async function saveToFirebase(s) {
  try {
    await addDoc(collection(db, "signals"), {
      ...s,
      timestamp: new Date().toISOString()
    });
    console.log("✅ Saved!");
  } catch(e) {
    console.error("❌", e);
  }
}

window.changeSignal = function() {
  current = (current + 1) % signals.length;
  showSignal(signals[current]);
  saveToFirebase(signals[current]);
}

showSignal(signals[0]);
saveToFirebase(signals[0]);