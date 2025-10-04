# 🍕 Who Will Pay the Bill?

A fun and interactive Next.js 14 app that randomly selects who pays the bill from a group of friends!

## ✨ Features

- 🎯 **Random Selection**: Fairly picks one person from your friends list
- 🎰 **Spinning Wheel Animation**: Exciting spinning effect before revealing the winner
- 🎊 **Confetti Celebration**: Confetti explosion when the winner is selected
- 💰 **Bill Amount Tracker**: Optional field to display the total bill
- 👥 **Friends Management**: Easy add/remove friends with smooth animations
- 📤 **Viral Sharing**: Share hilarious messages on WhatsApp 💬, Twitter 🐦, and as images 📸!
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- 🎨 **Beautiful UI**: Vibrant gradients, smooth animations, and playful design
- ⚡ **Fast & Modern**: Built with Next.js 14 App Router

## 🚀 Quick Start

### Installation

```bash
# Navigate to project
cd whoWillPay

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎮 How to Use

1. **Add Friends**: Enter names in the input field and click "Add" or press Enter
2. **Set Bill Amount** (Optional): Enter the total bill amount
3. **Click "Who Will Pay?"**: Watch the spinning wheel animation
4. **See the Winner**: Enjoy the confetti and see who got selected!
5. **Share Result**: Share funny viral messages on WhatsApp 💬, Twitter 🐦, or as images 📸
6. **Reset**: Clear everything and start over

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Confetti**: canvas-confetti
- **Image Generation**: html2canvas

## 📁 Project Structure

```
whoWillPay/
├── app/
│   ├── components/
│   │   ├── NameInput.tsx       # Input field for adding friends
│   │   ├── NameList.tsx        # Display list of friends
│   │   ├── SpinningWheel.tsx   # Spinning animation overlay
│   │   └── WinnerCard.tsx      # Winner announcement card
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page component
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── netlify.toml                # Netlify deployment config
├── IMAGE_SHARE_FEATURE.md      # Image sharing documentation
└── package.json                # Dependencies
```

## 🚀 Deploy to Netlify

### Option 1: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 2: Using Netlify Dashboard

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings are auto-detected from `netlify.toml`
6. Click "Deploy site"

### Option 3: Drag & Drop

```bash
# Build the project
npm run build

# Drag the .next folder to Netlify dashboard
```

## 📦 Build Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` to modify the color scheme

### Modify Messages
Edit the `funnyMessages` array in `app/components/WinnerCard.tsx`

### Adjust Animation Duration
Modify the timeout in `app/page.tsx` (line 75)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes!

## 🎉 Acknowledgments

- Built with ❤️ using Next.js 14
- Animations powered by Framer Motion
- Confetti by canvas-confetti
- Image sharing with html2canvas

---

**Enjoy deciding who pays the bill! 🍕💸**

