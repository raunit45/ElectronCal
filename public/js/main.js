let currentDate = new Date();
let releases = [];

async function fetchReleases() {
    try {
        const response = await fetch('/api/releases');
        releases = await response.json();
        renderCalendar();
        displayUpcomingReleases();
    } catch (error) {
        console.error('Error fetching releases:', error);
    }
}

function renderCalendar() {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    document.getElementById('current-month').textContent = 
        firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarDays.appendChild(createDayElement(''));
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayReleases = releases.filter(release => {
            const releaseDate = new Date(release.date);
            return releaseDate.toDateString() === date.toDateString();
        });
        
        calendarDays.appendChild(createDayElement(day, dayReleases));
    }
}

function createDayElement(day, dayReleases = []) {
    const div = document.createElement('div');
    div.className = 'calendar-day' + (dayReleases.length ? ' has-release' : '');
    div.textContent = day;
    
    dayReleases.forEach(release => {
        const marker = document.createElement('div');
        marker.className = `release-marker ${release.channel.toLowerCase()}`;
        marker.title = `${release.channel} release: ${release.version}`;
        div.appendChild(marker);
    });
    
    return div;
}

function displayUpcomingReleases() {
    const container = document.getElementById('upcoming-releases');
    container.innerHTML = '';
    
    const upcomingReleases = releases
        .filter(release => new Date(release.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    upcomingReleases.forEach(release => {
        const div = document.createElement('div');
        div.className = `release-item ${release.channel.toLowerCase()}`;
        div.innerHTML = `
            <h3>${release.channel} Release</h3>
            <p>Version: ${release.version}</p>
            <p>Date: ${new Date(release.date).toLocaleDateString()}</p>
        `;
        container.appendChild(div);
    });
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(isDark) {
        const root = document.documentElement;
        root.style.setProperty('--theme-transition', 'all 0.3s ease');
        root.dataset.theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
        
        // Remove transition after animation completes
        setTimeout(() => {
            root.style.removeProperty('--theme-transition');
        }, 300);
    }

    // Load saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDarkScheme.matches);
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.dataset.theme;
        setTheme(currentTheme !== 'dark');
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(isDark) {
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        themeToggle.innerHTML = isDark ? moonIcon : sunIcon;
    }
    
    fetchReleases();
});