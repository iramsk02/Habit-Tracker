// // import React, { useEffect, useState } from 'react';
// // import { FaBell } from 'react-icons/fa'; // Importing bell icon from react-icons
// // import { motion } from 'framer-motion'; // Importing Framer Motion for animation

// // interface Habits {
// //   water: number;
// //   sleep: number;
// //   screen: number;
// // }

// // interface NotificationProps {
// //   habits: Habits;
// // }

// // const NotificationComponent: React.FC<NotificationProps> = ({ habits }) => {
// //   const [permission, setPermission] = useState<string>(Notification.permission);
// //   const [isNotified, setIsNotified] = useState<boolean>(false);

// //   // This checks if we're in the browser environment
// //   const isBrowser = typeof window !== 'undefined';

// //   useEffect(() => {
// //     if (isBrowser && permission !== 'granted') {
// //       Notification.requestPermission().then((result) => {
// //         setPermission(result);
// //       });
// //     }
// //   }, [permission, isBrowser]);

// //   // Function to send notifications
// //   const sendNotification = (title: string, message: string) => {
// //     if (isBrowser && Notification.permission === 'granted') {
// //       new Notification(title, {
// //         body: message,
// //         icon: '/favicon.ico', // Optional: add an icon for your notification
// //       });
// //       setIsNotified(true); // Set notification flag to true when notified
// //     }
// //   };

// //   // Function to check for incomplete goals and send notification
// //   const checkGoalsAndNotify = (habits: Habits) => {
// //     if (habits.water < 8) {
// //       sendNotification('Reminder: Water Intake', 'You haven\'t reached your daily water intake goal. Drink more water!');
// //     }
// //     if (habits.sleep < 8) {
// //       sendNotification('Reminder: Sleep', 'You haven\'t reached your daily sleep goal. Make sure to rest well!');
// //     }
// //     if (habits.screen > 2) {
// //       sendNotification('Reminder: Screen Time', 'You\'ve exceeded your screen time goal. Time to take a break!');
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Bell Icon with Framer Motion */}
// //       <motion.div
// //         initial={{ scale: 1 }}
// //         animate={{ scale: isNotified ? 1.2 : 1 }}
// //         transition={{ duration: 0.3 }}
// //         style={{
// //           cursor: 'pointer',
// //           margin: '20px',
// //           display: 'inline-block',
// //         }}
// //         onClick={() => {
// //           checkGoalsAndNotify(habits);
// //         }}
// //       >
// //         <FaBell size={40} color={isNotified ? 'red' : 'black'} />
// //       </motion.div>

// //       <button
// //         onClick={() => {
// //           // Trigger notification based on current habit data
// //           checkGoalsAndNotify(habits);
// //         }}
// //       >
// //         Check Goals and Notify
// //       </button>

// //       {/* Display permission status */}
// //       <p>Notification Permission: {permission}</p>
// //     </div>
// //   );
// // };

// // export default NotificationComponent;
// import React, { useEffect, useState } from 'react';
// import { FaBell } from 'react-icons/fa'; // Bell icon
// import { motion } from 'framer-motion'; // Framer Motion

// type Habits = {
//     key: string;
//     value: number;
//   };

// interface NotificationProps {
//   habits: Habits;
// }

// const NotificationComponent: React.FC<NotificationProps> = ({ habits }) => {
//   const [permission, setPermission] = useState<string>('default');
//   const [isNotified, setIsNotified] = useState<boolean>(false);

//   // Check if we are in the browser environment
//   const isBrowser = typeof window !== 'undefined';

//   useEffect(() => {
//     if (isBrowser && Notification.permission !== 'granted') {
//       Notification.requestPermission().then((result) => {
//         setPermission(result);
//       });
//     }
//   }, [isBrowser]);

//   // Function to send notification
//   const sendNotification = (title: string, message: string) => {
//     if (isBrowser && Notification.permission === 'granted') {
//       new Notification(title, {
//         body: message,
//         icon: '/favicon.ico', // Optional: add an icon for your notification
//       });
//       setIsNotified(true); // Trigger notification flag
//     }
//   };

//   // Check goals and notify if conditions are met
//   const checkGoalsAndNotify = (habits: Habits) => {
//     if ((habits as any).water < 8) {
//       sendNotification('Reminder: Water Intake', 'You haven\'t reached your daily water intake goal. Drink more water!');
//     }
//     if ((habits as any).sleep < 8) {
//       sendNotification('Reminder: Sleep', 'You haven\'t reached your daily sleep goal. Make sure to rest well!');
//     }
//     if ((habits as any).screen > 2) {
//       sendNotification('Reminder: Screen Time', 'You\'ve exceeded your screen time goal. Time to take a break!');
//     }
//   };

//   return (
//     <div>
//       {/* Bell Icon with Framer Motion */}
//       <motion.div
      
//         initial={{ scale: 1 }}
//         animate={{ scale: isNotified ? 1.2 : 1 }}
//         transition={{ duration: 0.3 }}
//         style={{
            
//           cursor: 'pointer',
//           margin: '10px',
//           display: 'inline-block',
//         }}
//         onClick={() => {
//           checkGoalsAndNotify(habits);
//         }}
//       >
//         <FaBell size={20} color={isNotified ? 'red' : 'black'} />
//       </motion.div>

//        <button
//         onClick={() => {
//           checkGoalsAndNotify(habits);
//         }}
//       >
//         {/* Check Goals and Notify */}
//       </button> 

//       {/* Display permission status 
//       <p>Notification Permission: {permission}</p> */}
//     </div>
//   );
// };

// export default NotificationComponent;
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Bell icon
import { motion } from 'framer-motion'; // Framer Motion

// Update the type to reflect actual habit properties
type Habits = {
  water: number;
  sleep: number;
  screen: number;
};

interface NotificationProps {
  habits: Habits;
}

const NotificationComponent: React.FC<NotificationProps> = ({ habits }) => {
  const [permission, setPermission] = useState<string>('default');
  const [isNotified, setIsNotified] = useState<boolean>(false);

  // Check if we are in the browser environment
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (isBrowser && Notification.permission !== 'granted') {
      Notification.requestPermission().then((result) => {
        setPermission(result);
      });
    }
  }, [isBrowser]);

  // Function to send notification
  const sendNotification = (title: string, message: string) => {
    if (isBrowser && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico', // Optional: add an icon for your notification
      });
      setIsNotified(true); // Trigger notification flag
    }
  };

  // Check goals and notify if conditions are met
  const checkGoalsAndNotify = (habits: Habits) => {
    if (habits.water < 8) {
      sendNotification('Reminder: Water Intake', 'You haven\'t reached your daily water intake goal. Drink more water!');
    }
    if (habits.sleep < 8) {
      sendNotification('Reminder: Sleep', 'You haven\'t reached your daily sleep goal. Make sure to rest well!');
    }
    if (habits.screen > 2) {
      sendNotification('Reminder: Screen Time', 'You\'ve exceeded your screen time goal. Time to take a break!');
    }
  };

  return (
    <div>
      {/* Bell Icon with Framer Motion */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isNotified ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          cursor: 'pointer',
          margin: '10px',
          display: 'inline-block',
        }}
        onClick={() => {
          checkGoalsAndNotify(habits);
        }}
      >
        <FaBell size={20} color={isNotified ? 'red' : 'black'} />
      </motion.div>

      <button
        onClick={() => {
          checkGoalsAndNotify(habits);
        }}
      >
        {/* Check Goals and Notify */}
      </button>

      {/* Display permission status */}
      {/* <p>Notification Permission: {permission}</p> */}
    </div>
  );
};

export default NotificationComponent;
