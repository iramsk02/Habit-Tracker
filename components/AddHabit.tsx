
// // export default AddHabitButton;
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Plus } from "react-feather";

// const AddHabitButton = () => {
//   const [isClient, setIsClient] = useState(false);
//   const [showForm, setShowForm] = useState(false); // To toggle the visibility of the form
//   const [habitName, setHabitName] = useState(""); // To store the habit name
//   const [error, setError] = useState(""); // To display error message if needed
//   const [habits, setHabits] = useState<string[]>([]); // Array to store all added habits

//   useEffect(() => {
//     // This hook runs only on the client-side, ensuring there's no SSR mismatch.
//     setIsClient(true);
//   }, []);

//   const handleAddHabitClick = () => {
//     setShowForm(true); // Show the form when the button is clicked
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setHabitName(e.target.value); // Update the habit name as the user types
//     setError(""); // Clear the error when the user starts typing
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (habitName.trim()) {
//       // Add habit to the habits array
//       setHabits((prevHabits) => [...prevHabits, habitName]);
//       setHabitName(""); // Reset input field after submission
//       setShowForm(false); // Hide form after submission
//     } else {
//       setError("Habit name cannot be empty!"); // Display error if input is empty
//     }
//   };

//   if (!isClient) {
//     return null; // Avoid rendering the button on the server
//   }

//   return (
//     <div>
//       <div className="flex justify-center mb-10">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-blue-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
//           onClick={handleAddHabitClick}
//           aria-label="Add habit"
//         >
//           <Plus size={18} />
//           <span>Add Habit</span>
//         </motion.button>
//       </div>

//       {/* Form to Add Habit */}
//       {showForm && (
//         <div className="flex justify-center mb-10 w-300">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl font-semibold">Add a New Habit</h2>
//             <form onSubmit={handleFormSubmit} className="mt-4">
//               <input
//                 type="text"
//                 value={habitName}
//                 onChange={handleInputChange}
//                 className="mt-2 p-2 border border-gray-300 rounded w-full"
//                 placeholder="Enter habit name"
//                 required
//               />
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}
//               <div className="mt-4 flex justify-end gap-4">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowForm(false)} // Close the form without saving
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save Habit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Display added habits */}
//       {habits.length > 0 && (
//         <div className="mt-10">
//           <h3 className="text-lg font-semibold">Your Habits:</h3>
//           <ul className="mt-4">
//             {habits.map((habit, index) => (
//               <li key={index} className="p-2 border-b">{habit}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddHabitButton;


// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Plus, Check } from "react-feather";
// import { HabitCard } from "@/pages"; // Assuming HabitCard is in the same directory

// const AddHabitButton = () => {
//   const [isClient, setIsClient] = useState(false);
//   const [showForm, setShowForm] = useState(false); // To toggle the visibility of the form
//   const [habitName, setHabitName] = useState(""); // To store the habit name
//   const [habits, setHabits] = useState<any[]>([]); // Array to store all added habits

//   useEffect(() => {
//     // This hook runs only on the client-side, ensuring there's no SSR mismatch.
//     setIsClient(true);
//   }, []);

//   const handleAddHabitClick = () => {
//     setShowForm(true); // Show the form when the button is clicked
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setHabitName(e.target.value); // Update the habit name as the user types
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (habitName.trim()) {
//       const newHabit = {
//         icon: <Check size={16} />, // You can customize the icon
//         title: habitName,
//         current: 0,
//         target: 100,
//         unit: "%",
//         percentage: 0,
//         value: 0,
//         setValue: (newValue: number) => setHabits(prevHabits =>
//           prevHabits.map(habit => habit.title === habitName ? { ...habit, value: newValue, percentage: (newValue / 100) * 100 } : habit)
//         ),
//         min: 0,
//         max: 100,
//         color: "blue", // Change this based on your preference (e.g., blue, indigo, violet)
//       };
//       setHabits(prevHabits => [...prevHabits, newHabit]);
//       setHabitName(""); // Reset input field after submission
//       setShowForm(false); // Hide form after submission
//     }
//   };

//   if (!isClient) {
//     return null; // Avoid rendering the button on the server
//   }

//   return (
//     <div>
//       <div className="flex justify-center mb-10">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-blue-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
//           onClick={handleAddHabitClick}
//           aria-label="Add habit"
//         >
//           <Plus size={18} />
//           <span>Add Habit</span>
//         </motion.button>
//       </div>

//       {/* Form to Add Habit */}
//       {showForm && (
//         <div className="flex justify-center mb-10 w-400">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl font-semibold">Add a New Habit</h2>
//             <form onSubmit={handleFormSubmit} className="mt-4">
//               <input
//                 type="text"
//                 value={habitName}
//                 onChange={handleInputChange}
//                 className="mt-2 p-2 border border-gray-300 rounded w-full"
//                 placeholder="Enter habit name"
//                 required
//               />
//               <div className="mt-4 flex justify-end gap-4">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowForm(false)} // Close the form without saving
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save Habit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Display added habits */}
//       {habits.length > 0 && (
//         <div className="mt-10 w-120">
//           <h3 className="text-lg font-semibold">Your Habits:</h3>
//           <div className="space-y-4 mt-4">
//             {habits.map((habit, index) => (
//               <HabitCard
//                 key={index}
//                 icon={habit.icon}
//                 title={habit.title}
//                 current={habit.current}
//                 target={habit.target}
//                 unit={habit.unit}
//                 percentage={habit.percentage}
//                 value={habit.value}
//                 setValue={habit.setValue}
//                 min={habit.min}
//                 max={habit.max}
//                 color={habit.color}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddHabitButton;
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Plus, Check } from "react-feather";
// import { HabitCard } from "@/pages"; // Adjust path if needed

