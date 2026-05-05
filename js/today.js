export function renderTodayDate() {
    const now = new Date();

    // Show weekday, e.g. "Tisdag"
    const weekday = now.toLocaleDateString('sv-SE', { weekday: 'long' });
    document.getElementById('today-weekday').textContent =
        weekday.charAt(0).toUpperCase() + weekday.slice(1);

    // Show date, e.g. "5 maj 2026"
    document.getElementById('today-date').textContent =
        now.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

    // Start the clock and update it every second
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('today-time').textContent = hh + ':' + mm;
}

// Returns the todos array so other files can read it
export function getTodos() {
    return todos;
}
