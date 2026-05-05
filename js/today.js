export function renderTodayDate() {
    const now = new Date();

    // Visa veckodag, t.ex. "Tisdag"
    const weekday = now.toLocaleDateString('sv-SE', { weekday: 'long' });
    document.getElementById('today-weekday').textContent =
        weekday.charAt(0).toUpperCase() + weekday.slice(1);

    // Visa datum, t.ex. "5 maj 2026"
    document.getElementById('today-date').textContent =
        now.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

    // Starta klockan och uppdatera den varje sekund
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('today-time').textContent = hh + ':' + mm;
}
