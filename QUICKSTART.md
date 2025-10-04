# ⚡ Quick Start Guide

Get your "Who Will Pay the Bill?" app running in 3 minutes!

## 🚀 Local Development (2 minutes)

```bash
# 1. Navigate to project
cd whoWillPay

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🎮 How to Use (1 minute)

1. **Add Friends**: Type names and press Enter
2. **Optional**: Enter bill amount
3. **Click "Who Will Pay?"**: Watch the magic! 🎰
4. **Enjoy**: Confetti + Winner! 🎉

---

## 🌐 Deploy to Netlify (5 minutes)

### Quick Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd whoWillPay
netlify deploy --prod
```

**Done!** Your app is live! 🎉

### Or Use GitHub

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Import from Git"
4. Select your repo
5. Click "Deploy"

---

## 📱 Features You'll See

✅ Smooth animations (Framer Motion)  
✅ Spinning wheel (3 seconds)  
✅ Confetti explosion  
✅ Responsive design  
✅ Fun messages  

---

## 🛠️ Available Commands

```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run linter
```

---

## 🎯 Project Structure

```
whoWillPay/
├── app/
│   ├── components/      # React components
│   ├── page.tsx         # Main page
│   └── layout.tsx       # Root layout
├── package.json         # Dependencies
└── netlify.toml         # Netlify config
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`

### Change Messages
Edit `app/components/WinnerCard.tsx`

### Change Animation Speed
Edit `app/page.tsx` (line 75)

---

## 📚 Full Documentation

- **README.md**: Complete features
- **DEPLOYMENT_GUIDE.md**: Netlify deployment
- **This file**: Quick start

---

## 🎉 That's It!

You're ready to go! 🚀

**Enjoy! 🍕💸**

