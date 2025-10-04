"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import NameInput from "./components/NameInput";
import NameList from "./components/NameList";
import SpinningWheel from "./components/SpinningWheel";
import WinnerCard from "./components/WinnerCard";

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [billAmount, setBillAmount] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWheel, setShowWheel] = useState(false);

  const addName = (name: string) => {
    if (name.trim() && !names.includes(name.trim())) {
      setNames([...names, name.trim()]);
    }
  };

  const removeName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const resetAll = () => {
    setNames([]);
    setBillAmount("");
    setWinner(null);
    setShowWheel(false);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const selectWinner = () => {
    if (names.length === 0) return;

    setWinner(null);
    setIsSpinning(true);
    setShowWheel(true);

    // Simulate spinning for 3 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      const selectedWinner = names[randomIndex];
      setWinner(selectedWinner);
      setIsSpinning(false);
      setShowWheel(false);
      triggerConfetti();
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            🍕 Who Will Pay the Bill? 💸
          </h1>
          <p className="text-white/90 text-lg sm:text-xl">
            Add your friends and let fate decide!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Bill Amount Input */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <label className="block text-gray-700 font-semibold mb-2">
                💰 Bill Amount (Optional)
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter bill amount..."
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                style={{ color: 'black' }}
              />
              {billAmount && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-purple-600 font-semibold text-lg"
                >
                  Total: ₹{billAmount}
                </motion.p>
              )}
            </div>

            {/* Name Input */}
            <NameInput onAddName={addName} />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={selectWinner}
                disabled={names.length === 0 || isSpinning}
                className={`flex-1 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all ${
                  names.length === 0 || isSpinning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                }`}
              >
                {isSpinning ? "🎲 Spinning..." : "🎯 Who Will Pay?"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAll}
                className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                🔄 Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Names List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NameList names={names} onRemoveName={removeName} />
          </motion.div>
        </div>

        {/* Spinning Wheel Overlay */}
        <AnimatePresence>
          {showWheel && <SpinningWheel names={names} />}
        </AnimatePresence>

        {/* Winner Card */}
        <AnimatePresence>
          {winner && !isSpinning && (
            <WinnerCard winner={winner} billAmount={billAmount} />
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-white/80"
        >
        </motion.div>
      </div>
    </main>
  );
}

