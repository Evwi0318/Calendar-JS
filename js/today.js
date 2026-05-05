/**
 * Renders today's date in the sidebar.
 */
export function renderTodayDate() {
    const el = document.getElementById('today-date');
    if (!el) return;

    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = now.toLocaleDateString('sv-SE', options);

    // Capitalise first letter
    el.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);

    const iso = now.toISOString().split('T')[0];
    el.setAttribute('datetime', iso);
}
