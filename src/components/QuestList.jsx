import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hour, minute] = timeString.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHour = h % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const DragHandleIcon = () => ( <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor"><circle cx="2" cy="2" r="2" /><circle cx="8" cy="2" r="2" /><circle cx="2" cy="8" r="2" /><circle cx="8" cy="8" r="2" /><circle cx="2" cy="14" r="2" /><circle cx="8" cy="14" r="2" /></svg> );
const StarIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> );
const CheckIcon = () => ( <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> );
const TrashIcon = () => ( <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> );
const ClockIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg> );
const StopwatchIcon = () => (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

function QuestItem({ quest, onToggleComplete, onDeleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: quest.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-[#1e1e2d]/70 p-3 rounded-lg flex items-center justify-between animate-fade-in shadow-md touch-none">
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners} className="cursor-grab text-gray-500 hover:text-gray-300"><DragHandleIcon /></div>
        <span className={`font-medium transition-all ${quest.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
          {quest.title}
        </span>
      </div>
      <div className="flex items-center flex-wrap justify-end gap-2">
        {quest.time && (
          <span className="text-xs font-medium text-purple-300 bg-purple-500/20 py-1 px-2.5 rounded-full flex items-center gap-1.5">
            <ClockIcon /> {formatTime(quest.time)}
          </span>
        )}
        {quest.duration > 0 && (
           <span className="text-xs font-medium text-sky-300 bg-sky-500/20 py-1 px-2.5 rounded-full flex items-center gap-1.5">
            <StopwatchIcon /> {quest.duration} min
          </span>
        )}
        <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 py-1 px-2.5 rounded-full flex items-center gap-1.5">
          <StarIcon /> {quest.points}
        </span>
        <button onClick={() => onToggleComplete(quest.id)} className={`w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${quest.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-600 text-gray-600 hover:border-green-500 hover:text-green-500'}`}><CheckIcon /></button>
        <button onClick={() => onDeleteTask(quest.id)} className="text-gray-500 hover:text-red-500 transition-colors"><TrashIcon /></button>
      </div>
    </div>
  );
}

function QuestList({ title, quests, onToggleComplete, onDeleteTask }) {
  const completedQuests = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const progress = totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0;

  return (
    <div className="bg-[#161622]/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700">
      <div className="flex justify-between items-center mb-5">
        {/* --- HEADING COLOR CHANGED --- */}
        <h3 className="text-xl font-bold text-purple-400">{title}</h3>
        <div className="flex items-center gap-3 w-1/2 max-w-[200px]">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-sm font-medium text-gray-400">{progress}%</span>
        </div>
      </div>
      <div className="space-y-3 min-h-[150px]">
        {quests.length === 0 ? <p className="text-gray-500 text-center pt-10">No tasks here yet...</p> : quests.map((quest) => (<QuestItem key={quest.id} quest={quest} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />))}
      </div>
    </div>
  );
}

export default QuestList;