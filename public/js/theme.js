document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set theme with transition
    const setTheme = (theme) => {
        // Add transition class before changing theme
        document.documentElement.classList.add('theme-transition');
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        updateThemeToggleIcon(theme);

        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };

    // Function to update theme toggle icon with animation
    const updateThemeToggleIcon = (theme) => {
        const isDark = theme === 'dark';
        themeToggle.innerHTML = isDark ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
        themeToggle.classList.add('theme-toggle-spin');
        setTimeout(() => themeToggle.classList.remove('theme-toggle-spin'), 300);
    };

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle theme on button click with debounce
    let isThemeChanging = false;
    themeToggle.addEventListener('click', () => {
        if (isThemeChanging) return;
        isThemeChanging = true;

        const currentTheme = document.documentElement.dataset.theme;
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');

        setTimeout(() => {
            isThemeChanging = false;
        }, 300);
    });

    // Listen for system theme changes
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});