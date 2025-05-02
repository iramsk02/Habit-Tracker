
import { useState } from 'react';
import { motion } from 'framer-motion';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {  Check, Award, Droplet, Moon, Smartphone,  Calendar } from 'lucide-react';
import AddHabitButton from '@/components/AddHabit';

const mockHabitData = [
  { day: 'Mon', completed: 3 },
  { day: 'Tue', completed: 4 },
  { day: 'Wed', completed: 2 },
  { day: 'Thu', completed: 5 },
  { day: 'Fri', completed: 4 },
  { day: 'Sat', completed: 3 },
  { day: 'Sun', completed: 5 },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState({
    water: 5,
    sleep: 7,
    screen: 4
  });
  
  const streak = 6;
  const [activeTab, setActiveTab] = useState('today');

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <Award className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-blue-600">Habit Hero</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* <NotificationBar habits={habits}/> */}
           
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Tab Navigation */}
        <div className="flex justify-center mt-8 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-1 flex">
            <button 
              onClick={() => setActiveTab('today')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'today' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Today
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'stats' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Stats
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Hero Section - Only show on Today tab */}
        {activeTab === 'today' && (
          <section className="text-center py-8">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              Build Better Habits.
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Track your daily goals, build streaks, and transform your life one habit at a time.
            </p>
          </section>
        )}

        {activeTab === 'today' && (
          <>
            {/* Streak Card */}
            <motion.div 
              className="max-w-md mx-auto mb-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-1">Current Streak</p>
                  <div className="text-5xl font-bold">{streak} Days</div>
                </div>
                <motion.div 
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Award size={64} />
                </motion.div>
              </div>
            </motion.div>

            {/* Daily Goals Section */}
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 px-4">
              <Calendar size={20} className="text-blue-600" />
              <span>Today&apos;s Goals</span>
            </h3>

            {/* Habit Cards with Circular Progress */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
  <HabitCard 
    icon={<Droplet size={24} className="text-blue-500" />}
    title="Water Intake"
    current={habits.water}
    target={8}
    unit="glasses"
    percentage={(habits.water / 8) * 100}
    value={habits.water}
    setValue={(val:number) => setHabits(prev => ({ ...prev, water: val }))}
    min={0}
    max={10}
    color="blue"
  />
  <HabitCard 
    icon={<Moon size={24} className="text-indigo-500" />}
    title="Sleep"
    current={habits.sleep}
    target={8}
    unit="hours"
    percentage={(habits.sleep / 8) * 100}
    value={habits.sleep}
    setValue={(val:number) => setHabits(prev => ({ ...prev, sleep: val }))}
    min={0}
    max={12}
    color="indigo"
  />
  <HabitCard 
    icon={<Smartphone size={24} className="text-violet-500" />}
    title="Screen Time"
    current={habits.screen}
    target="<2"
    unit="hours"
    percentage={(1 - habits.screen / 12) * 100}
    value={habits.screen}
    setValue={(val:number) => setHabits(prev => ({ ...prev, screen: val }))}
    min={0}
    max={12}
    color="violet"
    inversed={true}
  />
</div>

            
            {/* Add Habit Button */}
            <div className="flex justify-center mb-10 ">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
              >
                <Plus size={18} /> */}
                <AddHabitButton/>
                {/* <span>Add Habit</span> */}
              {/* </motion.button> */}
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <>
            {/* Weekly Progress Chart */}
            <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-6">Weekly Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockHabitData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis allowDecimals={false} stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </section>
            
            {/* Additional Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Completion Rate</p>
                    <p className="text-2xl font-semibold">87%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Best Day</p>
                    <p className="text-2xl font-semibold">Thursday</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Habits Tracked</p>
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Achievement Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">7-Day Streak</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">30-Day Challenge</span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Perfect Week</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">Habit Calendar</h3>
            <p className="text-center text-gray-500 py-10">Calendar view will show your habit completion history</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-6 text-center">
        <div className="container mx-auto">
          <p className="text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> by Iram
          </p>
          <div className="mt-2 text-xs text-gray-400">
            Version 2.0 • Last updated: May 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
// import { motion } from 'framer-motion';
// import { Check } from 'react-feather'; // Make sure you have the Check icon from react-feather, or replace with your own
// interface HabitCardProps {
//   icon: React.ReactNode;
//   title: string;
//   current: number;
//   target: number | string;
//   unit: string;
//   percentage: number;
//   value: number;
//   setValue: (newValue: number) => void;
//   min: number;
//   max: number;
//   color: string;
//   inversed?: boolean; // Optional prop with a default value of false
// }
// export const  HabitCard:React.FC<HabitCardProps> = ({ 
//   icon, 
//   title, 
//   current, 
//   target, 
//   unit, 
//   percentage, 
//   value, 
//   setValue, 
//   min, 
//   max,
//   color,
//   inversed = false
// }) => {
//   type ColorClass = {
//     bg: string;
//     text: string;
//     light: string;
//   };
//   const colorClasses = {
//     blue: {
//       bg: 'bg-blue-500',
//       text: 'text-blue-500',
//       light: 'bg-blue-100'
//     },
//     indigo: {
//       bg: 'bg-indigo-500',
//       text: 'text-indigo-500',
//       light: 'bg-indigo-100'
//     },
//     violet: {
//       bg: 'bg-violet-500',
//       text: 'text-violet-500',
//       light: 'bg-violet-100'
//     }
//   };

//   const getColorClass = type => colorClasses[color]?.[type] || colorClasses.blue[type];

//   return (
//     <motion.div 
//       className="bg-white rounded-2xl shadow-sm overflow-hidden"
//       whileHover={{ y: -5, transition: { duration: 0.2 } }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             {icon}
//             <h4 className="font-semibold">{title}</h4>
//           </div>
//           {percentage >= 100 && (
//             <div className={`rounded-full p-1 ${getColorClass('light')}`}>
//               <Check size={16} className={getColorClass('text')} />
//             </div>
//           )}
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-3xl font-bold">{current}</p>
//             <p className="text-sm text-gray-500">
//               {inversed ? `Target: ${target} ${unit}` : `of ${target} ${unit}`}
//             </p>
//           </div>
          
//           <div className="relative w-14 h-14">
//             <svg className="w-full h-full" viewBox="0 0 36 36">
//               <circle 
//                 cx="18" 
//                 cy="18" 
//                 r="16" 
//                 fill="none" 
//                 className="stroke-gray-200" 
//                 strokeWidth="3" 
//               />
//               <circle 
//                 cx="18" 
//                 cy="18" 
//                 r="16" 
//                 fill="none" 
//                 className={getColorClass('bg')}
//                 strokeWidth="3" 
//                 strokeDasharray="100" 
//                 strokeDashoffset={100 - Math.min(percentage, 100)} 
//                 strokeLinecap="round" 
//                 transform="rotate(-90 18 18)" 
//               />
//               <text 
//                 x="18" 
//                 y="18" 
//                 dominantBaseline="middle" 
//                 textAnchor="middle" 
//                 className="text-xs font-medium fill-gray-600"
//               >
//                 {Math.round(percentage)}%
//               </text>
//             </svg>
//           </div>
//         </div>
//       </div>
      
//       <div className="px-6 pb-6">
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={value}
//           onChange={(e) => setValue(Number(e.target.value))}
//           className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${getColorClass('light')}`}
//           style={{
//             background: `linear-gradient(to right, ${color === 'blue' ? '#3b82f6' : color === 'indigo' ? '#6366f1' : '#8b5cf6'} 0%, ${color === 'blue' ? '#3b82f6' : color === 'indigo' ? '#6366f1' : '#8b5cf6'} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// }

import React from 'react';

interface HabitCardProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  target: number | string;
  unit: string;
  percentage: number;
  value: number;
  setValue: (newValue: number) => void;
  min: number;
  max: number;
  color: string;
  inversed?: boolean;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  icon,
  title,
  current,
  target,
  unit,
  percentage,
  value,
  setValue,
  min,
  max,
  color,
  inversed = false
}) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-200' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', light: 'bg-indigo-200' },
    violet: { bg: 'bg-violet-500', text: 'text-violet-500', light: 'bg-violet-200' },
  };

  const progressColor = inversed ? colorClasses[color]?.light : colorClasses[color]?.bg;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${progressColor}`}>
          {icon}
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{current}/{target} {unit}</p>
          <div className="flex justify-between items-center">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className={`h-2 rounded-full ${progressColor}`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">{Math.round(percentage)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

