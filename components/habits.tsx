interface HabitCardProps {
    icon: React.ReactNode;
    title: string;
    current: number;
    target: number | string;
    unit: string;
    percentage: number;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    min: number;
    max: number;
    color: string;
    inversed?: boolean;
  }
  