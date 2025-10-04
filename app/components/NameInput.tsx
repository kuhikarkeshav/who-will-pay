"use client";

import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface NameInputProps {
  onAddName: (name: string) => void;
}

export default function NameInput({ onAddName }: NameInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAddName(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
      <label className="block text-gray-700 font-semibold mb-2">
        👥 Add Friends
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter friend's name..."
          className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          style={{ color: 'black' }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          ➕ Add
        </motion.button>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Press Enter or click Add to add a friend
      </p>
    </div>
  );
}

