"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NameListProps {
  names: string[];
  onRemoveName: (index: number) => void;
}

export default function NameList({ names, onRemoveName }: NameListProps) {
  const emojis = ["🎉", "🎊", "🎈", "🎁", "🌟", "⭐", "✨", "💫", "🎯", "🎪"];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 min-h-[400px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>👥</span>
        <span>Friends List</span>
        <span className="text-sm font-normal text-gray-500">
          ({names.length})
        </span>
      </h2>

      {names.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-64 text-gray-400"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-6xl mb-4"
          >
            👻
          </motion.div>
          <p className="text-lg font-semibold">No friends added yet!</p>
          <p className="text-sm">Add some friends to get started</p>
        </motion.div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          <AnimatePresence>
            {names.map((name, index) => (
              <motion.div
                key={`${name}-${index}`}
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="text-2xl"
                  >
                    {emojis[index % emojis.length]}
                  </motion.span>
                  <span className="text-lg font-semibold text-gray-800">
                    {name}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveName(index)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${name}`}
                >
                  ❌
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

