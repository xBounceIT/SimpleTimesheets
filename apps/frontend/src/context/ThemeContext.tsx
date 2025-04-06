import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // If there's a saved preference, use it; otherwise default to light
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Force layout and style calculations to be batched for consistent animations
    const applyTheme = () => {
      // Use a single animation frame to apply all theme changes
      requestAnimationFrame(() => {
        // Trigger a reflow to ensure all CSS transitions start at the same time
        document.documentElement.style.setProperty('--theme-applying', '1');
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Force reflow to ensure all elements pick up the new theme simultaneously
        document.body.offsetHeight;
        
        // Reset the theme-applying property
        document.documentElement.style.removeProperty('--theme-applying');
      });
    };
    
    applyTheme();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 