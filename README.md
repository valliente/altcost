# 🚀 AltCost — Alternative History Asset Comparison Engine

> **Turn daily guilt expenses into alternative wealth awareness.**

AltCost is an interactive, high-vibes web and desktop application designed to calculate what recurring cash expenses (e.g., $7/day artisanal lattes, $150/mo DoorDash, $50/wk bar tabs) would be worth today if invested in traditional market benchmarks (**S&P 500 / $SPY**) versus grail alternative tangible assets (**Vintage Lego Sets, Luxury Rolex Watches, Sealed Pokemon Trading Cards, Gold, and Bitcoin**).

---

## 🌟 Key Features

- **⚡ Real-Time Compounding Engine**:
  Computes historical dollar-cost-averaging (DCA) performance, net profits, and ROI percentages for recurring daily, weekly, or monthly expenses from 2015 to 2026.
- **🏆 Tangible Asset Unit Equivalents**:
  Automatically converts dollar balances into tangible physical items (*"Your $7/day coffee habit = 14.2 Vintage Lego Sets or $24,100 in S&P 500"*).
- **📈 Interactive Visualizer (Recharts)**:
  Side-by-side area curves displaying portfolio trajectories with custom currency tooltips and series toggles.
- **⚡ 1-Click Preset Templates**:
  Instant quick-select cards for common habits (*Daily $7 Latte*, *Monthly $150 DoorDash*, *Weekly $50 Bar Tab*, *Monthly $200 Vape*, *Weekly $80 Uber*).
- **🖥️ Dual Platform Packaging**:
  Built with Vite + React for web deployment and packaged into standalone Windows `.exe` installers via Electron.
- **🤖 Automated GitHub Release Pipeline**:
  CI/CD GitHub Actions workflow (`.github/workflows/build-release.yml`) automatically builds and deploys the static web app to **GitHub Pages** and compiles downloadable Windows `.exe` releases whenever a tag (`v*.*.*`) is pushed.

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4, Lucide Icons
- **Data Visualization**: Recharts
- **Desktop Wrapper**: Electron 33, Electron-Builder
- **Build Tooling**: Vite 6, PostCSS
- **CI/CD**: GitHub Actions (GitHub Pages + GitHub Releases)

---

## 🚀 Quickstart Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ 
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/altcost.git
cd altcost

# Install dependencies
npm install

# Start Vite web dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🖥️ Desktop Application (Electron)

### Run Desktop App locally in Development Mode

```bash
npm run electron:dev
```

### Compile Windows Desktop Executable (`.exe`)

```bash
npm run dist
```

Outputs standalone `.exe` installers inside `dist-electron/`.

---

## 📦 Automated GitHub Release Workflow

Pushing a tag matching `v*.*.*` automatically triggers `.github/workflows/build-release.yml`:

```bash
git tag v1.0.0
git push origin v1.0.0
```

1. **Web App**: Automatically deploys the static build to the `gh-pages` branch.
2. **Desktop Installer**: Runs `electron-builder`, compiles `AltCost Setup 1.0.0.exe` and `AltCost 1.0.0.exe` (portable), and attaches them directly to the GitHub Release notes.

---

## ⚖️ License & Disclaimer

AltCost is provided for educational and alternative history wealth awareness simulations. Compound asset CAGR calculations are derived from historical market data from 2015–2026. Past performance is no guarantee of future returns.
