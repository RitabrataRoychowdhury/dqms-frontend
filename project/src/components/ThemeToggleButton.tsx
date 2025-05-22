// src/components/ThemeToggleButton.tsx
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 
                 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