// const AddHabitButton = () => {
//   const [isClient, setIsClient] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [habitName, setHabitName] = useState("");
//   const [habits, setHabits] = useState<any[]>([]);

//   useEffect(() => {
//     setIsClient(true);

//     const storedHabits = localStorage.getItem("userHabits");
//     if (storedHabits) {
//       const parsedHabits = JSON.parse(storedHabits);
//       const reconstructedHabits = parsedHabits.map((habit: any) => ({
//         ...habit,
//         icon: <Check size={16} />,
//         setValue: (newValue: number) => {
//           const updated = habits.map(h =>
//             h.title === habit.title
//               ? {
//                   ...h,
//                   value: newValue,
//                   percentage: (newValue / h.max) * 100,
//                 }
//               : h
//           );
//           setHabits(updated);
//           localStorage.setItem("userHabits", JSON.stringify(updated));
//         },
//       }));
//       setHabits(reconstructedHabits);
//     }
//   }, []);

//   const handleAddHabitClick = () => {
//     setShowForm(true);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setHabitName(e.target.value);
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (habitName.trim()) {
//       const newHabit = {
//         icon: <Check size={16} />,
//         title: habitName,
//         current: 0,
//         target: 100,
//         unit: "%",
//         percentage: 0,
//         value: 0,
//         min: 0,
//         max: 100,
//         color: "blue",
//         setValue: (newValue: number) => {
//           const updated = habits.map(h =>
//             h.title === habitName
//               ? {
//                   ...h,
//                   value: newValue,
//                   percentage: (newValue / 100) * 100,
//                 }
//               : h
//           );
//           setHabits(updated);
//           localStorage.setItem("userHabits", JSON.stringify(updated));
//         },
//       };

//       const updatedHabits = [...habits, newHabit];
//       setHabits(updatedHabits);
//       localStorage.setItem("userHabits", JSON.stringify(updatedHabits));
//       setHabitName("");
//       setShowForm(false);
//     }
//   };

//   if (!isClient) return null;

//   return (
//     <div>
//       <div className="flex justify-center mb-10">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-blue-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
//           onClick={handleAddHabitClick}
//           aria-label="Add habit"
//         >
//           <Plus size={18} />
//           <span>Add Habit</span>
//         </motion.button>
//       </div>

//       {showForm && (
//         <div className="flex justify-center mb-10 w-400">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl font-semibold">Add a New Habit</h2>
//             <form onSubmit={handleFormSubmit} className="mt-4">
//               <input
//                 type="text"
//                 value={habitName}
//                 onChange={handleInputChange}
//                 className="mt-2 p-2 border border-gray-300 rounded w-full"
//                 placeholder="Enter habit name"
//                 required
//               />
//               <div className="mt-4 flex justify-end gap-4">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save Habit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {habits.length > 0 && (
//         <div className="mt-10 w-320">
//           <h3 className="text-lg font-semibold mb-4">Your Habits:</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {habits.map((habit, index) => (
//               <HabitCard
//                 key={index}
//                 icon={habit.icon}
//                 title={habit.title}
//                 current={habit.current}
//                 target={habit.target}
//                 unit={habit.unit}
//                 percentage={habit.percentage}
//                 value={habit.value}
//                 setValue={habit.setValue}
//                 min={habit.min}
//                 max={habit.max}
//                 color={habit.color}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddHabitButton;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "react-feather";
import { HabitCard } from "@/pages";

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
  const [habits, setHabits] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("userHabits");
    if (stored) {
      const parsed = JSON.parse(stored);
      const hydrated = parsed.map((habit: any) => ({
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

      const newHabit = {
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
    <div>
     
      {habits.length > 0 && (
        <div className="mt-10 w-380">
          <h3 className="text-lg font-semibold m-5">Your Habits:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
        <div className="flex justify-center mb-10 w-400">
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
