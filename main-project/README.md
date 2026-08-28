# Suvarna Finance — Digital Lending Platform Prototype

A unified, self-contained, interactive digital lending platform prototype combining:
1. **Customer Self-Service Portal** (Discovery, instant EMI planner, digital KYC, live 5-stage tracking, EMI payments & foreclosure).
2. **Staff Operational Portal with Maker-Checker Workflow** (Loan Officer verification & recommendation $\rightarrow$ Branch Manager approval & disbursal, counter onboarding, collections).
3. **Admin & Branch Management OS** (Executive dashboard, gold vault ledger, repayments, and RBI compliance rules).
4. **Interactive Demo Switcher Bar & Investor Pitch Modal** (One-click role switching with live reactive shared state).

---

## 🚀 Instant Deployment to Vercel

### Option 1: Vercel CLI
```bash
cd "c:\Users\Abhishek Kr Mandal\Desktop\Micro_finace\main-project"
npx vercel
```

### Option 2: GitHub / Drag & Drop
1. Push this folder to GitHub or upload the folder to your Vercel Dashboard.
2. Select **Framework Preset**: `Other` / Static HTML.
3. Deploy! The `index.html` is ready out of the box with zero build steps required.

---

## 🌟 Key Prototype Features for Pitching
- **Zero Login Friction:** Anyone opening your Vercel link can switch between Customer, Loan Officer, Branch Manager, and Admin with 1-click on the top demo bar.
- **Shared Live State:** When a customer applies for a loan in the Customer Portal, it immediately appears in the Staff Queue for review, and updates the Admin Branch KPIs.
- **Built-in Pitch Deck:** Click the `📋 Pitch Deck & Flow` button in the top bar to display the problem/solution slide directly during product demos.
