
import { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import { Plus, Check } from "react-feather";
import { HabitCard } from "@/pages";

// Define a Habit type for better type checking
interface Habit {
  iconName: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  percentage: number;
  value: number;
  setValue: (newValue: number) => void;
  min: number;
  max: number;
  color: string;
}

const getIcon = (name: string) => {
  switch (name) {
    case "check":
      return <Check size={16} />;
    default:
      return <Check size={16} />; // fallback
  }
};

const AddHabitButton = () => {
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]); // Update the state type to use Habit[]

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("userHabits");
    if (stored) {
      const parsed: Habit[] = JSON.parse(stored); // Parse as Habit[]
      const hydrated = parsed.map((habit) => ({
        ...habit,
        setValue: (newValue: number) => updateHabitValue(habit.title, newValue),
      }));
      setHabits(hydrated);
    }
  }, []);

  const updateHabitValue = (title: string, newValue: number) => {
    setHabits(prev => {
      const updated = prev.map(habit =>
        habit.title === title
          ? {
              ...habit,
              value: newValue,
              percentage: (newValue / habit.max) * 100,
            }
          : habit
      );
      localStorage.setItem("userHabits", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddHabitClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabitName(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      const iconName = "check"; // use a string instead of JSX

      const newHabit: Habit = {
        iconName,
        title: habitName,
        current: 0,
        target: 100,
        unit: "%",
        percentage: 0,
        value: 0,
        setValue: (newValue: number) => updateHabitValue(habitName, newValue),
        min: 0,
        max: 100,
        color: "blue",
      };

      const updated = [...habits, newHabit];
      setHabits(updated);
      localStorage.setItem("userHabits", JSON.stringify(updated));
      setHabitName("");
      setShowForm(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="">
      {habits.length > 0 && (
        <div className="mt-10 w-380">
          <h3 className="text-lg font-semibold m-5">Your Habits:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {habits.map((habit, index) => (
              <HabitCard
                key={index}
                icon={getIcon(habit.iconName)}
                title={habit.title}
                current={habit.value}
                target={habit.target}
                unit={habit.unit}
                percentage={habit.percentage}
                value={habit.value}
                setValue={habit.setValue}
                min={habit.min}
                max={habit.max}
                color={habit.color}
              />
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="flex justify-center mb-10 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold">Add a New Habit</h2>
            <form onSubmit={handleFormSubmit} className="mt-4">
              <input
                type="text"
                value={habitName}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter habit name"
                required
              />
              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Close
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
      
      <div className="flex justify-center mb-10 mt-20">
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

export default AddHabitButton;
