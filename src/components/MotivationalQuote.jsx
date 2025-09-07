import React, { useState } from 'react';
import { quotes } from '../quotes.js'; 

function MotivationalQuote() {
  const [quote, setQuote] = useState(null);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <footer className="text-center">
      {quote && (
        // --- NEW QUOTE DISPLAY STYLE ---
        <div className="mb-6 p-4 bg-teal-900/30 border border-teal-700/50 rounded-lg max-w-2xl mx-auto">
          <p className="italic text-lg text-teal-100">"{quote.text}"</p>
          <p className="text-right mt-2 text-teal-400">- {quote.author}</p>
        </div>
      )}
      {/* --- PURPLE BUTTON STYLE --- */}
      <button
        onClick={getNewQuote}
        className="font-bold text-white py-3 px-8 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200 shadow-lg"
      >
        ✨ Feeling Stuck?
      </button>
    </footer>
  );
}

export default MotivationalQuote;