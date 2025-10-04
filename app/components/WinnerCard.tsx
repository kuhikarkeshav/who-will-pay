"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import QRCode from "qrcode";

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

  const getViralMessage = () => {
    const template = viralShareMessages[Math.floor(Math.random() * viralShareMessages.length)];
    return template.replace("{name}", winner);
  };

  const generateShareImage = async (): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = 1080;
    canvas.height = 1350;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#FF6B35");
    gradient.addColorStop(0.5, "#F7931E");
    gradient.addColorStop(1, "#FDC830");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🏆", canvas.width / 2, 250);

    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText("Winner Winner!", canvas.width / 2, 350);

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

    const nameGradient = ctx.createLinearGradient(0, rectY + 60, 0, rectY + 140);
    nameGradient.addColorStop(0, "#A855F7");
    nameGradient.addColorStop(1, "#EC4899");
    ctx.fillStyle = nameGradient;
    ctx.font = "bold 90px Arial";
    ctx.fillText(winner, canvas.width / 2, rectY + 120);

    ctx.fillStyle = "#333333";
    ctx.font = "600 45px Arial";
    ctx.fillText(randomMessage, canvas.width / 2, rectY + rectHeight + 80);

    // Draw QR code section
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    const qrRectY = 780;
    const qrRectHeight = 300;
    ctx.beginPath();
    ctx.moveTo(rectX + radius, qrRectY);
    ctx.lineTo(rectX + rectWidth - radius, qrRectY);
    ctx.quadraticCurveTo(rectX + rectWidth, qrRectY, rectX + rectWidth, qrRectY + radius);
    ctx.lineTo(rectX + rectWidth, qrRectY + qrRectHeight - radius);
    ctx.quadraticCurveTo(rectX + rectWidth, qrRectY + qrRectHeight, rectX + rectWidth - radius, qrRectY + qrRectHeight);
    ctx.lineTo(rectX + radius, qrRectY + qrRectHeight);
    ctx.quadraticCurveTo(rectX, qrRectY + qrRectHeight, rectX, qrRectY + qrRectHeight - radius);
    ctx.lineTo(rectX, qrRectY + radius);
    ctx.quadraticCurveTo(rectX, qrRectY, rectX + radius, qrRectY);
    ctx.closePath();
    ctx.fill();

    // Generate and draw QR code
    const websiteUrl = "https://whowillpaybill.netlify.app";
    const qrCodeDataUrl = await QRCode.toDataURL(websiteUrl, {
      width: 220,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    const qrImage = new Image();
    await new Promise((resolve) => {
      qrImage.onload = resolve;
      qrImage.src = qrCodeDataUrl;
    });

    const qrSize = 220;
    const qrX = rectX + 70;
    const qrY = qrRectY + (qrRectHeight - qrSize) / 2;
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // Draw text on the right side
    ctx.fillStyle = "#FF6B35";
    ctx.font = "bold 55px Arial";
    ctx.textAlign = "left";
    const textX = qrX + qrSize + 60;
    const textY = qrRectY + qrRectHeight / 2;
    
    ctx.fillText("📱 Scan me", textX, textY - 20);
    ctx.fillText("to try!", textX, textY + 50);

    // Bottom message
    const funnyBottomMessages = [
      "Better luck next time! 😂",
      "Thanks for being generous! 🙏",
      "Your wallet will remember this! 💸",
    ];
    const bottomMessage = funnyBottomMessages[Math.floor(Math.random() * funnyBottomMessages.length)];

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 8;
    ctx.fillText(bottomMessage, canvas.width / 2, qrRectY + qrRectHeight + 70);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png", 1.0);
    });
  };

  const shareToWhatsApp = async () => {
    setIsGeneratingImage(true);
    try {
      const blob = await generateShareImage();
      const file = new File([blob], "who-will-pay-winner.png", { type: "image/png" });

      const message = getViralMessage();
      const fullMessage = `${message}\n\n🎮 Try it yourself: https://whowillpaybill.netlify.app`;

      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
          });
          
          try {
            await navigator.clipboard.writeText(fullMessage);
          } catch (clipErr) {
            console.log("Clipboard copy failed");
          }
          
          setUsedNativeShare(true);
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
          setIsGeneratingImage(false);
          return;
        } catch (shareErr: any) {
          if (shareErr.name === 'AbortError') {
            setIsGeneratingImage(false);
            return;
          }
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "who-will-pay-winner.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      try {
        await navigator.clipboard.writeText(fullMessage);
      } catch (clipErr) {
        console.error("Clipboard error:", clipErr);
      }

      setTimeout(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = `whatsapp://send?text=${encodeURIComponent(fullMessage)}`;
        } else {
          window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`, "_blank");
        }
      }, 500);

      setUsedNativeShare(false);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    } catch (error) {
      console.error("WhatsApp share error:", error);
      setShareError(true);
      setTimeout(() => setShareError(false), 3000);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const shareToInstagram = async () => {
    setIsGeneratingImage(true);
    try {
      const blob = await generateShareImage();
      const file = new File([blob], "who-will-pay-winner.png", { type: "image/png" });

      const viralMessage = getViralMessage();
      const shareText = `${viralMessage}\n\n🎮 Try it yourself: https://whowillpaybill.netlify.app`;

      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: "Who Will Pay the Bill? 🍕",
          });
          await navigator.clipboard.writeText(shareText);
          setUsedNativeShare(true);
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
          setIsGeneratingImage(false);
          return;
        } catch (shareErr: any) {
          if (shareErr.name === 'AbortError') {
            setIsGeneratingImage(false);
            return;
          }
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "who-will-pay-winner.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      try {
        await navigator.clipboard.writeText(shareText);
      } catch (clipErr) {
        console.error("Clipboard error:", clipErr);
      }

      setTimeout(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = "instagram://camera";
        }
      }, 500);

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

  const shareToSnapchat = async () => {
    setIsGeneratingImage(true);
    try {
      const blob = await generateShareImage();
      const file = new File([blob], "who-will-pay-winner.png", { type: "image/png" });

      const message = getViralMessage();
      const fullMessage = `${message}\n\n🎮 Play now: https://whowillpaybill.netlify.app`;

      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
          });
          await navigator.clipboard.writeText(fullMessage);
          setUsedNativeShare(true);
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
          setIsGeneratingImage(false);
          return;
        } catch (shareErr: any) {
          if (shareErr.name === 'AbortError') {
            setIsGeneratingImage(false);
            return;
          }
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "who-will-pay-winner.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      try {
        await navigator.clipboard.writeText(fullMessage);
      } catch (clipErr) {
        console.error("Clipboard error:", clipErr);
      }

      setTimeout(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = "snapchat://";
        }
      }, 500);

      setUsedNativeShare(false);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    } catch (error) {
      console.error("Snapchat share error:", error);
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        ref={cardRef}
        initial={{ y: 100, rotate: -10 }}
        animate={{ y: 0, rotate: 0 }}
        className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg w-full relative overflow-hidden my-8"
      >
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-4 border-2 border-yellow-300"
          >
            <p className="text-sm font-semibold text-orange-800 mb-2 flex items-center justify-center gap-2">
              <span className="text-xl">🎉</span>
              Share this hilarious moment!
            </p>
            <p className="text-xs text-gray-700 italic text-center">
              &ldquo;{getViralMessage()}&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-4"
          >
            <div className="grid grid-cols-3 gap-3 mb-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToWhatsApp}
                disabled={isGeneratingImage}
                className="px-4 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-3xl">
                  {isGeneratingImage ? "⏳" : "💬"}
                </span>
                <span className="text-xs">
                  {isGeneratingImage ? "Wait..." : "WhatsApp"}
                </span>
              </motion.button>

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
                  {isGeneratingImage ? "Wait..." : "Instagram"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToSnapchat}
                disabled={isGeneratingImage}
                className="px-4 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-3xl">
                  {isGeneratingImage ? "⏳" : "👻"}
                </span>
                <span className="text-xs">
                  {isGeneratingImage ? "Wait..." : "Snapchat"}
                </span>
              </motion.button>
            </div>

            <div className="relative h-0">
              <AnimatePresence>
                {showCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold whitespace-nowrap z-50"
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

              <AnimatePresence>
                {shareError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl font-semibold whitespace-nowrap z-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">❌</span>
                      <span>Share failed. Try again!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          >
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
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/80 text-sm"
          >
            Better luck next time! 😄
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4"
          >
            <a
              href="https://whowillpaybill.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors"
            >
              🎮 Try it yourself
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}