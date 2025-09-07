import React, { useState } from 'react';

function NewQuestForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [duration, setDuration] = useState(30); 
  const [points, setPoints] = useState(10);

  const handleSubmit = (e, questType) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQuest = {
      id: Date.now(),
      title,
      time: dueTime,
      duration: duration,
      points,
      completed: false,
    };

    onAddTask(newQuest, questType);
    setTitle('');
    setDueTime('');
  };

  return (
    <div className="bg-[#1e1e2d]/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">Add a New Quest</h2>
      <div className="mb-4">
        <label htmlFor="taskTitle" className="block text-sm font-medium text-purple-400 mb-2">Task Title</label>
        <input
          type="text"
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Deploy the new feature"
          className="w-full bg-[#2c2c3a] border border-gray-600 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="dueTime" className="block text-sm font-medium text-purple-400 mb-2">Due Time</label>
          <input
            type="time"
            id="dueTime"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="w-full bg-[#2c2c3a] border border-gray-600 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-purple-400 mb-2">Duration (min)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-[#2c2c3a] border border-gray-600 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="points" className="block text-sm font-medium text-purple-400 mb-2">Points</label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-full bg-[#2c2c3a] border border-gray-600 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      <div className="flex gap-4">
        {/* --- PURPLE BUTTON STYLES --- */}
        <button 
          onClick={(e) => handleSubmit(e, 'daily')} 
          className="w-full font-bold text-white py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200 shadow-md"
        >
          + Daily Quest
        </button>
        <button 
          onClick={(e) => handleSubmit(e, 'deadline')} 
          className="w-full font-bold text-white py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200 shadow-md"
        >
          + Deadline Mission
        </button>
      </div>
    </div>
  );
}

export default NewQuestForm;