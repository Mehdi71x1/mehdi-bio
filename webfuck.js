(function() {

  const css = `
    .mehdi-overlay {
      position: fixed;
      inset: 0;
      background: linear-gradient(160deg, #0f0f1f, #1a1a2e);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      color: #fff;
      font-family: Arial, sans-serif;
      text-align: center;
      flex-direction: column;
      padding: 20px;
    }
    .mehdi-title {
      font-size: 2.4em;
      font-weight: bold;
      color: #FFD166;
      margin-bottom: 10px;
      text-shadow: 0 0 15px rgba(255,209,102,0.6);
    }
    .mehdi-sub {
      font-size: 1.2em;
      margin-bottom: 20px;
    }
    .mehdi-dialogue {
      background: rgba(255,255,255,0.1);
      padding: 15px;
      border-radius: 10px;
      text-align: left;
      max-width: 550px;
      font-size: 15px;
      margin-bottom: 20px;
      line-height: 1.6em;
    }
    .mehdi-btn {
      background: #FFD166;
      color: #000;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      cursor: pointer;
      font-size: 1em;
      transition: all 0.2s ease-in-out;
      text-decoration: none;
      display: inline-block;
    }
    .mehdi-btn:hover {
      background: #ffcc33;
      transform: scale(1.05);
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "mehdi-overlay";
  overlay.innerHTML = `
    <div class="mehdi-title">This Website Is Fucked By Mehdi Hasan</div>
    <div class="mehdi-sub">Contact Me 😅</div>
    <div class="mehdi-dialogue">
      <p>🔥 I am a Hacker.</p>
      <p>⚡ One tap from me, your system is history.</p>
      <p>💻 I don’t break rules, I rewrite them.</p>
      <p>👾 In the world of codes, I am the glitch you can’t fix.</p>
    </div>
    <a href="https://mehdi-bio.netlify.app" target="_blank" class="mehdi-btn">Contact Me</a>
  `;
  document.body.appendChild(overlay);
})();
