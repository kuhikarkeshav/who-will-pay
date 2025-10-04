"use client";

import { motion } from "framer-motion";

interface SpinningWheelProps {
  names: string[];
}

export default function SpinningWheel({ names }: SpinningWheelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        exit={{ scale: 0, rotate: 720 }}
        transition={{
          duration: 0.5,
          rotate: {
            duration: 3,
            repeat: 0,
            ease: "easeInOut",
          },
        }}
        className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl max-w-md w-full"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="text-8xl sm:text-9xl mb-6"
          >
            🎰
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Spinning the Wheel...
          </h2>

          <div className="space-y-2 mb-6">
            {names.map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0.3, 1, 0.3], x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="text-lg font-semibold text-purple-600"
              >
                {name}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="text-gray-600"
          >
            <div className="flex justify-center gap-2">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              >
                •
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

