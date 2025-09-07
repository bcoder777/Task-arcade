import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import NewQuestForm from './components/NewQuestForm';
import QuestList from './components/QuestList';
import MotivationalQuote from './components/MotivationalQuote';

function App() {
  const [dailyQuests, setDailyQuests] = useState([]);
  const [deadlineMissions, setDeadlineMissions] = useState([]);

  const handleAddTask = (newTask, questType) => {
    if (questType === 'daily') {
      setDailyQuests(prev => [...prev, newTask]);
    } else {
      setDeadlineMissions(prev => [...prev, newTask]);
    }
  };

  const handleToggleComplete = (taskId, listType) => {
    const listSetter = listType === 'daily' ? setDailyQuests : setDeadlineMissions;
    listSetter(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId, listType) => {
    const listSetter = listType === 'daily' ? setDailyQuests : setDeadlineMissions;
    listSetter(prev => prev.filter(task => task.id !== taskId));
  };
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const findListAndIndex = (id) => {
        let list = 'daily';
        let index = dailyQuests.findIndex(q => q.id === id);
        if (index === -1) {
            list = 'deadline';
            index = deadlineMissions.findIndex(q => q.id === id);
        }
        return { list, index };
    };
    
    const { list: activeList, index: activeIndex } = findListAndIndex(active.id);
    const { list: overList, index: overIndex } = findListAndIndex(over.id);

    if (activeList === overList) {
        const listSetter = activeList === 'daily' ? setDailyQuests : setDeadlineMissions;
        listSetter((items) => {
            return arrayMove(items, activeIndex, overIndex);
        });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-screen text-white p-4 sm:p-8">
        <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-400">Task Arcade</h1>
        </header>

        <main>
          <div className="max-w-xl mx-auto">
            <NewQuestForm onAddTask={handleAddTask} />
            <div className="mt-6">
              <MotivationalQuote />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <SortableContext items={dailyQuests.map(q => q.id)} strategy={verticalListSortingStrategy}>
              <QuestList 
                title="Daily Quests" 
                quests={dailyQuests}
                onToggleComplete={(id) => handleToggleComplete(id, 'daily')}
                onDeleteTask={(id) => handleDeleteTask(id, 'daily')}
              />
            </SortableContext>

            <SortableContext items={deadlineMissions.map(q => q.id)} strategy={verticalListSortingStrategy}>
              <QuestList 
                title="Deadline Missions" 
                quests={deadlineMissions} 
                onToggleComplete={(id) => handleToggleComplete(id, 'deadline')}
                onDeleteTask={(id) => handleDeleteTask(id, 'deadline')}
              />
            </SortableContext>
          </div>
        </main>
      </div>
    </DndContext>
  );
}

export default App;