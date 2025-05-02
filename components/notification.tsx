import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "react-feather";

const NotificationBar = ({ habits }) => {
  const [notifications, setNotifications] = useState(0);

  // Calculate the number of incomplete habits
  useEffect(() => {
    const incompleteHabits = habits.filter(habit => !habit.completed).length;
    setNotifications(incompleteHabits);
  }, [habits]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Bell size={20} className="text-gray-600" />
      {notifications > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {notifications}
        </span>
      )}
    </motion.button>
  );
};

export default NotificationBar;
