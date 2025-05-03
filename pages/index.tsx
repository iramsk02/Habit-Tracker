import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Plus, Trash2, Check, Award, Droplet, Moon, Smartphone, Calendar } from 'lucide-react';
import NotificationComponent from '@/components/Notification';

// Color configuration
const COLOR_CLASSES = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    light: 'bg-blue-100',
    value: '#3b82f6'
  },
  indigo: {
    bg: 'bg-indigo-500',
    text: 'text-indigo-500',
    light: 'bg-indigo-100',
    value: '#6366f1'
  },
  violet: {
    bg: 'bg-violet-500',
    text: 'text-violet-500',
    light: 'bg-violet-100',
    value: '#8b5cf6'
  }
};

type ColorType = keyof typeof COLOR_CLASSES;

// Helper function to get color classes
const getColorClass = (
  color: ColorType,
  type: keyof typeof COLOR_CLASSES.blue
) => COLOR_CLASSES[color]?.[type] || COLOR_CLASSES.blue[type];

interface HabitCardProps {
  id: string; // Required unique identifier
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
  color: ColorType;
  inversed?: boolean;
  onDelete?: (id: string) => void;
}

// Type for habit data without the function prop
interface HabitData {
  id: string;
  icon: string;
  title: string;
  current: number;
  target: number | string;
  unit: string;
  percentage: number;
  value: number;
  min: number;
  max: number;
  color: ColorType;
  inversed?: boolean;
}

// Type for preset habits on the HabitTracker page
interface PresetHabit {
  id: string;
  title: string;
  icon: string;
  current: number;
  target: number | string;
  unit: string;
  color: ColorType;
  inversed?: boolean;
}

const mockHabitData = [
  { day: 'Mon', completed: 3 },
  { day: 'Tue', completed: 4 },
  { day: 'Wed', completed: 2 },
  { day: 'Thu', completed: 5 },
  { day: 'Fri', completed: 4 },
  { day: 'Sat', completed: 3 },
  { day: 'Sun', completed: 5 },
];

// Map icons to their components
const getIconComponent = (iconName: string, size: number = 24, color?: string) => {
  const className = color ? `text-${color}-500` : '';
  
  switch(iconName) {
    case 'droplet':
      return <Droplet size={size} className={className || "text-blue-500"} />;
    case 'moon':
      return <Moon size={size} className={className || "text-indigo-500"} />;
    case 'smartphone':
      return <Smartphone size={size} className={className || "text-violet-500"} />;
    case 'check':
      return <Check size={size} className={className || "text-green-500"} />;
    default:
      return <Check size={size} className={className || "text-gray-500"} />;
  }
};

const HabitCard: React.FC<HabitCardProps> = ({
  id,
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
  inversed = false,
  onDelete
}) => {
  // Normalize percentage to be between 0 and 100
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Memoize the handler to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, [setValue]);

  const handleDelete = useCallback(() => {
    if (onDelete && id) {
      onDelete(id);
    }
  }, [onDelete, id]);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {icon}
            <h4 className="font-semibold">{title}</h4>
          </div>
          <div className="flex items-center gap-2">
            {normalizedPercentage >= 100 && (
              <div className={`rounded-full p-1 ${getColorClass(color, 'light')}`}>
                <Check size={16} className={getColorClass(color, 'text')} />
              </div>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                title="Delete Habit"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{current}</p>
            <p className="text-sm text-gray-500">
              {inversed ? `Target: ${target} ${unit}` : `of ${target} ${unit}`}
            </p>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-gray-200"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className={getColorClass(color, 'bg')}
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={100 - normalizedPercentage}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
              <text
                x="18"
                y="18"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-xs font-medium fill-gray-600"
              >
                {Math.round(normalizedPercentage)}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${getColorClass(color, 'light')}`}
          style={{
            background: `linear-gradient(to right, ${getColorClass(color, 'value')} 0%, ${getColorClass(color, 'value')} ${normalizedPercentage}%, #e5e7eb ${normalizedPercentage}%, #e5e7eb 100%)`
          }}
        />
      </div>
    </motion.div>
  );
};

const AddHabitButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitTarget, setHabitTarget] = useState<number>(100);
  const [habitUnit, setHabitUnit] = useState("units");
  const [habitColor, setHabitColor] = useState<ColorType>("blue");
  const [habits, setHabits] = useState<HabitData[]>([]);

  // Load habits from localStorage when component mounts
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("userHabits");
    if (stored) {
      try {
        const parsed: HabitData[] = JSON.parse(stored);
        setHabits(parsed);
      } catch (error) {
        console.error("Failed to parse habits from localStorage:", error);
        localStorage.removeItem("userHabits");
      }
    }
  }, []);

  // Calculate percentage based on value and max
  const calculatePercentage = (value: number, max: number): number => {
    return (value / max) * 100;
  };

  // Update habit value and persist to localStorage
  const updateHabitValue = useCallback((id: string, newValue: number) => {
    setHabits(prev => {
      const updated = prev.map(habit =>
        habit.id === id
          ? {
              ...habit,
              value: newValue,
              current: newValue,
              percentage: calculatePercentage(newValue, habit.max)
            }
          : habit
      );
      localStorage.setItem("userHabits", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle form visibility
  const handleAddHabitClick = () => {
    setShowForm(true);
  };

  // Reset form state
  const resetForm = () => {
    setHabitName("");
    setHabitTarget(100);
    setHabitUnit("units");
    setHabitColor("blue");
    setShowForm(false);
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      const newHabit: HabitData = {
        id: Date.now().toString(),
        icon: "check",
        title: habitName,
        current: 0,
        target: habitTarget,
        unit: habitUnit,
        percentage: 0,
        value: 0,
        min: 0,
        max: habitTarget as number,
        color: habitColor
      };

      const updated = [...habits, newHabit];
      setHabits(updated);
      localStorage.setItem("userHabits", JSON.stringify(updated));
      resetForm();
    }
  };

  // Delete a habit
  const handleDelete = useCallback((id: string) => {
    setHabits(prevHabits => {
      const updatedHabits = prevHabits.filter(habit => habit.id !== id);
      localStorage.setItem("userHabits", JSON.stringify(updatedHabits));
      return updatedHabits;
    });
  }, []);

  // Don't render anything on server-side
  if (!isClient) return null;

  return (
    <div className="container mx-auto p-4">
      {habits.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold m-5">Your Custom Habits:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                id={habit.id}
                icon={getIconComponent(habit.icon)}
                title={habit.title}
                current={habit.current}
                target={habit.target}
                unit={habit.unit}
                percentage={habit.percentage}
                value={habit.value}
                setValue={(newValue) => updateHabitValue(habit.id, newValue)}
                min={habit.min}
                max={habit.max}
                color={habit.color}
                inversed={habit.inversed}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold">Add a New Habit</h2>
            <form onSubmit={handleFormSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="habitName" className="block text-sm font-medium text-gray-700">
                  Habit Name
                </label>
                <input
                  id="habitName"
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter habit name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="habitTarget" className="block text-sm font-medium text-gray-700">
                  Target Value
                </label>
                <input
                  id="habitTarget"
                  type="number"
                  value={habitTarget}
                  onChange={(e) => setHabitTarget(Number(e.target.value))}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  min="1"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="habitUnit" className="block text-sm font-medium text-gray-700">
                  Unit
                </label>
                <input
                  id="habitUnit"
                  type="text"
                  value={habitUnit}
                  onChange={(e) => setHabitUnit(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="e.g., steps, pages, minutes"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="habitColor" className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <select
                  id="habitColor"
                  value={habitColor}
                  onChange={(e) => setHabitColor(e.target.value as ColorType)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="blue">Blue</option>
                  <option value="indigo">Indigo</option>
                  <option value="violet">Violet</option>
                </select>
              </div>
              
              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-10 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
          onClick={handleAddHabitClick}
        >
          <Plus size={18} />
          <span>Add Habit</span>
        </motion.button>
      </div>
    </div>
  );
};

export default function HabitTracker() {
  // Define preset habits with proper structure
  const [presetHabits, setPresetHabits] = useState<PresetHabit[]>([
    { 
      id: '1', 
      title: 'Water Intake', 
      icon: 'droplet',
      current: 5,
      target: 8,
      unit: 'glasses',
      color: 'blue'
    },
    { 
      id: '2', 
      title: 'Sleep', 
      icon: 'moon',
      current: 7,
      target: 8,
      unit: 'hours',
      color: 'indigo'
    },
    { 
      id: '3', 
      title: 'Exercise', 
      icon: 'check',
      current: 2,
      target: 3,
      unit: 'times',
      color: 'blue'
    },
    { 
      id: '4', 
      title: 'Screen Time', 
      icon: 'smartphone',
      current: 3,
      target: '<2',
      unit: 'hours',
      color: 'violet',
      inversed: true
    }
  ]);
  
  const streak = 6;
  const [activeTab, setActiveTab] = useState('today');

  // Update values for preset habits
  const updatePresetHabitValue = (id: string, newValue: number) => {
    setPresetHabits(prev => 
      prev.map(habit => 
        habit.id === id 
          ? { ...habit, current: newValue }
          : habit
      )
    );
  };

  // Handle deletion of preset habits
  const handleDeletePreset = (id: string) => {
    setPresetHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  // Calculate percentage for preset habits
  const calculatePresetPercentage = (habit: PresetHabit) => {
    // For inverse habits (like screen time) where less is better
    if (habit.inversed) {
      // Assuming max for inversed is 12 (e.g., for screen time)
      const max = 12;
      return (1 - habit.current / max) * 100;
    }
    
    // For regular habits
    const targetValue = typeof habit.target === 'string' 
      ? parseInt(habit.target.replace(/[^0-9]/g, '')) 
      : habit.target;
    
    return (habit.current / targetValue) * 100;
  };

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
            <NotificationComponent habits={{ water: 6, sleep: 7, screen: 3 }} />
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
              {presetHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  id={habit.id}
                  icon={getIconComponent(habit.icon)}
                  title={habit.title}
                  current={habit.current}
                  target={habit.target}
                  unit={habit.unit}
                  percentage={calculatePresetPercentage(habit)}
                  value={habit.current}
                  setValue={(newValue) => updatePresetHabitValue(habit.id, newValue)}
                  min={0}
                  max={typeof habit.target === 'string' ? 12 : habit.target * 1.5}
                  color={habit.color}
                  inversed={habit.inversed}
                  onDelete={handleDeletePreset}
                />
              ))}
            </div>

            {/* Add Custom Habits */}
            <AddHabitButton />
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
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
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
                    <p className="text-2xl font-semibold">{presetHabits.length}</p>
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
            Last updated: May 2025
          </div>
        </div>
      </footer>
    </div>
  );
}

// export { HabitCard, AddHabitButton };