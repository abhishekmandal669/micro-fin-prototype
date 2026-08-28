/* ============================================================
   Suvarna Finance — Shared Reactive State Manager (localStorage)
   ============================================================ */

const DEFAULT_PRODUCTS = {
  gold: { label: 'Gold Loan', icon: '🪙', rate: 9.5, min: 20000, max: 1500000, minT: 3, maxT: 24 },
  property: { label: 'Loan Against Property', icon: '🏠', rate: 10.5, min: 500000, max: 10000000, minT: 12, maxT: 180 },
  personal: { label: 'Personal Loan', icon: '💳', rate: 11.0, min: 7000, max: 200000, minT: 3, maxT: 12 }
};

const DEFAULT_APP_STEPS = [
  'Submitted',
  'KYC Verified',
  'Credit & Valuation',
  'Recommended by Officer',
  'Approved by Manager',
  'Disbursed'
];

function getInitialDemoState() {
  return {
    customers: [
      {
        id: 1,
        name: 'Priya Sharma',
        phone: '9815022341',
        email: 'priya.sharma@email.com',
        kyc: { aadhaar: '2345 6789 0123', pan: 'BXPPK7345L', address: true, photo: true, verified: true },
        creditScore: 742
      },
      {
        id: 2,
        name: 'Meera Kaur',
        phone: '9872145590',
        email: 'meera.k@email.com',
        kyc: { aadhaar: '3456 7890 5590', pan: 'CKRPK9912A', address: true, photo: true, verified: true },
        creditScore: 715
      },
      {
        id: 3,
        name: 'Ranjit Singh',
        phone: '9914588231',
        email: 'ranjit.s@email.com',
        kyc: { aadhaar: '4567 8901 8231', pan: 'ABCPR1102K', address: true, photo: true, verified: true },
        creditScore: 690
      },
      {
        id: 4,
        name: 'Suresh Kumar',
        phone: '9888433210',
        email: 'suresh.k@email.com',
        kyc: { aadhaar: '5678 9012 3210', pan: 'DEXPK4410M', address: true, photo: false, verified: false },
        creditScore: 620
      }
    ],
    loans: [
      {
        id: 1001,
        custId: 1,
        product: 'gold',
        amount: 200000,
        tenure: 12,
        rate: 9.5,
        emi: 18240,
        status: 5, // Disbursed
        date: '14 Apr 2026',
        purpose: 'Gold jewellery pledge for working capital',
        recommendedBy: 'Amit Verma (Officer)',
        approvedBy: 'Neha Kapoor (Manager)',
        paidMonths: 5,
        overdueEmis: 0,
        valuation: { goldWeight: 48.2, purity: '22k', valuer: 'SVB-Assayer-014' }
      },
      {
        id: 1002,
        custId: 2,
        product: 'gold',
        amount: 130000,
        tenure: 12,
        rate: 9.5,
        emi: 11400,
        status: 3, // Recommended (Awaiting Manager Approval)
        date: '26 Aug 2026',
        purpose: 'Agriculture seasonal procurement',
        recommendedBy: 'Amit Verma (Officer)',
        approvedBy: null,
        paidMonths: 0,
        overdueEmis: 0,
        valuation: { goldWeight: 32.1, purity: '22k', valuer: 'SVB-Assayer-014' }
      },
      {
        id: 1003,
        custId: 3,
        product: 'personal',
        amount: 50000,
        tenure: 6,
        rate: 8.0,
        emi: 8530,
        status: 1, // KYC Verified (Awaiting Valuation)
        date: '27 Aug 2026',
        purpose: 'Medical emergency',
        recommendedBy: null,
        approvedBy: null,
        paidMonths: 0,
        overdueEmis: 0,
        valuation: { income: 45000, emp: 'Salaried' }
      },
      {
        id: 1004,
        custId: 4,
        product: 'gold',
        amount: 175000,
        tenure: 12,
        rate: 9.5,
        emi: 14600,
        status: 5, // Disbursed (Overdue)
        date: '10 Jan 2026',
        purpose: 'Store renovation',
        recommendedBy: 'Amit Verma (Officer)',
        approvedBy: 'Neha Kapoor (Manager)',
        paidMonths: 7,
        overdueEmis: 2,
        valuation: { goldWeight: 60.0, purity: '18k', valuer: 'SVB-Assayer-014' }
      }
    ],
    auditLog: [
      { time: '27 Aug, 11:45 AM', actor: 'Priya Sharma (Borrower)', action: 'Applied for Personal Loan with 6-month EMI plan' },
      { time: '26 Aug, 04:30 PM', actor: 'Amit Verma (Loan Officer)', action: 'Completed gold valuation for Meera Kaur (GL-1002) and recommended to Manager' },
      { time: '25 Aug, 02:15 PM', actor: 'Neha Kapoor (Branch Manager)', action: 'Approved and authorized disbursal for Loan #1001' }
    ]
  };
}

class SuvarnaStore {
  static getState() {
    const raw = localStorage.getItem('suvarna_state_v2');
    if (!raw) {
      const initial = getInitialDemoState();
      localStorage.setItem('suvarna_state_v2', JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      const initial = getInitialDemoState();
      localStorage.setItem('suvarna_state_v2', JSON.stringify(initial));
      return initial;
    }
  }

  static saveState(state) {
    localStorage.setItem('suvarna_state_v2', JSON.stringify(state));
  }

  static reset() {
    const initial = getInitialDemoState();
    localStorage.setItem('suvarna_state_v2', JSON.stringify(initial));
    return initial;
  }

  static logAudit(actor, action) {
    const s = this.getState();
    s.auditLog.unshift({
      time: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      actor: actor || 'System',
      action
    });
    this.saveState(s);
  }

  static inr(n) {
    n = Math.round(n || 0);
    return '₹' + n.toLocaleString('en-IN');
  }

  static calcEmi(P, annualRatePct, n) {
    if (!annualRatePct || annualRatePct === 0) return Math.round(P / n);
    const r = (annualRatePct / 12) / 100;
    return Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }
}
