// components/Sidebar.js
import { useState, useEffect } from 'react';
import randomEmoji from 'random-emoji';

export default function Sidebar() {
  const [emoji, setEmoji] = useState('');
  const [color, setColor] = useState('');

  const handleAddMd = () => alert('Add md functionality coming soon!');
  const handleAddWhiteboard = () => alert('Add whiteboard functionality coming soon!');
  const handleJoin = () => alert('Join functionality coming soon!');

  //random color
  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F533FF', '#FF33A1', '#FF8C00', '#FFC0CB', '#8A2BE2'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    setEmoji(randomEmoji.random({ count: 1 })[0].character);
    setColor(getRandomColor());
  }, []);

  return (
    <div className="w-1/4 bg-gray-900 text-white h-screen flex flex-col justify-center items-center pt-10 pb-20" style={{backgroundColor: "#232228"}}>
      <div
        className="rounded-full w-64 h-64 mb-6 flex items-center justify-center"
        style={{
          backgroundColor: color,
          opacity: 0.8,
        }}
      >
        <span className="text-9xl">{emoji}</span>
      </div>
      <div className="flex flex-col space-y-6 items-center w-full mt-20">
        <button
          className="w-3/4 bg-gray-700 rounded py-5 text-xl transition-all duration-300 hover:bg-gray-600 hover:scale-105"
          onClick={handleAddMd}
        >
          Add md
        </button>
        <button
          className="w-3/4 bg-gray-700 rounded py-5 text-xl transition-all duration-300 hover:bg-gray-600 hover:scale-105"
          onClick={handleAddWhiteboard}
        >
          Add whiteboard
        </button>
        <button
          className="w-3/4 bg-gray-700 rounded py-5 text-xl transition-all duration-300 hover:bg-gray-600 hover:scale-105"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
}
