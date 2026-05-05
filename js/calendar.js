/**
 * Renders the calendar for the current (or given) month.
 * @param {number} [year]
 * @param {number} [month] — 0-indexed (0 = January)
 */
export function renderCalendar(year, month) {
    const today = new Date();
    const y = year  !== undefined ? year  : today.getFullYear();
    const m = month !== undefined ? month : today.getMonth();

    // Update header label
    const label = document.getElementById('current-month-label');
    if (label) {
        const monthName = new Date(y, m, 1)
            .toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });
        label.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        label.setAttribute('datetime', `${y}-${String(m + 1).padStart(2, '0')}`);
    }

    const tbody = document.getElementById('calendar-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    // First day of month (0=Sun … 6=Sat). Adjust so week starts on Monday.
    const firstDay = new Date(y, m, 1).getDay(); // 0-Sun
    const startOffset = (firstDay === 0) ? 6 : firstDay - 1;

    const daysInMonth    = new Date(y, m + 1, 0).getDate();
    const daysInPrevMonth = new Date(y, m, 0).getDate();

    let day = 1;
    let nextMonthDay = 1;
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i += 7) {
        const tr = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cellIndex = i + j;
            const td = document.createElement('td');

            if (cellIndex < startOffset) {
                // Previous month overflow
                const prevDay = daysInPrevMonth - startOffset + cellIndex + 1;
                td.classList.add('other-month');
                td.appendChild(createDayNumber(prevDay));
            } else if (day > daysInMonth) {
                // Next month overflow
                td.classList.add('other-month');
                td.appendChild(createDayNumber(nextMonthDay));
                nextMonthDay++;
            } else {
                // Current month
                const isToday =
                    day === today.getDate() &&
                    m   === today.getMonth() &&
                    y   === today.getFullYear();

                if (isToday) td.classList.add('today');

                const time = document.createElement('time');
                const isoDate = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                time.setAttribute('datetime', isoDate);
                time.appendChild(createDayNumber(day));
                td.appendChild(time);
                td.dataset.date = isoDate;

                day++;
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

function createDayNumber(num) {
    const span = document.createElement('span');
    span.classList.add('day-number');
    span.textContent = num;
    return span;
}
