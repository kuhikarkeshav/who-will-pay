"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface WinnerCardProps {
  winner: string;
  billAmount?: string;
}

const funnyMessages = [
  "is paying the bill! 🎉",
  "got lucky today! 💸",
  "is the chosen one! 🌟",
  "will treat everyone! 🍕",
  "is our hero! 🦸",
  "wins the honor! 🏆",
  "is feeling generous! 💰",
  "got picked by fate! 🎲",
];

// Viral share messages - randomized for freshness!
const viralShareMessages = [
  "😂 Guess who is paying the bill today? 👉 {name} 💸 Better luck next time!",
  "🍕 {name} is today's sponsor! Everyone eat extra 🤣",
  "🏆 {name} lost the bill challenge. Drinks on them! 🍻",
  "💰 Breaking News: {name} just became everyone's favorite person! 🎊",
  "🎲 The wheel of fortune has spoken! {name} is treating us all! 🍔",
  "🤑 {name} hit the jackpot... of paying! 😅 Thanks buddy!",
  "🎯 Target acquired: {name}'s wallet! Mission accomplished! 💳",
  "🚨 Alert: {name} is feeling EXTRA generous today! 🍻",
  "⚡ Plot twist: {name} volunteered to pay! (Just kidding, they lost) 😂",
  "🎪 Ladies and gentlemen, our sponsor for today: {name}! 👏",
  "💸 {name} just unlocked the 'Generous Friend' achievement! 🏅",
  "🍕 Pizza party sponsored by {name}! They didn't have a choice 🤣",
];

