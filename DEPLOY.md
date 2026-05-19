# Esther Martinez Portfolio — GitHub Pages Deployment Guide

## Project Structure
```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── App.js         ← All components & data
│   ├── App.css        ← All styles
│   ├── index.js       ← Entry point
│   └── index.css      ← Global styles & variables
└── package.json
```

---

## Step-by-Step Deployment

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- A GitHub account

### 2. Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `portfolio` (or anything you like)
3. Leave it **public** (required for free GitHub Pages)
4. **Do NOT** initialize with README, .gitignore, or license

### 3. Set Your Homepage URL
Open `package.json` and update this line:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/portfolio"
```
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username,  
and `portfolio` with your repo name if different.

### 4. Install Dependencies
In the project folder, run:
```bash
npm install
```

### 5. Initialize Git & Push Code
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 6. Deploy to GitHub Pages
```bash
npm run deploy
```
This runs the build and pushes to a `gh-pages` branch automatically.

### 7. Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under "Branch", select `gh-pages` and `/ (root)`
4. Click **Save**

Your site will be live at:  
`https://YOUR_USERNAME.github.io/portfolio`  
(may take 1–3 minutes to go live)

---

## Future Updates
Every time you make changes, just run:
```bash
npm run deploy
```
That's it — it rebuilds and redeploys automatically.

---

## Customization Tips
- **Add your photo**: Add an `<img>` tag in the Hero section of `App.js`
- **Add GitHub links**: Add a `github` field to each project in `PROJECTS` array
- **Change colors**: Edit CSS variables at the top of `index.css`
- **Add more projects**: Duplicate an entry in the `PROJECTS` array in `App.js`
- **Update LinkedIn URL**: Search for `linkedin.com/in/` in `App.js`

---

## Running Locally
```bash
npm start
```
Opens at `http://localhost:3000`
