/* ============================================================
   Suvarna Finance — Multi-Page Demo Navigation Switcher
   ============================================================ */

(function () {
  const currentPath = window.location.pathname.toLowerCase();
  
  let activePage = 'customer';
  if (currentPath.includes('employee-panel.html')) {
    activePage = 'staff';
  } else if (currentPath.includes('admin-portal.html')) {
    activePage = 'admin';
  } else {
    activePage = 'customer';
  }

  const navHtml = `
    <div id="suvarna-demo-bar">
      <div class="sdb-left">
        <a href="index.html" class="sdb-brand">
          <span class="sdb-badge">Suvarna Finance</span>
        </a>
        <div class="sdb-links">
          <a href="index.html" class="sdb-link ${activePage === 'customer' ? 'active' : ''}">👤 Customer Portal (Landing & App)</a>
          <a href="employee-panel.html" class="sdb-link ${activePage === 'staff' ? 'active' : ''}">🧑‍💼 Staff Portal (Maker-Checker)</a>
          <a href="admin-portal.html" class="sdb-link ${activePage === 'admin' ? 'active' : ''}">🏛️ Admin & Branch OS</a>
        </div>
      </div>
      <div class="sdb-right">
        <div class="sdb-sync"><span class="sdb-dot"></span> Live Prototype</div>
        <button class="sdb-btn" onclick="openSuvarnaPitchModal()">📋 Pitch Deck</button>
      </div>
    </div>

    <!-- Pitch Deck Modal -->
    <div id="suvarna-pitch-modal" class="sdb-modal-overlay" onclick="if(event.target===this) closeSuvarnaPitchModal()">
      <div class="sdb-modal">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px;">
          <div>
            <div style="font-size:11px; font-weight:800; text-transform:uppercase; color:#B8860B; letter-spacing:0.1em;">Executive Pitch</div>
            <h2 style="font-family:'Fraunces', serif; font-size:22px; margin:4px 0;">Suvarna Digital Lending Ecosystem</h2>
          </div>
          <button class="sdb-close-btn" onclick="closeSuvarnaPitchModal()">✕</button>
        </div>
        <div style="font-size:13.5px; line-height:1.6; color:#5B4E3A; margin-bottom:20px;">
          <b>The Problem:</b> Traditional gold and small-ticket lending relies heavily on physical branch counter queues, slow paper-based KYC, and manual underwriting bottlenecks.<br><br>
          <b>The Solution:</b> A 3-tier integrated digital lending architecture:
          <ul style="margin:10px 0 10px 20px; font-size:13px;">
            <li><b>1. Customer Portal:</b> Self-service discovery, digital KYC reuse, instant 0% EMI planner & live 5-stage status tracking.</li>
            <li><b>2. Staff Portal (Maker-Checker):</b> Loan Officers verify KYC and value assets; Branch Managers approve & disburse. Zero single-point fraud.</li>
            <li><b>3. Admin & Branch OS:</b> Executive branch analytics, physical gold vault custody audit, collections ledger, and RBI rule controls.</li>
          </ul>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:20px;">
          <a href="index.html" class="sdb-modal-card">
            <b>1. Customer Portal →</b>
            <span>Borrower landing, KYC & dashboard</span>
          </a>
          <a href="employee-panel.html" class="sdb-modal-card">
            <b>2. Staff Panel →</b>
            <span>Maker-checker underwriting</span>
          </a>
          <a href="admin-portal.html" class="sdb-modal-card">
            <b>3. Admin OS →</b>
            <span>Vault custody & branch rules</span>
          </a>
        </div>
        <button class="sdb-btn-primary" onclick="closeSuvarnaPitchModal()">Continue Demo</button>
      </div>
    </div>
  `;

  const navStyles = `
    <style>
      body {
        padding-top: 46px !important;
      }
      #suvarna-demo-bar {
        position: fixed;
        top: 0; left: 0; right: 0;
        height: 46px;
        background: linear-gradient(90deg, #182C30 0%, #241C12 55%, #3B2B1B 100%);
        color: #fff;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.35);
        font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12.5px;
        user-select: none;
      }
      .sdb-left { display: flex; align-items: center; gap: 14px; }
      .sdb-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
      .sdb-badge {
        background: linear-gradient(135deg, #E7C874, #B8860B);
        color: #1A150E;
        font-size: 11px;
        font-weight: 800;
        padding: 4px 9px;
        border-radius: 6px;
        letter-spacing: 0.04em;
      }
      .sdb-links {
        display: flex;
        gap: 5px;
        background: rgba(255,255,255,0.08);
        padding: 3px;
        border-radius: 30px;
      }
      .sdb-link {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 11.5px;
        font-weight: 700;
        color: rgba(255,255,255,0.75);
        text-decoration: none;
        transition: all .15s ease;
      }
      .sdb-link:hover {
        color: #fff;
        background: rgba(255,255,255,0.12);
      }
      .sdb-link.active {
        background: #fff;
        color: #182C30;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      }
      .sdb-right { display: flex; align-items: center; gap: 10px; }
      .sdb-sync {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        font-weight: 600;
        color: #7FD996;
      }
      .sdb-dot {
        width: 7px; height: 7px;
        background: #7FD996;
        border-radius: 50%;
        box-shadow: 0 0 6px #7FD996;
      }
      .sdb-btn {
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.2);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        padding: 5px 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: all .15s ease;
      }
      .sdb-btn:hover {
        background: rgba(255,255,255,0.22);
      }
      .sdb-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(20, 36, 40, 0.7);
        backdrop-filter: blur(4px);
        z-index: 100000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .sdb-modal-overlay.active { display: flex; }
      .sdb-modal {
        background: #FAF6ED;
        border: 1px solid #E7DCC4;
        border-radius: 18px;
        max-width: 680px;
        width: 100%;
        padding: 28px 32px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        color: #241C12;
        font-family: 'Manrope', sans-serif;
      }
      .sdb-close-btn {
        background: #EFE4CC;
        border: none;
        width: 28px; height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-weight: 700;
        color: #5B4E3A;
      }
      .sdb-modal-card {
        background: #fff;
        border: 1px solid #E7DCC4;
        border-radius: 10px;
        padding: 12px 14px;
        text-decoration: none;
        color: #241C12;
        display: block;
        transition: all .15s ease;
      }
      .sdb-modal-card:hover {
        border-color: #B8860B;
        transform: translateY(-2px);
      }
      .sdb-modal-card b { display: block; font-size: 12px; color: #8A6410; margin-bottom: 2px; }
      .sdb-modal-card span { font-size: 11px; color: #8A7A5E; }
      .sdb-btn-primary {
        width: 100%;
        background: linear-gradient(180deg, #C79A1E, #8A6410);
        color: #fff;
        font-weight: 700;
        font-size: 13.5px;
        padding: 11px;
        border: none;
        border-radius: 999px;
        cursor: pointer;
      }
      @media (max-width: 860px) {
        .sdb-sync { display: none; }
        .sdb-link { padding: 4px 8px; font-size: 10.5px; }
      }
    </style>
  `;

  document.head.insertAdjacentHTML('beforeend', navStyles);
  document.body.insertAdjacentHTML('afterbegin', navHtml);
})();

function openSuvarnaPitchModal() {
  document.getElementById('suvarna-pitch-modal').classList.add('active');
}
function closeSuvarnaPitchModal() {
  document.getElementById('suvarna-pitch-modal').classList.remove('active');
}