export default function WinnerCard({ winner, billAmount }: WinnerCardProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [shareError, setShareError] = useState(false);
  const [usedNativeShare, setUsedNativeShare] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const randomMessage =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  // Get random viral share message
  const getViralMessage = () => {
    const template = viralShareMessages[Math.floor(Math.random() * viralShareMessages.length)];
    return template.replace("{name}", winner);
  };

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    const message = getViralMessage();
    const billText = billAmount ? `\n💰 Bill Amount: ₹${billAmount}\n` : "\n";
    const fullMessage = `${message}${billText}\n🎮 Try it yourself: https://whowillpay.netlify.app`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank");
    setShowCopied(true);
    setUsedNativeShare(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Share to Twitter
  const shareToTwitter = () => {
    const message = getViralMessage();
    const billText = billAmount ? `\nBill: ₹${billAmount} 💸` : "";
    const fullMessage = `${message}${billText}\n\n🎮 Play now:`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullMessage)}&url=https://whowillpay.netlify.app`;
    window.open(twitterUrl, "_blank");
    setShowCopied(true);
    setUsedNativeShare(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Generate beautiful shareable image
  const generateShareImage = async (): Promise<Blob> => {
    // Create a canvas for the share image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    // Set canvas size (Instagram optimal: 1080x1080)
    canvas.width = 1080;
    canvas.height = 1080;

    // Create gradient background (orange to yellow)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#FF6B35");
    gradient.addColorStop(0.5, "#F7931E");
    gradient.addColorStop(1, "#FDC830");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw trophy emoji (large)
    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🏆", canvas.width / 2, 250);

    // Draw "Winner Winner!" text
    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText("Winner Winner!", canvas.width / 2, 350);

    // Draw white rounded rectangle for winner name
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#FFFFFF";
    const rectWidth = 900;
    const rectHeight = 180;
    const rectX = (canvas.width - rectWidth) / 2;
    const rectY = 400;
    const radius = 30;

    ctx.beginPath();
    ctx.moveTo(rectX + radius, rectY);
    ctx.lineTo(rectX + rectWidth - radius, rectY);
    ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + radius);
    ctx.lineTo(rectX + rectWidth, rectY + rectHeight - radius);
    ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - radius, rectY + rectHeight);
    ctx.lineTo(rectX + radius, rectY + rectHeight);
    ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - radius);
    ctx.lineTo(rectX, rectY + radius);
    ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
    ctx.closePath();
    ctx.fill();

    // Draw winner name (purple gradient)
    const nameGradient = ctx.createLinearGradient(0, rectY + 60, 0, rectY + 140);
    nameGradient.addColorStop(0, "#A855F7");
    nameGradient.addColorStop(1, "#EC4899");
    ctx.fillStyle = nameGradient;
    ctx.font = "bold 90px Arial";
    ctx.fillText(winner, canvas.width / 2, rectY + 120);

    // Draw funny message
    ctx.fillStyle = "#333333";
    ctx.font = "600 45px Arial";
    const message = randomMessage;
    ctx.fillText(message, canvas.width / 2, rectY + rectHeight + 80);

    // Draw "Try it yourself!" section
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    const tryRectY = 850;
    const tryRectHeight = 150;
    ctx.beginPath();
    ctx.moveTo(rectX + radius, tryRectY);
    ctx.lineTo(rectX + rectWidth - radius, tryRectY);
    ctx.quadraticCurveTo(rectX + rectWidth, tryRectY, rectX + rectWidth, tryRectY + radius);
    ctx.lineTo(rectX + rectWidth, tryRectY + tryRectHeight - radius);
    ctx.quadraticCurveTo(rectX + rectWidth, tryRectY + tryRectHeight, rectX + rectWidth - radius, tryRectY + tryRectHeight);
    ctx.lineTo(rectX + radius, tryRectY + tryRectHeight);
    ctx.quadraticCurveTo(rectX, tryRectY + tryRectHeight, rectX, tryRectY + tryRectHeight - radius);
    ctx.lineTo(rectX, tryRectY + radius);
    ctx.quadraticCurveTo(rectX, tryRectY, rectX + radius, tryRectY);
    ctx.closePath();
    ctx.fill();

    // Draw "Try it yourself!" text
    ctx.fillStyle = "#FF6B35";
    ctx.font = "bold 50px Arial";
    ctx.fillText("🎮 Try it yourself!", canvas.width / 2, tryRectY + 70);

    // Draw website URL
    ctx.fillStyle = "#666666";
    ctx.font = "600 35px Arial";
    ctx.fillText("whowillpay.netlify.app", canvas.width / 2, tryRectY + 120);

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png", 1.0);
    });
  };

  // Share to Instagram (native share with image)
  const shareToInstagram = async () => {
    setIsGeneratingImage(true);
    try {
      const blob = await generateShareImage();
      const file = new File([blob], "who-will-pay.png", { type: "image/png" });

      const viralMessage = getViralMessage();
      const shareText = `${viralMessage}\n\n🎮 Try it yourself: https://whowillpay.netlify.app`;

      if (navigator.share && navigator.canShare) {
        const shareData = {
          files: [file],
          title: "Who Will Pay the Bill? 🍕",
          text: shareText,
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          setUsedNativeShare(true);
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
          setIsGeneratingImage(false);
          return;
        }
      }

      // Fallback: Download image
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "who-will-pay.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setUsedNativeShare(false);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    } catch (error) {
      console.error("Instagram share error:", error);
      setShareError(true);
      setTimeout(() => setShareError(false), 3000);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        ref={cardRef}
        initial={{ y: 100, rotate: -10 }}
        animate={{ y: 0, rotate: 0 }}
        className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg w-full relative overflow-hidden"
      >
        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-4 right-4 text-6xl opacity-20"
        >
          🎊
        </motion.div>
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-4 left-4 text-6xl opacity-20"
        >
          🎉
        </motion.div>

        <div className="text-center relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-8xl sm:text-9xl mb-6"
          >
            🏆
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Winner Winner!
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6"
          >
            <motion.p
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2"
            >
              {winner}
            </motion.p>
            <p className="text-xl sm:text-2xl text-gray-700 font-semibold">
              {randomMessage}
            </p>
          </motion.div>

          {billAmount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6"
            >
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Bill Amount:</span>
              </p>
              <p className="text-3xl font-bold text-green-600">₹{billAmount}</p>
            </motion.div>
          )}

          {/* Fun Share Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-4 border-2 border-yellow-300"
          >
            <p className="text-sm font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <span className="text-xl">🎉</span>
              Share this hilarious moment!
            </p>
            <p className="text-xs text-gray-700 italic">
              &ldquo;{getViralMessage()}&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-3"
          >
            {/* Platform Share Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {/* WhatsApp Share */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToWhatsApp}
                className="px-4 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-3xl">💬</span>
                <span className="text-xs">WhatsApp</span>
              </motion.button>

              {/* Instagram Share */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToInstagram}
                disabled={isGeneratingImage}
                className="px-4 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-3xl">
                  {isGeneratingImage ? "⏳" : "📸"}
                </span>
                <span className="text-xs">
                  {isGeneratingImage ? "Creating..." : "Instagram"}
                </span>
              </motion.button>

              {/* Twitter Share */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToTwitter}
                className="px-4 py-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-3xl">🐦</span>
                <span className="text-xs">Twitter</span>
              </motion.button>
            </div>

            {/* Success/Error Toasts */}
            <div className="relative">

              {/* Success Toast */}
              <AnimatePresence>
                {showCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎉</span>
                      <span>
                        {usedNativeShare ? "Shared! Spread the fun! 🚀" : "Image saved! Share it! 📸"}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Toast */}
              <AnimatePresence>
                {shareError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">❌</span>
                      <span>Share failed. Try again!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                🎲 Spin Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                🔄 Start Over
              </motion.button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-white/80 text-sm"
          >
            Better luck next time! 😄
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

